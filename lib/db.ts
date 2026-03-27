import { neon } from '@neondatabase/serverless';

function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not set');
  return neon(url);
}

export interface Appointment {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  service_category: string;
  service_name: string;
  preferred_date: string;
  preferred_time: string;
  comments: string | null;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}

export interface CreateAppointmentData {
  name: string;
  phone: string;
  email?: string;
  service_category: string;
  service_name: string;
  preferred_date: string;
  preferred_time: string;
  comments?: string;
}

async function ensureTable() {
  const sql = getDb();
  await sql`
    CREATE TABLE IF NOT EXISTS appointments (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      service_category TEXT NOT NULL,
      service_name TEXT NOT NULL,
      preferred_date TEXT NOT NULL,
      preferred_time TEXT NOT NULL,
      comments TEXT,
      status TEXT DEFAULT 'pending',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

export async function createAppointment(data: CreateAppointmentData): Promise<Appointment> {
  await ensureTable();
  const sql = getDb();
  const rows = await sql`
    INSERT INTO appointments (name, phone, email, service_category, service_name, preferred_date, preferred_time, comments)
    VALUES (${data.name}, ${data.phone}, ${data.email || null}, ${data.service_category}, ${data.service_name}, ${data.preferred_date}, ${data.preferred_time}, ${data.comments || null})
    RETURNING *
  `;
  return rows[0] as Appointment;
}

export async function getAppointmentById(id: number): Promise<Appointment | undefined> {
  await ensureTable();
  const sql = getDb();
  const rows = await sql`SELECT * FROM appointments WHERE id = ${id}`;
  return rows[0] as Appointment | undefined;
}

export async function getAllAppointments(status?: string): Promise<Appointment[]> {
  await ensureTable();
  const sql = getDb();
  if (status && status !== 'all') {
    return await sql`SELECT * FROM appointments WHERE status = ${status} ORDER BY preferred_date DESC, preferred_time DESC` as Appointment[];
  }
  return await sql`SELECT * FROM appointments ORDER BY preferred_date DESC, preferred_time DESC` as Appointment[];
}

export async function updateAppointmentStatus(
  id: number,
  status: 'pending' | 'confirmed' | 'cancelled'
): Promise<Appointment | undefined> {
  await ensureTable();
  const sql = getDb();
  const rows = await sql`UPDATE appointments SET status = ${status} WHERE id = ${id} RETURNING *`;
  return rows[0] as Appointment | undefined;
}

export async function getStats() {
  await ensureTable();
  const sql = getDb();
  const today = new Date().toISOString().split('T')[0];

  const [total, pending, confirmed, todayCount] = await Promise.all([
    sql`SELECT COUNT(*)::int as count FROM appointments`,
    sql`SELECT COUNT(*)::int as count FROM appointments WHERE status = 'pending'`,
    sql`SELECT COUNT(*)::int as count FROM appointments WHERE status = 'confirmed'`,
    sql`SELECT COUNT(*)::int as count FROM appointments WHERE preferred_date = ${today}`,
  ]);

  return {
    total: (total[0]?.count as number) || 0,
    pending: (pending[0]?.count as number) || 0,
    confirmed: (confirmed[0]?.count as number) || 0,
    todayCount: (todayCount[0]?.count as number) || 0,
  };
}

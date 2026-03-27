import { NextRequest, NextResponse } from 'next/server';
import { updateAppointmentStatus, getAppointmentById } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }

    const id = parseInt(params.id, 10);
    if (isNaN(id) || id <= 0) {
      return NextResponse.json({ error: 'Некорректный ID' }, { status: 400 });
    }

    const existing = await getAppointmentById(id);
    if (!existing) {
      return NextResponse.json({ error: 'Запись не найдена' }, { status: 404 });
    }

    const body = await request.json();
    const { status } = body;

    if (!status || !['pending', 'confirmed', 'cancelled'].includes(status)) {
      return NextResponse.json(
        { error: 'Некорректный статус. Допустимые значения: pending, confirmed, cancelled' },
        { status: 400 }
      );
    }

    const updated = await updateAppointmentStatus(id, status);

    return NextResponse.json({ success: true, appointment: updated });
  } catch (error) {
    console.error('PATCH /api/appointments/[id] error:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }

    const id = parseInt(params.id, 10);
    if (isNaN(id) || id <= 0) {
      return NextResponse.json({ error: 'Некорректный ID' }, { status: 400 });
    }

    const appointment = await getAppointmentById(id);
    if (!appointment) {
      return NextResponse.json({ error: 'Запись не найдена' }, { status: 404 });
    }

    return NextResponse.json({ appointment });
  } catch (error) {
    console.error('GET /api/appointments/[id] error:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

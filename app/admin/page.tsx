import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import AdminDashboard from './AdminDashboard';

export default async function AdminPage() {
  const authed = await isAuthenticated();
  if (!authed) {
    redirect('/admin/login');
  }
  return <AdminDashboard />;
}

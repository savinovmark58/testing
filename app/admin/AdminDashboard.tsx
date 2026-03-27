'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface Appointment {
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

interface Stats {
  total: number;
  pending: number;
  confirmed: number;
  todayCount: number;
}

type StatusFilter = 'all' | 'pending' | 'confirmed' | 'cancelled';

const STATUS_FILTERS: { id: StatusFilter; label: string }[] = [
  { id: 'all', label: 'Все' },
  { id: 'pending', label: 'Ожидают' },
  { id: 'confirmed', label: 'Подтверждены' },
  { id: 'cancelled', label: 'Отменены' },
];

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

function StatusBadge({ status }: { status: Appointment['status'] }) {
  const map = {
    pending: { cls: 'status-pending', label: 'Ожидает' },
    confirmed: { cls: 'status-confirmed', label: 'Подтверждён' },
    cancelled: { cls: 'status-cancelled', label: 'Отменён' },
  };
  const { cls, label } = map[status];
  return <span className={cls}>{label}</span>;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, confirmed: 0, todayCount: 0 });
  const [filter, setFilter] = useState<StatusFilter>('all');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [error, setError] = useState('');

  const fetchAppointments = useCallback(async () => {
    try {
      const url = filter === 'all' ? '/api/appointments' : `/api/appointments?status=${filter}`;
      const res = await fetch(url);
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      if (!res.ok) throw new Error('Ошибка загрузки');
      const data = await res.json();
      setAppointments(data.appointments || []);
      if (data.stats) setStats(data.stats);
    } catch {
      setError('Не удалось загрузить данные');
    } finally {
      setLoading(false);
    }
  }, [filter, router]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleStatusChange = async (id: number, status: 'confirmed' | 'cancelled') => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Ошибка обновления');
      await fetchAppointments();
    } catch {
      setError('Ошибка при обновлении статуса');
    } finally {
      setActionLoading(null);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-primary-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent-gradient flex items-center justify-center">
                <span className="text-white text-xs font-bold">IS</span>
              </div>
              <div>
                <span className="font-heading text-white text-lg tracking-wide">
                  INSKIN<span className="text-accent">.</span>CLINIC
                </span>
                <span className="hidden sm:inline text-white/40 text-sm ml-2">/ Администратор</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 text-white/60 text-sm hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Сайт
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-white/60 text-sm hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Выйти
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Всего записей', value: stats.total, icon: '📋', color: 'text-primary-dark' },
            { label: 'Ожидают', value: stats.pending, icon: '⏳', color: 'text-amber-600' },
            { label: 'Подтверждено', value: stats.confirmed, icon: '✅', color: 'text-emerald-600' },
            { label: 'Сегодня', value: stats.todayCount, icon: '📅', color: 'text-blue-600' },
          ].map((stat) => (
            <div key={stat.label} className="card-base p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl">{stat.icon}</span>
                <span className={`font-heading text-3xl font-normal ${stat.color}`}>{stat.value}</span>
              </div>
              <p className="text-text-muted text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Table section */}
        <div className="card-base overflow-hidden">
          {/* Table header with filters */}
          <div className="px-6 py-4 border-b border-border-soft flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="font-heading text-xl text-primary-dark">Записи на приём</h2>
            <div className="flex gap-2 flex-wrap">
              {STATUS_FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    filter === f.id
                      ? 'bg-primary-dark text-white'
                      : 'bg-secondary text-text-muted hover:bg-accent/10 hover:text-accent'
                  }`}
                >
                  {f.label}
                </button>
              ))}
              <button
                onClick={fetchAppointments}
                className="px-3 py-1.5 rounded-full text-sm bg-secondary text-text-muted hover:bg-accent/10 hover:text-accent transition-all flex items-center gap-1.5"
                title="Обновить"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>

          {error && (
            <div className="px-6 py-3 bg-red-50 border-b border-red-100">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <svg className="w-8 h-8 animate-spin text-accent" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-20">
              <svg className="w-12 h-12 text-border-soft mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-text-muted">Записей нет</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-secondary/50">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide">Дата / Время</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide">Клиент</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide hidden md:table-cell">Контакты</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide hidden lg:table-cell">Услуга</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide">Статус</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide">Действия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-soft">
                  {appointments.map((appt) => (
                    <>
                      <tr
                        key={appt.id}
                        className="hover:bg-secondary/20 transition-colors cursor-pointer"
                        onClick={() => setExpandedRow(expandedRow === appt.id ? null : appt.id)}
                      >
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-primary-dark">{formatDate(appt.preferred_date)}</p>
                          <p className="text-xs text-text-muted">{appt.preferred_time}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-primary-dark">{appt.name}</p>
                          <p className="text-xs text-text-muted md:hidden">{appt.phone}</p>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <p className="text-sm text-primary-dark">{appt.phone}</p>
                          {appt.email && <p className="text-xs text-text-muted">{appt.email}</p>}
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell">
                          <p className="text-sm text-primary-dark font-medium">{appt.service_name}</p>
                          <p className="text-xs text-text-muted">{appt.service_category}</p>
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={appt.status} />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {appt.status !== 'confirmed' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStatusChange(appt.id, 'confirmed');
                                }}
                                disabled={actionLoading === appt.id}
                                className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-medium hover:bg-emerald-100 transition-colors disabled:opacity-50"
                              >
                                {actionLoading === appt.id ? '...' : 'Подтвердить'}
                              </button>
                            )}
                            {appt.status !== 'cancelled' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStatusChange(appt.id, 'cancelled');
                                }}
                                disabled={actionLoading === appt.id}
                                className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 transition-colors disabled:opacity-50"
                              >
                                {actionLoading === appt.id ? '...' : 'Отменить'}
                              </button>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedRow(expandedRow === appt.id ? null : appt.id);
                              }}
                              className="p-1.5 rounded-lg text-text-muted hover:text-accent hover:bg-accent/10 transition-colors"
                              title="Подробнее"
                            >
                              <svg
                                className={`w-4 h-4 transition-transform ${expandedRow === appt.id ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                      {/* Expanded row */}
                      {expandedRow === appt.id && (
                        <tr key={`${appt.id}-expanded`} className="bg-secondary/30">
                          <td colSpan={6} className="px-6 py-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              <div>
                                <p className="text-xs text-text-muted uppercase tracking-wide mb-1">Услуга</p>
                                <p className="text-sm font-medium text-primary-dark">{appt.service_name}</p>
                                <p className="text-xs text-text-muted">{appt.service_category}</p>
                              </div>
                              <div>
                                <p className="text-xs text-text-muted uppercase tracking-wide mb-1">Контакты</p>
                                <p className="text-sm text-primary-dark">{appt.phone}</p>
                                {appt.email && <p className="text-xs text-text-muted">{appt.email}</p>}
                              </div>
                              {appt.comments && (
                                <div className="sm:col-span-2 lg:col-span-1">
                                  <p className="text-xs text-text-muted uppercase tracking-wide mb-1">Комментарий</p>
                                  <p className="text-sm text-primary-dark">{appt.comments}</p>
                                </div>
                              )}
                              <div>
                                <p className="text-xs text-text-muted uppercase tracking-wide mb-1">Создана</p>
                                <p className="text-sm text-primary-dark">{appt.created_at}</p>
                              </div>
                              <div>
                                <p className="text-xs text-text-muted uppercase tracking-wide mb-1">ID записи</p>
                                <p className="text-sm text-primary-dark font-mono">#{appt.id}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Table footer */}
          {!loading && appointments.length > 0 && (
            <div className="px-6 py-3 border-t border-border-soft bg-secondary/20">
              <p className="text-sm text-text-muted">
                Показано {appointments.length} {appointments.length === 1 ? 'запись' : appointments.length < 5 ? 'записи' : 'записей'}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

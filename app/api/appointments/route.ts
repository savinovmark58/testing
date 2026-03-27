import { NextRequest, NextResponse } from 'next/server';
import { createAppointment, getAllAppointments, getStats } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, phone, email, service_category, service_name, preferred_date, preferred_time, comments } = body;

    // Validation
    if (!name || !phone || !service_category || !service_name || !preferred_date || !preferred_time) {
      return NextResponse.json(
        { error: 'Обязательные поля не заполнены' },
        { status: 400 }
      );
    }

    if (name.trim().length < 2) {
      return NextResponse.json({ error: 'Имя слишком короткое' }, { status: 400 });
    }

    if (phone.trim().length < 7) {
      return NextResponse.json({ error: 'Некорректный номер телефона' }, { status: 400 });
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(preferred_date)) {
      return NextResponse.json({ error: 'Некорректный формат даты' }, { status: 400 });
    }

    // Validate time format
    const timeRegex = /^\d{2}:\d{2}$/;
    if (!timeRegex.test(preferred_time)) {
      return NextResponse.json({ error: 'Некорректный формат времени' }, { status: 400 });
    }

    const appointment = await createAppointment({
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim() || undefined,
      service_category: service_category.trim(),
      service_name: service_name.trim(),
      preferred_date,
      preferred_time,
      comments: comments?.trim() || undefined,
    });

    return NextResponse.json(
      { success: true, appointment },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/appointments error:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';

    const appointments = await getAllAppointments(status);
    const stats = await getStats();

    return NextResponse.json({ appointments, stats });
  } catch (error) {
    console.error('GET /api/appointments error:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

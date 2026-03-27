import { NextRequest, NextResponse } from 'next/server';
import { signToken, COOKIE_NAME } from '@/lib/auth';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'inskin2024';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Введите логин и пароль' },
        { status: 400 }
      );
    }

    // Simple credential check (no bcrypt needed for admin-only access)
    const isValidUsername = username === ADMIN_USERNAME;
    const isValidPassword = password === ADMIN_PASSWORD;

    if (!isValidUsername || !isValidPassword) {
      // Add slight delay to prevent brute-force
      await new Promise((r) => setTimeout(r, 500));
      return NextResponse.json(
        { error: 'Неверный логин или пароль' },
        { status: 401 }
      );
    }

    const token = await signToken({
      role: 'admin',
      username: ADMIN_USERNAME,
    });

    const response = NextResponse.json({ success: true, message: 'Авторизован' });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('POST /api/auth error:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

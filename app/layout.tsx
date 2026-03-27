import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'INSKIN.CLINIC — Аппаратная и инъекционная косметология',
  description:
    'Косметологическая клиника экспертного уровня в Санкт-Петербурге. Аппаратная и инъекционная косметология, лазерные процедуры, СМАС-лифтинг. Запись по телефону +7 (812) 905-51-12.',
  keywords:
    'косметология, лазерная эпиляция, СМАС-лифтинг, ботулинотерапия, Санкт-Петербург, Васильевский остров',
  authors: [{ name: 'INSKIN.CLINIC' }],
  openGraph: {
    title: 'INSKIN.CLINIC — Аппаратная и инъекционная косметология',
    description: 'Косметологическая клиника экспертного уровня в Санкт-Петербурге',
    type: 'website',
    locale: 'ru_RU',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-background text-primary-dark antialiased">
        {children}
      </body>
    </html>
  );
}

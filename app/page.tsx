import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const services = [
  {
    category: 'Аппаратная косметология',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: 'from-amber-50 to-orange-50',
    accent: 'text-amber-600',
    border: 'border-amber-100',
    items: ['Nordlys Candela', 'HIFU UCOS', 'SmartXide Punto', 'Venus Viva', 'DEKA Moveo', 'Экзосомы'],
    size: 'lg',
  },
  {
    category: 'Инъекционная косметология',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    color: 'from-rose-50 to-pink-50',
    accent: 'text-rose-500',
    border: 'border-rose-100',
    items: ['Ботулинотерапия', 'Контурная пластика', 'Profhilo', 'Плазмотерапия', 'Мезотерапия'],
    size: 'md',
  },
  {
    category: 'Нитевой лифтинг',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    color: 'from-violet-50 to-purple-50',
    accent: 'text-violet-500',
    border: 'border-violet-100',
    items: ['Нити APTOS для лица', 'Нити APTOS для тела'],
    size: 'sm',
  },
  {
    category: 'Лечебные программы',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: 'from-emerald-50 to-teal-50',
    accent: 'text-emerald-600',
    border: 'border-emerald-100',
    items: ['Лечение акне', 'Лечение розацеа', 'Гиперпигментация', 'Выпадение волос'],
    size: 'sm',
  },
];

const equipment = [
  {
    name: 'Nordlys Candela',
    origin: 'США',
    desc: 'Многофункциональная платформа для фотоомоложения, удаления сосудов и коррекции розацеа',
    badge: 'Световая терапия',
  },
  {
    name: 'HIFU UCOS',
    origin: 'Корея',
    desc: 'СМАС-лифтинг ультразвуком без операции — подтяжка контуров лица и шеи',
    badge: 'СМАС-лифтинг',
  },
  {
    name: 'SmartXide Punto',
    origin: 'Италия',
    desc: 'CO₂-лазер для омоложения кожи, удаления новообразований и шлифовки рубцов',
    badge: 'CO₂-лазер',
  },
  {
    name: 'Venus Viva',
    origin: 'Израиль',
    desc: 'Радиочастотный термолифтинг для уплотнения кожи и уменьшения пор',
    badge: 'RF-терапия',
  },
  {
    name: 'DEKA Moveo',
    origin: 'Италия',
    desc: 'Безболезненная лазерная эпиляция на всех типах кожи и любых зонах тела',
    badge: 'Эпиляция',
  },
  {
    name: 'Экзосомы',
    origin: 'Регенеративная',
    desc: 'Инновационная терапия на основе внеклеточных везикул для восстановления кожи',
    badge: 'Биотехнологии',
  },
];

const benefits = [
  {
    title: 'Медицинская лицензия',
    desc: 'Работаем строго в рамках правового поля. Лицензия Л041-01148-78/00344468.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Врач-дерматолог',
    desc: 'Все процедуры проводит Надежда Саламашенко — дерматолог-косметолог с многолетним опытом.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    title: 'Премиальное оборудование',
    desc: 'Используем аппараты мировых брендов — Candela (США), DEKA (Италия), Venus Viva (Израиль).',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Индивидуальный подход',
    desc: 'Каждый пациент получает персональный план лечения после консультации врача.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      <Header />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(ellipse at 70% 50%, rgba(201,168,124,0.15) 0%, transparent 60%),
                           radial-gradient(ellipse at 20% 80%, rgba(201,168,124,0.08) 0%, transparent 50%)`,
        }} />

        {/* Decorative circles */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full border border-accent/10 pointer-events-none" />
        <div className="absolute top-1/3 right-1/3 w-40 h-40 rounded-full border border-accent/15 pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full border border-accent/8 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-accent/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-text-muted">Санкт-Петербург, Васильевский остров</span>
          </div>

          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-normal text-primary-dark mb-6 leading-none tracking-tight">
            INSKIN<span className="text-accent">.</span><br className="hidden sm:block" />CLINIC
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-text-muted max-w-2xl mx-auto mb-4 leading-relaxed">
            Аппаратная и инъекционная косметология
          </p>
          <p className="text-base md:text-lg text-accent font-medium mb-12">
            экспертного уровня
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/booking" className="btn-primary text-base px-10 py-4">
              Записаться на консультацию
            </Link>
            <Link href="/services" className="btn-outline text-base px-10 py-4">
              Все услуги
            </Link>
          </div>

          {/* Quick info */}
          <div className="mt-16 flex flex-col sm:flex-row justify-center gap-8 text-sm text-text-muted">
            <div className="flex items-center gap-2 justify-center">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Ежедневно 9:00–21:00
            </div>
            <div className="flex items-center gap-2 justify-center">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +7 (812) 905-51-12
            </div>
            <div className="flex items-center gap-2 justify-center">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Лицензированная клиника
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted">
          <span className="text-xs tracking-widest uppercase">Прокрутите</span>
          <div className="w-px h-8 bg-gradient-to-b from-accent to-transparent" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Doctor card */}
            <div className="relative">
              <div className="bg-secondary rounded-3xl p-8 md:p-10 relative overflow-hidden">
                {/* Decorative */}
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-accent/5 -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden mb-6 shadow-card">
                    <img
                      src="https://inskin.clinic/wp-content/uploads/2022/04/INSKIN-CLINIC-Доктор-Надежда-Саламашенко-1.jpg"
                      alt="Надежда Саламашенко"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="font-heading text-2xl text-primary-dark mb-1">
                    Надежда Саламашенко
                  </h3>
                  <p className="text-accent font-medium mb-6">Дерматолог-косметолог</p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <p className="text-text-muted text-sm">Врач высшей категории с многолетним опытом в дерматологии и эстетической медицине</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <p className="text-text-muted text-sm">Регулярное участие в международных конференциях по эстетической дерматологии</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <p className="text-text-muted text-sm">Сертифицированный специалист по работе с оборудованием Candela, DEKA, Venus</p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border-soft grid grid-cols-3 gap-4">
                    {[
                      { num: '10+', label: 'лет опыта' },
                      { num: '5000+', label: 'пациентов' },
                      { num: '15+', label: 'аппаратов' },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="font-heading text-2xl text-accent">{stat.num}</div>
                        <div className="text-xs text-text-muted mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-white border border-border-soft rounded-2xl shadow-card px-5 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm font-medium text-primary-dark">Принимаем сегодня</span>
                </div>
              </div>
            </div>

            {/* Philosophy */}
            <div>
              <div className="inline-flex items-center gap-2 text-accent text-sm font-medium tracking-wide uppercase mb-4">
                <div className="w-8 h-px bg-accent" />
                О клинике
              </div>
              <h2 className="section-title mb-6">
                Красота и здоровье<br />
                <span className="text-accent">вашей кожи</span>
              </h2>
              <div className="space-y-5 text-text-muted leading-relaxed">
                <p>
                  INSKIN.CLINIC — это авторская клиника эстетической медицины в самом сердце
                  Васильевского острова. Мы создавали это место для тех, кто ценит профессионализм,
                  безопасность и естественный результат.
                </p>
                <p>
                  Каждый пациент проходит консультацию у врача-дерматолога, получает персонализированную
                  программу коррекции и полное сопровождение на всех этапах лечения.
                </p>
                <p>
                  Мы используем только сертифицированные аппараты и препараты от ведущих мировых
                  производителей, работаем в рамках медицинской лицензии и несём ответственность
                  за результат.
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/booking" className="btn-primary">
                  Записаться
                </Link>
                <a href="tel:+78129055112" className="btn-outline">
                  +7 (812) 905-51-12
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES BENTO */}
      <section className="py-24 bg-secondary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-accent text-sm font-medium tracking-wide uppercase mb-4">
              <div className="w-8 h-px bg-accent" />
              Услуги
              <div className="w-8 h-px bg-accent" />
            </div>
            <h2 className="section-title mb-4">Наши процедуры</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Полный спектр методов аппаратной и инъекционной косметологии для любой эстетической задачи
            </p>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Large card */}
            <div className={`md:col-span-2 lg:col-span-1 lg:row-span-2 bg-gradient-to-br ${services[0].color} border ${services[0].border} rounded-3xl p-8 relative overflow-hidden group hover:shadow-card-hover transition-all duration-300`}>
              <div className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-5 ${services[0].accent} shadow-soft`}>
                {services[0].icon}
              </div>
              <h3 className="font-heading text-xl text-primary-dark mb-4">{services[0].category}</h3>
              <ul className="space-y-2.5">
                {services[0].items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-text-muted">
                    <div className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/services" className="mt-8 inline-flex items-center gap-2 text-sm text-accent font-medium hover:gap-3 transition-all">
                Подробнее
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {services.slice(1).map((service) => (
              <div
                key={service.category}
                className={`bg-gradient-to-br ${service.color} border ${service.border} rounded-3xl p-7 relative overflow-hidden group hover:shadow-card-hover transition-all duration-300`}
              >
                <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-4 ${service.accent} shadow-soft`}>
                  {service.icon}
                </div>
                <h3 className="font-heading text-lg text-primary-dark mb-3">{service.category}</h3>
                <ul className="space-y-2">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-text-muted">
                      <div className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/services" className="mt-5 inline-flex items-center gap-2 text-xs text-accent font-medium hover:gap-3 transition-all">
                  Узнать больше
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/services" className="btn-outline">
              Все услуги клиники
            </Link>
          </div>
        </div>
      </section>

      {/* PHOTO GALLERY */}
      <section className="py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
          <div className="inline-flex items-center gap-2 text-accent text-sm font-medium tracking-wide uppercase mb-4">
            <div className="w-8 h-px bg-accent" />
            Процедуры
            <div className="w-8 h-px bg-accent" />
          </div>
          <h2 className="section-title">Результаты наших процедур</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 px-4 sm:px-6 lg:px-8 scrollbar-hide">
          {[
            { src: 'https://inskin.clinic/wp-content/uploads/2025/02/рф-лифтинг-инскин-санкт-петербург-6.jpg', label: 'RF-лифтинг' },
            { src: 'https://inskin.clinic/wp-content/uploads/2022/09/смас-лифтинг-васильевский-остров-инскин.jpg', label: 'СМАС-лифтинг' },
            { src: 'https://inskin.clinic/wp-content/uploads/2020/09/удаление-сосудов-и-фотоомоложение-в-клинике-инскин-санкт-петербург-2.jpg', label: 'Фотоомоложение' },
            { src: 'https://inskin.clinic/wp-content/uploads/2025/02/экзосомы-клиника-инскин-санкт-петербург.jpg', label: 'Экзосомы' },
            { src: 'https://inskin.clinic/wp-content/uploads/2020/11/лазерная-эпиляция-moveo-в-клинике-инскин-санкт-петербург-5.jpg', label: 'Лазерная эпиляция' },
            { src: 'https://inskin.clinic/wp-content/uploads/2020/09/лазерное-омоложение-в-клинике-инскин-санкт-петербург-2.jpg', label: 'Лазерное омоложение' },
            { src: 'https://inskin.clinic/wp-content/uploads/2020/12/лечение-акне-на-васильевском-острове-санкт-петербург-в-клинике-инскин.jpg', label: 'Лечение акне' },
            { src: 'https://inskin.clinic/wp-content/uploads/2020/12/лечение-розацеа-на-васильевском-острове-санкт-петербург-в-клинике-инскин.jpg', label: 'Лечение розацеа' },
          ].map((photo) => (
            <div key={photo.label} className="flex-shrink-0 w-64 h-80 rounded-2xl overflow-hidden relative group cursor-pointer shadow-card">
              <img
                src={photo.src}
                alt={photo.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-white text-sm font-medium">{photo.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EQUIPMENT */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-accent text-sm font-medium tracking-wide uppercase mb-4">
              <div className="w-8 h-px bg-accent" />
              Оборудование
              <div className="w-8 h-px bg-accent" />
            </div>
            <h2 className="section-title mb-4">Технологии мирового класса</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Только сертифицированные аппараты от ведущих производителей США, Европы, Израиля и Кореи
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {equipment.map((eq, i) => (
              <div
                key={eq.name}
                className="card-base p-6 hover:shadow-card-hover transition-all duration-300 group relative overflow-hidden"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-accent/5 -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/10 transition-colors" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <span className="tag bg-accent/10 text-accent border-0 text-xs">
                      {eq.badge}
                    </span>
                    <span className="text-xs text-text-muted bg-secondary px-2.5 py-1 rounded-full">
                      {eq.origin}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl text-primary-dark mb-3 group-hover:text-accent transition-colors">
                    {eq.name}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">{eq.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 bg-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-accent text-sm font-medium tracking-wide uppercase mb-4">
              <div className="w-8 h-px bg-accent" />
              Почему мы
              <div className="w-8 h-px bg-accent" />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal text-white mb-4 leading-tight">
              Доверие начинается<br />с компетентности
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <div
                key={benefit.title}
                className="bg-white/5 border border-white/10 rounded-3xl p-7 hover:bg-white/8 hover:border-accent/30 transition-all duration-300"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent mb-5">
                  {benefit.icon}
                </div>
                <h3 className="font-heading text-lg text-white mb-3">{benefit.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-accent-gradient rounded-3xl overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
            }} />
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full border border-white/10 -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full border border-white/10 translate-y-1/2 -translate-x-1/4" />

            <div className="relative z-10 text-center py-16 px-6 md:px-16">
              <h2 className="font-heading text-3xl md:text-5xl font-normal text-white mb-4">
                Начните свой путь<br />к совершенной коже
              </h2>
              <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
                Запишитесь на консультацию врача-дерматолога и получите персональную программу коррекции
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center px-10 py-4 bg-white text-accent font-medium rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  Записаться онлайн
                </Link>
                <a
                  href="tel:+78129055112"
                  className="inline-flex items-center justify-center px-10 py-4 border-2 border-white/40 text-white font-medium rounded-full hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
                >
                  +7 (812) 905-51-12
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

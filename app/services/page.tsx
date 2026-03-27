'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CATEGORIES = [
  { id: 'all', label: 'Все услуги' },
  { id: 'hardware', label: 'Аппаратная' },
  { id: 'injection', label: 'Инъекционная' },
  { id: 'threads', label: 'Нитевой лифтинг' },
  { id: 'treatment', label: 'Лечебные программы' },
];

const SERVICES = [
  // Hardware
  {
    id: 'nordlys',
    category: 'hardware',
    categoryName: 'Аппаратная косметология',
    name: 'Nordlys Candela',
    equipment: 'Nordlys Candela (США)',
    tagline: 'Световая терапия нового поколения',
    description:
      'Многофункциональная платформа для широкого спектра задач: удаление сосудистых звёздочек, лечение розацеа, фотоомоложение, коррекция пигментации. Candela — мировой лидер в области световых технологий.',
    indications: ['Купероз и сосудистые звёздочки', 'Розацеа', 'Пигментные пятна', 'Фотостарение', 'Диффузное покраснение'],
    badge: 'Топ процедура',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    origin: 'США',
    gradient: 'from-amber-50 to-orange-50',
    border: 'border-amber-100',
  },
  {
    id: 'hifu',
    category: 'hardware',
    categoryName: 'Аппаратная косметология',
    name: 'HIFU УCOS — СМАС-лифтинг',
    equipment: 'HIFU UCOS (Корея)',
    tagline: 'Подтяжка без скальпеля',
    description:
      'Высокоинтенсивный сфокусированный ультразвук воздействует на СМАС (мышечно-апоневротическую систему) на глубине до 4,5 мм. Результат — натуральная подтяжка контуров лица, шеи и зоны декольте, сравнимая с хирургической, но без реабилитации.',
    indications: ['Птоз мягких тканей лица', 'Провисание овала лица', 'Морщины на шее', 'Дряблость кожи', 'Профилактика возрастных изменений'],
    badge: 'Без хирургии',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    origin: 'Корея',
    gradient: 'from-blue-50 to-sky-50',
    border: 'border-blue-100',
  },
  {
    id: 'smartxide',
    category: 'hardware',
    categoryName: 'Аппаратная косметология',
    name: 'SmartXide Punto',
    equipment: 'SmartXide Punto (Италия)',
    tagline: 'Лазерное омоложение и коррекция',
    description:
      'CO₂-лазер фракционного действия для глубокого омоложения кожи, шлифовки рубцов и постакне, удаления доброкачественных новообразований. Контролируемое термическое воздействие стимулирует выработку нового коллагена.',
    indications: ['Морщины и рубцы', 'Постакне', 'Стрии', 'Папилломы и бородавки', 'Себорейные кератомы'],
    badge: 'CO₂-лазер',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    origin: 'Италия',
    gradient: 'from-purple-50 to-violet-50',
    border: 'border-purple-100',
  },
  {
    id: 'venus',
    category: 'hardware',
    categoryName: 'Аппаратная косметология',
    name: 'Venus Viva',
    equipment: 'Venus Viva (Израиль)',
    tagline: 'Радиочастотный термолифтинг',
    description:
      'Инновационная RF-технология NanoFractional Radio Frequency обеспечивает равномерный нагрев дермы, стимулируя неоколлагенез. Процедура улучшает текстуру кожи, сужает поры, подтягивает и тонизирует.',
    indications: ['Дряблая кожа', 'Расширенные поры', 'Мелкие морщины', 'Неровный рельеф', 'Рубцы'],
    badge: 'RF-терапия',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    origin: 'Израиль',
    gradient: 'from-rose-50 to-pink-50',
    border: 'border-rose-100',
  },
  {
    id: 'deka',
    category: 'hardware',
    categoryName: 'Аппаратная косметология',
    name: 'DEKA Moveo — лазерная эпиляция',
    equipment: 'DEKA Moveo (Италия)',
    tagline: 'Безболезненное и стойкое удаление волос',
    description:
      'Диодный лазер с технологией Moveo обеспечивает безболезненное скользящее воздействие. Эффективен на всех фототипах кожи, в том числе загорелой. Долгосрочное, клинически доказанное удаление волос.',
    indications: ['Нежелательные волосы на любых зонах', 'Чувствительная кожа', 'Тёмная или загорелая кожа', 'Псевдофолликулит'],
    badge: 'Лазерная эпиляция',
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    origin: 'Италия',
    gradient: 'from-teal-50 to-emerald-50',
    border: 'border-teal-100',
  },
  {
    id: 'exosomes',
    category: 'hardware',
    categoryName: 'Аппаратная косметология',
    name: 'Экзосомы',
    equipment: 'Регенеративная биотехнология',
    tagline: 'Инновационная регенеративная терапия',
    description:
      'Экзосомы — внеклеточные везикулы, переносящие биологически активные молекулы между клетками. Терапия стимулирует восстановление и обновление кожи на клеточном уровне, улучшает тургор, тон и текстуру.',
    indications: ['Возрастные изменения', 'Усталая тусклая кожа', 'Восстановление после процедур', 'Выпадение волос'],
    badge: 'Биотехнологии',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    origin: 'Регенеративная',
    gradient: 'from-emerald-50 to-green-50',
    border: 'border-emerald-100',
  },
  // Injection
  {
    id: 'botox',
    category: 'injection',
    categoryName: 'Инъекционная косметология',
    name: 'Ботулинотерапия',
    equipment: 'Myotox, Dysport, Xeomin',
    tagline: 'Расслабление мимических мышц',
    description:
      'Введение ботулотоксина типа А в мимические мышцы предотвращает образование и углубление морщин. Препараты Myotox, Dysport и Xeomin сертифицированы и хорошо изучены. Эффект сохраняется 4–6 месяцев.',
    indications: ['Межбровные морщины', 'Морщины лба', 'Гусиные лапки', 'Шея и декольте', 'Гипергидроз'],
    badge: 'Популярно',
    badgeColor: 'bg-pink-50 text-pink-700 border-pink-200',
    origin: 'Myotox / Dysport',
    gradient: 'from-pink-50 to-rose-50',
    border: 'border-pink-100',
  },
  {
    id: 'fillers',
    category: 'injection',
    categoryName: 'Инъекционная косметология',
    name: 'Контурная пластика филлерами',
    equipment: 'Гиалуроновая кислота',
    tagline: 'Восстановление объёмов и чёткости контуров',
    description:
      'Введение гелей на основе гиалуроновой кислоты для восполнения утраченных объёмов, чёткости контуров, уменьшения носогубных складок и моделирования губ. Натуральный, деликатный результат.',
    indications: ['Носогубные складки', 'Губы', 'Скулы', 'Контур лица', 'Слёзная борозда'],
    badge: 'Объём и контуры',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    origin: 'Гиалуроновая к-та',
    gradient: 'from-purple-50 to-fuchsia-50',
    border: 'border-purple-100',
  },
  {
    id: 'profhilo',
    category: 'injection',
    categoryName: 'Инъекционная косметология',
    name: 'Биомоделирование Profhilo',
    equipment: 'Profhilo (IBSA)',
    tagline: 'Биоремоделирование кожи',
    description:
      'Profhilo — инновационный биореструктурирующий препарат с рекордно высокой концентрацией гиалуроновой кислоты. Диффундируя в тканях, он стимулирует 4 типа коллагена и эластин, обеспечивая выраженное омоложение.',
    indications: ['Возрастное снижение тонуса', 'Обезвоженная кожа', 'Дряблость кожи', 'Шея и руки'],
    badge: 'Биоревитализация',
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
    origin: 'Profhilo IBSA',
    gradient: 'from-sky-50 to-blue-50',
    border: 'border-sky-100',
  },
  {
    id: 'plasma',
    category: 'injection',
    categoryName: 'Инъекционная косметология',
    name: 'Плазмотерапия (PRP)',
    equipment: 'Собственная плазма пациента',
    tagline: 'Аутологичная регенерация',
    description:
      'Плазма, обогащённая тромбоцитами (PRP), получается из собственной крови пациента. Введение в кожу активирует факторы роста, ускоряет регенерацию и стимулирует выработку коллагена. Абсолютно безопасно.',
    indications: ['Выпадение волос (алопеция)', 'Омоложение кожи', 'Регенерация после процедур'],
    badge: '100% натурально',
    badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
    origin: 'Аутологично',
    gradient: 'from-orange-50 to-amber-50',
    border: 'border-orange-100',
  },
  {
    id: 'meso',
    category: 'injection',
    categoryName: 'Инъекционная косметология',
    name: 'Мезотерапия и биоревитализация',
    equipment: 'Коктейли и препараты',
    tagline: 'Глубокое увлажнение и питание',
    description:
      'Введение витаминных коктейлей, гиалуроновой кислоты, антиоксидантов и пептидов в средние слои дермы. Процедура восстанавливает гидробаланс, улучшает цвет лица и замедляет возрастные изменения.',
    indications: ['Сухость и обезвоженность', 'Тусклый цвет лица', 'Мелкие морщинки', 'Профилактика старения'],
    badge: 'Увлажнение',
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    origin: 'Коктейли',
    gradient: 'from-teal-50 to-cyan-50',
    border: 'border-teal-100',
  },
  // Threads
  {
    id: 'aptos',
    category: 'threads',
    categoryName: 'Нитевая имплантология',
    name: 'Нити APTOS',
    equipment: 'APTOS (Россия)',
    tagline: 'Нитевой лифтинг лица и тела',
    description:
      'Нити APTOS — золотой стандарт нитевого лифтинга. Специальные нити с насечками вводятся под кожу и механически подтягивают провисшие ткани. Со временем стимулируют образование коллагена вокруг себя, закрепляя результат.',
    indications: ['Птоз щёк', 'Второй подбородок', 'Брови и лоб', 'Шея', 'Тело (бёдра, живот)'],
    badge: 'Лифтинг',
    badgeColor: 'bg-violet-50 text-violet-700 border-violet-200',
    origin: 'APTOS',
    gradient: 'from-violet-50 to-purple-50',
    border: 'border-violet-100',
  },
  // Treatment
  {
    id: 'acne',
    category: 'treatment',
    categoryName: 'Лечебные программы',
    name: 'Лечение акне',
    equipment: 'Комплексный подход',
    tagline: 'Комплексная терапия угревой болезни',
    description:
      'Индивидуальная программа лечения акне с применением аппаратных, инъекционных и наружных методов. Цель — не только устранить текущие высыпания, но и воздействовать на механизмы их возникновения.',
    indications: ['Угревая болезнь I–IV степени', 'Постакне и рубцы', 'Воспалительные элементы', 'Комедоны'],
    badge: 'Медицинская',
    badgeColor: 'bg-green-50 text-green-700 border-green-200',
    origin: 'Комплексно',
    gradient: 'from-green-50 to-emerald-50',
    border: 'border-green-100',
  },
  {
    id: 'rosacea',
    category: 'treatment',
    categoryName: 'Лечебные программы',
    name: 'Лечение розацеа',
    equipment: 'Nordlys Candela + уход',
    tagline: 'Контроль и ремиссия розацеа',
    description:
      'Комплексная программа лечения розацеа с использованием IPL-терапии на аппарате Nordlys Candela, противовоспалительного ухода и триггерной диагностики. Цель — достижение стойкой ремиссии.',
    indications: ['Покраснение лица', 'Купероз', 'Пустулёзная розацеа', 'Телеангиэктазии'],
    badge: 'IPL + уход',
    badgeColor: 'bg-red-50 text-red-600 border-red-200',
    origin: 'Nordlys Candela',
    gradient: 'from-red-50 to-rose-50',
    border: 'border-red-100',
  },
  {
    id: 'pigment',
    category: 'treatment',
    categoryName: 'Лечебные программы',
    name: 'Коррекция гиперпигментации',
    equipment: 'Nordlys + SmartXide',
    tagline: 'Выравнивание тона и устранение пятен',
    description:
      'Программа коррекции пигментных нарушений с применением световых и лазерных технологий. Включает диагностику типа пигментации, подбор оптимального метода и поддерживающий домашний уход.',
    indications: ['Мелазма', 'Веснушки', 'Поствоспалительная пигментация', 'Лентиго'],
    badge: 'Пигментация',
    badgeColor: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    origin: 'Светолечение',
    gradient: 'from-yellow-50 to-amber-50',
    border: 'border-yellow-100',
  },
  {
    id: 'hair',
    category: 'treatment',
    categoryName: 'Лечебные программы',
    name: 'Лечение выпадения волос',
    equipment: 'PRP + мезотерапия',
    tagline: 'Восстановление роста и плотности волос',
    description:
      'Комплексный подход к лечению алопеции: трихологическая диагностика, PRP-терапия волосистой части головы, мезотерапевтические коктейли, экзосомы. Программа подбирается индивидуально.',
    indications: ['Диффузная алопеция', 'Андрогенетическая алопеция', 'Поредение волос', 'Постковидное выпадение'],
    badge: 'Трихология',
    badgeColor: 'bg-lime-50 text-lime-700 border-lime-200',
    origin: 'PRP + мезо',
    gradient: 'from-lime-50 to-green-50',
    border: 'border-lime-100',
  },
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered =
    activeCategory === 'all'
      ? SERVICES
      : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-accent text-sm font-medium tracking-wide uppercase mb-4">
            <div className="w-8 h-px bg-accent" />
            INSKIN.CLINIC
            <div className="w-8 h-px bg-accent" />
          </div>
          <h1 className="section-title mb-4">Все услуги клиники</h1>
          <p className="section-subtitle max-w-xl mx-auto">
            Аппаратная и инъекционная косметология, лечебные программы и нитевой лифтинг — полный спектр методов эстетической медицины
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="sticky top-[64px] md:top-[80px] z-30 bg-background/95 backdrop-blur-sm border-b border-border-soft py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-primary-dark text-white'
                    : 'bg-secondary text-text-muted hover:bg-accent/10 hover:text-accent'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((service) => (
              <div
                key={service.id}
                className={`bg-gradient-to-br ${service.gradient} border ${service.border} rounded-3xl overflow-hidden group hover:shadow-card-hover transition-all duration-300 flex flex-col`}
              >
                <div className="p-7 flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <span className={`tag border ${service.badgeColor} text-xs`}>
                      {service.badge}
                    </span>
                    <span className="text-xs text-text-muted bg-white/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/40">
                      {service.origin}
                    </span>
                  </div>

                  <p className="text-xs text-text-muted uppercase tracking-wider mb-1 font-medium">
                    {service.categoryName}
                  </p>
                  <h2 className="font-heading text-xl text-primary-dark mb-1 group-hover:text-accent transition-colors">
                    {service.name}
                  </h2>
                  <p className="text-sm text-accent font-medium mb-4">{service.tagline}</p>

                  <p className="text-text-muted text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  <div>
                    <p className="text-xs font-semibold text-primary-dark uppercase tracking-wide mb-2.5">
                      Показания:
                    </p>
                    <ul className="space-y-1.5">
                      {service.indications.map((ind) => (
                        <li key={ind} className="flex items-center gap-2 text-sm text-text-muted">
                          <div className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                          {ind}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="px-7 py-5 border-t border-white/40 bg-white/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-muted">{service.equipment}</span>
                    <Link
                      href="/booking"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:gap-2.5 transition-all"
                    >
                      Записаться
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-text-muted">Нет услуг в этой категории</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="section-title mb-4">Не знаете, что выбрать?</h2>
          <p className="section-subtitle mb-8">
            Запишитесь на консультацию — врач-дерматолог поможет подобрать оптимальную программу под ваши задачи
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="btn-primary">
              Записаться на консультацию
            </Link>
            <a href="tel:+78129055112" className="btn-outline">
              +7 (812) 905-51-12
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

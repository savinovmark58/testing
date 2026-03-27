import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';

export default function BookingPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12 bg-hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-accent text-sm font-medium tracking-wide uppercase mb-4">
            <div className="w-8 h-px bg-accent" />
            Онлайн-запись
            <div className="w-8 h-px bg-accent" />
          </div>
          <h1 className="section-title mb-4">Записаться на приём</h1>
          <p className="section-subtitle max-w-lg mx-auto">
            Заполните форму — мы свяжемся с вами для подтверждения времени. Или позвоните сразу:{' '}
            <a href="tel:+78129055112" className="text-accent hover:underline font-medium">
              +7 (812) 905-51-12
            </a>
          </p>
        </div>
      </section>

      {/* Form section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Sidebar info */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="lg:sticky lg:top-28 space-y-5">
                {/* Contact card */}
                <div className="card-base p-6">
                  <h3 className="font-heading text-lg text-primary-dark mb-4">Контакты</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-text-muted mb-0.5">Телефон</p>
                        <a href="tel:+78129055112" className="text-primary-dark font-medium hover:text-accent transition-colors">
                          +7 (812) 905-51-12
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-text-muted mb-0.5">Email</p>
                        <a href="mailto:mail@inskin.clinic" className="text-primary-dark font-medium hover:text-accent transition-colors">
                          mail@inskin.clinic
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-text-muted mb-0.5">Часы работы</p>
                        <p className="text-primary-dark font-medium">Ежедневно 9:00–21:00</p>
                        <p className="text-xs text-text-muted">по предварительной записи</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-text-muted mb-0.5">Адрес</p>
                        <p className="text-primary-dark font-medium">ул. Железноводская, 20</p>
                        <p className="text-xs text-text-muted">Васильевский остров, СПб</p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Doctor card */}
                <div className="card-base p-6">
                  <h3 className="font-heading text-lg text-primary-dark mb-4">Ваш врач</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-accent-gradient flex items-center justify-center flex-shrink-0">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-primary-dark">Надежда Саламашенко</p>
                      <p className="text-sm text-text-muted">Дерматолог-косметолог</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-sm text-emerald-600 font-medium">Принимает сегодня</span>
                  </div>
                </div>

                {/* Info */}
                <div className="bg-accent/5 border border-accent/20 rounded-2xl p-5">
                  <h4 className="font-medium text-primary-dark mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Как проходит запись
                  </h4>
                  <ol className="space-y-2 text-sm text-text-muted">
                    <li className="flex gap-2"><span className="text-accent font-medium">1.</span> Заполните форму онлайн</li>
                    <li className="flex gap-2"><span className="text-accent font-medium">2.</span> Мы позвоним для подтверждения</li>
                    <li className="flex gap-2"><span className="text-accent font-medium">3.</span> Приходите на консультацию</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="card-base p-6 md:p-10">
                <BookingForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

'use client';

import { useState } from 'react';

const SERVICE_CATEGORIES = [
  {
    id: 'hardware',
    name: 'Аппаратная косметология',
    icon: '⚡',
    services: [
      { id: 'nordlys', name: 'Nordlys Candela — удаление сосудов, фотоомоложение' },
      { id: 'hifu', name: 'HIFU UCOS — СМАС-лифтинг без операции' },
      { id: 'smartxide', name: 'SmartXide Punto — лазерное омоложение' },
      { id: 'venus', name: 'Venus Viva — радиочастотный термолифтинг' },
      { id: 'deka', name: 'DEKA Moveo — лазерная эпиляция' },
      { id: 'exosomes', name: 'Экзосомы — регенеративная терапия' },
    ],
  },
  {
    id: 'injection',
    name: 'Инъекционная косметология',
    icon: '💉',
    services: [
      { id: 'botox', name: 'Ботулинотерапия (Myotox, Dysport, Xeomin)' },
      { id: 'fillers', name: 'Контурная пластика филлерами' },
      { id: 'profhilo', name: 'Биомоделирование Profhilo' },
      { id: 'plasma', name: 'Плазмотерапия' },
      { id: 'meso', name: 'Мезотерапия и биоревитализация' },
    ],
  },
  {
    id: 'threads',
    name: 'Нитевая имплантология',
    icon: '✨',
    services: [
      { id: 'aptos-face', name: 'Нити APTOS для лица' },
      { id: 'aptos-body', name: 'Нити APTOS для тела' },
    ],
  },
  {
    id: 'treatment',
    name: 'Лечебные программы',
    icon: '🌿',
    services: [
      { id: 'acne', name: 'Лечение акне' },
      { id: 'rosacea', name: 'Лечение розацеа' },
      { id: 'pigment', name: 'Коррекция гиперпигментации' },
      { id: 'hair', name: 'Лечение выпадения волос' },
    ],
  },
];

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
];

type Step = 1 | 2 | 3 | 4 | 5;

interface FormData {
  service_category: string;
  service_category_name: string;
  service_name: string;
  name: string;
  phone: string;
  email: string;
  preferred_date: string;
  preferred_time: string;
  comments: string;
}

export default function BookingForm() {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    service_category: '',
    service_category_name: '',
    service_name: '',
    name: '',
    phone: '',
    email: '',
    preferred_date: '',
    preferred_time: '',
    comments: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const selectedCategory = SERVICE_CATEGORIES.find(
    (c) => c.id === formData.service_category
  );

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split('T')[0];

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const handleCategorySelect = (cat: typeof SERVICE_CATEGORIES[0]) => {
    setFormData((prev) => ({
      ...prev,
      service_category: cat.id,
      service_category_name: cat.name,
      service_name: '',
    }));
    setStep(2);
  };

  const handleServiceSelect = (serviceName: string) => {
    setFormData((prev) => ({ ...prev, service_name: serviceName }));
    setStep(3);
  };

  const handlePersonalNext = () => {
    if (!formData.name.trim() || !formData.phone.trim()) {
      setError('Пожалуйста, заполните имя и телефон');
      return;
    }
    setError('');
    setStep(4);
  };

  const handleDateNext = () => {
    if (!formData.preferred_date || !formData.preferred_time) {
      setError('Пожалуйста, выберите дату и время');
      return;
    }
    setError('');
    setStep(5);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || undefined,
          service_category: formData.service_category_name,
          service_name: formData.service_name,
          preferred_date: formData.preferred_date,
          preferred_time: formData.preferred_time,
          comments: formData.comments || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Ошибка при записи');
      }
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при отправке формы');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-16 px-8">
        <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-heading text-3xl text-primary-dark mb-4">Заявка принята!</h2>
        <p className="text-text-muted text-lg mb-2">
          Спасибо, <strong>{formData.name}</strong>!
        </p>
        <p className="text-text-muted mb-8">
          Мы свяжемся с вами по номеру <strong>{formData.phone}</strong> для подтверждения записи.
        </p>
        <div className="bg-secondary rounded-2xl p-6 text-left max-w-sm mx-auto mb-8">
          <h3 className="font-medium text-primary-dark mb-3">Ваша запись:</h3>
          <ul className="space-y-2 text-sm text-text-muted">
            <li><span className="text-primary-dark font-medium">Услуга:</span> {formData.service_name}</li>
            <li><span className="text-primary-dark font-medium">Дата:</span> {new Date(formData.preferred_date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</li>
            <li><span className="text-primary-dark font-medium">Время:</span> {formData.preferred_time}</li>
          </ul>
        </div>
        <button
          onClick={() => {
            setSuccess(false);
            setStep(1);
            setFormData({
              service_category: '', service_category_name: '', service_name: '',
              name: '', phone: '', email: '', preferred_date: '', preferred_time: '', comments: '',
            });
          }}
          className="btn-outline"
        >
          Записаться ещё раз
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress bar */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  s < step
                    ? 'bg-accent text-white'
                    : s === step
                    ? 'bg-primary-dark text-white'
                    : 'bg-secondary text-text-muted'
                }`}
              >
                {s < step ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  s
                )}
              </div>
              {s < 5 && (
                <div
                  className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${
                    s < step ? 'bg-accent' : 'bg-border-soft'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-text-muted px-1">
          <span>Категория</span>
          <span>Услуга</span>
          <span>Данные</span>
          <span>Дата</span>
          <span>Итог</span>
        </div>
      </div>

      {/* Step 1: Category */}
      {step === 1 && (
        <div className="animate-fade-in">
          <h2 className="font-heading text-2xl text-primary-dark mb-2">Выберите категорию</h2>
          <p className="text-text-muted mb-8">Какая процедура вас интересует?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat)}
                className="text-left p-6 bg-white border-2 border-border-soft rounded-2xl hover:border-accent hover:shadow-card transition-all duration-200 group"
              >
                <span className="text-3xl mb-3 block">{cat.icon}</span>
                <h3 className="font-heading text-lg text-primary-dark group-hover:text-accent transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-text-muted mt-1">
                  {cat.services.length} процедур{cat.services.length > 4 ? '' : 'ы'}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Service */}
      {step === 2 && selectedCategory && (
        <div className="animate-fade-in">
          <button onClick={() => setStep(1)} className="flex items-center gap-2 text-text-muted hover:text-accent mb-6 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Назад
          </button>
          <h2 className="font-heading text-2xl text-primary-dark mb-2">Выберите процедуру</h2>
          <p className="text-text-muted mb-8">{selectedCategory.name}</p>
          <div className="space-y-3">
            {selectedCategory.services.map((service) => (
              <button
                key={service.id}
                onClick={() => handleServiceSelect(service.name)}
                className="w-full text-left px-6 py-4 bg-white border-2 border-border-soft rounded-xl hover:border-accent hover:shadow-soft transition-all duration-200 flex items-center justify-between group"
              >
                <span className="font-medium text-primary-dark group-hover:text-accent transition-colors">
                  {service.name}
                </span>
                <svg className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Personal Info */}
      {step === 3 && (
        <div className="animate-fade-in">
          <button onClick={() => setStep(2)} className="flex items-center gap-2 text-text-muted hover:text-accent mb-6 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Назад
          </button>
          <h2 className="font-heading text-2xl text-primary-dark mb-2">Ваши данные</h2>
          <p className="text-text-muted mb-8">Как с вами связаться?</p>
          <div className="space-y-5">
            <div>
              <label className="label-field">Имя <span className="text-red-400">*</span></label>
              <input
                type="text"
                className="input-field"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
              />
            </div>
            <div>
              <label className="label-field">Телефон <span className="text-red-400">*</span></label>
              <input
                type="tel"
                className="input-field"
                placeholder="+7 (___) ___-__-__"
                value={formData.phone}
                onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
              />
            </div>
            <div>
              <label className="label-field">Email</label>
              <input
                type="email"
                className="input-field"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button onClick={handlePersonalNext} className="btn-primary w-full">
              Продолжить
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Date & Time */}
      {step === 4 && (
        <div className="animate-fade-in">
          <button onClick={() => setStep(3)} className="flex items-center gap-2 text-text-muted hover:text-accent mb-6 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Назад
          </button>
          <h2 className="font-heading text-2xl text-primary-dark mb-2">Дата и время</h2>
          <p className="text-text-muted mb-8">Выберите удобное время для записи</p>
          <div className="space-y-6">
            <div>
              <label className="label-field">Дата <span className="text-red-400">*</span></label>
              <input
                type="date"
                className="input-field"
                min={minDateStr}
                max={maxDateStr}
                value={formData.preferred_date}
                onChange={(e) => setFormData((p) => ({ ...p, preferred_date: e.target.value }))}
              />
            </div>
            <div>
              <label className="label-field">Время <span className="text-red-400">*</span></label>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setFormData((p) => ({ ...p, preferred_time: slot }))}
                    className={`py-2.5 px-2 rounded-xl text-sm font-medium border-2 transition-all duration-150 ${
                      formData.preferred_time === slot
                        ? 'bg-accent border-accent text-white'
                        : 'bg-white border-border-soft text-primary-dark hover:border-accent'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="label-field">Комментарий</label>
              <textarea
                className="input-field resize-none"
                rows={3}
                placeholder="Пожелания или вопросы..."
                value={formData.comments}
                onChange={(e) => setFormData((p) => ({ ...p, comments: e.target.value }))}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button onClick={handleDateNext} className="btn-primary w-full">
              Продолжить
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Confirmation */}
      {step === 5 && (
        <div className="animate-fade-in">
          <button onClick={() => setStep(4)} className="flex items-center gap-2 text-text-muted hover:text-accent mb-6 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Назад
          </button>
          <h2 className="font-heading text-2xl text-primary-dark mb-2">Подтверждение записи</h2>
          <p className="text-text-muted mb-8">Проверьте данные перед отправкой</p>

          <div className="bg-white border border-border-soft rounded-2xl overflow-hidden mb-6">
            <div className="bg-secondary px-6 py-4">
              <h3 className="font-heading text-lg text-primary-dark">Детали записи</h3>
            </div>
            <div className="px-6 py-5 divide-y divide-border-soft">
              <div className="py-3 flex justify-between">
                <span className="text-text-muted text-sm">Категория</span>
                <span className="text-primary-dark text-sm font-medium text-right max-w-xs">{formData.service_category_name}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-text-muted text-sm">Процедура</span>
                <span className="text-primary-dark text-sm font-medium text-right max-w-xs">{formData.service_name}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-text-muted text-sm">Имя</span>
                <span className="text-primary-dark text-sm font-medium">{formData.name}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-text-muted text-sm">Телефон</span>
                <span className="text-primary-dark text-sm font-medium">{formData.phone}</span>
              </div>
              {formData.email && (
                <div className="py-3 flex justify-between">
                  <span className="text-text-muted text-sm">Email</span>
                  <span className="text-primary-dark text-sm font-medium">{formData.email}</span>
                </div>
              )}
              <div className="py-3 flex justify-between">
                <span className="text-text-muted text-sm">Дата</span>
                <span className="text-primary-dark text-sm font-medium">
                  {new Date(formData.preferred_date).toLocaleDateString('ru-RU', {
                    day: 'numeric', month: 'long', year: 'numeric',
                  })}
                </span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-text-muted text-sm">Время</span>
                <span className="text-primary-dark text-sm font-medium">{formData.preferred_time}</span>
              </div>
              {formData.comments && (
                <div className="py-3 flex justify-between gap-4">
                  <span className="text-text-muted text-sm flex-shrink-0">Комментарий</span>
                  <span className="text-primary-dark text-sm text-right">{formData.comments}</span>
                </div>
              )}
            </div>
          </div>

          <p className="text-text-muted text-sm mb-6">
            Нажимая «Отправить заявку», вы соглашаетесь на обработку персональных данных и подтверждаете
            свои намерения для записи на консультацию.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2 justify-center">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Отправка...
              </span>
            ) : (
              'Отправить заявку'
            )}
          </button>
        </div>
      )}
    </div>
  );
}

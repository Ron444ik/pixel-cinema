import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { FaPhone, FaTelegramPlane, FaClock, FaMapMarkerAlt } from 'react-icons/fa'
import './Booking.css'

const Booking = () => {
  // Состояние для отображения успешной отправки
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Состояние для анимации загрузки
  const [isLoading, setIsLoading] = useState(false)

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      hall: '',
      date: '',
      time: '',
      hours: '',
      comment: '',
    },
  })

  // Получаем текущую дату для ограничения date picker
  const today = new Date().toISOString().split('T')[0]

  // Обработка отправки формы
  const onSubmit = async (data) => {
    setIsLoading(true)

    // Имитация отправки на сервер
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log('Данные формы:', data)

    setIsLoading(false)
    setIsSubmitted(true)
    reset()

    // Скрываем сообщение об успехе через 5 секунд
    setTimeout(() => {
      setIsSubmitted(false)
    }, 5000)
  }

  return (
    <section className="booking" id="booking" data-aos="fade-up">
      <div className="container">
        {/* Заголовок секции */}
        <h2 className="section-title">ЗАБРОНИРОВАТЬ ЗАЛ</h2>

        {/* Сообщение об успешной отправке */}
        {isSubmitted && (
          <motion.div
            className="booking__success"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            ✅ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.
          </motion.div>
        )}

        {/* Верхний блок — форма слева, контакты справа */}
        <div className="booking__top">
          {/* Левая часть — форма бронирования */}
          <motion.form
            className="booking__form"
            onSubmit={handleSubmit(onSubmit)}
            data-aos="fade-right"
          >
            {/* 1 ряд: Имя + Телефон + Зал */}
            <div className="form-row form-row--3">
              {/* Имя */}
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Имя <span className="form-required">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                  placeholder="Ваше имя"
                  {...register('name', {
                    required: 'Имя обязательно',
                    minLength: {
                      value: 2,
                      message: 'Минимум 2 символа',
                    },
                  })}
                />
                {errors.name && (
                  <p className="form-error">{errors.name.message}</p>
                )}
              </div>

              {/* Телефон */}
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Телефон <span className="form-required">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
                  placeholder="+7 (XXX) XXX-XX-XX"
                  {...register('phone', {
                    required: 'Телефон обязателен',
                    pattern: {
                      value: /^\+7\d{10}$/,
                      message: 'Формат: +7XXXXXXXXXX',
                    },
                  })}
                />
                {errors.phone && (
                  <p className="form-error">{errors.phone.message}</p>
                )}
              </div>

              {/* Выбор зала */}
              <div className="form-group">
                <label htmlFor="hall" className="form-label">
                  Зал <span className="form-required">*</span>
                </label>
                <select
                  id="hall"
                  className={`form-select ${errors.hall ? 'form-select--error' : ''}`}
                  {...register('hall', {
                    required: 'Выберите зал',
                  })}
                >
                  <option value="">-- Выберите --</option>
                  <option value="standard">Для двоих</option>
                  <option value="comfort">Средний</option>
                  <option value="vip">Большой</option>
                </select>
                {errors.hall && (
                  <p className="form-error">{errors.hall.message}</p>
                )}
              </div>
            </div>

            {/* 2 ряд: Дата + Время + Часы */}
            <div className="form-row form-row--3">
              {/* Дата */}
              <div className="form-group">
                <label htmlFor="date" className="form-label">
                  Дата <span className="form-required">*</span>
                </label>
                <input
                  id="date"
                  type="date"
                  className={`form-input ${errors.date ? 'form-input--error' : ''}`}
                  min={today}
                  {...register('date', {
                    required: 'Выберите дату',
                  })}
                />
                {errors.date && (
                  <p className="form-error">{errors.date.message}</p>
                )}
              </div>

              {/* Время начала */}
              <div className="form-group">
                <label htmlFor="time" className="form-label">
                  Время <span className="form-required">*</span>
                </label>
                <select
                  id="time"
                  className={`form-select ${errors.time ? 'form-select--error' : ''}`}
                  {...register('time', {
                    required: 'Выберите время',
                  })}
                >
                  <option value="">-- Время --</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                  <option value="20:00">20:00</option>
                  <option value="21:00">21:00</option>
                  <option value="22:00">22:00</option>
                  <option value="23:00">23:00</option>
                  <option value="00:00">00:00</option>
                </select>
                {errors.time && (
                  <p className="form-error">{errors.time.message}</p>
                )}
              </div>

              {/* Количество часов */}
              <div className="form-group">
                <label htmlFor="hours" className="form-label">
                  Часы <span className="form-required">*</span>
                </label>
                <select
                  id="hours"
                  className={`form-select ${errors.hours ? 'form-select--error' : ''}`}
                  {...register('hours', {
                    required: 'Выберите кол-во часов',
                  })}
                >
                  <option value="">-- Часы --</option>
                  <option value="1">1 час</option>
                  <option value="2">2 часа</option>
                  <option value="3">3 часа</option>
                  <option value="4">4 часа</option>
                  <option value="5">5 часов</option>
                </select>
                {errors.hours && (
                  <p className="form-error">{errors.hours.message}</p>
                )}
              </div>
            </div>

            {/* Комментарий на всю ширину */}
            <div className="form-group">
              <label htmlFor="comment" className="form-label">
                Комментарий
              </label>
              <textarea
                id="comment"
                className="form-textarea"
                placeholder="Дополнительные пожелания..."
                rows="2"
                {...register('comment')}
              />
            </div>

            {/* Кнопка отправки */}
            <button
              type="submit"
              className="booking__submit-btn glow-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="booking__loading">
                  <span className="booking__spinner"></span>
                  Отправка...
                </span>
              ) : (
                'Отправить заявку'
              )}
            </button>
          </motion.form>

          {/* Правая часть — контактная информация */}
          <div className="booking__contacts" data-aos="fade-left">
            <h3 className="booking__contacts-title">Контактная информация</h3>

            <div className="booking__contacts-list">
              {/* Адрес */}
              <div className="booking__contact-item">
                <FaMapMarkerAlt className="booking__contact-icon" />
                <div>
                  <p className="booking__contact-label">Адрес:</p>
                  <p className="booking__contact-value">
                    г. Ярославль, центр города
                  </p>
                </div>
              </div>

              {/* Телефон */}
              <div className="booking__contact-item">
                <FaPhone className="booking__contact-icon" />
                <div>
                  <p className="booking__contact-label">Телефон:</p>
                  <a
                    href="tel:+79807022342"
                    className="booking__contact-value booking__contact-value--link"
                  >
                    +7 (980) 702-23-42
                  </a>
                </div>
              </div>

              {/* Telegram */}
              <div className="booking__contact-item">
                <FaTelegramPlane className="booking__contact-icon" />
                <div>
                  <p className="booking__contact-label">Telegram:</p>
                  <a
                    href="https://t.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="booking__contact-value booking__contact-value--link"
                  >
                    @pixel_cinema
                  </a>
                </div>
              </div>

              {/* Часы работы */}
              <div className="booking__contact-item">
                <FaClock className="booking__contact-icon" />
                <div>
                  <p className="booking__contact-label">Часы работы:</p>
                  <p className="booking__contact-value">
                    09:00-06:00 без выходных
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Нижний блок — карта на всю ширину */}
        <div className="booking__bottom" data-aos="fade-up" data-aos-delay="200">
          <h3 className="booking__map-title">📍 Как нас найти</h3>
          <div className="booking__map">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=39.8735%2C57.6299&z=16&pt=39.8735%2C57.6299%2Cpm2gnm&lang=ru_RU"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen={true}
              title="PIXEL — Антикинотеатр на карте"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Booking

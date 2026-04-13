import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { hallsData } from '../../data/halls'
import './Halls.css'

// Импортируем стили Swiper
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const Halls = () => {
  const swiperRef = useRef(null)

  // Функция скролла к форме бронирования
  const handleBookingClick = () => {
    const bookingSection = document.getElementById('booking')
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="halls" id="halls" data-aos="fade-up">
      <div className="container">
        {/* Заголовок секции */}
        <h2 className="section-title">НАШИ ЗАЛЫ</h2>

        {/* Десктоп — сетка карточек */}
        <div className="halls__grid halls__grid--desktop">
          {hallsData.map((hall, index) => (
            <motion.div
              key={hall.id}
              className="hall-card pixel-border"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              {/* Фото зала */}
              <div className="hall-card__image-wrapper">
                <img
                  src={hall.image}
                  alt={hall.name}
                  className="hall-card__image"
                  loading="lazy"
                />
                {/* Бейдж с названием */}
                <div className="hall-card__badge">{hall.name}</div>
              </div>

              {/* Информация о зале */}
              <div className="hall-card__info">
                {/* Вместимость */}
                <div className="hall-card__row">
                  <span className="hall-card__label">👥 Вместимость:</span>
                  <span className="hall-card__value">{hall.capacity}</span>
                </div>

                {/* Экран */}
                <div className="hall-card__row">
                  <span className="hall-card__label">📺 Экран:</span>
                  <span className="hall-card__value">{hall.screen}</span>
                </div>

                {/* Звук */}
                <div className="hall-card__row">
                  <span className="hall-card__label">🔊 Звук:</span>
                  <span className="hall-card__value">{hall.sound}</span>
                </div>

                {/* Возможности (теги) */}
                <div className="hall-card__features">
                  {hall.features.map((feature, i) => (
                    <span key={i} className="hall-card__feature">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Цена */}
                <div className="hall-card__price-row">
                  <span className="hall-card__price">{hall.price}</span>
                </div>

                {/* Кнопка бронирования */}
                <button
                  className="hall-card__btn glow-btn"
                  onClick={handleBookingClick}
                >
                  Забронировать
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Мобильная версия — Swiper слайдер */}
        <Swiper
          ref={swiperRef}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="halls__swiper halls__swiper--mobile"
        >
          {hallsData.map((hall) => (
            <SwiperSlide key={hall.id} className="halls__slide--mobile">
              <motion.div
                className="hall-card pixel-border"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Фото зала */}
                <div className="hall-card__image-wrapper">
                  <img
                    src={hall.image}
                    alt={hall.name}
                    className="hall-card__image"
                    loading="lazy"
                  />
                  <div className="hall-card__badge">{hall.name}</div>
                </div>

                {/* Информация о зале */}
                <div className="hall-card__info">
                  <div className="hall-card__row">
                    <span className="hall-card__label">👥 Вместимость:</span>
                    <span className="hall-card__value">{hall.capacity}</span>
                  </div>

                  <div className="hall-card__row">
                    <span className="hall-card__label">📺 Экран:</span>
                    <span className="hall-card__value">{hall.screen}</span>
                  </div>

                  <div className="hall-card__row">
                    <span className="hall-card__label">🔊 Звук:</span>
                    <span className="hall-card__value">{hall.sound}</span>
                  </div>

                  <div className="hall-card__features">
                    {hall.features.map((feature, i) => (
                      <span key={i} className="hall-card__feature">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="hall-card__price-row">
                    <span className="hall-card__price">{hall.price}</span>
                  </div>

                  <button
                    className="hall-card__btn glow-btn"
                    onClick={handleBookingClick}
                  >
                    Забронировать
                  </button>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Halls

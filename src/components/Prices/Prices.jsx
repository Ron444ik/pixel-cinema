import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { packagesData } from '../../data/prices'
import './Prices.css'

// Компонент анимированного счётчика
const AnimatedCounter = ({ target, duration = 1500 }) => {
  const [count, setCount] = useState(0)
  const counterRef = useRef(null)

  useEffect(() => {
    setCount(0)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let start = 0
            const increment = target / (duration / 16)
            const timer = setInterval(() => {
              start += increment
              if (start >= target) {
                setCount(target)
                clearInterval(timer)
              } else {
                setCount(Math.floor(start))
              }
            }, 16)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current)
      }
    }
  }, [target, duration])

  return (
    <span ref={counterRef} className="package-card__counter">
      {count.toLocaleString('ru-RU')}
    </span>
  )
}

const Prices = () => {
  // Функция скролла к форме бронирования
  const handleBookingClick = () => {
    const bookingSection = document.getElementById('booking')
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="prices" id="prices" data-aos="fade-up">
      <div className="container">
        {/* Заголовок секции */}
        <h2 className="section-title">ПАКЕТЫ УСЛУГ</h2>

        {/* Подзаголовок */}
        <p className="prices__subtitle">
          Готовые комплексы — выбери и забронируй!
        </p>

        {/* Карточки пакетов */}
        <div className="packages__grid">
          {packagesData.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              className={`package-card ${pkg.popular ? 'package-card--popular' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {/* Бейдж Популярное */}
              {pkg.popular && (
                <div className="package-card__popular-badge">🔥 Хит</div>
              )}

              {/* Иконка */}
              <div className="package-card__icon">{pkg.icon}</div>

              {/* Название пакета */}
              <h3 className="package-card__name">{pkg.name}</h3>

              {/* Длительность */}
              <div className="package-card__duration">
                <span className="package-card__duration-icon">⏱</span>
                {pkg.duration}
              </div>

              {/* Зал */}
              <p className="package-card__hall">{pkg.hall}</p>

              {/* Разделитель */}
              <div className="package-card__divider"></div>

              {/* Что включено */}
              <ul className="package-card__includes">
                {pkg.includes.map((item, i) => (
                  <li key={i} className="package-card__include-item">
                    <span className="package-card__check">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Разделитель */}
              <div className="package-card__divider"></div>

              {/* Цена */}
              <div className="package-card__price-section">
                <span className="package-card__old-price">{pkg.oldPrice} ₽</span>
                <div className="package-card__price-wrapper">
                  <AnimatedCounter target={pkg.price} />
                  <span className="package-card__currency">₽</span>
                </div>
              </div>

              {/* Кнопка */}
              <button
                className="package-card__btn glow-btn"
                onClick={handleBookingClick}
              >
                Забронировать
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Prices

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaTelegramPlane, FaVk, FaPhone, FaEnvelope, FaMapMarkerAlt, FaArrowUp } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  // Состояние для кнопки "Наверх"
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Отслеживаем скролл для показа кнопки "Наверх"
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Функция плавного скролла наверх
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          {/* Левая часть — логотип и слоган */}
          <div className="footer__brand">
            <h3 className="footer__logo">PIXEL</h3>
            <p className="footer__slogan">
              Твой личный кинозал в центре Ярославля
            </p>
          </div>

          {/* Три колонки */}
          <div className="footer__columns">
            {/* Навигация */}
            <div className="footer__column">
              <h4 className="footer__column-title">Навигация</h4>
              <ul className="footer__links">
                <li>
                  <a
                    href="#about"
                    className="footer__link"
                    onClick={(e) => {
                      e.preventDefault()
                      document
                        .getElementById('about')
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    О нас
                  </a>
                </li>
                <li>
                  <a
                    href="#halls"
                    className="footer__link"
                    onClick={(e) => {
                      e.preventDefault()
                      document
                        .getElementById('halls')
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    Залы
                  </a>
                </li>
                <li>
                  <a
                    href="#prices"
                    className="footer__link"
                    onClick={(e) => {
                      e.preventDefault()
                      document
                        .getElementById('prices')
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    Цены
                  </a>
                </li>
                <li>
                  <a
                    href="#reviews"
                    className="footer__link"
                    onClick={(e) => {
                      e.preventDefault()
                      document
                        .getElementById('reviews')
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    Отзывы
                  </a>
                </li>
                <li>
                  <a
                    href="#booking"
                    className="footer__link"
                    onClick={(e) => {
                      e.preventDefault()
                      document
                        .getElementById('booking')
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    Контакты
                  </a>
                </li>
              </ul>
            </div>

            {/* Контакты */}
            <div className="footer__column">
              <h4 className="footer__column-title">Контакты</h4>
              <ul className="footer__contacts">
                <li className="footer__contact-item">
                  <FaMapMarkerAlt className="footer__contact-icon" />
                  <span>г. Ярославль, центр города</span>
                </li>
                <li className="footer__contact-item">
                  <FaPhone className="footer__contact-icon" />
                  <a href="tel:+79807022342" className="footer__contact-link">
                    +7 (980) 702-<span className="footer__phone-hidden">XX-XX</span>
                  </a>
                </li>
                <li className="footer__contact-item">
                  <FaEnvelope className="footer__contact-icon" />
                  <a
                    href="mailto:info@pixel-cinema.ru"
                    className="footer__contact-link"
                  >
                    info@pixel-cinema.ru
                  </a>
                </li>
              </ul>
            </div>

            {/* Соцсети */}
            <div className="footer__column">
              <h4 className="footer__column-title">Соцсети</h4>
              <div className="footer__socials">
                <a
                  href="https://vk.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-link"
                  aria-label="VK"
                >
                  <FaVk />
                  <span>VK</span>
                </a>
                <a
                  href="https://t.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-link"
                  aria-label="Telegram"
                >
                  <FaTelegramPlane />
                  <span>Telegram</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Разделитель */}
        <div className="footer__divider"></div>

        {/* Копирайт и кнопка наверх */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2024 PIXEL. Все права защищены.
          </p>
          <motion.button
            className="footer__scroll-top"
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Наверх"
          >
            <FaArrowUp />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}

export default Footer

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Hero.css'

// Компонент анимированного счётчика
const AnimatedCounter = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0)
  const counterRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true

    setCount(0)
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
    return () => clearInterval(timer)
  }, [target, duration])

  return <span ref={counterRef}>{count}</span>
}

const Hero = () => {
  // Реф для всей секции
  const heroRef = useRef(null)

  // Рефы для staggered-анимации появления
  const subtitleRef = useRef(null)
  const titleRef = useRef(null)
  const sloganRef = useRef(null)
  const buttonRef = useRef(null)
  const metricsRef = useRef(null)
  const tagsRef = useRef(null)

  // GSAP staggered-анимация при загрузке
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    const elements = [
      subtitleRef,  // 0 — "Первый антикинотеатр"
      titleRef,     // 1 — PIXEL
      sloganRef,    // 2 — слоган "Кино, игры, караоке..."
      buttonRef,    // 3 — кнопка бронирования
      metricsRef,   // 4 — метрики
      tagsRef,      // 5 — иконки услуг
    ]

    elements.forEach((ref, index) => {
      if (ref.current) {
        tl.fromTo(
          ref.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, delay: index * 0.15 },
          0
        )
      }
    })

    // Отдельная анимация scale для заголовка PIXEL
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.9 },
        0.15
      )
    }

    return () => {
      tl.kill()
    }
  }, [])

  // Функция скролла к форме бронирования
  const handleBookingClick = () => {
    const bookingSection = document.getElementById('booking')
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero" ref={heroRef}>
      {/* Анимированные пиксели на фоне через CSS */}
      <div className="hero__pixels-bg">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="hero__pixel"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
              opacity: 0.2 + Math.random() * 0.4,
              width: `${3 + Math.random() * 4}px`,
              height: `${3 + Math.random() * 4}px`,
            }}
          />
        ))}
      </div>

      {/* Тёмный overlay поверх фона */}
      <div className="hero__overlay"></div>

      {/* Контент Hero */}
      <div className="hero__content container">
        {/* 1. Мелкий текст сверху */}
        <p className="hero__subtitle" ref={subtitleRef}>
          ПЕРВЫЙ АНТИКИНОТЕАТР В ЯРОСЛАВЛЕ
        </p>

        {/* 2. Большое название PIXEL */}
        <h1 className="hero__title glitch-text" ref={titleRef}>
          PIXEL
        </h1>

        {/* 3. Слоган */}
        <p className="hero__slogan" ref={sloganRef}>
          <span className="hero__slogan-white">Кино, игры, караоке — </span>
          <span className="hero__slogan-highlight">плати только за время</span>
        </p>

        {/* 4. Кнопка "Забронировать зал" */}
        <button
          className="hero__cta-btn"
          ref={buttonRef}
          onClick={handleBookingClick}
        >
          ЗАБРОНИРОВАТЬ ЗАЛ
        </button>

        {/* 7. Три метрики в ряд */}
        <div className="hero__metrics" ref={metricsRef}>
          {/* Метрика 1: Цена */}
          <div className="hero__metric">
            <div className="hero__metric-value">от&#160;290₽/час</div>
            <div className="hero__metric-label">за человека</div>
          </div>

          {/* Разделитель */}
          <div className="hero__metric-divider"></div>

          {/* Метрика 2: Гости */}
          <div className="hero__metric">
            <div className="hero__metric-value">
              <AnimatedCounter target={1247} />+
            </div>
            <div className="hero__metric-label">довольных гостей</div>
          </div>

          {/* Разделитель */}
          <div className="hero__metric-divider"></div>

          {/* Метрика 3: Рейтинг */}
          <div className="hero__metric">
            <div className="hero__metric-value">4.9★</div>
            <div className="hero__metric-label">рейтинг Яндекс</div>
          </div>
        </div>

        {/* 8. Иконки услуг — компактные */}
        <div className="hero__tags" ref={tagsRef}>
          {/* Кино */}
          <div className="hero__tag-card">
            <span className="hero__tag-emoji">🎬</span>
            <span className="hero__tag-text">Кино</span>
          </div>

          {/* Игры */}
          <div className="hero__tag-card">
            <span className="hero__tag-emoji">🎮</span>
            <span className="hero__tag-text">Игры</span>
          </div>

          {/* Караоке */}
          <div className="hero__tag-card">
            <span className="hero__tag-emoji">🎤</span>
            <span className="hero__tag-text">Караоке</span>
          </div>

          {/* Настолки */}
          <div className="hero__tag-card">
            <span className="hero__tag-emoji">🎲</span>
            <span className="hero__tag-text">Настолки</span>
          </div>

          {/* Своя еда */}
          <div className="hero__tag-card">
            <span className="hero__tag-emoji">🍕</span>
            <span className="hero__tag-text">Своя еда</span>
          </div>

          {/* Праздники */}
          <div className="hero__tag-card">
            <span className="hero__tag-emoji">🎉</span>
            <span className="hero__tag-text">Праздники</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

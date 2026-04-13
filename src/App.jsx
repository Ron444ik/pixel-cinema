import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Импорт компонентов (будут созданы в следующих пунктах)
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Halls from './components/Halls/Halls'
import Prices from './components/Prices/Prices'
import Reviews from './components/Reviews/Reviews'
import Gallery from './components/Gallery/Gallery'
import Booking from './components/Booking/Booking'
import Footer from './components/Footer/Footer'

import './App.css'

function App() {
  // Инициализация AOS (Animate On Scroll)
  useEffect(() => {
    AOS.init({
      duration: 800, // длительность анимации
      once: true, // анимация проигрывается только один раз
      offset: 100, // отступ от нижней части экрана
    })
  }, [])

  return (
    <div className="app">
      {/* Летающие пиксели на фоне всего сайта */}
      <div className="app__pixels-bg">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="app__pixel"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${5 + Math.random() * 8}s`,
              opacity: 0.15 + Math.random() * 0.25,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
            }}
          />
        ))}
      </div>

      {/* Навигация */}
      <Navbar />
      
      {/* Главный экран */}
      <Hero />
      
      {/* Секция о нас */}
      <About />
      
      {/* Секция залы */}
      <Halls />
      
      {/* Секция цены */}
      <Prices />
      
      {/* Секция отзывы */}
      <Reviews />
      
      {/* Бегущая строка фото */}
      <Gallery />
      
      {/* Секция бронирование */}
      <Booking />
      
      {/* Подвал */}
      <Footer />
    </div>
  )
}

export default App

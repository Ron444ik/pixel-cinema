import { useState, useEffect } from 'react'
import { FaTelegramPlane, FaVk } from 'react-icons/fa'
import { FiMenu, FiX } from 'react-icons/fi'
import MusicPlayer from '../MusicPlayer/MusicPlayer'
import './Navbar.css'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) section.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__container">
          <div className="navbar__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            PIXEL
          </div>

          <ul className="navbar__menu">
            <li className="navbar__menu-item" onClick={() => scrollToSection('about')}>О нас</li>
            <li className="navbar__menu-item" onClick={() => scrollToSection('halls')}>Залы</li>
            <li className="navbar__menu-item" onClick={() => scrollToSection('prices')}>Цены</li>
            <li className="navbar__menu-item" onClick={() => scrollToSection('reviews')}>Отзывы</li>
            <li className="navbar__menu-item" onClick={() => scrollToSection('booking')}>Контакты</li>
          </ul>

          <div className="navbar__contacts">
            <a href="tel:+79807022342" className="navbar__phone">+7 (980) 702-<span className="navbar__phone-hidden">XX-XX</span></a>
            <div className="navbar__socials">
              <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="navbar__social-link"><FaTelegramPlane /></a>
              <a href="https://vk.com/" target="_blank" rel="noopener noreferrer" className="navbar__social-link"><FaVk /></a>
            </div>
            <div className="navbar__music"><MusicPlayer /></div>
          </div>

          <button className="navbar__burger" onClick={() => { setIsMenuOpen(prev => !prev) }} aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'} type="button">
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Мобильное меню — ВЫНЕСЕНО ЗА ПРЕДЕЛЫ nav */}
      <div className={`navbar__mobile-menu${isMenuOpen ? ' active' : ''}`}>
        <ul className="navbar__mobile-menu-list">
          <li className="navbar__mobile-menu-item" onClick={() => scrollToSection('about')}>О нас</li>
          <li className="navbar__mobile-menu-item" onClick={() => scrollToSection('halls')}>Залы</li>
          <li className="navbar__mobile-menu-item" onClick={() => scrollToSection('prices')}>Цены</li>
          <li className="navbar__mobile-menu-item" onClick={() => scrollToSection('reviews')}>Отзывы</li>
          <li className="navbar__mobile-menu-item" onClick={() => scrollToSection('booking')}>Контакты</li>
        </ul>
        <div className="navbar__mobile-contacts">
          <a href="tel:+79807022342" className="navbar__phone">+7 (980) 702-<span className="navbar__phone-hidden">XX-XX</span></a>
          <div className="navbar__socials">
            <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="navbar__social-link"><FaTelegramPlane /></a>
            <a href="https://vk.com/" target="_blank" rel="noopener noreferrer" className="navbar__social-link"><FaVk /></a>
          </div>
          <div className="navbar__music"><MusicPlayer /></div>
        </div>
      </div>
    </>
  )
}

export default Navbar

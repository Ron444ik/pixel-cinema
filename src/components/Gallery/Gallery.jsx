import { motion } from 'framer-motion'
import './Gallery.css'

const Gallery = () => {
  // Массив фото для бегущей строки (дублируем для бесшовной прокрутки)
  const photos = [
    { id: 1, src: '/images/5.jpg', alt: 'Фото 5' },
    { id: 2, src: '/images/6.jpg', alt: 'Фото 6' },
    { id: 3, src: '/images/7.jpg', alt: 'Фото 7' },
    { id: 4, src: '/images/8.jpg', alt: 'Фото 8' },
    { id: 5, src: '/images/9.jpg', alt: 'Фото 9' },
    { id: 6, src: '/images/10.jpg', alt: 'Фото 10' },
    { id: 7, src: '/images/11.jpg', alt: 'Фото 11' },
    { id: 8, src: '/images/5.jpg', alt: 'Фото 5' },
    { id: 9, src: '/images/6.jpg', alt: 'Фото 6' },
    { id: 10, src: '/images/7.jpg', alt: 'Фото 7' },
    { id: 11, src: '/images/8.jpg', alt: 'Фото 8' },
    { id: 12, src: '/images/9.jpg', alt: 'Фото 9' },
    { id: 13, src: '/images/10.jpg', alt: 'Фото 10' },
    { id: 14, src: '/images/11.jpg', alt: 'Фото 11' },
  ]

  return (
    <section className="gallery">
      <div className="gallery__title-wrapper">
        <h2 className="section-title">АТМОСФЕРА PIXEL</h2>
      </div>

      <div className="gallery__marquee">
        {/* Первая строка — движение влево */}
        <div className="gallery__track gallery__track--reverse">
          {photos.map((photo) => (
            <div key={photo.id} className="gallery__item">
              <img src={photo.src} alt={photo.alt} loading="lazy" />
            </div>
          ))}
        </div>

        {/* Дубликат для бесшовности */}
        <div className="gallery__track gallery__track--reverse">
          {photos.map((photo) => (
            <div key={`dup-${photo.id}`} className="gallery__item">
              <img src={photo.src} alt={photo.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery

import { motion } from 'framer-motion'
import { FaStar } from 'react-icons/fa'
import { reviewsData } from '../../data/reviews'
import './Reviews.css'

// Компонент звёзд рейтинга
const StarRating = ({ rating }) => {
  return (
    <div className="review-card__stars">
      {Array.from({ length: 5 }, (_, index) => (
        <FaStar
          key={index}
          className={`review-card__star ${
            index < rating ? 'review-card__star--active' : ''
          }`}
        />
      ))}
    </div>
  )
}

// Одна карточка отзыва
const ReviewCard = ({ review }) => (
  <div className="review-card pixel-border">
    <div className="review-card__header">
      <h3 className="review-card__name">{review.name}</h3>
      <StarRating rating={review.rating} />
    </div>
    <p className="review-card__text">"{review.text}"</p>
    <p className="review-card__date">{review.date}</p>
  </div>
)

const Reviews = () => {
  // Дублируем отзывы для бесшовной прокрутки
  const duplicatedReviews = [...reviewsData, ...reviewsData]

  return (
    <section className="reviews" id="reviews" data-aos="fade-up">
      <div className="container">
        {/* Заголовок секции */}
        <h2 className="section-title">ОТЗЫВЫ</h2>
      </div>

      {/* Бегущая строка отзывов — на всю ширину */}
      <div className="reviews__marquee">
        <div className="reviews__track">
          {duplicatedReviews.map((review, index) => (
            <div key={`${review.id}-${index}`} className="reviews__item">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Reviews

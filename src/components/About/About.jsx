import { motion } from 'framer-motion'
import './About.css'

const About = () => {
  const features = [
    {
      icon: '🎬',
      title: 'Кино',
      text: 'Огромный экран и объёмный звук — эффект присутствия гарантирован',
    },
    {
      icon: '🎮',
      title: 'Игры',
      text: 'PS4 и PS5 — играй с друзьями в любимые игры',
    },
    {
      icon: '🎤',
      title: 'Караоке',
      text: 'Профессиональная система караоке с огромной библиотекой',
    },
    {
      icon: '🎲',
      title: 'Настолки',
      text: 'Большая коллекция настольных игр для компании любого размера',
    },
    {
      icon: '🍕',
      title: 'Своя еда',
      text: 'Приноси свою еду и напитки — никаких ограничений',
    },
    {
      icon: '🎉',
      title: 'Праздники',
      text: 'Отмечай день рождения, корпоратив или просто вечеринку',
    },
  ]

  return (
    <section className="about" id="about" data-aos="fade-up">
      <div className="container">
        {/* Заголовок секции */}
        <h2 className="section-title">О НАС</h2>

        {/* Описание */}
        <div className="about__description">
          <motion.p
            className="about__text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <strong>PIXEL</strong> — первый антикинотеатр в Ярославле, где ты сам
            выбираешь, чем заниматься. Мы создали уникальное пространство для тех,
            кто любит <em>кино, игры и весёлый отдых</em>.
          </motion.p>

          <motion.p
            className="about__text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            У нас <strong>3 зала</strong> разной вместимости — от уютного зала
            для двоих до просторного VIP-зала для большой компании. Бронируй зал,
            приходи с друзьями и наслаждайся — <em>оплата только за время</em>!
          </motion.p>
        </div>

        {/* Преимущества */}
        <div className="about__features">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="about__feature pixel-border"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="about__feature-icon">{feature.icon}</div>
              <h3 className="about__feature-title">{feature.title}</h3>
              <p className="about__feature-text">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About

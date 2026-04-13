import { useState, useRef, useEffect, useCallback } from 'react'
import './MusicPlayer.css'

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.15)
  const audioRef = useRef(null)
  const shootRef = useRef(null)
  const startedRef = useRef(false)

  const startMusic = useCallback(() => {
    if (startedRef.current) return
    startedRef.current = true

    const audio = new Audio('/audio/music.mp3')
    audio.loop = false
    audio.volume = 0.375 // volume * 2.5 при дефолте 0.15
    audioRef.current = audio

    audio.play().then(() => {
      setIsPlaying(true)
    }).catch(() => {
      startedRef.current = false
    })

    audio.onended = () => {
      audioRef.current = null
      setIsPlaying(false)
    }
  }, [])

  // Запуск при любом действии пользователя
  useEffect(() => {
    let removed = false

    const handler = () => {
      if (removed) return
      startMusic()
    }

    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)
    window.addEventListener('wheel', handler)
    window.addEventListener('keydown', handler)

    return () => {
      removed = true
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
      window.removeEventListener('wheel', handler)
      window.removeEventListener('keydown', handler)
    }
  }, [startMusic])

  // Выстрел при клике
  useEffect(() => {
    const shoot = new Audio('/audio/shoot.mp3')
    shoot.volume = 0.3
    shoot.preload = 'auto'
    shootRef.current = shoot

    const handleClick = () => {
      if (shootRef.current) {
        const clone = shootRef.current.cloneNode()
        clone.volume = 0.3
        clone.play().catch(() => {})
      }
    }
    window.addEventListener('click', handleClick)
    return () => {
      window.removeEventListener('click', handleClick)
      shoot.src = ''
    }
  }, [])

  // Обновляем громкость
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume * 2.5
    }
  }, [volume])

  // Выключение/включение
  const toggleMusic = useCallback(() => {
    if (isPlaying) {
      audioRef.current?.pause()
      audioRef.current = null
      setIsPlaying(false)
    } else {
      if (!startedRef.current) {
        startedRef.current = true
      }
      const audio = new Audio('/audio/music.mp3')
      audio.loop = false
      audio.volume = volume * 2.5
      audioRef.current = audio
      audio.play().catch(() => {})
      setIsPlaying(true)
      audio.onended = () => {
        audioRef.current = null
        setIsPlaying(false)
      }
    }
  }, [isPlaying, volume])

  return (
    <div className={`music-player ${isPlaying ? 'music-player--playing' : ''}`}>
      <button
        className="music-player__btn"
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Выключить музыку' : 'Включить музыку'}
        type="button"
      >
        <svg viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
          {isPlaying ? (
            <>
              <rect x="3" y="2" width="3" height="12" />
              <rect x="10" y="2" width="3" height="12" />
            </>
          ) : (
            <>
              <rect x="4" y="2" width="2" height="2" />
              <rect x="6" y="2" width="2" height="2" />
              <rect x="8" y="4" width="2" height="2" />
              <rect x="8" y="6" width="2" height="2" />
              <rect x="8" y="8" width="2" height="2" />
              <rect x="6" y="10" width="4" height="2" />
              <rect x="4" y="12" width="4" height="2" />
              <rect x="10" y="8" width="2" height="2" />
              <rect x="10" y="6" width="2" height="2" />
            </>
          )}
        </svg>
        <span className="music-player__text">
          {isPlaying ? 'OFF' : 'ON'}
        </span>
      </button>

      {isPlaying && (
        <div className="music-player__volume">
          <input
            type="range"
            min="0.05"
            max="0.3"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="music-player__slider"
          />
        </div>
      )}
    </div>
  )
}

export default MusicPlayer

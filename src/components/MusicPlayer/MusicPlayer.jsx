import { useState, useRef, useEffect, useCallback } from 'react'
import './MusicPlayer.css'

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.15)
  const audioRef = useRef(null)

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

import { useEffect, useRef } from 'react'
import './CursorPixel.css'

const CursorPixel = () => {
  const pixelRef = useRef(null)
  const currentPos = useRef({ x: -100, y: -100 })
  const targetPos = useRef({ x: -100, y: -100 })
  const animFrameRef = useRef(null)

  useEffect(() => {
    const pixel = pixelRef.current
    if (!pixel) return

    // Обновляем целевую позицию курсора
    const handleMouseMove = (e) => {
      targetPos.current.x = e.clientX
      targetPos.current.y = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Плавное следование за курсором
    const animate = () => {
      const speed = 0.12 // скорость следования (0.01 - медленно, 1 - мгновенно)
      
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * speed
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * speed

      pixel.style.transform = `translate(${currentPos.current.x - 4}px, ${currentPos.current.y - 4}px)`
      
      animFrameRef.current = requestAnimationFrame(animate)
    }

    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  return <div className="cursor-pixel" ref={pixelRef} />
}

export default CursorPixel

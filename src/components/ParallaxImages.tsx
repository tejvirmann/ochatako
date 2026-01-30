import React, { useEffect, useState } from 'react'
import './ParallaxImages.css'

interface ImagePosition {
  id: number
  top: string
  left: string
  width: string
  height: string
  speed: number // Parallax speed multiplier (0.1 to 0.5)
  src?: string // If undefined, position is blank
}

// Default placeholder images - using Picsum Photos for reliable placeholder images
// 5 fixed positions with varying sizes, well-distributed across the page
const defaultPositions: ImagePosition[] = [
  { id: 1, top: '8%', left: '3%', width: '200px', height: '280px', speed: 0.20, src: 'https://picsum.photos/200/280?random=10' },
  { id: 2, top: '20%', left: '88%', width: '220px', height: '160px', speed: 0.15, src: 'https://picsum.photos/220/160?random=20' },
  { id: 3, top: '50%', left: '5%', width: '180px', height: '240px', speed: 0.22, src: 'https://picsum.photos/180/240?random=30' },
  { id: 4, top: '45%', left: '82%', width: '190px', height: '200px', speed: 0.18, src: 'https://picsum.photos/190/200?random=40' },
  { id: 5, top: '75%', left: '12%', width: '240px', height: '180px', speed: 0.19, src: 'https://picsum.photos/240/180?random=50' },
]

const ParallaxImages: React.FC = () => {
  const [scrollY, setScrollY] = useState(0)
  const [positions] = useState<ImagePosition[]>(defaultPositions)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="parallax-images-container">
      {positions.map((position) => {
        if (!position.src) return null // Skip blank positions

        const offsetY = scrollY * position.speed
        const style: React.CSSProperties = {
          position: 'fixed',
          top: position.top,
          left: position.left,
          width: position.width,
          height: position.height,
          transform: `translateY(${offsetY}px)`,
          zIndex: 1,
          pointerEvents: 'none',
        }

        return (
          <div
            key={position.id}
            className="parallax-image-wrapper"
            style={style}
          >
            <img
              src={position.src}
              alt={`Parallax image ${position.id}`}
              className="parallax-image"
              onError={(e) => {
                // Hide image if it fails to load (for placeholder images)
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

export default ParallaxImages

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const frameCount = 12
const sequenceImages = Array.from({ length: frameCount }, (_, i) => `images/frame-${String(i + 1).padStart(2, '0')}.jpg`)

const featureCards = [
  { id: 1, title: 'RFID PROTECTION', desc: 'Secure passport and card storage with dedicated shielded pocket.', startFrame: 2, endFrame: 4, align: 'right' as const },
  { id: 2, title: 'EXPANDABLE CORE', desc: '+40% volume expansion for overnight business stays.', startFrame: 6, endFrame: 8, align: 'left' as const },
  { id: 3, title: 'TECH-READY SHELL', desc: 'Waterproof RPET weave with YKK AquaGuard zippers.', startFrame: 9, endFrame: 11, align: 'right' as const },
]

export default function ProductReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const featureRefs = useRef<(HTMLDivElement | null)[]>([])
  const currentFrame = useRef(0)
  const preloadedImages = useRef<HTMLImageElement[]>([])
  const [titleVisible, setTitleVisible] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Preload images
    preloadedImages.current = sequenceImages.map((src) => {
      const img = new Image()
      img.src = src
      return img
    })

    preloadedImages.current[0].onload = () => {
      currentFrame.current = 0
      renderCanvas()
    }

    function renderCanvas() {
      if (!canvas || !ctx) return
      const img = preloadedImages.current[currentFrame.current]
      if (!img || !img.complete) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    }

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom top',
      pin: true,
      onUpdate: (self) => {
        const targetFrame = Math.floor(self.progress * (frameCount - 1))
        if (targetFrame !== currentFrame.current) {
          currentFrame.current = targetFrame
          renderCanvas()
        }
      },
    })

    // Title animation
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 80%',
      onEnter: () => setTitleVisible(true),
    })

    return () => {
      st.kill()
    }
  }, [])

  // Card tracking
  useEffect(() => {
    let animFrameId: number

    const update = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const centerY = rect.top + rect.height / 2

      featureCards.forEach((card, index) => {
        const el = featureRefs.current[index]
        if (!el) return

        const cardProgress = (currentFrame.current - card.startFrame) / (card.endFrame - card.startFrame)
        const yOffset = (centerY - 100) + (index * 150)

        let opacity = 0
        let scale = 0.9

        if (cardProgress >= 0 && cardProgress <= 1) {
          opacity = 1
          scale = 1
        } else if (cardProgress > 0.8) {
          opacity = Math.max(0, 1 - (cardProgress - 0.8) * 5)
        }

        el.style.transform = `translateY(${yOffset}px) scale(${scale})`
        el.style.opacity = `${opacity}`
      })

      animFrameId = requestAnimationFrame(update)
    }

    update()

    return () => {
      cancelAnimationFrame(animFrameId)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      id="product"
      className="relative w-full h-[240vh] bg-black overflow-hidden"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        {/* Section label */}
        <div className={`absolute top-10 left-10 z-20 transition-all duration-700 ${titleVisible ? 'opacity-100' : 'opacity-0'}`}>
          <span className="font-poppins font-semibold text-xs uppercase tracking-[2px] text-[#e88724]">
            PRODUCT REVEAL
          </span>
        </div>

        {/* Product name */}
        <div className={`absolute top-10 left-1/2 -translate-x-1/2 z-20 text-center transition-all duration-700 delay-200 ${titleVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="font-poppins font-semibold text-[clamp(24px,3vw,42px)] text-white tracking-[-0.5px]">
            IDEACRAFT NOMAD TECH ORGANIZER
          </h2>
          <p className="font-poppins text-base text-[#a0a0a0] mt-2">
            Smart organization for professionals in motion.
          </p>
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          width={900}
          height={600}
          className="max-w-[90vw] max-h-[60vh] object-contain"
        />

        {/* Feature cards */}
        {featureCards.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => { featureRefs.current[i] = el }}
            className="absolute top-0 w-64 md:w-72 p-6 rounded-lg opacity-0 transition-none z-10"
            style={{
              ...(card.align === 'right' ? { right: '5%' } : { left: '5%' }),
              background: 'rgba(26,26,26,0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid #333',
              transform: 'translateY(100vh)',
            }}
          >
            <h3 className="font-poppins font-semibold text-[13px] uppercase tracking-[1.5px] text-[#e88724]">
              {card.title}
            </h3>
            <p className="font-poppins text-sm text-white mt-2 leading-relaxed">
              {card.desc}
            </p>
          </div>
        ))}

        {/* Specs bar */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 md:gap-10 z-20">
          {[
            'Dimensions: 45 \u00d7 32 \u00d7 18 cm',
            'Capacity: 22L',
            'Weight: 1.2 kg',
          ].map((spec, i) => (
            <div key={spec} className="flex items-center gap-6 md:gap-10">
              <span className="font-poppins text-xs md:text-sm text-[#a0a0a0] whitespace-nowrap">
                {spec}
              </span>
              {i < 2 && <div className="w-px h-4 bg-[#333]" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

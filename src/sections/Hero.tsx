import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrambleText from '../components/ScrambleText'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    tl.to(subRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, 0.8)
    .to(badgeRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    }, 1.0)
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
    }, 1.2)
    .to(imageRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'power3.out',
    }, 0.6)

    return () => { tl.kill() }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) * 0.02,
        y: (e.clientY - window.innerHeight / 2) * 0.02,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)',
      }}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(232,135,36,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(232,135,36,0.3) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 pt-20">
        {/* Text Content */}
        <div className="order-2 lg:order-1">
          <ScrambleText
            text="Reinventing Corporate Gifting Through Sustainable Utility"
            className="font-poppins font-semibold text-[clamp(32px,5vw,56px)] text-white leading-[1.1] tracking-[-1.5px] max-w-[600px]"
          />

          <p
            ref={subRef}
            className="font-poppins text-lg text-[#a0a0a0] mt-6 opacity-0 translate-y-5 max-w-[500px]"
          >
            A New Product Development proposal for Ideacraft Ventures Pvt. Ltd.
          </p>

          <div
            ref={badgeRef}
            className="inline-block mt-8 opacity-0 border border-[#e88724] px-6 py-2.5"
          >
            <span className="font-poppins font-medium text-xs uppercase tracking-[2px] text-[#e88724]">
              FASHION MERCHANDISER CANDIDATE
            </span>
          </div>

          <div
            ref={ctaRef}
            className="flex flex-wrap gap-4 mt-10 opacity-0 translate-y-5"
          >
            <button
              onClick={() => scrollToSection('#product')}
              className="bg-[#e88724] text-black px-8 py-3.5 font-poppins font-semibold text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
            >
              View Product Concept
            </button>
            <button
              onClick={() => scrollToSection('#strategy')}
              className="border border-white text-white px-8 py-3.5 font-poppins font-semibold text-sm uppercase tracking-wider hover:border-[#e88724] hover:text-[#e88724] transition-all duration-300"
            >
              Business Strategy
            </button>
          </div>
        </div>

        {/* Product Image */}
        <div
          ref={imageRef}
          className="order-1 lg:order-2 flex justify-center items-center opacity-0 scale-95"
          style={{
            transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          <div className="relative">
            <img
              src="images/frame-12.jpg"
              alt="Ideacraft Nomad Tech Organizer"
              className="w-full max-w-[500px] h-auto object-contain drop-shadow-2xl"
            />
            {/* Glow effect */}
            <div
              className="absolute inset-0 rounded-full opacity-20 blur-3xl"
              style={{
                background: 'radial-gradient(circle, rgba(232,135,36,0.4) 0%, transparent 70%)',
                transform: 'scale(1.2)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  )
}

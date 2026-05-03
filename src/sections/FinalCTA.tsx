import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrambleText from '../components/ScrambleText'

gsap.registerPlugin(ScrollTrigger)

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(subRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      gsap.from(btnRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 0.5,
        delay: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-[160px] px-6 md:px-16"
      style={{
        background: 'radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)',
      }}
    >
      <div className="max-w-[700px] mx-auto text-center">
        <ScrambleText
          text="Ready to Build Ideacraft's Next Bestseller?"
          className="font-poppins font-semibold text-[clamp(32px,4vw,56px)] text-white leading-[1.1] tracking-[-1px]"
        />

        <p
          ref={subRef}
          className="font-poppins text-base text-[#a0a0a0] mt-6 max-w-[600px] mx-auto"
        >
          Presented by a Fashion Merchandiser candidate focused on innovation, sourcing, and scalable growth.
        </p>

        <button
          ref={btnRef}
          className="mt-10 bg-[#e88724] text-black px-12 py-4 font-poppins font-semibold text-base uppercase tracking-wider hover:bg-white hover:text-black hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(232,135,36,0.3)] transition-all duration-300"
        >
          Download Proposal PDF
        </button>

        <p className="font-poppins text-[13px] text-[#4a4947] mt-8">
          Scroll back to explore any section in detail.
        </p>
      </div>
    </section>
  )
}

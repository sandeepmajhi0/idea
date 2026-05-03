import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CheckCircle } from 'lucide-react'
import ScrambleText from '../components/ScrambleText'

gsap.registerPlugin(ScrollTrigger)

const bullets = [
  'Consumer-focused product thinking',
  'Costing awareness down to component level',
  'Vendor sourcing mindset with India ecosystem knowledge',
  'Sustainability integration \u2014 not afterthought',
  'Brand fit understanding \u2014 DNA-aligned proposals',
  'Commercial viability focus \u2014 margin-aware decisions',
]

export default function CandidateValue() {
  const sectionRef = useRef<HTMLElement>(null)
  const bulletsRef = useRef<(HTMLDivElement | null)[]>([])
  const closingRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(bulletsRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      gsap.from(closingRef.current, {
        y: 15,
        opacity: 0,
        duration: 0.6,
        delay: 0.6,
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
      className="py-[160px] px-6 md:px-16 bg-black border-y border-[#1a1a1a]"
    >
      <div className="max-w-[800px] mx-auto text-center">
        <span className="font-poppins font-semibold text-xs uppercase tracking-[2px] text-[#e88724]">
          CANDIDATE VALUE PROPOSITION
        </span>

        <div className="mt-6">
          <ScrambleText
            text="Beyond Product Design \u2014 Built with Merchandising Logic"
            className="font-poppins font-medium text-[clamp(28px,3.5vw,42px)] text-white leading-[1.2]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
          {bullets.map((bullet, i) => (
            <div
              key={bullet}
              ref={(el) => { bulletsRef.current[i] = el }}
              className="flex items-center gap-3 bg-[#111111] border border-[#1a1a1a] px-6 py-5 rounded-lg text-left"
            >
              <CheckCircle className="w-5 h-5 text-[#e88724] flex-shrink-0" strokeWidth={2} />
              <span className="font-poppins font-medium text-sm text-white">
                {bullet}
              </span>
            </div>
          ))}
        </div>

        <p
          ref={closingRef}
          className="font-poppins text-lg italic text-[#a0a0a0] mt-12 leading-relaxed"
        >
          This isn&apos;t just a product pitch. It&apos;s proof of merchandising thinking at a corporate level.
        </p>
      </div>
    </section>
  )
}

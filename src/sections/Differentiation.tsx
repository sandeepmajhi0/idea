import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X, Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const traditionalItems = [
  'Low utility \u2014 single compartment design',
  'Generic branding \u2014 logo stamp only',
  'Short lifespan \u2014 synthetic materials',
  'Low emotional value \u2014 perceived as disposable',
]

const nomadItems = [
  'Daily use \u2014 9 intelligently designed compartments',
  'Travel + work hybrid \u2014 expands for overnight stays',
  'Premium design \u2014 RPET ballistic weave, vegan leather',
  'High brand recall \u2014 daily visibility, lasting impression',
  'Sustainability story \u2014 32 PET bottles per bag',
  'Modern executive appeal \u2014 tech-ready, airport-friendly',
]

export default function Differentiation() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftItemsRef = useRef<(HTMLDivElement | null)[]>([])
  const rightItemsRef = useRef<(HTMLDivElement | null)[]>([])
  const vsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftItemsRef.current, {
        x: -30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      gsap.from(rightItemsRef.current, {
        x: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      gsap.from(vsRef.current, {
        scale: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        delay: 0.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-[120px] px-6 md:px-16 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <span className="font-poppins font-semibold text-xs uppercase tracking-[2px] text-[#e88724]">
          DIFFERENTIATION
        </span>
        <h2 className="font-poppins font-medium text-4xl text-white mt-4">
          What Makes It New
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16 relative">
          {/* Traditional Column */}
          <div>
            <div className="pb-4 border-b-2 border-[#333] mb-6">
              <h3 className="font-poppins font-semibold text-sm uppercase tracking-[1.5px] text-[#888]">
                TRADITIONAL CORPORATE BAGS
              </h3>
            </div>
            {traditionalItems.map((item, i) => (
              <div
                key={item}
                ref={(el) => { leftItemsRef.current[i] = el }}
                className="flex items-start gap-3 py-3"
              >
                <X className="w-5 h-5 text-[#ef4444] mt-0.5 flex-shrink-0" strokeWidth={2} />
                <span className="font-poppins text-[15px] text-[#999] leading-[2.2]">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* VS Badge */}
          <div
            ref={vsRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-[#e88724] flex items-center justify-center z-10 bg-[#050505] hidden lg:flex"
          >
            <span className="font-poppins font-bold text-base text-[#e88724]">VS</span>
          </div>

          {/* Nomad Column */}
          <div>
            <div className="pb-4 border-b-2 border-[#e88724] mb-6">
              <h3 className="font-poppins font-semibold text-sm uppercase tracking-[1.5px] text-[#e88724]">
                NOMAD TECH ORGANIZER
              </h3>
            </div>
            {nomadItems.map((item, i) => (
              <div
                key={item}
                ref={(el) => { rightItemsRef.current[i] = el }}
                className="flex items-start gap-3 py-3"
              >
                <Check className="w-5 h-5 text-[#e88724] mt-0.5 flex-shrink-0" strokeWidth={2} />
                <span className="font-poppins text-[15px] text-white leading-[2.2]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

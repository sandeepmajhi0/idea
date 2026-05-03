import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Factory, Cog, Truck } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const textLines = [
  'Surat / Ahmedabad: Fabric Sourcing',
  'Delhi NCR: Manufacturing & Assembly',
  'Bhiwandi: Packaging & Distribution',
  'Result: Lower lead times, scalable production.',
]

const locationCards = [
  {
    icon: Factory,
    title: 'FABRIC SOURCING',
    vendor: 'Reliance RPET Fabrics (Surat)',
    lines: [
      'Supplier: Reliance RPET Fabrics, Surat',
      'RPET ballistic weave + recycled polyester lining',
      'Reason: Largest RPET capacity in India, ISO 14001 certified, consistent quality at scale',
    ],
  },
  {
    icon: Cog,
    title: 'MANUFACTURING & ASSEMBLY',
    vendor: 'Comfort Luggage Pvt. Ltd. (Noida)',
    lines: [
      'Manufacturer: Comfort Luggage Pvt. Ltd., Noida',
      'Cutting, stitching, assembly, inline QC',
      'Reason: 15+ years corporate bag experience, 10K units/month capacity, SEDEX audited',
    ],
  },
  {
    icon: Truck,
    title: 'PACKAGING & DISPATCH',
    vendor: 'GreenPack Solutions (Bhiwandi)',
    lines: [
      'Partner: GreenPack Solutions, Bhiwandi',
      'FSC-certified packaging, pan-India + export logistics',
      'Reason: Proximity to Mumbai port, eco-certified, bulk rate advantage',
    ],
  },
]

export default function SourcingStrategy() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const summaryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const line = document.getElementById('visible-line')
    if (!line) return

    const length = ((line as unknown) as SVGPathElement).getTotalLength()
    gsap.set(line, { strokeDasharray: length, strokeDashoffset: length })

    const textTriggers: ScrollTrigger[] = []

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: textContainerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
        onLeave: () => textTriggers.forEach(t => t.kill()),
      },
    })

    tl.to(line, {
      strokeDashoffset: 0,
      duration: 3,
      ease: 'none',
    })

    textLines.forEach((txt, i) => {
      tl.to({}, {
        duration: 0.1,
        onStart: () => {
          const el = document.createElement('div')
          el.className = 'absolute font-poppins text-sm text-white bg-black/60 backdrop-blur-sm px-3 py-2 rounded border-l-2 border-[#e88724]'
          el.style.top = `${(i + 1) * 15}%`
          el.style.left = `${(i + 1) * 20}%`
          textContainerRef.current?.appendChild(el)

          const st = ScrollTrigger.create({
            trigger: el,
            start: 'top bottom',
            onEnter: () => typeEffect(el, txt),
          })
          textTriggers.push(st)
        },
      }, '-=2.5')
    })

    return () => {
      textTriggers.forEach(t => t.kill())
    }
  }, [])

  const typeEffect = (element: HTMLElement, text: string) => {
    element.innerHTML = '<span class="text-[#e88724]">_</span>'
    let charIndex = 0

    const type = () => {
      if (charIndex < text.length) {
        element.innerHTML = text.substring(0, charIndex + 1) + '<span class="text-[#e88724]">_</span>'
        charIndex++
        setTimeout(type, 30)
      }
    }
    type()
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.15,
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: 'top 85%',
        },
      })

      gsap.from(summaryRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: summaryRef.current,
          start: 'top 90%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="relative w-full bg-black">
      {/* SVG Line Section */}
      <div className="relative w-full h-[80vh] flex flex-col items-center justify-center overflow-hidden">
        <svg
          ref={svgRef}
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
          className="absolute w-full h-full pointer-events-none"
        >
          <defs>
            <clipPath id="line-clip">
              <path
                id="main-line"
                d="M 200,600 C 400,600 400,200 600,200 S 800,600 1000,600 S 1200,200 1400,200"
              />
            </clipPath>
          </defs>
          <path
            d="M 200,600 C 400,600 400,200 600,200 S 800,600 1000,600 S 1200,200 1400,200"
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="8"
          />
          <path
            id="visible-line"
            d="M 200,600 C 400,600 400,200 600,200 S 800,600 1000,600 S 1200,200 1400,200"
            fill="none"
            stroke="#e88724"
            strokeWidth="8"
            clipPath="url(#line-clip)"
          />
        </svg>

        <div
          ref={textContainerRef}
          className="relative z-10 w-full max-w-7xl h-full pointer-events-none"
        />

        <h2 className="absolute bottom-20 font-poppins font-bold text-4xl text-white tracking-tight">
          Sourcing &amp; Vendor Strategy
        </h2>
      </div>

      {/* Location Cards */}
      <div className="px-6 md:px-16 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {locationCards.map((card, i) => {
            const Icon = card.icon
            return (
              <div
                key={card.title}
                ref={(el) => { cardsRef.current[i] = el }}
                className="bg-[#111111] border border-[#1a1a1a] p-8 rounded-lg"
              >
                <Icon className="w-8 h-8 text-[#e88724] mb-5" strokeWidth={1.5} />
                <h3 className="font-poppins font-semibold text-[13px] uppercase tracking-wider text-[#e88724] mb-4">
                  {card.title}
                </h3>
                {card.lines.map((line) => (
                  <p key={line} className="font-poppins text-sm text-white mb-1">
                    {line}
                  </p>
                ))}
              </div>
            )
          })}
        </div>

        {/* Summary */}
        <div
          ref={summaryRef}
          className="max-w-[600px] mx-auto text-center mt-16"
        >
          <p className="font-poppins font-medium text-lg text-white leading-relaxed">
            Lower lead times. Deep vendor ecosystem. Export readiness. Rapid sampling speed.
          </p>
        </div>
      </div>
    </div>
  )
}

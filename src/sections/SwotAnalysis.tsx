import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const swotData = [
  {
    category: 'STRENGTHS',
    borderColor: '#e88724',
    items: [
      'Daily utility product \u2014 creates consistent brand touchpoints',
      'Strong brand visibility \u2014 travels with the recipient',
      'Premium perception \u2014 elevates the gifting brand',
      'Sustainable narrative \u2014 aligns with ESG goals',
      'Scalable sourcing \u2014 Indian vendor ecosystem',
    ],
  },
  {
    category: 'WEAKNESSES',
    borderColor: '#4a4947',
    items: [
      'Higher cost than basic gifts \u2014 premium positioning required',
      'Longer development cycle \u2014 sampling and approvals',
      'Need strong QC \u2014 multi-component product complexity',
    ],
  },
  {
    category: 'OPPORTUNITIES',
    borderColor: '#ffffff',
    items: [
      'Employee onboarding kits \u2014 first-day impression',
      'CXO gifting \u2014 premium tier executive gifts',
      'Conference gifting \u2014 event merchandise upgrade',
      'Export gifting \u2014 international client reach',
      'ESG campaign integration \u2014 sustainability storytelling',
    ],
  },
  {
    category: 'THREATS',
    borderColor: '#3d3a3a',
    items: [
      'Copycat suppliers \u2014 IP protection needed',
      'Raw material volatility \u2014 RPET pricing fluctuations',
      'Price-sensitive clients \u2014 budget competition',
      'Import competition \u2014 international bag brands',
    ],
  },
]

export default function SwotAnalysis() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
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
          STRATEGIC ANALYSIS
        </span>
        <h2 className="font-poppins font-medium text-4xl text-white mt-4">
          SWOT Analysis
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {swotData.map((card, i) => (
            <div
              key={card.category}
              ref={(el) => { cardsRef.current[i] = el }}
              className="bg-[#111111] border border-[#1a1a1a] p-10"
              style={{ borderTop: `4px solid ${card.borderColor}` }}
            >
              <h3
                className="font-poppins font-bold text-sm uppercase tracking-[2px] mb-6"
                style={{ color: card.borderColor }}
              >
                {card.category}
              </h3>
              <ul className="space-y-3">
                {card.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div
                      className="w-2 h-2 mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: card.borderColor }}
                    />
                    <span className="font-poppins text-sm text-[#a0a0a0] leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const risks = [
  {
    name: 'RPET Supply Delay',
    probability: 'Med',
    impact: 'Med',
    color: '#e88724',
    mitigation: 'Dual vendor sourcing (Surat + Ahmedabad)',
  },
  {
    name: 'Stitching Inconsistency',
    probability: 'Med',
    impact: 'Med',
    color: '#e88724',
    mitigation: 'Inline QC audits at Delhi NCR facility',
  },
  {
    name: 'Branding Print Mismatch',
    probability: 'Low',
    impact: 'Med',
    color: '#4caf50',
    mitigation: 'Pre-production approval sample sign-off',
  },
  {
    name: 'MOQ Fluctuation',
    probability: 'Low',
    impact: 'Low',
    color: '#4caf50',
    mitigation: 'Buffer inventory of raw materials',
  },
  {
    name: 'Freight Delay',
    probability: 'Med',
    impact: 'Low',
    color: '#e88724',
    mitigation: 'Fixed seasonal contracts with logistics partners',
  },
  {
    name: 'Cost Increase',
    probability: 'High',
    impact: 'Med',
    color: '#f44336',
    mitigation: 'Annual vendor lock-in contracts with price protection',
  },
]

const badgeStyles: Record<string, string> = {
  Low: 'bg-[rgba(76,175,80,0.15)] text-[#4caf50]',
  Med: 'bg-[rgba(232,135,36,0.15)] text-[#e88724]',
  High: 'bg-[rgba(244,67,54,0.15)] text-[#f44336]',
}

export default function RiskAssessment() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-[120px] px-6 md:px-16 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <span className="font-poppins font-semibold text-xs uppercase tracking-[2px] text-[#e88724]">
          RISK MANAGEMENT
        </span>
        <h2 className="font-poppins font-medium text-4xl text-white mt-4">
          Risk Assessment Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
          {risks.map((risk, i) => (
            <div
              key={risk.name}
              ref={(el) => { cardsRef.current[i] = el }}
              className="bg-[#111111] border border-[#1a1a1a] p-7 rounded-lg hover:border-[#333] transition-colors duration-300"
            >
              <h3 className="font-poppins font-semibold text-sm text-white mb-4">
                {risk.name}
              </h3>

              <div className="flex gap-3 mb-4">
                <span className={`px-3 py-1 rounded text-[11px] font-poppins font-semibold uppercase ${badgeStyles[risk.probability]}`}>
                  Prob: {risk.probability}
                </span>
                <span className={`px-3 py-1 rounded text-[11px] font-poppins font-semibold uppercase ${badgeStyles[risk.impact]}`}>
                  Impact: {risk.impact}
                </span>
              </div>

              <p className="font-poppins text-[11px] font-semibold uppercase tracking-wider text-[#e88724] mt-4 mb-2">
                MITIGATION:
              </p>
              <p className="font-poppins text-[13px] text-[#a0a0a0] leading-relaxed">
                {risk.mitigation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

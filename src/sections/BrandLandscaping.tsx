import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const criteria = ['Price', 'Corp. Customization', 'Premium Appeal', 'Sustainability', 'Innovation', 'Gifting Suitability', 'MOQ Flexibility']

const brands = [
  { name: 'American Tourister', scores: [2, 1, 2, 1, 1, 2, 1], highlight: false },
  { name: 'Wildcraft', scores: [3, 1, 2, 2, 2, 1, 1], highlight: false },
  { name: 'Mokobara', scores: [4, 0, 3, 2, 3, 1, 0], highlight: false },
  { name: 'Safari', scores: [2, 1, 1, 1, 1, 2, 2], highlight: false },
  { name: 'Samsonite', scores: [5, 2, 3, 2, 2, 2, 1], highlight: false },
  { name: 'Generic Corporate', scores: [1, 4, 0, 0, 0, 4, 4], highlight: false },
  { name: 'Ideacraft Nomad', scores: [3, 5, 3, 4, 4, 5, 4], highlight: true },
]

function StarRating({ score }: { score: number }) {
  return (
    <div className="flex justify-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className="text-xs"
          style={{ color: i < score ? '#e88724' : '#4a4947' }}
        >
          &#9733;
        </span>
      ))}
    </div>
  )
}

export default function BrandLandscaping() {
  const sectionRef = useRef<HTMLElement>(null)
  const rowsRef = useRef<(HTMLTableRowElement | null)[]>([])
  const calloutRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(rowsRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      gsap.from(calloutRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: calloutRef.current,
          start: 'top 85%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-[120px] px-6 md:px-16 bg-black">
      <div className="max-w-7xl mx-auto">
        <span className="font-poppins font-semibold text-xs uppercase tracking-[2px] text-[#e88724]">
          COMPETITIVE POSITIONING
        </span>
        <h2 className="font-poppins font-medium text-[32px] text-white mt-4 max-w-[700px] leading-[1.2]">
          The Sweet Spot: Premium, Customizable, Sustainable, Corporate-Ready
        </h2>

        <div className="overflow-x-auto mt-16">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b-2 border-[#333]">
                <th className="text-left py-4 px-4 font-poppins font-semibold text-[11px] uppercase tracking-wider text-[#a0a0a0]">
                  Brand
                </th>
                {criteria.map((c) => (
                  <th key={c} className="py-4 px-3 font-poppins font-semibold text-[11px] uppercase tracking-wider text-[#a0a0a0] text-center">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {brands.map((brand, i) => (
                <tr
                  key={brand.name}
                  ref={(el) => { rowsRef.current[i] = el }}
                  className={`border-b border-[#1a1a1a] ${
                    brand.highlight ? 'bg-[rgba(232,135,36,0.08)] border-l-[3px] border-l-[#e88724]' : ''
                  }`}
                >
                  <td className={`py-4 px-4 font-poppins font-semibold text-[13px] ${brand.highlight ? 'text-[#e88724]' : 'text-white'}`}>
                    {brand.name}
                  </td>
                  {brand.scores.map((score, j) => (
                    <td key={j} className="py-4 px-3 text-center">
                      <StarRating score={score} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sweet Spot Callout */}
        <div
          ref={calloutRef}
          className="mt-10 max-w-[700px] mx-auto text-center border border-[#e88724] p-6"
        >
          <p className="font-poppins text-base text-[#a0a0a0] leading-relaxed">
            Ideacraft Nomad occupies the unique intersection: Premium quality meets corporate customization, sustainability credentials, and scalable manufacturing.
          </p>
        </div>
      </div>
    </section>
  )
}

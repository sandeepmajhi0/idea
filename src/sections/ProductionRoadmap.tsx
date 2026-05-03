import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const weeks = [
  { num: '1', label: 'Concept & Design', desc: 'Design freeze, tech pack creation, material specification' },
  { num: '2', label: 'Sampling', desc: 'Proto sample, fit check, material confirmation' },
  { num: '3', label: 'Approval', desc: 'Client approval, costing freeze, PO placement' },
  { num: '4-6', label: 'Bulk Production', desc: 'Cutting, stitching, assembly, inline QC' },
  { num: '7', label: 'QC & Branding', desc: 'Final QC, debossing/branding, packaging' },
  { num: '8', label: 'Dispatch', desc: 'Warehouse dispatch, logistics handover' },
]

export default function ProductionRoadmap() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const nodesRef = useRef<(HTMLDivElement | null)[]>([])
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate track line
      gsap.from(trackRef.current, {
        scaleX: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      // Animate nodes
      gsap.from(nodesRef.current, {
        scale: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      // Animate cards
      gsap.from(cardsRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-[120px] px-6 md:px-16 bg-black">
      <div className="max-w-7xl mx-auto">
        <span className="font-poppins font-semibold text-xs uppercase tracking-[2px] text-[#e88724]">
          PRODUCTION PLAN
        </span>
        <h2 className="font-poppins font-medium text-4xl text-white mt-4">
          8-Week Production Roadmap
        </h2>

        {/* Timeline */}
        <div className="mt-20 relative">
          {/* Track line */}
          <div
            ref={trackRef}
            className="absolute top-6 left-0 right-0 h-0.5 origin-left"
            style={{
              background: 'linear-gradient(to right, #e88724, #4a4947)',
            }}
          />

          {/* Nodes and Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 relative">
            {weeks.map((week, i) => (
              <div key={week.num} className="relative">
                {/* Node */}
                <div
                  ref={(el) => { nodesRef.current[i] = el }}
                  className={`w-4 h-4 rounded-full border-2 absolute top-4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 ${
                    i < 3
                      ? 'bg-[#e88724] border-[#e88724]'
                      : i < 5
                      ? 'bg-[#e88724] border-[#e88724] animate-pulse'
                      : 'bg-transparent border-[#4a4947]'
                  }`}
                />

                {/* Card */}
                <div
                  ref={(el) => { cardsRef.current[i] = el }}
                  className={`pt-12 ${i % 2 === 0 ? '' : 'md:mt-8'}`}
                >
                  <div className="bg-[#111111] border border-[#1a1a1a] p-5 rounded-lg">
                    <span className="font-poppins font-bold text-2xl text-[#e88724]">
                      {week.num}
                    </span>
                    <h3 className="font-poppins font-semibold text-[13px] uppercase tracking-wider text-white mt-2">
                      {week.label}
                    </h3>
                    <p className="font-poppins text-xs text-[#a0a0a0] mt-1 leading-relaxed">
                      {week.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Package, Droplets } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const metrics = [
  { value: 78, suffix: '%', label: 'Recycled Material Content' },
  { value: 100, suffix: '%', label: 'Recycled RPET Lining' },
  { value: 32, suffix: '', label: 'PET Bottles Reused Per Bag' },
  { value: 24, suffix: '%', label: 'Lower Virgin Plastic Use' },
]

const materialStack = [
  { name: 'RPET Ballistic Weave (Outer)', percent: 45, color: '#e88724' },
  { name: 'Recycled Polyester (Lining)', percent: 30, color: '#4a4947' },
  { name: 'Vegan Leather (Trim)', percent: 15, color: '#ffffff' },
  { name: 'Recyclable Alloy (Hardware)', percent: 10, color: '#3d3a3a' },
]

function CircularProgress({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) {
  const [animatedValue, setAnimatedValue] = useState(0)
  const circleRef = useRef<SVGCircleElement>(null)
  const radius = 60
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to({}, {
        scrollTrigger: {
          trigger: circleRef.current,
          start: 'top 75%',
          onEnter: () => {
            gsap.to({ val: 0 }, {
              val: value,
              duration: 1.2,
              ease: 'power2.out',
              delay: index * 0.15,
              onUpdate: function () {
                setAnimatedValue(Math.round(this.targets()[0].val))
              },
            })
            gsap.fromTo(
              circleRef.current,
              { strokeDashoffset: circumference },
              {
                strokeDashoffset: circumference - (value / 100) * circumference,
                duration: 1.2,
                ease: 'power2.out',
                delay: index * 0.15,
              }
            )
          },
        },
      })
    })

    return () => ctx.revert()
  }, [value, index])

  return (
    <div className="flex flex-col items-center">
      <svg width="140" height="140" className="transform -rotate-90">
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="6"
        />
        <circle
          ref={circleRef}
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#e88724"
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ width: 140, height: 140 }}>
        <span className="font-poppins font-bold text-[28px] text-white">
          {animatedValue}{suffix}
        </span>
      </div>
      <p className="font-poppins text-[13px] text-[#a0a0a0] text-center mt-3 max-w-[140px]">
        {label}
      </p>
    </div>
  )
}

export default function SustainabilityDashboard() {
  const sectionRef = useRef<HTMLElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const certsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(barRef.current, {
        scaleX: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: barRef.current,
          start: 'top 80%',
        },
      })

      gsap.from(certsRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
        scrollTrigger: {
          trigger: certsRef.current[0],
          start: 'top 85%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-[120px] px-6 md:px-16 bg-black" id="sustainability">
      <div className="max-w-7xl mx-auto">
        <span className="font-poppins font-semibold text-xs uppercase tracking-[2px] text-[#e88724]">
          SUSTAINABILITY
        </span>
        <h2 className="font-poppins font-medium text-4xl text-white mt-4">
          Built for the Planet, Built to Last
        </h2>

        {/* Circular Progress Indicators */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 mt-16">
          {metrics.map((m, i) => (
            <div key={m.label} className="relative">
              <CircularProgress {...m} index={i} />
            </div>
          ))}
        </div>

        {/* Material Stack */}
        <div className="mt-20">
          <h3 className="font-poppins font-semibold text-sm uppercase tracking-[1.5px] text-[#a0a0a0] mb-8">
            MATERIAL COMPOSITION
          </h3>
          <div
            ref={barRef}
            className="flex h-12 rounded overflow-hidden origin-left"
          >
            {materialStack.map((mat) => (
              <div
                key={mat.name}
                style={{ width: `${mat.percent}%`, backgroundColor: mat.color }}
                className="h-full first:rounded-l last:rounded-r"
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-6 mt-6">
            {materialStack.map((mat) => (
              <div key={mat.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: mat.color }} />
                <span className="font-poppins text-[13px] text-[#a0a0a0]">
                  {mat.name} — {mat.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="flex flex-wrap gap-6 mt-12">
          {[
            { icon: Package, label: 'FSC-Certified Packaging' },
            { icon: Droplets, label: 'Water-Resistant Non-Toxic Coating' },
          ].map((cert, i) => {
            const Icon = cert.icon
            return (
              <div
                key={cert.label}
                ref={(el) => { certsRef.current[i] = el }}
                className="flex items-center gap-3 bg-[#111111] border border-[#1a1a1a] rounded-lg px-6 py-5"
              >
                <Icon className="w-5 h-5 text-[#e88724]" strokeWidth={1.5} />
                <span className="font-poppins text-sm text-white">{cert.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

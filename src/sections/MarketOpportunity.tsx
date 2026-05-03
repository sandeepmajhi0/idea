import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
  AreaChart, Area, ResponsiveContainer,
} from 'recharts'

gsap.registerPlugin(ScrollTrigger)

const shiftData = [
  { year: '2021', traditional: 85, utility: 15 },
  { year: '2022', traditional: 78, utility: 22 },
  { year: '2023', traditional: 70, utility: 30 },
  { year: '2024', traditional: 62, utility: 38 },
]

const demandData = [
  { year: '2022', value: 100 },
  { year: '2023', value: 142 },
  { year: '2024', value: 198 },
  { year: '2025', value: 275 },
]

const retentionData = [
  { product: 'Bottle', value: 15 },
  { product: 'Diary', value: 35 },
  { product: 'Bag', value: 58 },
  { product: 'Tech Organizer', value: 89 },
]

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black border border-[#333] px-4 py-3 rounded">
        <p className="font-poppins text-xs text-[#a0a0a0] mb-1">{label}</p>
        {payload.map((entry, i) => (
          <p key={i} className="font-poppins text-sm text-white">
            {entry.dataKey}: {entry.value}%
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function MarketOpportunity() {
  const sectionRef = useRef<HTMLElement>(null)
  const chartsRef = useRef<(HTMLDivElement | null)[]>([])
  const insightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(chartsRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      gsap.from(insightRef.current, {
        y: 20,
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
    <section ref={sectionRef} className="py-[120px] px-6 md:px-16 bg-[#050505]" id="market">
      <div className="max-w-7xl mx-auto">
        <span className="font-poppins font-semibold text-xs uppercase tracking-[2px] text-[#e88724]">
          MARKET INTELLIGENCE
        </span>
        <h2 className="font-poppins font-medium text-4xl text-white mt-4">
          The Corporate Gifting Market is Shifting
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          {/* Chart 1 */}
          <div ref={(el) => { chartsRef.current[0] = el }} className="bg-[#111111] border border-[#1a1a1a] p-6 rounded-lg">
            <h3 className="font-poppins font-semibold text-sm text-white mb-6">
              Corporate Gifting Category Shift
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={shiftData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                <XAxis dataKey="year" tick={{ fill: '#a0a0a0', fontSize: 12, fontFamily: 'Poppins' }} axisLine={{ stroke: '#1a1a1a' }} />
                <YAxis tick={{ fill: '#a0a0a0', fontSize: 12, fontFamily: 'Poppins' }} axisLine={{ stroke: '#1a1a1a' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="traditional" fill="#4a4947" radius={[4, 4, 0, 0]} name="Traditional" />
                <Bar dataKey="utility" fill="#e88724" radius={[4, 4, 0, 0]} name="Utility Premium" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 2 */}
          <div ref={(el) => { chartsRef.current[1] = el }} className="bg-[#111111] border border-[#1a1a1a] p-6 rounded-lg">
            <h3 className="font-poppins font-semibold text-sm text-white mb-6">
              Sustainable Merchandise Demand Growth
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={demandData}>
                <defs>
                  <linearGradient id="orangeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e88724" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#e88724" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                <XAxis dataKey="year" tick={{ fill: '#a0a0a0', fontSize: 12, fontFamily: 'Poppins' }} axisLine={{ stroke: '#1a1a1a' }} />
                <YAxis tick={{ fill: '#a0a0a0', fontSize: 12, fontFamily: 'Poppins' }} axisLine={{ stroke: '#1a1a1a' }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke="#e88724" strokeWidth={2} fill="url(#orangeGrad)" name="Demand Index" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 3 */}
          <div ref={(el) => { chartsRef.current[2] = el }} className="bg-[#111111] border border-[#1a1a1a] p-6 rounded-lg">
            <h3 className="font-poppins font-semibold text-sm text-white mb-6">
              Product Retention vs. Brand Visibility
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={retentionData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                <XAxis type="number" tick={{ fill: '#a0a0a0', fontSize: 12, fontFamily: 'Poppins' }} axisLine={{ stroke: '#1a1a1a' }} />
                <YAxis dataKey="product" type="category" tick={{ fill: '#a0a0a0', fontSize: 12, fontFamily: 'Poppins' }} axisLine={{ stroke: '#1a1a1a' }} width={100} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {retentionData.map((_entry, i) => (
                    <Cell key={`cell-${i}`} fill={i === 3 ? '#e88724' : '#4a4947'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insight Callout */}
        <div
          ref={insightRef}
          className="mt-12 max-w-[600px] mx-auto text-center border-l-[3px] border-[#e88724] pl-6"
        >
          <p className="font-poppins text-base italic text-[#a0a0a0] leading-relaxed">
            Utility products create 6&times; longer brand visibility than desk gifts. The bag travels &mdash; the logo travels with it.
          </p>
        </div>
      </div>
    </section>
  )
}

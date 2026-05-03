import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts'

gsap.registerPlugin(ScrollTrigger)

const costData = [
  { name: 'Material Cost', value: 420, color: '#e88724' },
  { name: 'Trims', value: 130, color: '#4a4947' },
  { name: 'Manufacturing', value: 230, color: '#ffffff' },
  { name: 'Branding', value: 95, color: '#3d3a3a' },
  { name: 'Packaging', value: 75, color: '#666666' },
  { name: 'Logistics Buffer', value: 50, color: '#1a1a1a' },
]

const priceSlabs = [
  { qty: '100 pcs', price: '\u20b91,699', margin: '41.1%' },
  { qty: '500 pcs', price: '\u20b91,549', margin: '35.4%' },
  { qty: '1000 pcs', price: '\u20b91,449', margin: '31.0%' },
]

const marginData = [
  { qty: '100 pcs', margin: 41.1 },
  { qty: '500 pcs', margin: 35.4 },
  { qty: '1000 pcs', margin: 31.0 },
]

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number }> }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black border border-[#333] px-4 py-3 rounded">
        <p className="font-poppins text-sm text-white">{payload[0].name}: {payload[0].value}%</p>
      </div>
    )
  }
  return null
}

export default function Costing() {
  const sectionRef = useRef<HTMLElement>(null)
  const pieRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const noteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(pieRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      gsap.from(tableRef.current ? Array.from(tableRef.current.querySelectorAll('tr')) : [], {
        y: 15,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        scrollTrigger: {
          trigger: tableRef.current,
          start: 'top 80%',
        },
      })

      gsap.from(barRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: barRef.current,
          start: 'top 85%',
        },
      })

      gsap.from(noteRef.current, {
        y: 15,
        opacity: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: noteRef.current,
          start: 'top 90%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-[120px] px-6 md:px-16 bg-black" id="costing">
      <div className="max-w-7xl mx-auto">
        <span className="font-poppins font-semibold text-xs uppercase tracking-[2px] text-[#e88724]">
          COMMERCIAL VIABILITY
        </span>
        <h2 className="font-poppins font-medium text-4xl text-white mt-4">
          Costing &amp; Commercial Viability
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          {/* Pie Chart */}
          <div ref={pieRef} className="bg-[#111111] border border-[#1a1a1a] p-8 rounded-lg">
            <h3 className="font-poppins font-semibold text-sm text-white mb-6">
              Cost Breakdown (per unit)
            </h3>
            <div className="relative">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={costData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={3}
                    dataKey="value"
                    animationDuration={1200}
                  >
                    {costData.map((entry, i) => (
                      <Cell key={`cell-${i}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="font-poppins font-bold text-[28px] text-white">&#x20b9;1,000</span>
                <span className="font-poppins text-xs text-[#a0a0a0]">Total Landing Cost</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-4 justify-center">
              {costData.map((d) => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="font-poppins text-xs text-[#a0a0a0]">{d.name}: &#x20b9;{d.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Price Slabs Table */}
            <div ref={tableRef}>
              <h3 className="font-poppins font-semibold text-[13px] uppercase tracking-wider text-[#a0a0a0] mb-5">
                SELLING PRICE SLABS
              </h3>
              <table className="w-full">
                <tbody>
                  {priceSlabs.map((slab) => (
                    <tr key={slab.qty} className="border-b border-[#1a1a1a]">
                      <td className="py-4 font-poppins font-semibold text-sm text-white">{slab.qty}</td>
                      <td className="py-4 font-poppins text-sm text-[#e88724]">{slab.price}</td>
                      <td className="py-4 font-poppins text-sm text-[#a0a0a0] text-right">Margin: {slab.margin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Margin Chart */}
            <div ref={barRef} className="bg-[#111111] border border-[#1a1a1a] p-6 rounded-lg">
              <h3 className="font-poppins font-semibold text-sm text-white mb-4">
                Gross Margin at Volume
              </h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={marginData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                  <XAxis dataKey="qty" tick={{ fill: '#a0a0a0', fontSize: 12, fontFamily: 'Poppins' }} axisLine={{ stroke: '#1a1a1a' }} />
                  <YAxis tick={{ fill: '#a0a0a0', fontSize: 12, fontFamily: 'Poppins' }} axisLine={{ stroke: '#1a1a1a' }} unit="%" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="margin" fill="#e88724" radius={[4, 4, 0, 0]} name="Margin %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Insight Note */}
        <div
          ref={noteRef}
          className="mt-10 max-w-[700px] border-l-2 border-[#e88724] pl-5"
        >
          <p className="font-poppins text-sm italic text-[#a0a0a0] leading-relaxed">
            Healthy premium positioning while commercially scalable. The 1000-pc tier delivers strong volume viability at 31% gross margin.
          </p>
        </div>
      </div>
    </section>
  )
}

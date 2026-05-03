import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Shield, Maximize2, Cable, Smartphone, CreditCard,
  PenTool, Headphones, FolderOpen, Shirt,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const compartments = [
  {
    icon: Shield,
    num: '01',
    title: 'RFID-Shielded Pocket',
    desc: 'Blocks wireless skimming — secures passports, credit cards, and access badges.',
    position: 'Front panel (hidden zip)',
  },
  {
    icon: Smartphone,
    num: '02',
    title: 'MagSafe Device Dock',
    desc: 'Padded magnetic alignment zone for wireless charging on the go.',
    position: 'Top interior flap',
  },
  {
    icon: Cable,
    num: '03',
    title: 'Cable Management Bay',
    desc: 'Elastic loop organizer for chargers, USB cables, and adapters.',
    position: 'Interior side panel',
  },
  {
    icon: FolderOpen,
    num: '04',
    title: 'Document Sleeve',
    desc: 'A4-size slip pocket for contracts, boarding passes, and folders.',
    position: 'Rear flat compartment',
  },
  {
    icon: CreditCard,
    num: '05',
    title: 'Quick-Access Card Slot',
    desc: 'External slip pocket for metro cards, ID badges, and boarding passes.',
    position: 'Front exterior panel',
  },
  {
    icon: PenTool,
    num: '06',
    title: 'Pen & Stylus Holder',
    desc: 'Dedicated elastic slots for 3 pens or styluses — prevents rolling.',
    position: 'Interior organizer strip',
  },
  {
    icon: Headphones,
    num: '07',
    title: 'Padded Tech Pouch',
    desc: 'Soft-lined compartment for earbuds, power banks, and small electronics.',
    position: 'Central zippered section',
  },
  {
    icon: Maximize2,
    num: '08',
    title: 'Expandable Main Chamber',
    desc: '+40% volume expansion via hidden zipper — converts from daily carry to overnight bag.',
    position: 'Core compartment',
    highlight: true,
  },
  {
    icon: Shirt,
    num: '09',
    title: 'Garment Compression Zone',
    desc: 'Mesh divider with compression straps — keeps a folded shirt wrinkle-free.',
    position: 'Expandable rear section',
  },
]

export default function DesignBlueprint() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const imageRef = useRef<HTMLDivElement>(null)
  const uniqueRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 25,
        opacity: 0,
        duration: 0.5,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      gsap.from(imageRef.current, {
        x: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 85%',
        },
      })

      gsap.from(uniqueRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: uniqueRef.current,
          start: 'top 90%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-[120px] px-6 md:px-16 bg-[#050505]" id="design">
      <div className="max-w-7xl mx-auto">
        <span className="font-poppins font-semibold text-xs uppercase tracking-[2px] text-[#e88724]">
          DESIGN & FEATURES
        </span>
        <h2 className="font-poppins font-medium text-[32px] md:text-4xl text-white mt-4 max-w-[700px] leading-[1.2]">
          9-Compartment Technical Blueprint
        </h2>
        <p className="font-poppins text-sm text-[#a0a0a0] mt-3 max-w-[550px]">
          Every pocket engineered for the modern professional's daily carry, business travel, and overnight stays.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-16">
          {/* Compartment grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {compartments.map((c, i) => {
              const Icon = c.icon
              return (
                <div
                  key={c.num}
                  ref={(el) => { cardsRef.current[i] = el }}
                  className={`p-5 rounded-lg border transition-colors duration-300 group ${
                    c.highlight
                      ? 'bg-[rgba(232,135,36,0.08)] border-[#e88724] hover:bg-[rgba(232,135,36,0.14)]'
                      : 'bg-[#111111] border-[#1a1a1a] hover:border-[#333]'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      className={`w-5 h-5 flex-shrink-0 ${c.highlight ? 'text-[#e88724]' : 'text-[#666]'}`}
                      strokeWidth={1.5}
                    />
                    <span className={`font-poppins font-bold text-xs ${c.highlight ? 'text-[#e88724]' : 'text-[#555]'}`}>
                      {c.num}
                    </span>
                  </div>
                  <h3 className={`font-poppins font-semibold text-[13px] uppercase tracking-wider mb-2 ${
                    c.highlight ? 'text-[#e88724]' : 'text-white'
                  }`}>
                    {c.title}
                  </h3>
                  <p className="font-poppins text-xs text-[#a0a0a0] leading-relaxed mb-2">
                    {c.desc}
                  </p>
                  <span className="font-poppins text-[10px] uppercase tracking-wider text-[#555]">
                    ↳ {c.position}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Product image */}
          <div ref={imageRef} className="flex flex-col items-center justify-center gap-6">
            <div className="relative">
              <img
                src="images/frame-05.jpg"
                alt="Ideacraft Nomad Tech Organizer — compartment view"
                className="w-full max-w-[360px] h-auto object-contain rounded-lg"
              />
              <div
                className="absolute inset-0 rounded-lg opacity-15 blur-2xl pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(232,135,36,0.5) 0%, transparent 70%)',
                }}
              />
            </div>

            {/* Quick specs */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-[360px]">
              {[
                { label: 'Compartments', value: '9' },
                { label: 'Capacity', value: '22L' },
                { label: 'Expansion', value: '+40%' },
              ].map((s) => (
                <div key={s.label} className="text-center bg-[#111111] border border-[#1a1a1a] rounded-lg py-3 px-2">
                  <span className="block font-poppins font-bold text-lg text-[#e88724]">{s.value}</span>
                  <span className="block font-poppins text-[10px] uppercase tracking-wider text-[#666] mt-0.5">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Unique Feature Highlight */}
        <div
          ref={uniqueRef}
          className="mt-14 border border-[#e88724] rounded-lg p-8 md:p-10 flex flex-col md:flex-row items-start gap-6"
          style={{ background: 'linear-gradient(135deg, rgba(232,135,36,0.06) 0%, transparent 60%)' }}
        >
          <div className="flex-shrink-0 w-14 h-14 rounded-full border-2 border-[#e88724] flex items-center justify-center">
            <Maximize2 className="w-6 h-6 text-[#e88724]" strokeWidth={1.5} />
          </div>
          <div>
            <span className="font-poppins font-semibold text-[11px] uppercase tracking-[2px] text-[#e88724]">
              UNIQUE DIFFERENTIATING FEATURE
            </span>
            <h3 className="font-poppins font-semibold text-xl text-white mt-2">
              Expandable Core Technology
            </h3>
            <p className="font-poppins text-sm text-[#a0a0a0] mt-2 leading-relaxed max-w-[600px]">
              A hidden perimeter zipper transforms the Nomad from a slim 22L daily organizer into a 31L overnight bag — 
              accommodating a change of clothes, toiletries, and documents without needing a second bag. 
              No competitor in the corporate gifting space offers this dual-mode functionality.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

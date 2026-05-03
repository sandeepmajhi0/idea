import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Leaf, Lightbulb, Briefcase, Eye, Factory, Heart } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const cards = [
  {
    icon: Leaf,
    title: 'Sustainability',
    desc: 'RPET ballistic weave, recycled polyester lining, vegan leather trim \u2014 every material chosen with environmental accountability.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    desc: 'Tech-forward compartments for modern professionals \u2014 RFID protection, MagSafe dock, cable management.',
  },
  {
    icon: Briefcase,
    title: 'Corporate Utility',
    desc: 'Designed for the daily commute, business travel, and overnight stays \u2014 one bag for every work scenario.',
  },
  {
    icon: Eye,
    title: 'Premium Branding Visibility',
    desc: 'Elegant debossing zones, signature orange zipper pulls, and high-retention design ensure lasting brand recall.',
  },
  {
    icon: Factory,
    title: 'Scalable Manufacturing',
    desc: "Leveraging India's vendor ecosystem \u2014 Surat fabrics, Delhi NCR assembly, Bhiwandi packaging for volume agility.",
  },
  {
    icon: Heart,
    title: 'High Retention Gift Value',
    desc: "Utility-driven design creates daily brand touchpoints. This bag won't sit in a drawer \u2014 it travels.",
  },
]

export default function BrandAlignment() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-[120px] px-6 md:px-16 bg-black" id="strategy">
      <div className="max-w-7xl mx-auto">
        <span className="font-poppins font-semibold text-xs uppercase tracking-[2px] text-[#e88724]">
          BRAND ALIGNMENT
        </span>
        <h2 className="font-poppins font-medium text-[32px] text-white mt-4 max-w-[700px] leading-[1.2]">
          Built Specifically for Ideacraft&apos;s Modern Business Merchandise Ecosystem
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {cards.map((card, i) => {
            const Icon = card.icon
            return (
              <div
                key={card.title}
                ref={(el) => { cardsRef.current[i] = el }}
                className="bg-[#111111] border border-[#1a1a1a] p-10 hover:border-[#e88724] transition-colors duration-300 group"
              >
                <Icon className="w-8 h-8 text-[#e88724] mb-5" strokeWidth={1.5} />
                <h3 className="font-poppins font-semibold text-base uppercase tracking-wider text-white mb-3">
                  {card.title}
                </h3>
                <p className="font-poppins text-sm text-[#a0a0a0] leading-relaxed">
                  {card.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

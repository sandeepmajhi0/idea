import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { UserPlus, Crown, Trophy, Calendar, Handshake, HeartHandshake, Gift, Rocket, Globe } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const useCases = [
  {
    icon: UserPlus,
    title: 'New Employee Welcome Kits',
    desc: 'Make first impressions count. The Nomad becomes a daily companion from day one.',
  },
  {
    icon: Crown,
    title: 'Leadership Gifting',
    desc: 'CXO-level quality that reflects the stature of the recipient and the brand.',
  },
  {
    icon: Trophy,
    title: 'Annual Reward Programs',
    desc: 'Replace forgettable trophies with a premium utility gift that earns gratitude.',
  },
  {
    icon: Calendar,
    title: 'Event Merchandise',
    desc: 'Conference giveaways that attendees actually keep and use.',
  },
  {
    icon: Handshake,
    title: 'Channel Partner Gifts',
    desc: 'Strengthen relationships with partners through thoughtful, lasting utility.',
  },
  {
    icon: HeartHandshake,
    title: 'Client Retention Gifts',
    desc: 'Show appreciation with a gift that travels \u2014 and keeps your brand visible.',
  },
  {
    icon: Gift,
    title: 'Festival & Diwali Gifting',
    desc: 'Elevate festive corporate gifting beyond sweets and hampers with a gift that lasts all year.',
  },
  {
    icon: Rocket,
    title: 'Startup Investor Kits',
    desc: 'Impress investors and advisors with a premium-branded bag that signals ambition and taste.',
  },
  {
    icon: Globe,
    title: 'Export & International Clients',
    desc: 'Ship globally as a premium India-made gift — sustainable credentials appeal worldwide.',
  },
]

export default function UseCases() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 30,
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
          USE CASES
        </span>
        <h2 className="font-poppins font-medium text-4xl text-white mt-4">
          Designed for Every Corporate Gifting Scenario
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {useCases.map((uc, i) => {
            const Icon = uc.icon
            return (
              <div
                key={uc.title}
                ref={(el) => { cardsRef.current[i] = el }}
                className="bg-[#111111] border border-[#1a1a1a] p-10 text-center rounded-lg hover:-translate-y-1 hover:border-[#e88724] hover:shadow-[0_8px_32px_rgba(232,135,36,0.1)] transition-all duration-300"
              >
                <Icon className="w-10 h-10 text-[#e88724] mx-auto mb-5" strokeWidth={1.5} />
                <h3 className="font-poppins font-semibold text-base text-white mb-3">
                  {uc.title}
                </h3>
                <p className="font-poppins text-sm text-[#a0a0a0] leading-relaxed">
                  {uc.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

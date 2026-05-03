import { useEffect, useState } from 'react'

const navLinks = [
  { label: 'Product', href: '#product' },
  { label: 'Design', href: '#design' },
  { label: 'Strategy', href: '#strategy' },
  { label: 'Sustainability', href: '#sustainability' },
  { label: 'Market', href: '#market' },
  { label: 'Costing', href: '#costing' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-16 transition-all duration-300 ${
          scrolled || mobileOpen ? 'bg-black/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="font-poppins font-semibold text-sm uppercase tracking-[2px] text-white">
            IDEACRAFT NOMAD
          </span>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="font-poppins text-[13px] text-[#a0a0a0] hover:text-[#e88724] transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <button className="hidden md:block border border-[#e88724] text-[#e88724] px-5 py-2 font-poppins text-xs uppercase tracking-wider hover:bg-[#e88724] hover:text-black transition-all duration-300">
          Download Proposal
        </button>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[6px]"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          <span
            className={`block w-6 h-[2px] bg-white rounded transition-all duration-300 ${
              mobileOpen ? 'translate-y-[8px] rotate-45' : ''
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-white rounded transition-all duration-300 ${
              mobileOpen ? 'opacity-0 scale-x-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-white rounded transition-all duration-300 ${
              mobileOpen ? '-translate-y-[8px] -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-all duration-400 md:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: '64px' }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 -mt-16">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="font-poppins text-xl font-medium text-white hover:text-[#e88724] transition-colors duration-300"
              style={{
                transitionDelay: mobileOpen ? `${i * 60}ms` : '0ms',
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.3s, transform 0.3s, color 0.3s',
              }}
            >
              {link.label}
            </a>
          ))}
          <button
            className="mt-4 border border-[#e88724] text-[#e88724] px-8 py-3 font-poppins text-sm uppercase tracking-wider hover:bg-[#e88724] hover:text-black transition-all duration-300"
            style={{
              transitionDelay: mobileOpen ? `${navLinks.length * 60}ms` : '0ms',
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.3s, transform 0.3s, background-color 0.3s, color 0.3s',
            }}
          >
            Download Proposal
          </button>
        </div>
      </div>
    </>
  )
}

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../../hooks/useReducedMotion'
import SectionLabel from '../layout/SectionLabel'
import Badge from '../ui/Badge'
import { Link } from 'react-router-dom'

export default function Hero() {
  const headRef      = useRef(null)
  const subRef       = useRef(null)
  const actionsRef   = useRef(null)
  const indicatorRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set([headRef.current, subRef.current, actionsRef.current, indicatorRef.current], { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
      const el  = headRef.current

      if (el) {
        const words = el.textContent.trim().split(/\s+/)
        el.innerHTML = words.map(w =>
          `<span style="overflow:hidden;display:inline-block;vertical-align:bottom"><span class="w" style="display:inline-block">${w}</span></span>`
        ).join(' ')
        tl.fromTo(el.querySelectorAll('.w'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.06, duration: 0.7, delay: 0.2 }
        )
      }

      tl.fromTo(subRef.current,     { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.3')
        .fromTo(actionsRef.current,  { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.3')
        .fromTo(indicatorRef.current,{ y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.1')
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: '#1D2B1D' }}
    >
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23F6F0E8' fill-rule='evenodd'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Hero image — right column, bleeds to edge */}
      <div className="absolute top-0 right-0 bottom-0 w-[45%] hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80&fit=crop&crop=top"
          alt="MPSM Services — South African enterprise leadership"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        {/* Forest tint overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(29,43,29,0.80) 0%, rgba(29,43,29,0.45) 55%, rgba(29,43,29,0.65) 100%)',
          }}
        />
        {/* Fade left edge into the dark section */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, #1D2B1D 0%, transparent 28%)' }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-[110px] pb-24 w-full">
        <div style={{ maxWidth: '58ch' }}>
          <div className="mb-6">
            <SectionLabel light>MPSM Services</SectionLabel>
          </div>

          <h1 ref={headRef} className="font-serif text-[#F6F0E8] mb-6">
            Enterprise Solutions Built for South Africa
          </h1>

          <p ref={subRef} className="font-sans text-lg text-[#F6F0E8]/65 leading-relaxed mb-10" style={{ maxWidth: '50ch' }}>
            A Level 1 BBBEE, 100% Black women-owned enterprise delivering IT, water, procurement, and energy solutions to South Africa's leading organisations.
          </p>

          <div ref={actionsRef} className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link
              to="/#divisions"
              className="inline-flex items-center justify-center font-sans font-semibold text-sm rounded-full px-8 py-3.5 min-h-[48px] transition-colors duration-200"
              style={{ backgroundColor: '#C4763A', color: '#F6F0E8' }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = '#A8612E'}
              onMouseOut={e  => e.currentTarget.style.backgroundColor = '#C4763A'}
            >
              Explore Our Divisions
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center font-sans font-semibold text-sm rounded-full px-8 py-3.5 min-h-[48px] transition-colors duration-200 border"
              style={{ color: '#F6F0E8', borderColor: 'rgba(246,240,232,0.35)', backgroundColor: 'transparent' }}
              onMouseOver={e => { e.currentTarget.style.backgroundColor = 'rgba(246,240,232,0.08)'; e.currentTarget.style.borderColor = 'rgba(246,240,232,0.6)' }}
              onMouseOut={e  => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(246,240,232,0.35)' }}
            >
              Partner With Us
            </Link>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="clay">Level 1 BBBEE</Badge>
            <Badge variant="clay">100% Black Women Owned</Badge>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={indicatorRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-sans text-[10px] tracking-[0.12em] uppercase" style={{ color: 'rgba(246,240,232,0.3)' }}>Scroll</span>
        <div className="w-px h-10" style={{ backgroundColor: 'rgba(246,240,232,0.15)' }} />
      </div>
    </section>
  )
}

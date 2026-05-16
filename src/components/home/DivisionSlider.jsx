import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../../hooks/useReducedMotion'

const SLIDES = [
  {
    id:       'it-consulting',
    num:      '01',
    name:     'IT Consulting & Infrastructure',
    tagline:  'Resilient, scalable technology for South African enterprise: cloud migration, cybersecurity, and 24/7 managed IT.',
    caps:     ['Cloud Migration', 'Cybersecurity', 'Network Design'],
    href:     '/it-consulting',
    img:      'https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?w=1400&q=80&fit=crop&crop=center',
    imgAlt:   'Enterprise data centre server infrastructure',
  },
  {
    id:       'water',
    num:      '02',
    name:     'Water & Beverage Supply',
    tagline:  'Advanced reverse osmosis purification and reliable bulk supply for corporate and industrial clients.',
    caps:     ['Reverse Osmosis', 'Bulk Supply', 'Custom Bottling'],
    href:     '/water',
    img:      'https://images.unsplash.com/photo-1519455953755-af066f52f1a6?w=1400&q=80&fit=crop&crop=center',
    imgAlt:   'Industrial water treatment facility',
  },
  {
    id:       'procurement',
    num:      '03',
    name:     'Procurement (PaaS)',
    tagline:  'Strategic sourcing as a managed service, turning your supply chain from a cost centre into a competitive advantage.',
    caps:     ['Vendor Management', 'Cost Optimisation', 'BBBEE Sourcing'],
    href:     '/procurement',
    img:      'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=1400&q=80&fit=crop&crop=center',
    imgAlt:   'Enterprise warehouse and logistics operations',
  },
  {
    id:       'energy',
    num:      '04',
    name:     'Energy Solutions',
    tagline:  'Sustainable, grid-independent power systems that eliminate load shedding and reduce your carbon footprint.',
    caps:     ['Commercial Solar', 'Backup Power', 'Energy Audits'],
    href:     '/energy',
    img:      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1400&q=80&fit=crop&crop=center',
    imgAlt:   'Commercial solar array installation',
  },
]

const INTERVAL = 5500

export default function DivisionSlider() {
  const [current, setCurrent]   = useState(0)
  const [animating, setAnimating] = useState(false)
  const slidesRef   = useRef([])
  const contentsRef = useRef([])
  const progressRef = useRef(null)
  const timerRef    = useRef(null)
  const pausedRef   = useRef(false)

  const goTo = useCallback((next, dir = 1) => {
    if (animating || next === current) return
    setAnimating(true)

    const reduced = prefersReducedMotion()
    const from  = slidesRef.current[current]
    const to    = slidesRef.current[next]
    const cFrom = contentsRef.current[current]
    const cTo   = contentsRef.current[next]

    if (reduced) {
      gsap.set(from, { opacity: 0, zIndex: 1 })
      gsap.set(to,   { opacity: 1, zIndex: 2 })
      gsap.set(cFrom, { opacity: 0 })
      gsap.set(cTo,   { opacity: 1, y: 0 })
      setCurrent(next)
      setAnimating(false)
      return
    }

    gsap.set(to, { opacity: 0, zIndex: 2 })
    gsap.set(from, { zIndex: 1 })

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(from, { opacity: 0, zIndex: 1 })
        setCurrent(next)
        setAnimating(false)
      }
    })

    tl.to(cFrom, { y: dir * -20, opacity: 0, duration: 0.4, ease: 'power2.in' }, 0)
      .to(to,    { opacity: 1, duration: 0.7, ease: 'power2.inOut' }, 0.15)
      .fromTo(cTo,
        { y: dir * 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        0.4
      )
  }, [current, animating])

  const advance = useCallback(() => {
    if (!pausedRef.current) goTo((current + 1) % SLIDES.length)
  }, [current, goTo])

  /* Auto-advance — disabled entirely when user prefers reduced motion (WCAG 2.2.2) */
  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = setInterval(advance, INTERVAL)
    return () => clearInterval(id)
  }, [advance])

  /* Progress bar reset on slide change */
  useEffect(() => {
    if (prefersReducedMotion() || !progressRef.current) return
    gsap.fromTo(progressRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: INTERVAL / 1000, ease: 'none' }
    )
  }, [current])

  /* Initialise: ensure correct opacity on first render */
  useEffect(() => {
    SLIDES.forEach((_, i) => {
      if (!slidesRef.current[i]) return
      gsap.set(slidesRef.current[i], { opacity: i === 0 ? 1 : 0, zIndex: i === 0 ? 2 : 1 })
      gsap.set(contentsRef.current[i], { opacity: i === 0 ? 1 : 0, y: 0 })
    })
  }, [])

  return (
    <section
      className="relative overflow-hidden"
      style={{ height: '88vh', minHeight: '560px', backgroundColor: '#1D2B1D' }}
      onMouseEnter={() => { pausedRef.current = true }}
      onMouseLeave={() => { pausedRef.current = false }}
      onKeyDown={e => {
        if (e.key === 'ArrowLeft')  goTo((current - 1 + SLIDES.length) % SLIDES.length, -1)
        if (e.key === 'ArrowRight') goTo((current + 1) % SLIDES.length, 1)
      }}
      tabIndex={-1}
      aria-roledescription="carousel"
      aria-label="MPSM Services divisions"
    >
      {/* Live region — announces current slide to screen readers */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {SLIDES[current].name} — slide {current + 1} of {SLIDES.length}
      </div>
      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          ref={el => slidesRef.current[i] = el}
          className="absolute inset-0"
          style={{ opacity: i === 0 ? 1 : 0, zIndex: i === 0 ? 2 : 1 }}
        >
          {/* Background image */}
          <img
            src={slide.img}
            alt={slide.imgAlt}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
            loading={i === 0 ? 'eager' : 'lazy'}
          />

          {/* Forest tint overlay — unifies all images with SA earth palette */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(29,43,29,0.82) 0%, rgba(29,43,29,0.55) 50%, rgba(29,43,29,0.70) 100%)',
              mixBlendMode: 'multiply',
            }}
          />
          {/* Bottom gradient for text readability */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(29,43,29,0.90) 0%, rgba(29,43,29,0.3) 45%, transparent 75%)',
            }}
          />
        </div>
      ))}

      {/* Slide content */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id + '-content'}
          ref={el => contentsRef.current[i] = el}
          className="absolute inset-0 flex items-end"
          style={{ opacity: i === 0 ? 1 : 0, zIndex: 10 }}
        >
          <div className="container pb-20 w-full">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

              {/* Left — main content */}
              <div style={{ maxWidth: '54ch' }}>
                <p className="font-serif font-bold text-[#F6F0E8]/20 mb-4 select-none leading-none"
                   style={{ fontSize: 'clamp(4rem, 8vw, 7rem)' }}>
                  {slide.num}
                </p>
                <h2 className="font-serif text-[#F6F0E8] mb-4" style={{ maxWidth: '100%' }}>
                  {slide.name}
                </h2>
                <p className="font-sans text-[#F6F0E8]/65 text-lg leading-relaxed mb-6" style={{ maxWidth: '48ch' }}>
                  {slide.tagline}
                </p>

                {/* Capability pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {slide.caps.map(cap => (
                    <span
                      key={cap}
                      className="font-sans text-[11px] font-medium rounded-full px-3 py-1"
                      style={{ backgroundColor: 'rgba(246,240,232,0.1)', color: 'rgba(246,240,232,0.7)', border: '1px solid rgba(246,240,232,0.15)' }}
                    >
                      {cap}
                    </span>
                  ))}
                </div>

                <Link
                  to={slide.href}
                  className="inline-flex items-center justify-center font-sans font-semibold text-sm rounded-full px-8 py-3.5 min-h-[48px] transition-colors duration-200"
                  style={{ backgroundColor: '#C4763A', color: '#F6F0E8' }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = '#A8612E'}
                  onMouseOut={e  => e.currentTarget.style.backgroundColor = '#C4763A'}
                >
                  Explore {slide.name.split(' ')[0]} →
                </Link>
              </div>

              {/* Right — navigation */}
              <div className="flex flex-row lg:flex-col items-center lg:items-end gap-5">
                {/* Slide dots */}
                <div className="flex lg:flex-col gap-2">
                  {SLIDES.map((s, di) => (
                    <button
                      key={s.id}
                      onClick={() => goTo(di, di > current ? 1 : -1)}
                      aria-label={`Go to ${s.name}`}
                      className="transition-all duration-300"
                      style={{
                        width:  di === i ? '28px' : '8px',
                        height: '8px',
                        borderRadius: '4px',
                        backgroundColor: di === i ? '#C4763A' : 'rgba(246,240,232,0.3)',
                      }}
                    />
                  ))}
                </div>

                {/* Prev / Next */}
                <div className="flex gap-2">
                  <button
                    onClick={() => goTo((current - 1 + SLIDES.length) % SLIDES.length, -1)}
                    aria-label="Previous division"
                    className="min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center transition-colors duration-200"
                    style={{ border: '1px solid rgba(246,240,232,0.25)', color: '#F6F0E8' }}
                    onMouseOver={e => e.currentTarget.style.borderColor = '#C4763A'}
                    onMouseOut={e  => e.currentTarget.style.borderColor = 'rgba(246,240,232,0.25)'}
                  >
                    ←
                  </button>
                  <button
                    onClick={() => goTo((current + 1) % SLIDES.length, 1)}
                    aria-label="Next division"
                    className="min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center transition-colors duration-200"
                    style={{ border: '1px solid rgba(246,240,232,0.25)', color: '#F6F0E8' }}
                    onMouseOver={e => e.currentTarget.style.borderColor = '#C4763A'}
                    onMouseOut={e  => e.currentTarget.style.borderColor = 'rgba(246,240,232,0.25)'}
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] z-20" style={{ backgroundColor: 'rgba(246,240,232,0.08)' }}>
        <div
          ref={progressRef}
          className="h-full origin-left"
          style={{ backgroundColor: '#C4763A', transform: 'scaleX(0)' }}
        />
      </div>
    </section>
  )
}

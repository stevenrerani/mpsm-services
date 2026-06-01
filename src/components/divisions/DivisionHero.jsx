import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../../hooks/useReducedMotion'
import Badge from '../ui/Badge'

/* Matched to the homepage DivisionSlider images for visual continuity */
const IMAGES = {
  'it-consulting': 'https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?w=900&q=80&fit=crop&crop=center',
  water:           'https://images.unsplash.com/photo-1519455953755-af066f52f1a6?w=900&q=80&fit=crop&crop=center',
  procurement:     'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=900&q=80&fit=crop&crop=center',
  energy:          'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=900&q=80&fit=crop&crop=center',
}

export default function DivisionHero({ division }) {
  const headRef = useRef(null)
  const subRef  = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set([headRef.current, subRef.current], { opacity: 1, y: 0 })
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
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.06, duration: 0.7, delay: 0.15 }
        )
      }

      tl.fromTo(subRef.current, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.2')
    })

    return () => ctx.revert()
  }, [])

  const img = IMAGES[division.id]

  return (
    <section
      className="relative min-h-[72vh] flex items-end overflow-hidden"
      style={{ backgroundColor: '#1D2B1D' }}
    >
      {/* Off-grid image — bleeds to right edge */}
      {img && (
        <div className="absolute top-[72px] right-0 bottom-0 w-[42%] lg:w-[38%] hidden lg:block">
          <img
            src={img}
            alt={`${division.title} — MPSM Services`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ borderRadius: '40px 0 0 40px' }}
            loading="eager"
          />
          {/* Forest tint matching slider palette */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(29,43,29,0.75) 0%, rgba(29,43,29,0.40) 60%, rgba(29,43,29,0.60) 100%)',
              borderRadius: '40px 0 0 40px',
            }}
          />
          {/* Fade to the left so text area is clear */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, #1D2B1D 0%, transparent 30%)',
              borderRadius: '40px 0 0 40px',
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="container relative z-10 pt-[110px] pb-16 lg:pb-20 w-full">
        <div style={{ maxWidth: '58ch' }}>
          <div className="flex flex-wrap gap-2.5 mb-6">
            <Badge variant="clay">MPSM Services</Badge>
          </div>
          <h1 ref={headRef} className="font-serif text-[#F6F0E8] mb-5" style={{ maxWidth: '100%' }}>
            {division.title}
          </h1>
          <p ref={subRef} className="font-sans text-lg text-[#F6F0E8]/60 leading-relaxed" style={{ maxWidth: '52ch' }}>
            {division.overview.length > 180 ? division.overview.slice(0, 180) + '…' : division.overview}
          </p>
          <div className="mt-8 w-16 h-[2px]" style={{ backgroundColor: '#C4763A' }} />
        </div>
      </div>
    </section>
  )
}

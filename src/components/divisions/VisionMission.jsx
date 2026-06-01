import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../../hooks/useReducedMotion'

export default function VisionMission({ division }) {
  const rowRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rowRef.current?.children,
        { y: 28, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.15, duration: 0.7,
          scrollTrigger: { trigger: rowRef.current, start: 'top 84%', toggleActions: 'play none none none' },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="section-py bg-sand">
      <div className="container">
        <div ref={rowRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <p className="font-sans font-semibold text-xs tracking-[0.1em] uppercase mb-5 text-ink-muted">
              Vision
            </p>
            <p className="font-serif text-xl md:text-2xl leading-relaxed text-forest">
              {division.vision}
            </p>
          </div>

          <div>
            <p className="font-sans font-semibold text-xs tracking-[0.1em] uppercase mb-5 text-ink-muted">
              Mission
            </p>
            <p className="font-serif text-xl md:text-2xl leading-relaxed text-forest">
              {division.mission}
            </p>
            <div className="mt-8 w-12 h-[2px] bg-clay" />
          </div>
        </div>
      </div>
    </section>
  )
}

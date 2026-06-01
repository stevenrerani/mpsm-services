import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../../hooks/useReducedMotion'

export default function ServiceSection({ services }) {
  const listRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        listRef.current?.querySelectorAll('.svc-row'),
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.7,
          scrollTrigger: { trigger: listRef.current, start: 'top 82%', toggleActions: 'play none none none' },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="section-py bg-sand-deep">
      <div className="container">
        <h2 className="font-serif text-forest mb-12 lg:mb-16">Service Areas</h2>

        <div ref={listRef} className="flex flex-col divide-y border-border divide-border">
          {services.map((svc, i) => (
            <div key={svc.title} className="svc-row grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 py-10 lg:py-12">
              {/* Number */}
              <div className="lg:col-span-1">
                <span className="font-serif font-bold text-5xl lg:text-6xl select-none text-border opacity-70">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Title + description */}
              <div className="lg:col-span-6">
                <h3 className="font-serif text-2xl lg:text-3xl font-semibold text-forest mb-4 max-w-none">
                  {svc.title}
                </h3>
                <p className="font-sans text-[0.9375rem] text-ink-mid leading-relaxed max-w-[50ch]">
                  {svc.description}
                </p>
              </div>

              {/* Capabilities */}
              <div className="lg:col-span-5">
                <p className="font-sans font-semibold text-xs tracking-[0.08em] uppercase text-ink-muted mb-4">
                  Capabilities
                </p>
                <ul className="flex flex-col gap-2.5">
                  {svc.capabilities.map(cap => (
                    <li key={cap} className="flex items-center gap-3 font-sans text-sm text-ink-mid">
                      <span className="w-1 h-1 rounded-full shrink-0 bg-clay" />
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

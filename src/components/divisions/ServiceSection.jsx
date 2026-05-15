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
    <section className="section-py" style={{ backgroundColor: '#EDE4D8' }}>
      <div className="container">
        <h2 className="font-serif text-[#1D2B1D] mb-12 lg:mb-16">Service Areas</h2>

        <div ref={listRef} className="flex flex-col divide-y" style={{ borderColor: '#D8CEC4' }}>
          {services.map((svc, i) => (
            <div key={svc.title} className="svc-row grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 py-10 lg:py-12">
              {/* Number */}
              <div className="lg:col-span-1">
                <span className="font-serif font-bold text-4xl select-none" style={{ color: '#D8CEC4' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Title + description */}
              <div className="lg:col-span-6">
                <h3 className="font-serif text-xl font-semibold text-[#1D2B1D] mb-4 max-w-none">
                  {svc.title}
                </h3>
                <p className="font-sans text-[0.9375rem] text-[#5A6A52] leading-relaxed">
                  {svc.description}
                </p>
              </div>

              {/* Capabilities */}
              <div className="lg:col-span-5">
                <p className="font-sans font-semibold text-xs tracking-[0.08em] uppercase text-[#8A9A82] mb-4">
                  Capabilities
                </p>
                <ul className="flex flex-col gap-2.5">
                  {svc.capabilities.map(cap => (
                    <li key={cap} className="flex items-center gap-3 font-sans text-sm text-[#5A6A52]">
                      <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: '#C4763A' }} />
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

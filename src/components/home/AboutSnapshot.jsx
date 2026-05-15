import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../../hooks/useReducedMotion'
import ImagePlaceholder from '../ui/ImagePlaceholder'
import { Link } from 'react-router-dom'

export default function AboutSnapshot() {
  const leftRef  = useRef(null)
  const rightRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: leftRef.current, start: 'top 82%', toggleActions: 'play none none none' },
        }
      )
      gsap.fromTo(rightRef.current,
        { x: 30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, delay: 0.1,
          scrollTrigger: { trigger: rightRef.current, start: 'top 82%', toggleActions: 'play none none none' },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="section-py" style={{ backgroundColor: '#F6F0E8' }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — text */}
          <div ref={leftRef}>
            <h2 className="font-serif text-[#1D2B1D] mb-6">
              A different kind of enterprise partner.
            </h2>
            <div className="flex flex-col gap-5">
              <p className="font-sans text-[#5A6A52] text-[1.0625rem] leading-relaxed">
                MPSM Services operates at the intersection of critical infrastructure and strategic optimisation — delivering IT, water, procurement, and energy solutions that compound over time.
              </p>
              <p className="font-sans text-[#5A6A52] text-[1.0625rem] leading-relaxed">
                As a 100% Black women-owned, Level 1 BBBEE enterprise, we don't just deliver services — we develop organisations. Our approach is grounded in sustainable, long-term value for South African business.
              </p>
            </div>
            <div className="mt-8">
              <Link
                to="/contact"
                className="font-sans font-semibold text-sm transition-colors duration-200"
                style={{ color: '#C4763A' }}
                onMouseOver={e => e.currentTarget.style.color = '#A8612E'}
                onMouseOut={e  => e.currentTarget.style.color = '#C4763A'}
              >
                Work with us →
              </Link>
            </div>
          </div>

          {/* Right — image */}
          <div ref={rightRef} className="h-[480px] lg:h-[560px]">
            <ImagePlaceholder
              shape="organic2"
              palette="sage"
              alt="MPSM Services team — replace with photography"
              className="h-full w-full"
            />
          </div>

        </div>
      </div>
    </section>
  )
}

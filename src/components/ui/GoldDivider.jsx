import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function GoldDivider({ className = '', delay = 0 }) {
  const lineRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = lineRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          delay,
          ease: 'power3.out',
          transformOrigin: 'left',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <span
      ref={lineRef}
      className={`block h-[2px] bg-[#D4A843] origin-left ${className}`}
      aria-hidden="true"
    />
  )
}

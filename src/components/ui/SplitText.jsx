import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function SplitText({
  children,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  stagger = 0.06,
  y = 70,
  triggerStart = 'top 85%',
  scrub = false,
  withGoldLine = false,
  immediate = false,
}) {
  const wrapperRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const text = el.textContent
    const words = text.split(' ')

    el.innerHTML = words
      .map(
        (word) =>
          `<span class="word-wrap" style="overflow:hidden;display:inline-block;vertical-align:bottom"><span class="word" style="display:inline-block;will-change:transform">${word}</span></span>`
      )
      .join(' ')

    const wordEls = el.querySelectorAll('.word')

    const ctx = gsap.context(() => {
      if (immediate) {
        gsap.fromTo(
          wordEls,
          { y, opacity: 0 },
          { y: 0, opacity: 1, stagger, delay, duration: 0.9, ease: 'power3.out' }
        )
      } else {
        gsap.fromTo(
          wordEls,
          { y, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger,
            delay,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: triggerStart,
              toggleActions: 'play none none none',
            },
          }
        )
      }

      if (withGoldLine && lineRef.current) {
        const line = lineRef.current
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.1,
            delay: delay + stagger * words.length,
            ease: 'power3.out',
            transformOrigin: 'left',
            ...(immediate
              ? {}
              : {
                  scrollTrigger: {
                    trigger: el,
                    start: triggerStart,
                    toggleActions: 'play none none none',
                  },
                }),
          }
        )
      }
    })

    return () => ctx.revert()
  }, [children, delay, stagger, y, immediate])

  return (
    <div className="relative inline-block">
      <Tag ref={wrapperRef} className={className}>
        {children}
      </Tag>
      {withGoldLine && (
        <span
          ref={lineRef}
          className="block h-[2px] bg-[#D4A843] mt-2 origin-left"
          aria-hidden="true"
        />
      )}
    </div>
  )
}

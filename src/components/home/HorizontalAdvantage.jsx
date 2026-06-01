import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitText from '../ui/SplitText'
import advantages from '../../data/advantages'

export default function HorizontalAdvantage() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)
  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (prefersReduced) return
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    // Wait one frame so layout is stable
    const raf = requestAnimationFrame(() => {
      const cards = track.querySelectorAll('.adv-card')
      if (!cards.length) return

      const cardWidth = cards[0].offsetWidth
      const gap = 32
      const totalScroll = (cardWidth + gap) * (cards.length - 1)

      const ctx = gsap.context(() => {
        const tl = gsap.to(track, {
          x: -totalScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1.2,
            start: 'top top',
            end: `+=${totalScroll + 300}`,
            onUpdate: (self) => {
              if (progressRef.current) {
                gsap.set(progressRef.current, {
                  scaleX: self.progress,
                  transformOrigin: 'left',
                })
              }
            },
          },
        })
      })

      return () => {
        ctx.revert()
      }
    })

    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-sand overflow-hidden min-h-screen"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 pt-28 lg:pt-36 pb-16">
        {/* Header */}
        <div className="mb-14">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-gold mb-5">
            The MPSM Advantage
          </p>
          <SplitText
            as="h2"
            className="text-forest font-display text-4xl lg:text-5xl leading-[1.1] tracking-[-0.03em] max-w-xl"
            withGoldLine
          >
            Why leading enterprises choose MPSM
          </SplitText>
        </div>

        {/* Progress bar */}
        <div className="h-[1px] bg-forest/10 mb-12 overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-gold origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        {/* Horizontal track */}
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className={prefersReduced ? 'flex flex-col gap-6 sm:flex-row sm:flex-wrap' : 'flex gap-8'}
            style={{ width: prefersReduced ? '100%' : 'max-content' }}
          >
            {advantages.map((adv, i) => {
              const Icon = adv.icon
              return (
                <div
                  key={adv.id}
                  className="adv-card flex-shrink-0 p-10 lg:p-12 relative overflow-hidden bg-white border border-border"
                  style={{
                    width: prefersReduced ? undefined : 'clamp(320px, 36vw, 460px)',
                  }}
                >
                  {/* Large counter */}
                  <span className="absolute top-8 right-8 font-serif text-sand-deep text-6xl lg:text-7xl font-bold select-none opacity-50">
                    0{i + 1}
                  </span>

                  {/* Icon */}
                  <div className="w-14 h-14 flex items-center justify-center rounded-full mb-10 bg-sand">
                    <Icon size={24} className="text-clay" />
                  </div>

                  {/* Content */}
                  <h3 className="text-forest font-serif text-2xl lg:text-3xl mb-4 leading-tight">
                    {adv.title}
                  </h3>
                  <p className="text-ink-mid font-sans text-sm lg:text-base leading-relaxed mb-6">
                    {adv.description}
                  </p>
                  {adv.detail && (
                    <p className="text-ink-muted font-sans text-[11px] tracking-wide italic border-t border-border pt-5 mt-auto">
                      {adv.detail}
                    </p>
                  )}

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-clay opacity-80"
                    aria-hidden="true"
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

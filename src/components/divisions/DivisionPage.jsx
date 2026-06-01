import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import DivisionHero from './DivisionHero'
import VisionMission from './VisionMission'
import ServiceSection from './ServiceSection'

export default function DivisionPage({ division }) {
  return (
    <article>
      <DivisionHero division={division} />
      <VisionMission division={division} />
      <ServiceSection services={division.services} />

      {/* Water-specific: dedicated site callout */}
      {division.id === 'water' && (
        <section className="section-py bg-sand">
          <div className="container">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 py-8 border-t border-b border-border">
              <div>
                <p className="font-sans font-semibold text-xs tracking-[0.1em] uppercase mb-2 text-ink-muted">
                  Dedicated Platform
                </p>
                <p className="font-serif text-xl text-forest">
                  MPSM Water has its own dedicated presence online.
                </p>
              </div>
              <a
                href="https://www.mpsmwater.co.za"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-sans font-semibold text-sm shrink-0 transition-colors duration-200 text-clay hover:text-clay-dark"
              >
                Visit mpsmwater.co.za <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Division CTA — the ONE bold colour moment on division pages */}
      <section className="section-py bg-clay">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <h2 className="font-serif text-sand" style={{ maxWidth: '100%' }}>
                Ready to discuss your {division.title.toLowerCase()} needs?
              </h2>
              <p className="font-sans text-sand/75 mt-3" style={{ maxWidth: '48ch' }}>
                One conversation is all it takes. Our specialists are ready to scope your requirements and outline a tailored approach.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center font-sans font-semibold text-sm rounded-full px-8 py-3.5 min-h-[48px] transition-colors duration-200 bg-sand text-forest hover:bg-sand-deep"
              >
                Get in Touch →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}

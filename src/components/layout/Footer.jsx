import { Link } from 'react-router-dom'
import Badge from '../ui/Badge'
import contactInfo from '../../data/contact'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="section-py bg-forest">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">

          {/* Brand column */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <Link to="/" className="flex flex-col leading-none">
              <span className="font-serif text-2xl font-bold text-sand">MPSM</span>
              <span className="font-sans font-semibold text-[9px] tracking-[0.14em] uppercase mt-0.5 text-ink-muted">Services</span>
            </Link>
            <p className="font-sans text-sm leading-relaxed text-sand/45" style={{ maxWidth: '32ch' }}>
              End-to-end enterprise solutions for IT, water, procurement, and energy. South Africa's trusted Level 1 BBBEE partner.
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              <Badge variant="clay">Level 1 BBBEE</Badge>
              <Badge variant="clay">100% Black Women Owned</Badge>
            </div>
          </div>

          {/* Divisions column */}
          <div className="md:col-span-3">
            <p className="font-sans font-semibold text-xs tracking-[0.1em] uppercase mb-5 text-ink-muted">
              Divisions
            </p>
            <ul className="flex flex-col gap-3">
              {[
                { to: '/it-consulting', label: 'IT Consulting & Infrastructure' },
                { to: '/water',         label: 'Water & Beverage Supply' },
                { to: '/procurement',   label: 'Procurement (PaaS)' },
                { to: '/energy',        label: 'Energy Solutions' },
              ].map(l => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="font-sans text-sm transition-colors duration-200 text-sand/55 hover:text-sand"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div className="md:col-span-4">
            <p className="font-sans font-semibold text-xs tracking-[0.1em] uppercase mb-5 text-ink-muted">
              Contact
            </p>
            <ul className="flex flex-col gap-3">
              {contactInfo.emails.slice(0, 1).map(em => (
                <li key={em.href}>
                  <a
                    href={em.href}
                    className="font-sans text-sm transition-colors duration-200 text-sand/55 hover:text-clay"
                  >
                    {em.address}
                  </a>
                </li>
              ))}
              {contactInfo.phones.map(p => (
                <li key={p.href}>
                  <a
                    href={p.href}
                    className="font-sans text-sm transition-colors duration-200 text-sand/55 hover:text-sand"
                  >
                    {p.number}
                  </a>
                </li>
              ))}
              <li className="font-sans text-sm mt-1 text-sand/30">
                {contactInfo.address.suburb}, {contactInfo.address.city}
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-sand/10">
          <p className="font-sans text-xs text-sand/25">
            &copy; {year} MPSM Services (Pty) Ltd. Reg. {contactInfo.regNo}
          </p>
          <p className="font-sans text-xs text-sand/25">
            Pretoria · Johannesburg
          </p>
        </div>
      </div>
    </footer>
  )
}

import { Link } from 'react-router-dom'
import Badge from '../ui/Badge'
import contactInfo from '../../data/contact'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="section-py" style={{ backgroundColor: '#1D2B1D' }}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">

          {/* Brand column */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <Link to="/" className="flex flex-col leading-none">
              <span className="font-serif text-2xl font-bold" style={{ color: '#F6F0E8' }}>MPSM</span>
              <span className="font-sans font-semibold text-[9px] tracking-[0.14em] uppercase mt-0.5" style={{ color: '#8A9A82' }}>Services</span>
            </Link>
            <p className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(246,240,232,0.45)', maxWidth: '32ch' }}>
              End-to-end enterprise solutions for IT, water, procurement, and energy. South Africa's trusted Level 1 BBBEE partner.
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              <Badge variant="clay">Level 1 BBBEE</Badge>
              <Badge variant="clay">100% Black Women Owned</Badge>
            </div>
          </div>

          {/* Divisions column */}
          <div className="md:col-span-3">
            <p className="font-sans font-semibold text-xs tracking-[0.1em] uppercase mb-5" style={{ color: '#8A9A82' }}>
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
                    className="font-sans text-sm transition-colors duration-200"
                    style={{ color: 'rgba(246,240,232,0.55)' }}
                    onMouseOver={e => e.currentTarget.style.color = '#F6F0E8'}
                    onMouseOut={e  => e.currentTarget.style.color = 'rgba(246,240,232,0.55)'}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div className="md:col-span-4">
            <p className="font-sans font-semibold text-xs tracking-[0.1em] uppercase mb-5" style={{ color: '#8A9A82' }}>
              Contact
            </p>
            <ul className="flex flex-col gap-3">
              {contactInfo.emails.slice(0, 1).map(em => (
                <li key={em.href}>
                  <a
                    href={em.href}
                    className="font-sans text-sm transition-colors duration-200"
                    style={{ color: 'rgba(246,240,232,0.55)' }}
                    onMouseOver={e => e.currentTarget.style.color = '#C4763A'}
                    onMouseOut={e  => e.currentTarget.style.color = 'rgba(246,240,232,0.55)'}
                  >
                    {em.address}
                  </a>
                </li>
              ))}
              {contactInfo.phones.map(p => (
                <li key={p.href}>
                  <a
                    href={p.href}
                    className="font-sans text-sm transition-colors duration-200"
                    style={{ color: 'rgba(246,240,232,0.55)' }}
                    onMouseOver={e => e.currentTarget.style.color = '#F6F0E8'}
                    onMouseOut={e  => e.currentTarget.style.color = 'rgba(246,240,232,0.55)'}
                  >
                    {p.number}
                  </a>
                </li>
              ))}
              <li className="font-sans text-sm mt-1" style={{ color: 'rgba(246,240,232,0.3)' }}>
                {contactInfo.address.suburb}, {contactInfo.address.city}
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t flex flex-col sm:flex-row justify-between items-center gap-4 pt-8" style={{ borderColor: 'rgba(246,240,232,0.08)' }}>
          <p className="font-sans text-xs" style={{ color: 'rgba(246,240,232,0.25)' }}>
            &copy; {year} MPSM Services (Pty) Ltd. Reg. {contactInfo.regNo}
          </p>
          <p className="font-sans text-xs" style={{ color: 'rgba(246,240,232,0.25)' }}>
            Pretoria · Johannesburg
          </p>
        </div>
      </div>
    </footer>
  )
}

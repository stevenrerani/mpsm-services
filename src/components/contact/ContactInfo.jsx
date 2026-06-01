import { Phone, Mail, MapPin, Globe, ExternalLink } from 'lucide-react'
import contactInfo from '../../data/contact'
import Badge from '../ui/Badge'

export default function ContactInfo() {
  return (
    <div className="space-y-10">
      {/* Address */}
      <div>
        <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-gold mb-4">
          Head Office
        </p>
        <div className="flex gap-3">
          <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
          <div>
            <p className="font-heading font-bold text-forest text-sm mb-1">
              {contactInfo.address.line1}
            </p>
            <p className="font-body text-ink-muted text-sm leading-relaxed">
              {contactInfo.address.line2}<br />
              {contactInfo.address.suburb}, {contactInfo.address.city} {contactInfo.address.postalCode}
            </p>
          </div>
        </div>
      </div>

      {/* Service areas */}
      <div>
        <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-gold mb-3">
          Service Areas
        </p>
        <div className="flex gap-2">
          {contactInfo.serviceAreas.map((area) => (
            <Badge key={area} variant="gold">{area}</Badge>
          ))}
        </div>
      </div>

      {/* Phones */}
      <div>
        <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-gold mb-4">
          Phone
        </p>
        <div className="space-y-3">
          {contactInfo.phones.map((p) => (
            <div key={p.number} className="flex items-center gap-3">
              <Phone size={15} className="text-gold shrink-0" />
              <a
                href={p.href}
                className="font-body text-forest text-sm hover:text-gold transition-colors"
              >
                {p.number}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Emails */}
      <div>
        <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-gold mb-4">
          Email
        </p>
        <div className="space-y-3">
          {contactInfo.emails.map((e) => (
            <div key={e.address} className="flex items-start gap-3">
              <Mail size={15} className="text-gold shrink-0 mt-0.5" />
              <div>
                <p className="font-mono text-[9px] tracking-widest uppercase text-ink-muted mb-0.5">
                  {e.label}
                </p>
                <a
                  href={e.href}
                  className="font-body text-forest text-sm hover:text-gold transition-colors break-all"
                >
                  {e.address}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Websites */}
      <div>
        <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-gold mb-4">
          Websites
        </p>
        <div className="space-y-3">
          {contactInfo.websites.map((w) => (
            <div key={w.url} className="flex items-center gap-3">
              <Globe size={15} className="text-gold shrink-0" />
              <div className="flex items-center gap-2">
                <a
                  href={w.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-forest text-sm hover:text-gold transition-colors flex items-center gap-1"
                >
                  {w.url}
                  <ExternalLink size={11} className="text-gold/60" />
                </a>
                <span className="font-mono text-[9px] text-ink-muted">{w.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map placeholder */}
      <div>
        <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-gold mb-4">
          Location
        </p>
        <div
          className="relative h-48 rounded-sm overflow-hidden bg-gradient-to-br from-sand-deep to-sand"
          style={{
            border: '1px solid var(--color-border-light)',
          }}
        >
          {/* Stylized map placeholder */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center mb-3 bg-gold shadow-[0_0_0_8px_rgba(212,168,67,0.15)]"
            >
              <MapPin size={14} className="text-white" fill="white" />
            </div>
            <p className="font-heading font-bold text-forest text-sm">Innovation Worx, Midrand</p>
            <p className="font-body text-ink-muted text-xs mt-1">Halfway House Estate, Midrand 1685</p>
            <a
              href="https://maps.google.com/?q=Innovation+Worx+Midrand+South+Africa"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 font-mono text-[10px] tracking-wider uppercase text-gold hover:underline flex items-center gap-1"
            >
              Open in Maps <ExternalLink size={10} />
            </a>
          </div>


        </div>
      </div>
    </div>
  )
}

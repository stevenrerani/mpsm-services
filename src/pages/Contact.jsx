import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../hooks/useReducedMotion'
import SectionLabel from '../components/layout/SectionLabel'
import contactInfo from '../data/contact'

const INPUT_STYLE = {
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid #D8CEC4',
  borderRadius: 0,
  padding: '0.75rem 0',
  fontFamily: "'Source Sans 3', system-ui, sans-serif",
  fontSize: '1rem',
  color: '#1D2B1D',
  width: '100%',
  outline: 'none',
  transition: 'border-color 0.2s',
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-sans font-semibold text-xs tracking-[0.08em] uppercase" style={{ color: '#8A9A82' }}>
        {label}
      </label>
      {children}
    </div>
  )
}

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const heroRef  = useRef(null)
  const formRef  = useRef(null)
  const infoRef  = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set([heroRef.current, formRef.current, infoRef.current], { opacity: 1, y: 0 })
      return
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.1 })
      gsap.fromTo(formRef.current, { y: 28, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7,
        scrollTrigger: { trigger: formRef.current, start: 'top 86%', toggleActions: 'play none none none' },
      })
      gsap.fromTo(infoRef.current, { y: 28, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, delay: 0.15,
        scrollTrigger: { trigger: infoRef.current, start: 'top 86%', toggleActions: 'play none none none' },
      })
    })
    return () => ctx.revert()
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    setStatus('success')
    setTimeout(() => { setStatus('idle'); e.target.reset() }, 5000)
  }

  const handleFocus  = e => { e.currentTarget.style.borderBottomColor = '#C4763A' }
  const handleBlur   = e => { e.currentTarget.style.borderBottomColor = '#D8CEC4' }

  return (
    <>
      {/* Hero band */}
      <section className="pt-[110px] pb-16 section-py" style={{ backgroundColor: '#1D2B1D' }}>
        <div className="container">
          <div ref={heroRef} style={{ maxWidth: '56ch' }}>
            <div className="mb-6">
              <SectionLabel light>Contact</SectionLabel>
            </div>
            <h1 className="font-serif text-[#F6F0E8] mb-4">Let's start a conversation.</h1>
            <p className="font-sans text-[#F6F0E8]/60 text-lg leading-relaxed">
              Whether you're ready to engage or just exploring what's possible — we're here. Reach out and a specialist will respond within one business day.
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="section-py" style={{ backgroundColor: '#F6F0E8' }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 lg:gap-24 items-start">

            {/* Form */}
            <div ref={formRef}>
              <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                  <Field label="Full Name">
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      style={INPUT_STYLE}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </Field>
                  <Field label="Email Address">
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      style={INPUT_STYLE}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                  <Field label="Phone (optional)">
                    <input
                      type="tel"
                      placeholder="+27 XX XXX XXXX"
                      style={INPUT_STYLE}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </Field>
                  <Field label="Division of Interest">
                    <select
                      style={{ ...INPUT_STYLE, appearance: 'none', cursor: 'pointer' }}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    >
                      {contactInfo.divisionOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Message">
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us about your needs…"
                    style={{ ...INPUT_STYLE, resize: 'none' }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </Field>

                <div className="flex items-center gap-6 pt-2">
                  <button
                    type="submit"
                    disabled={status === 'success'}
                    className="inline-flex items-center justify-center font-sans font-semibold text-sm rounded-full px-8 py-3.5 min-h-[48px] transition-colors duration-200"
                    style={{
                      backgroundColor: status === 'success' ? '#4A6741' : '#C4763A',
                      color: '#F6F0E8',
                      cursor: status === 'success' ? 'default' : 'pointer',
                    }}
                    onMouseOver={e => { if (status !== 'success') e.currentTarget.style.backgroundColor = '#A8612E' }}
                    onMouseOut={e  => { if (status !== 'success') e.currentTarget.style.backgroundColor = '#C4763A' }}
                  >
                    {status === 'success' ? 'Message Sent ✓' : 'Send Message →'}
                  </button>
                  {status === 'success' && (
                    <span className="font-sans text-sm" style={{ color: '#4A6741' }}>
                      We'll be in touch within one business day.
                    </span>
                  )}
                </div>
              </form>
            </div>

            {/* Contact info sidebar */}
            <div ref={infoRef} className="flex flex-col gap-10 lg:w-64 xl:w-72 pt-2">
              <div>
                <p className="font-sans font-semibold text-xs tracking-[0.08em] uppercase mb-3" style={{ color: '#8A9A82' }}>
                  Address
                </p>
                <address className="not-italic font-sans text-[#5A6A52] text-[0.9375rem] leading-relaxed">
                  {contactInfo.address.line1}<br />
                  {contactInfo.address.line2}<br />
                  {contactInfo.address.suburb}<br />
                  {contactInfo.address.city}, {contactInfo.address.postalCode}
                </address>
              </div>

              <div>
                <p className="font-sans font-semibold text-xs tracking-[0.08em] uppercase mb-3" style={{ color: '#8A9A82' }}>
                  Phone
                </p>
                <div className="flex flex-col gap-1.5">
                  {contactInfo.phones.map(p => (
                    <a
                      key={p.href}
                      href={p.href}
                      className="font-sans text-[0.9375rem] transition-colors duration-200"
                      style={{ color: '#5A6A52' }}
                      onMouseOver={e => e.currentTarget.style.color = '#C4763A'}
                      onMouseOut={e  => e.currentTarget.style.color = '#5A6A52'}
                    >
                      {p.number}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-sans font-semibold text-xs tracking-[0.08em] uppercase mb-3" style={{ color: '#8A9A82' }}>
                  Email
                </p>
                <div className="flex flex-col gap-2">
                  {contactInfo.emails.map(em => (
                    <div key={em.href}>
                      <p className="font-sans text-[11px] text-[#8A9A82] mb-0.5">{em.label}</p>
                      <a
                        href={em.href}
                        className="font-sans text-sm transition-colors duration-200"
                        style={{ color: '#5A6A52' }}
                        onMouseOver={e => e.currentTarget.style.color = '#C4763A'}
                        onMouseOut={e  => e.currentTarget.style.color = '#5A6A52'}
                      >
                        {em.address}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-sans font-semibold text-xs tracking-[0.08em] uppercase mb-3" style={{ color: '#8A9A82' }}>
                  Service Areas
                </p>
                <p className="font-sans text-[0.9375rem] text-[#5A6A52]">
                  {contactInfo.serviceAreas.join(' · ')}
                </p>
              </div>

              <div className="pt-4 border-t" style={{ borderColor: '#D8CEC4' }}>
                <p className="font-sans text-xs text-[#8A9A82]">
                  Reg. {contactInfo.regNo}<br />
                  Level 1 BBBEE Contributor
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

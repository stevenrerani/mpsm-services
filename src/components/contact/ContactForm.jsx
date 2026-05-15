import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Send, CheckCircle } from 'lucide-react'
import contactInfo from '../../data/contact'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', division: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const successRef = useRef(null)
  const formRef = useRef(null)

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1000)
  }

  useEffect(() => {
    if (submitted && successRef.current) {
      gsap.fromTo(successRef.current, { opacity: 0, scale: 0.9, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.5)' })
    }
  }, [submitted])

  const fieldClasses =
    'w-full bg-white border border-[#E5E0D8] text-[#1E1E2A] font-body text-sm px-4 py-3.5 outline-none focus:border-[#D4A843] focus:shadow-[0_0_0_3px_rgba(212,168,67,0.1)] transition-all duration-200 placeholder:text-[#9CA3AF] rounded-sm'
  const labelClasses = 'block font-mono text-[10px] tracking-[0.18em] uppercase text-[#6B7280] mb-2'

  if (submitted) {
    return (
      <div
        ref={successRef}
        className="flex flex-col items-center justify-center text-center py-16 px-8 opacity-0"
        style={{
          background: 'rgba(13,148,136,0.04)',
          border: '1px solid rgba(13,148,136,0.2)',
          borderRadius: '2px',
        }}
      >
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#0D9488]/10 mb-6">
          <CheckCircle size={32} className="text-[#0D9488]" />
        </div>
        <h3 className="font-heading font-bold text-[#1E1E2A] text-xl mb-3">Message Received</h3>
        <p className="font-body text-[#6B7280] text-sm leading-relaxed max-w-sm">
          Thank you for reaching out to MPSM Services. A member of our team will be in touch with you shortly.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', division: '', message: '' }) }}
          className="mt-8 font-heading font-bold text-sm text-[#D4A843] hover:underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClasses}>Full Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Jane Dlamini"
            className={fieldClasses}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>Email Address *</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="jane@company.co.za"
            className={fieldClasses}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className={labelClasses}>Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+27 XX XXX XXXX"
            className={fieldClasses}
          />
        </div>
        <div>
          <label htmlFor="division" className={labelClasses}>Division Interest</label>
          <select
            id="division"
            name="division"
            value={form.division}
            onChange={handleChange}
            className={`${fieldClasses} appearance-none cursor-pointer`}
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23D4A843' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}
          >
            <option value="">Select a division</option>
            {contactInfo.divisionOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>Message *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your project, challenge, or enquiry..."
          className={`${fieldClasses} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 bg-[#D4A843] text-[#1A1A2E] font-heading font-bold text-sm px-8 py-4 border border-[#D4A843] hover:bg-[#E8C87A] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(212,168,67,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send size={15} />
          </>
        )}
      </button>
    </form>
  )
}

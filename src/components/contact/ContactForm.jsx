import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import contactInfo from '../../data/contact'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', division: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const successRef = useRef(null)
  const formRef = useRef(null)

  function validate() {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = "Full Name is required"
    if (!form.email.trim()) newErrors.email = "Email Address is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Please enter a valid email"
    if (!form.message.trim()) newErrors.message = "Message is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) {
      // Announce to screen reader somehow if possible, or focus first error.
      const firstErrorField = document.querySelector('[aria-invalid="true"]')
      if (firstErrorField) firstErrorField.focus()
      return
    }
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
    'w-full bg-white border text-forest font-body text-sm px-4 py-3.5 outline-none focus:shadow-[0_0_0_3px_rgba(212,168,67,0.1)] transition-all duration-200 placeholder:text-ink-muted rounded-sm'
  const labelClasses = 'block font-mono text-[10px] tracking-[0.18em] uppercase text-ink-muted mb-2'

  if (submitted) {
    return (
      <div
        ref={successRef}
        className="flex flex-col items-center justify-center text-center py-16 px-8 opacity-0 bg-sand border border-border rounded-sm"
      >
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-sage-light/10 mb-6">
          <CheckCircle size={32} className="text-sage" />
        </div>
        <h3 className="font-heading font-bold text-forest text-xl mb-3">Message Received</h3>
        <p className="font-body text-ink-muted text-sm leading-relaxed max-w-sm">
          Thank you for reaching out to MPSM Services. A member of our team will be in touch with you shortly.
        </p>
        <button
          type="button"
          onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', division: '', message: '' }) }}
          className="mt-8 font-heading font-bold text-sm text-gold hover:underline"
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
            className={`${fieldClasses} ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-gold'}`}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.name}
            </p>
          )}
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
            className={`${fieldClasses} ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-gold'}`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.email}
            </p>
          )}
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
            className={`${fieldClasses} border-border focus:border-gold`}
          />
        </div>
        <div>
          <label htmlFor="division" className={labelClasses}>Division Interest</label>
          <select
            id="division"
            name="division"
            value={form.division}
            onChange={handleChange}
            className={`${fieldClasses} border-border focus:border-gold appearance-none cursor-pointer`}
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
          className={`${fieldClasses} resize-none ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-gold'}`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-red-500 text-xs mt-1 flex items-center gap-1">
            <AlertCircle size={12} /> {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        aria-disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 bg-gold text-forest font-heading font-bold text-sm px-8 py-4 border border-gold hover:bg-gold/80 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(212,168,67,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
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

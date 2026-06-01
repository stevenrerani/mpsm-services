import { Link } from 'react-router-dom'

const BASE = 'inline-flex items-center justify-center font-sans font-semibold text-sm rounded-full px-8 py-3.5 min-h-[48px] transition-colors duration-200'

const VARIANTS = {
  primary:   'bg-clay hover:bg-clay-dark text-sand border-none',
  secondary: 'bg-transparent hover:bg-forest/5 text-forest border-[1.5px] border-forest',
  ghost:     '',
  light:     'bg-transparent hover:bg-sand/10 text-sand border border-sand/35',
}

export default function Button({ children, variant = 'primary', to, href, type, disabled, ...props }) {
  if (variant === 'ghost') {
    const inner = (
      <span className="font-sans font-semibold text-sm transition-colors duration-200 text-clay hover:text-clay-dark">
        {children} →
      </span>
    )
    if (to) return <Link to={to} {...props}>{inner}</Link>
    if (href) return <a href={href} {...props}>{inner}</a>
    return <button type={type} disabled={disabled} {...props}>{inner}</button>
  }

  const vClass = VARIANTS[variant] || VARIANTS.primary
  const className = `${BASE} ${vClass}`

  if (to) {
    return (
      <Link to={to} className={className} {...props}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    )
  }
  return (
    <button type={type} disabled={disabled} className={className} {...props}>
      {children}
    </button>
  )
}

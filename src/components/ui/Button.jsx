import { Link } from 'react-router-dom'

const BASE = 'inline-flex items-center justify-center font-sans font-semibold text-sm rounded-full px-8 py-3.5 min-h-[48px] transition-colors duration-200'

const STYLES = {
  primary:   { bg: '#C4763A', hover: '#A8612E', text: '#F6F0E8', border: 'none' },
  secondary: { bg: 'transparent', hover: 'rgba(29,43,29,0.06)', text: '#1D2B1D', border: '1.5px solid #1D2B1D' },
  ghost:     null,
  light:     { bg: 'transparent', hover: 'rgba(246,240,232,0.1)', text: '#F6F0E8', border: '1px solid rgba(246,240,232,0.35)' },
}

export default function Button({ children, variant = 'primary', to, href, type, disabled, ...props }) {
  if (variant === 'ghost') {
    const inner = (
      <span
        className="font-sans font-semibold text-sm transition-colors duration-200"
        style={{ color: '#C4763A' }}
      >
        {children} →
      </span>
    )
    if (to) return <Link to={to} {...props}>{inner}</Link>
    if (href) return <a href={href} {...props}>{inner}</a>
    return <button type={type} disabled={disabled} {...props}>{inner}</button>
  }

  const s = STYLES[variant] || STYLES.primary

  const handleOver = e => { e.currentTarget.style.backgroundColor = s.hover }
  const handleOut  = e => { e.currentTarget.style.backgroundColor = s.bg }

  const style = { backgroundColor: s.bg, color: s.text, border: s.border }

  if (to) {
    return (
      <Link to={to} className={BASE} style={style} onMouseOver={handleOver} onMouseOut={handleOut} {...props}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={BASE} style={style} onMouseOver={handleOver} onMouseOut={handleOut} {...props}>
        {children}
      </a>
    )
  }
  return (
    <button type={type} disabled={disabled} className={BASE} style={style} onMouseOver={handleOver} onMouseOut={handleOut} {...props}>
      {children}
    </button>
  )
}

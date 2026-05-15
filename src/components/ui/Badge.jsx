const VARIANTS = {
  clay:  { backgroundColor: '#F0DDD0', color: '#C4763A', border: '1px solid rgba(196,118,58,0.3)' },
  gold:  { backgroundColor: 'rgba(201,168,76,0.12)', color: '#C9A84C', border: 'none' },
  sage:  { backgroundColor: 'rgba(74,103,65,0.1)',   color: '#4A6741', border: 'none' },
  light: { backgroundColor: 'transparent', color: 'rgba(246,240,232,0.65)', border: '1px solid rgba(246,240,232,0.25)' },
}

export default function Badge({ children, variant = 'clay' }) {
  const s = VARIANTS[variant] || VARIANTS.clay
  return (
    <span
      className="inline-flex items-center font-sans font-semibold text-[11px] tracking-[0.08em] uppercase rounded-full px-3 py-1"
      style={s}
    >
      {children}
    </span>
  )
}

export default function SectionLabel({ children, light = false }) {
  return (
    <span
      className="kicker"
      style={light ? { color: 'rgba(246,240,232,0.5)' } : undefined}
    >
      {children}
    </span>
  )
}

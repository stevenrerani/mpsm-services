const SHAPES = {
  organic:  '30% 70% 65% 35% / 35% 30% 70% 65%',
  organic2: '55% 45% 40% 60% / 45% 55% 45% 55%',
  blob:     '60% 40% 30% 70% / 60% 30% 70% 40%',
  rounded:  '16px',
  circle:   '9999px',
}

const PALETTES = {
  forest: { backgroundColor: '#273527', backgroundImage: 'radial-gradient(circle at 30% 70%, #1D2B1D 0%, #3A4F3A 100%)' },
  sage:   { backgroundColor: '#4A6741', backgroundImage: 'radial-gradient(circle at 70% 30%, #3A5233 0%, #5A7A50 100%)' },
  sand:   { backgroundColor: '#EDE4D8', backgroundImage: 'radial-gradient(circle at 40% 60%, #D8CEC4 0%, #F0E8DE 100%)' },
  clay:   { backgroundColor: '#C4763A', backgroundImage: 'radial-gradient(circle at 60% 40%, #A8612E 0%, #D4865A 100%)' },
  teal:   { backgroundColor: '#2A4A52', backgroundImage: 'radial-gradient(circle at 35% 65%, #1E3A42 0%, #3A6070 100%)' },
}

export default function ImagePlaceholder({
  shape   = 'organic',
  palette = 'forest',
  alt     = 'Image placeholder — replace with photography',
  className = '',
  style   = {},
  aspect,
  ...props
}) {
  const borderRadius = SHAPES[shape] || SHAPES.organic
  const paletteStyle = PALETTES[palette] || PALETTES.forest

  return (
    <div
      role="img"
      aria-label={alt}
      className={`img-placeholder ${className}`}
      style={{
        borderRadius,
        ...paletteStyle,
        aspectRatio: aspect || undefined,
        ...style,
      }}
      {...props}
    />
  )
}

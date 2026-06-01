const SHAPES = {
  organic:  '30% 70% 65% 35% / 35% 30% 70% 65%',
  organic2: '55% 45% 40% 60% / 45% 55% 45% 55%',
  blob:     '60% 40% 30% 70% / 60% 30% 70% 40%',
  rounded:  '16px',
  circle:   '9999px',
}

const PALETTES = {
  forest: 'bg-forest-mid',
  sage:   'bg-sage',
  sand:   'bg-sand-deep',
  clay:   'bg-clay',
  teal:   'bg-sage-light',
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
  const paletteClass = PALETTES[palette] || PALETTES.forest

  return (
    <div
      role="img"
      aria-label={alt}
      className={`img-placeholder ${paletteClass} ${className}`}
      style={{
        borderRadius,
        aspectRatio: aspect || undefined,
        ...style,
      }}
      {...props}
    />
  )
}

type MarkProps = {
  className?: string
  title?: string
}

const STARS: { x: number; y: number; r: number }[] = [
  { x: 18, y: 12, r: 3 },
  { x: 18, y: 32, r: 3.6 },
  { x: 18, y: 52, r: 3 },
  { x: 38, y: 12, r: 3 },
  { x: 45, y: 21, r: 3 },
  { x: 38, y: 32, r: 3 },
  { x: 47, y: 52, r: 3.3 },
]

const ACCENTS: { x: number; y: number; r: number }[] = [
  { x: 53, y: 11, r: 1.3 },
  { x: 9, y: 44, r: 1.3 },
  { x: 50, y: 39, r: 1 },
]

export function Mark({ className, title }: MarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={className}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M18 12 L18 52 M18 12 L38 12 L45 21 L38 32 L18 32 M18 32 L47 52"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="square"
        strokeLinejoin="miter"
        opacity="0.55"
      />
      {STARS.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="currentColor" />
      ))}
      {ACCENTS.map((s, i) => (
        <circle
          key={`a${i}`}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill="currentColor"
          opacity="0.45"
        />
      ))}
    </svg>
  )
}

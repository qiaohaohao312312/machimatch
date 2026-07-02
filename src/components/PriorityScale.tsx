import { motion } from 'framer-motion'

const LEVELS = [
  { value: 5, label: "must be within 10 min", r: 52 },
  { value: 4, label: "within 20 min",          r: 104 },
  { value: 3, label: "within 30 min",          r: 158 },
  { value: 2, label: "up to 45 min is fine",   r: 212 },
  { value: 1, label: "don't mind",             r: 268 },
]

const H = 340
const CY = H / 2

interface Props {
  value: number
  onChange: (v: number) => void
}

export default function PriorityScale({ value, onChange }: Props) {
  const handleClick = (v: number) => {
    onChange(v)
  }

  return (
    <div className="relative w-full select-none" style={{ height: H }}>

      {/* ── Concentric circles (SVG) ── */}
      <svg
        className="absolute inset-0 pointer-events-none overflow-visible"
        width="100%"
        height={H}
        aria-hidden="true"
      >
        <defs>
          {/* Fade circles out toward the right so they don't overlap labels */}
          <linearGradient id="circleFade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="white" stopOpacity="1" />
            <stop offset="48%"  stopColor="white" stopOpacity="1" />
            <stop offset="72%"  stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="fadeRight">
            <rect x="0" y="0" width="100%" height={H} fill="url(#circleFade)" />
          </mask>
        </defs>

        <g mask="url(#fadeRight)">
          {LEVELS.map(level => {
            const isSelected = value === level.value
            return (
              <circle
                key={level.value}
                cx={0}
                cy={CY}
                r={level.r}
                fill="none"
                stroke="#1D5C6B"
                strokeWidth={isSelected ? 2.5 : 1.2}
                opacity={isSelected ? 0.85 : 0.22}
              />
            )
          })}
        </g>
      </svg>

      {/* ── Labels (right half) ── */}
      <div
        className="absolute top-0 bottom-0 flex flex-col justify-around py-2"
        style={{ left: '48%', right: 0 }}
      >
        {LEVELS.map(level => {
          const isSelected = value === level.value
          return (
            <button
              key={level.value}
              onClick={() => handleClick(level.value)}
              className="text-left flex flex-col justify-center min-h-[44px] group"
            >
              <span
                className={`font-handwritten leading-none transition-all duration-200 ${
                  isSelected
                    ? 'text-ink text-[21px] lg:text-[23px]'
                    : 'text-ink/30 text-[19px] lg:text-[21px] group-hover:text-ink/55'
                }`}
              >
                {level.label}
              </span>

              {/* Underline reveals on selection */}
              <motion.div
                initial={false}
                animate={{ scaleX: isSelected ? 1 : 0, opacity: isSelected ? 0.5 : 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="h-px bg-ink mt-1 origin-left"
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

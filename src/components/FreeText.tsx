import { useEffect, useRef, useState } from 'react'
import { useT } from '../i18n'

const FLOATING_EXAMPLES = [
  { text: 'I have a cat...',                  x: '6%',  y: '4%',  delay: 0 },
  { text: 'my girlfriend visits sometimes',   x: '42%', y: '22%', delay: 0.18 },
  { text: 'I need an ice cream shop nearby',  x: '4%',  y: '44%', delay: 0.36 },
  { text: "I don't like cooking",             x: '40%', y: '64%', delay: 0.54 },
  { text: 'I want to live near a park',       x: '8%',  y: '83%', delay: 0.72 },
]

interface Props {
  value: string
  onChange: (v: string) => void
}

export default function FreeText({ value, onChange }: Props) {
  const t = useT()
  const [focused, setFocused] = useState(false)

  return (
    <div className="w-full relative">
      {/* Floating examples — always visible, always drifting */}
      <div className="relative h-[200px] mb-4 overflow-hidden pointer-events-none">
        {FLOATING_EXAMPLES.map((ex, i) => (
          <FloatingText key={i} text={ex.text} x={ex.x} y={ex.y} delay={ex.delay} />
        ))}
      </div>

      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={t('free.placeholder')}
        rows={3}
        className={`
          w-full border-[1.5px] rounded-3xl px-5 py-4
          bg-transparent text-ink font-handwritten text-[20px]
          outline-none resize-none transition-colors duration-200
          placeholder:font-handwritten placeholder:text-ink/30 placeholder:text-[20px]
          ${focused ? 'border-teal-soft' : 'border-teal-deep'}
        `}
      />
    </div>
  )
}

function FloatingText({
  text, x, y, delay,
}: {
  text: string; x: string; y: string; delay: number
}) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const seedRef = useRef(Math.random() * Math.PI * 2)
  const startedRef = useRef(false)

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true

    // Small delay before starting so each floater staggers in
    const timeout = setTimeout(() => {
      let frame: number
      let t = 0
      const seed = seedRef.current
      const animate = () => {
        t += 0.003
        setOffset({ x: Math.sin(t + seed) * 2.5, y: Math.cos(t * 0.7 + seed) * 1.8 })
        frame = requestAnimationFrame(animate)
      }
      frame = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(frame)
    }, delay * 1000)

    return () => clearTimeout(timeout)
  }, [delay])

  return (
    <span
      className="absolute font-handwritten text-[20px] text-ink/40 whitespace-nowrap"
      style={{
        left: x,
        top: y,
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: 'opacity 0.5s',
      }}
    >
      {text}
    </span>
  )
}

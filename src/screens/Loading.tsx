import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINES = [
  'Finding your street…',
  'Listening to the neighborhood…',
  'Reading the morning light…',
  'Mapping the feeling…',
  'Almost there…',
]

interface Props {
  onDone: () => void
}

export default function Loading({ onDone }: Props) {
  const [lineIdx, setLineIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setLineIdx(prev => {
        if (prev >= LINES.length - 1) return prev
        return prev + 1
      })
    }, 900)

    const timer = setTimeout(onDone, 4000)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [onDone])

  return (
    <div className="min-h-screen bg-parchment flex flex-col items-center justify-center px-6">
      <div className="max-w-[430px] mx-auto w-full text-center">
        {/* Gentle spinner using dots */}
        <div className="flex justify-center gap-2 mb-10">
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              animate={{ opacity: [0.2, 1, 0.2], y: [0, -6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
              className="w-2 h-2 rounded-full bg-teal-deep block"
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={lineIdx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="font-display text-[22px] text-ink leading-snug"
          >
            {LINES[lineIdx]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}

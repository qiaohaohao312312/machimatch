import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { generateNeighborhoods } from '../api/generate'
import { NEIGHBORHOODS as FALLBACK_NEIGHBORHOODS } from '../data/neighborhoods'
import { useI18n } from '../i18n'
import type { Neighborhood, QuizAnswers } from '../types'

const LINE_KEYS = ['loading.l1', 'loading.l2', 'loading.l3', 'loading.l4', 'loading.l5']

const MIN_DISPLAY_MS = 1800

interface Props {
  city: string
  answers: QuizAnswers
  onDone: (neighborhoods: Neighborhood[]) => void
}

export default function Loading({ city, answers, onDone }: Props) {
  const { t, lang } = useI18n()
  const [lineIdx, setLineIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setLineIdx(prev => (prev >= LINE_KEYS.length - 1 ? prev : prev + 1))
    }, 900)

    let cancelled = false
    const startedAt = Date.now()

    generateNeighborhoods(city, answers, lang)
      .catch(err => {
        console.warn('[machimatch] AI generation failed, falling back to demo neighborhoods:', err)
        return FALLBACK_NEIGHBORHOODS
      })
      .then(neighborhoods => {
        if (cancelled) return
        const elapsed = Date.now() - startedAt
        const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed)
        setTimeout(() => { if (!cancelled) onDone(neighborhoods) }, remaining)
      })

    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [city, answers, lang, onDone])

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
            {t(LINE_KEYS[lineIdx])}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WINDOW_OPTIONS } from '../data/windowImages'

interface Props {
  selected: number
  onChange: (id: number) => void
}

export default function WindowSwipe({ selected, onChange }: Props) {
  const [imgError, setImgError] = useState<Record<number, boolean>>({})

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (Math.abs(info.offset.x) < 40) return
    if (info.offset.x < 0) onChange(Math.min(selected + 1, WINDOW_OPTIONS.length - 1))
    else onChange(Math.max(selected - 1, 0))
  }

  const current = WINDOW_OPTIONS[selected]

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Image left + options right */}
      <div className="flex gap-4 items-stretch">

        {/* Image */}
        <div
          className="relative overflow-hidden rounded-2xl shrink-0"
          style={{ width: '52%', aspectRatio: '3/4' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
              style={{ touchAction: 'pan-y' }}
            >
              {imgError[selected] ? (
                <div className="w-full h-full bg-sand flex items-center justify-center">
                  <span className="font-handwritten text-ink/40 text-lg text-center px-2">
                    {current.label}
                  </span>
                </div>
              ) : (
                <img
                  src={current.url}
                  alt={current.label}
                  onError={() => setImgError(prev => ({ ...prev, [selected]: true }))}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  draggable={false}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Options column — no dots */}
        <div className="flex-1 flex flex-col justify-center gap-5">
          {WINDOW_OPTIONS.map(opt => {
            const isSelected = selected === opt.id
            return (
              <motion.button
                key={opt.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => onChange(opt.id)}
                className="flex items-start gap-3 text-left min-h-[44px]"
              >
                <span
                  className={`
                    w-5 h-5 rounded-full border-[1.5px] border-teal-deep shrink-0 mt-0.5
                    flex items-center justify-center transition-all duration-200
                    ${isSelected ? 'bg-teal-deep' : 'bg-transparent'}
                  `}
                >
                  {isSelected && <span className="w-2 h-2 rounded-full bg-white block" />}
                </span>
                <span
                  className={`font-handwritten text-[19px] leading-snug transition-colors duration-200 ${
                    isSelected ? 'text-ink' : 'text-ink/35'
                  }`}
                >
                  {opt.label}
                  <br />
                  {opt.sublabel}
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

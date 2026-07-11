import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { WINDOW_OPTIONS } from '../data/windowImages'

interface Props {
  selected: number
  onChange: (id: number) => void
}

export default function WindowSwipe({ selected, onChange }: Props) {
  const [imgError, setImgError] = useState<Record<number, boolean>>({})

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-3">
        {WINDOW_OPTIONS.map(opt => {
          const isSelected = selected === opt.id
          return (
            <motion.button
              key={opt.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => onChange(opt.id)}
              aria-pressed={isSelected}
              className="flex flex-col gap-2 text-left group"
            >
              {/* Image card */}
              <div
                className={`
                  relative overflow-hidden rounded-2xl transition-all duration-200
                  ${isSelected
                    ? 'ring-[3px] ring-teal-deep ring-offset-2 ring-offset-parchment'
                    : 'ring-1 ring-ink/10 group-hover:ring-teal-soft'}
                `}
                style={{ aspectRatio: '3/4' }}
              >
                {imgError[opt.id] ? (
                  <div className="w-full h-full bg-sand flex items-center justify-center">
                    <span className="font-handwritten text-ink/40 text-sm text-center px-2">
                      {opt.label}
                    </span>
                  </div>
                ) : (
                  <img
                    src={opt.url}
                    alt={`${opt.label} ${opt.sublabel}`}
                    onError={() => setImgError(prev => ({ ...prev, [opt.id]: true }))}
                    className={`w-full h-full object-cover transition-all duration-200 ${
                      isSelected ? '' : 'opacity-85 group-hover:opacity-100'
                    }`}
                    draggable={false}
                  />
                )}

                {/* Selected check badge */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-teal-deep flex items-center justify-center shadow"
                  >
                    <Check size={15} strokeWidth={2.5} className="text-white" />
                  </motion.div>
                )}
              </div>

              {/* Label */}
              <span
                className={`font-handwritten text-[16px] lg:text-[18px] leading-tight text-center transition-colors duration-200 ${
                  isSelected ? 'text-ink' : 'text-ink/40'
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
  )
}

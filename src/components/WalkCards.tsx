import { motion } from 'framer-motion'

const MAX_SELECT = 3

const OPTIONS = [
  'coffee shops',
  'gyms',
  'big shopping malls',
  'local restaurants',
  'parks & nature',
  'convenience stores',
  'bookshops',
  'night markets',
]

interface Props {
  selected: string[]
  onChange: (selected: string[]) => void
  onComplete: () => void
}

export default function WalkCards({ selected, onChange, onComplete }: Props) {
  const atMax = selected.length >= MAX_SELECT

  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter(s => s !== opt))
    } else {
      if (atMax) return
      const next = [...selected, opt]
      onChange(next)
      if (next.length >= MAX_SELECT) {
        setTimeout(onComplete, 500)
      }
    }
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Counter */}
      <div className="flex justify-end">
        <span className="font-handwritten text-[17px] text-ink/40">
          {selected.length} / {MAX_SELECT}
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {OPTIONS.map((opt, i) => {
          const isSelected = selected.includes(opt)
          const isDisabled = !isSelected && atMax

          return (
            <motion.button
              key={opt}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.25 }}
              whileTap={isDisabled ? {} : { scale: 0.96 }}
              onClick={() => toggle(opt)}
              disabled={isDisabled}
              className={`
                rounded-2xl border-[1.5px] p-4 min-h-[80px] lg:min-h-[100px]
                flex items-center justify-center text-center
                transition-all duration-200
                ${isSelected
                  ? 'bg-teal-deep border-teal-deep'
                  : isDisabled
                  ? 'bg-parchment border-ink/15 opacity-35'
                  : 'bg-parchment border-teal-deep hover:bg-sand'
                }
              `}
              style={!isSelected && !isDisabled ? { boxShadow: '2px 3px 0px #C4C0BA' } : {}}
            >
              <span
                className={`font-handwritten text-[19px] lg:text-[20px] leading-snug ${
                  isSelected ? 'text-white' : 'text-ink'
                }`}
              >
                {opt}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

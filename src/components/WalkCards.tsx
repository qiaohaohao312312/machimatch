import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import {
  TrainFront, Coffee, Utensils, Beer, ShoppingCart, Store,
  Croissant, Trees, Dumbbell, BookOpen, Laptop, Pill,
  ShoppingBag, Sparkles,
} from 'lucide-react'
import { useT } from '../i18n'

const MAX_SELECT = 4

interface Option {
  value: string  // canonical English value stored in answers + sent to the AI
  key: string    // i18n key for the display label
  Icon: LucideIcon
}

const OPTIONS: Option[] = [
  { value: 'train / metro station', key: 'walk.station',     Icon: TrainFront },
  { value: 'coffee shops',          key: 'walk.coffee',      Icon: Coffee },
  { value: 'local restaurants',     key: 'walk.restaurants', Icon: Utensils },
  { value: 'bars & izakaya',        key: 'walk.bars',        Icon: Beer },
  { value: 'supermarket',           key: 'walk.supermarket', Icon: ShoppingCart },
  { value: 'convenience stores',    key: 'walk.conbini',     Icon: Store },
  { value: 'bakery',                key: 'walk.bakery',      Icon: Croissant },
  { value: 'parks & nature',        key: 'walk.parks',       Icon: Trees },
  { value: 'gyms',                  key: 'walk.gyms',        Icon: Dumbbell },
  { value: 'bookshops',             key: 'walk.bookshops',   Icon: BookOpen },
  { value: 'co-working space',      key: 'walk.coworking',   Icon: Laptop },
  { value: 'clinic & pharmacy',     key: 'walk.clinic',      Icon: Pill },
  { value: 'big shopping malls',    key: 'walk.malls',       Icon: ShoppingBag },
  { value: 'night markets',         key: 'walk.nightmarket', Icon: Sparkles },
]

interface Props {
  selected: string[]
  onChange: (selected: string[]) => void
  onComplete: () => void
}

export default function WalkCards({ selected, onChange, onComplete }: Props) {
  const t = useT()
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
        {OPTIONS.map(({ value, key, Icon }, i) => {
          const isSelected = selected.includes(value)
          const isDisabled = !isSelected && atMax

          return (
            <motion.button
              key={value}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03, duration: 0.25 }}
              whileTap={isDisabled ? {} : { scale: 0.96 }}
              onClick={() => toggle(value)}
              disabled={isDisabled}
              className={`
                rounded-2xl border-[1.5px] p-3 min-h-[92px] lg:min-h-[104px]
                flex flex-col items-center justify-center gap-2 text-center
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
              <Icon
                size={26}
                strokeWidth={1.6}
                className={isSelected ? 'text-white' : 'text-teal-deep'}
                aria-hidden
              />
              <span
                className={`font-handwritten text-[17px] lg:text-[18px] leading-tight ${
                  isSelected ? 'text-white' : 'text-ink'
                }`}
              >
                {t(key)}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

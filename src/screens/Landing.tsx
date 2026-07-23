import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useT } from '../i18n'

const CITY_PILLS = ['Tokyo', 'NYC', 'Paris', 'Shanghai', 'London']

interface Props {
  onSelect: (city: string) => void
}

export default function Landing({ onSelect }: Props) {
  const t = useT()
  const [input, setInput] = useState('')

  const handleSubmit = (city: string) => {
    const trimmed = city.trim()
    if (trimmed) onSelect(trimmed)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit(input)
  }

  return (
    <div className="min-h-screen bg-parchment flex flex-col">

      {/* ─── Mobile layout ─── */}
      <div className="lg:hidden flex-1 flex flex-col justify-center px-6 max-w-[430px] mx-auto w-full">
        <MobileContent
          input={input}
          setInput={setInput}
          onKeyDown={handleKeyDown}
          onSubmit={handleSubmit}
        />
      </div>

      {/* ─── Desktop layout ─── */}
      <div className="hidden lg:flex flex-1 max-w-[1080px] mx-auto w-full px-16 items-center gap-24">
        {/* Left: hero text */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <img src="/machimatch-symbol.png" alt="" className="h-10 w-auto" />
            <span className="font-handwritten text-teal-deep text-2xl tracking-wide">
              machimatch
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
            className="font-display text-[52px] leading-[1.15] text-ink mb-6"
          >
            {t('landing.headline')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="font-body text-[18px] text-ink leading-relaxed max-w-[380px]"
          >
            {t('landing.sub')}
          </motion.p>
        </div>

        {/* Right: search */}
        <div className="w-[380px] flex flex-col">
          <DesktopSearch
            input={input}
            setInput={setInput}
            onKeyDown={handleKeyDown}
            onSubmit={handleSubmit}
          />
        </div>
      </div>

      {/* Mobile bottom hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="lg:hidden text-center font-ui text-xs text-ink pb-8 px-6"
      >
        {t('landing.mobileHint')}
      </motion.p>
    </div>
  )
}

/* ─── Shared pill + input logic ─── */

function CityPills({ onSubmit }: { onSubmit: (city: string) => void }) {
  const t = useT()
  return (
    <div className="flex flex-wrap gap-2.5 justify-center">
      {CITY_PILLS.map((city, i) => (
        <motion.button
          key={city}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.55 + i * 0.05, duration: 0.3 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => onSubmit(city)}
          className="
            border-[1.5px] border-teal-deep rounded-full
            px-5 py-2.5 font-handwritten text-[19px] text-ink
            hover:bg-teal-deep hover:text-white transition-all duration-200
            min-h-[44px] flex items-center
          "
        >
          {city}
        </motion.button>
      ))}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => onSubmit('Anywhere')}
        className="
          border-[1.5px] border-ochre rounded-full
          px-5 py-2.5 font-handwritten text-[19px] text-ochre
          hover:bg-ochre hover:text-white transition-all duration-200
          min-h-[44px] flex items-center
        "
      >
        {t('landing.anywhere')}
      </motion.button>
    </div>
  )
}

function SearchInput({
  input,
  setInput,
  onKeyDown,
  onSubmit,
}: {
  input: string
  setInput: (v: string) => void
  onKeyDown: (e: React.KeyboardEvent) => void
  onSubmit: (v: string) => void
}) {
  const t = useT()
  return (
    <div className="relative">
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={t('landing.placeholder')}
        className="
          w-full border-[1.5px] border-teal-deep rounded-full
          px-5 py-4 bg-transparent text-ink font-ui text-base
          outline-none placeholder:text-ink/30
          focus:border-teal-soft transition-colors
          min-h-[52px]
        "
      />
      <AnimatePresence>
        {input.trim() && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => onSubmit(input)}
            className="
              absolute right-3 top-1/2 -translate-y-1/2
              bg-teal-deep text-white font-ui text-sm
              px-4 py-2 rounded-full min-h-[36px]
              hover:bg-teal-soft transition-colors
            "
          >
            {t('landing.go')}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

function MobileContent(props: {
  input: string
  setInput: (v: string) => void
  onKeyDown: (e: React.KeyboardEvent) => void
  onSubmit: (v: string) => void
}) {
  const t = useT()
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="flex items-center gap-2.5 mb-10"
      >
        <img src="/machimatch-symbol.png" alt="" className="h-8 w-auto" />
        <span className="font-handwritten text-teal-deep text-xl tracking-wide">
          machimatch
        </span>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
        className="font-display text-[38px] leading-[1.2] text-ink mb-10"
      >
        {t('landing.headline')}
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="mb-5"
      >
        <SearchInput {...props} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <CityPills onSubmit={props.onSubmit} />
      </motion.div>
    </>
  )
}

function DesktopSearch(props: {
  input: string
  setInput: (v: string) => void
  onKeyDown: (e: React.KeyboardEvent) => void
  onSubmit: (v: string) => void
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="mb-6"
      >
        <SearchInput {...props} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <CityPills onSubmit={props.onSubmit} />
      </motion.div>
    </>
  )
}

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import type { Neighborhood } from '../types'
import {
  STAYS, ROOM_TYPES, SIZES, BUDGETS, WALKS,
  buildHousingLinks, type HousingPrefs, type StayBucket,
} from '../data/housingProviders'
import { useT } from '../i18n'

interface Props {
  city: string
  neighborhood: Neighborhood
  onBack: () => void
}

export default function Housing({ city, neighborhood, onBack }: Props) {
  const t = useT()
  const [prefs, setPrefs] = useState<HousingPrefs>({
    stay: 'mid',
    roomType: 'any',
    minSize: 0,
    budget: 0,
    walk: 0,
  })

  const links = useMemo(
    () => buildHousingLinks({
      city,
      neighborhood: neighborhood.name,
      nameJa: neighborhood.nameJa,
      wardSlug: neighborhood.wardSlug,
      prefs,
    }),
    [city, neighborhood, prefs],
  )

  const set = <K extends keyof HousingPrefs>(key: K, val: HousingPrefs[K]) =>
    setPrefs(prev => ({ ...prev, [key]: val }))

  return (
    <div className="min-h-screen bg-parchment">
      <div className="max-w-[560px] mx-auto w-full px-6 pt-5 pb-16">

        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 font-handwritten text-[16px] text-ink/50 hover:text-ink/80 transition-colors mb-6"
        >
          <ArrowLeft size={16} strokeWidth={1.8} />
          {t('h.back')}
        </button>

        {/* Title */}
        <h1 className="font-display text-[26px] lg:text-[30px] leading-tight text-ink">
          {t('h.title', { name: neighborhood.name })}
        </h1>
        <p className="font-handwritten text-[16px] text-ink/45 mt-1">
          {t('h.sub')}
        </p>

        {/* Stay length */}
        <Section label={t('h.stay')}>
          <div className="grid grid-cols-3 gap-2.5">
            {STAYS.map(s => (
              <Chip
                key={s.id}
                selected={prefs.stay === s.id}
                onClick={() => set('stay', s.id as StayBucket)}
              >
                <span className="block leading-tight">{t(`stay.${s.id}`)}</span>
                <span className={`block text-[12px] mt-0.5 ${prefs.stay === s.id ? 'text-white/70' : 'text-ink/35'}`}>
                  {t(`stay.${s.id}.hint`)}
                </span>
              </Chip>
            ))}
          </div>
        </Section>

        {/* Room type */}
        <Section label={t('h.roomType')}>
          <div className="flex flex-wrap gap-2.5">
            {ROOM_TYPES.map(r => (
              <Chip key={r.id} selected={prefs.roomType === r.id} onClick={() => set('roomType', r.id)} compact>
                {t(`room.${r.id}`)}
                {r.jp && (
                  <span className={`ml-1.5 text-[13px] ${prefs.roomType === r.id ? 'text-white/60' : 'text-ink/30'}`}>
                    {r.jp}
                  </span>
                )}
              </Chip>
            ))}
          </div>
        </Section>

        {/* Size */}
        <Section label={t('h.minSize')}>
          <div className="flex flex-wrap gap-2.5">
            {SIZES.map(s => (
              <Chip key={s.value} selected={prefs.minSize === s.value} onClick={() => set('minSize', s.value)} compact>
                {s.value === 0 ? t('opt.any') : t('size.m2', { n: s.value })}
              </Chip>
            ))}
          </div>
        </Section>

        {/* Budget */}
        <Section label={t('h.budget')}>
          <div className="flex flex-wrap gap-2.5">
            {BUDGETS.map(b => (
              <Chip key={b.value} selected={prefs.budget === b.value} onClick={() => set('budget', b.value)} compact>
                {b.value === 0 ? t('opt.any') : b.label}
              </Chip>
            ))}
          </div>
        </Section>

        {/* Walk to station */}
        <Section label={t('h.walk')}>
          <div className="flex flex-wrap gap-2.5">
            {WALKS.map(w => (
              <Chip key={w.value} selected={prefs.walk === w.value} onClick={() => set('walk', w.value)} compact>
                {w.value === 0 ? t('opt.any') : t('walk.min', { n: w.value })}
              </Chip>
            ))}
          </div>
        </Section>

        {/* Listings */}
        <div className="mt-9">
          <h2 className="font-display text-[19px] text-ink mb-1">{t('h.listings')}</h2>
          <p className="font-handwritten text-[15px] text-ink/40 mb-4">
            {t('h.note', { name: neighborhood.name })}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {links.map((link, i) => (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.25 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 rounded-2xl px-4 py-3.5 group transition-all hover:border-teal-deep"
                style={{ background: 'rgba(232,221,208,0.5)', border: '1px solid rgba(29,92,107,0.18)' }}
              >
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="font-handwritten text-[18px] text-ink leading-none">{link.name}</span>
                  <span className="font-handwritten text-[13px] text-ink/40 mt-1">{t(link.note)}</span>
                </div>
                <ExternalLink size={17} strokeWidth={1.8} className="text-teal-deep/60 group-hover:text-teal-deep shrink-0" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-7">
      <h3 className="font-handwritten text-[17px] text-ink/60 mb-3">{label}</h3>
      {children}
    </div>
  )
}

function Chip({
  selected, onClick, children, compact,
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
  compact?: boolean
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`
        rounded-2xl border-[1.5px] font-handwritten text-[17px] text-center transition-all duration-200
        ${compact ? 'px-4 py-2' : 'px-3 py-2.5'}
        ${selected
          ? 'bg-teal-deep border-teal-deep text-white'
          : 'bg-parchment border-teal-deep/60 text-ink hover:bg-sand'}
      `}
    >
      {children}
    </motion.button>
  )
}

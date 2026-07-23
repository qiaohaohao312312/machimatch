import { useState, Component } from 'react'
import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ShareCard from '../components/ShareCard'
import { useShareImage } from '../hooks/useShareImage'
import NeighborhoodMap from '../components/NeighborhoodMap'
import { useT } from '../i18n'
import type { QuizAnswers, Neighborhood, DayMoment } from '../types'

interface Props {
  city: string
  answers: QuizAnswers
  neighborhoods: Neighborhood[]
  onFindHousing: (n: Neighborhood) => void
  onRestart: () => void
}

const MATCH_STOPWORDS = new Set(['shop', 'shops', 'store', 'stores'])

function matchesWalkPrefs(category: string, walkPrefs: string[]): boolean {
  const words = category.toLowerCase().split(/\W+/).filter(w => w && !MATCH_STOPWORDS.has(w))
  return walkPrefs.some(pref => {
    const prefWords = pref.toLowerCase().split(/\W+/).filter(w => w && !MATCH_STOPWORDS.has(w))
    return prefWords.some(pw => words.some(w => w.includes(pw) || pw.includes(w)))
  })
}

const cardVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.28, ease: 'easeOut' } },
  exit:   (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40, transition: { duration: 0.18 } }),
}

export default function Results({ city, answers, neighborhoods: NEIGHBORHOODS, onFindHousing, onRestart }: Props) {
  const t = useT()
  const [activeIdx, setActiveIdx] = useState(0)
  const [direction, setDirection] = useState(1)

  const navigate = (nextIdx: number) => {
    setDirection(nextIdx > activeIdx ? 1 : -1)
    setActiveIdx(nextIdx)
  }

  return (
    <div className="h-screen bg-parchment flex flex-col lg:flex-row overflow-hidden">

      {/* ── Map panel ── */}
      <div
        className="h-[44vh] md:h-[48vh] lg:h-screen lg:w-[54%] shrink-0 relative"
        role="region"
        aria-label="Neighborhood map"
      >
        <MapErrorBoundary label={t('res.mapError')}>
          <NeighborhoodMap
            neighborhoods={NEIGHBORHOODS}
            activeIdx={activeIdx}
            onSelect={navigate}
          />
        </MapErrorBoundary>

        {/* City label overlay */}
        <div className="absolute top-3 left-3 z-[1000] pointer-events-none">
          <span className="bg-parchment/90 rounded-full px-3 py-1.5 font-handwritten text-[15px] text-ink/70 shadow-sm">
            {city}
          </span>
        </div>

        {/* Pin legend hint — only on first load */}
        <div className="absolute bottom-3 right-3 z-[1000] pointer-events-none">
          <span className="bg-parchment/90 rounded-full px-3 py-1 font-handwritten text-[13px] text-ink/50">
            {t('res.tapPin')}
          </span>
        </div>
      </div>

      {/* ── Content panel ── */}
      <div
        className="flex-1 flex flex-col overflow-hidden border-t border-ink/8 lg:border-t-0 lg:border-l"
        role="region"
        aria-label="Neighborhood details"
      >
        {/* Header row */}
        <div className="px-5 pt-4 pb-3 shrink-0 border-b border-ink/8 flex items-baseline justify-between gap-3">
          <h1 className="font-display text-[18px] md:text-[20px] lg:text-[24px] leading-tight text-ink">
            {t('res.title')}
          </h1>
          {/* Active neighborhood quick label */}
          <span className="font-handwritten text-[15px] text-teal-deep shrink-0">
            {NEIGHBORHOODS[activeIdx].name}
          </span>
        </div>

        {/* Scrollable neighborhood card */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIdx}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="px-5 pt-4 pb-8"
            >
              <NeighborhoodCard
                neighborhood={NEIGHBORHOODS[activeIdx]}
                rank={activeIdx + 1}
                walkPrefs={answers.walkPrefs}
                onFindHousing={onFindHousing}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot nav + restart */}
        <div className="shrink-0 px-5 py-3 border-t border-ink/8 flex items-center gap-4">
          <div className="flex gap-1.5 items-center flex-1" role="tablist" aria-label="Select neighborhood">
            {NEIGHBORHOODS.map((n, i) => (
              <button
                key={i}
                onClick={() => navigate(i)}
                role="tab"
                aria-selected={activeIdx === i}
                aria-label={`${n.name} — neighborhood ${i + 1}`}
                className="flex items-center justify-center w-8 h-8 rounded-full"
              >
                <span className={`block rounded-full transition-all duration-200 ${
                  activeIdx === i
                    ? 'w-[24px] h-[7px] bg-teal-deep'
                    : 'w-[7px] h-[7px] bg-[#C4C0BA]'
                }`} />
              </button>
            ))}
          </div>
          <button
            onClick={onRestart}
            className="font-handwritten text-[15px] text-ink/40 hover:text-ink/70 transition-colors"
          >
            {t('res.startOver')}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Neighborhood card ── */

function NeighborhoodCard({ neighborhood: n, rank, walkPrefs, onFindHousing }: { neighborhood: Neighborhood; rank: number; walkPrefs: string[]; onFindHousing: (n: Neighborhood) => void }) {
  const t = useT()
  const { cardRef, share, state } = useShareImage(n.name)
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(n.mapQuery)}`

  const shareLabel =
    state === 'capturing' ? '…' :
    state === 'done'      ? '✓' :
    state === 'error'     ? '!' : undefined

  return (
    <div className="flex flex-col gap-4">
      {/* Name row */}
      <div className="flex items-center gap-2.5">
        <span className="font-handwritten text-[14px] text-ink/40 border border-ink/20 rounded-full px-2 py-0.5 shrink-0">
          {t('res.rank', { rank })}
        </span>
        <span className="font-handwritten text-[24px] lg:text-[28px] text-ink leading-none">
          {n.name}
        </span>
        {n.district && (
          <span className="font-handwritten text-[14px] text-ink/35 ml-0.5">{n.district}</span>
        )}
        <button
          onClick={share}
          disabled={state === 'capturing'}
          aria-label={state === 'capturing' ? 'Creating image…' : `Share ${n.name} as image`}
          title="Share as image"
          className="ml-auto shrink-0 w-9 h-9 flex items-center justify-center rounded-full border border-ink/15 text-ink/35 hover:border-teal-deep hover:text-teal-deep transition-all duration-200 disabled:opacity-40 cursor-pointer"
        >
          {shareLabel
            ? <span className="font-handwritten text-[14px] text-teal-deep">{shareLabel}</span>
            : <ShareIcon />}
        </button>
      </div>

      {/* Day story */}
      <div className="flex flex-col gap-3.5">
        <p className="font-handwritten text-[18px] lg:text-[20px] leading-[1.65] text-ink">
          {n.dayOpening}
        </p>
        <div className="border-t border-ink/10" />
        {n.dayMoments.map((m, i) => <DayMomentBlock key={i} moment={m} />)}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {n.tags.map(tag => (
          <span key={tag} className="border border-teal-deep rounded-full px-3 py-1 font-handwritten text-[15px] text-teal-deep">
            {tag}
          </span>
        ))}
      </div>

      {/* Local picks */}
      {n.shops && n.shops.length > 0 && (
        <div className="flex flex-col gap-2.5">
          <span className="font-handwritten text-[15px] text-ink/40">{t('res.localPicks')}</span>
          {n.shops.map(shop => (
            <div
              key={shop.name}
              className="flex items-center gap-3 rounded-2xl px-4 py-3.5"
              style={{ background: 'rgba(232,221,208,0.6)', border: '1px solid rgba(255,255,255,0.5)' }}
            >
              <div
                className="w-14 h-14 rounded-xl shrink-0 flex items-center justify-center text-3xl"
                style={{ background: 'rgba(255,255,255,0.6)' }}
                aria-hidden
              >
                {shop.emoji}
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-handwritten text-[17px] text-ink leading-none">{shop.name}</span>
                  {matchesWalkPrefs(shop.category, walkPrefs) && (
                    <span className="font-handwritten text-[12px] text-white bg-teal-deep rounded-full px-2 py-0.5 leading-none">
                      {t('res.matches')}
                    </span>
                  )}
                </div>
                <span className="font-handwritten text-[13px] text-ink/40">{shop.category}</span>
                <p className="font-handwritten text-[14px] text-ink/60 leading-snug">{shop.blurb}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Map link */}
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 rounded-2xl px-4 py-3.5 group transition-opacity hover:opacity-75"
        style={{ background: 'rgba(232,221,208,0.6)', border: '1px solid rgba(255,255,255,0.5)' }}
      >
        <MapPinIcon />
        <div>
          <div className="font-handwritten text-[16px] text-ink/60 leading-none mb-0.5">
            {t('res.openMaps')}
          </div>
          <div className="font-handwritten text-[13px] text-ink/30">{n.mapQuery}</div>
        </div>
      </a>

      {/* Find a place to live — next part */}
      <button
        onClick={() => onFindHousing(n)}
        className="w-full bg-teal-deep text-white font-handwritten text-[19px] rounded-2xl py-3.5 min-h-[52px] hover:bg-teal-soft transition-colors duration-200 shadow-sm flex items-center justify-center gap-2"
      >
        {t('res.findHousing')}
        <span aria-hidden>→</span>
      </button>

      {/* Hidden share card */}
      <div ref={cardRef} style={{ position: 'fixed', left: '-9999px', top: 0, zIndex: -1 }} aria-hidden>
        <ShareCard neighborhood={n} />
      </div>
    </div>
  )
}

function DayMomentBlock({ moment: m }: { moment: DayMoment }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-handwritten text-[20px] lg:text-[22px] text-teal-deep leading-none">{m.time}</span>
      <p className="font-handwritten text-[18px] lg:text-[20px] leading-[1.65] text-ink">{m.text}</p>
    </div>
  )
}

function ShareIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1D5C6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5, flexShrink: 0 }}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

class MapErrorBoundary extends Component<{ children: ReactNode; label?: string }, { error: string | null }> {
  constructor(props: { children: ReactNode; label?: string }) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(e: Error) { return { error: e.message } }
  render() {
    if (this.state.error) {
      return (
        <div className="w-full h-full bg-sand/60 flex flex-col items-center justify-center gap-2 p-4">
          <span className="font-handwritten text-[15px] text-ink/50 text-center">{this.props.label ?? 'map error'}</span>
          <span className="font-ui text-[11px] text-ink/30 text-center break-all max-w-xs">{this.state.error}</span>
        </div>
      )
    }
    return this.props.children
  }
}

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import WindowSwipe from '../components/WindowSwipe'
import WalkCards from '../components/WalkCards'
import VibeSlider from '../components/VibeSlider'
import PriorityScale from '../components/PriorityScale'
import FreeText from '../components/FreeText'
import type { QuizAnswers } from '../types'

interface Props {
  city: string
  onGenerate: (answers: QuizAnswers) => void
}

const INITIAL: QuizAnswers = {
  windowView: 0,
  walkPrefs: [],
  vibe: 30,
  cityPriority: 3,
  freeText: '',
}

export default function Quiz({ city, onGenerate }: Props) {
  const [answers, setAnswers] = useState<QuizAnswers>(INITIAL)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const setRef = (index: number) => (el: HTMLElement | null) => {
    sectionRefs.current[index] = el
  }

  const set = <K extends keyof QuizAnswers>(key: K, val: QuizAnswers[K]) =>
    setAnswers(prev => ({ ...prev, [key]: val }))

  return (
    <div className="quiz-scroll bg-parchment">

      {/* Q1 — Window view */}
      <section ref={setRef(0)} className="quiz-section px-6 safe-top safe-bottom">
        <div className="flex-1 flex flex-col max-w-[430px] lg:max-w-[600px] mx-auto w-full pt-10 pb-4">
          <QuizTitle>
            What Window Would<br />You Like to<br />Wake Up To?
          </QuizTitle>
          <div className="flex-1 flex flex-col justify-center py-4">
            <WindowSwipe
              selected={answers.windowView}
              onChange={v => set('windowView', v)}
            />
          </div>
          <DownButton onClick={() => scrollToSection(1)} />
        </div>
      </section>

      {/* Q2 — Walk prefs */}
      <section ref={setRef(1)} className="quiz-section px-6 safe-top safe-bottom">
        <div className="flex-1 flex flex-col max-w-[430px] lg:max-w-[600px] mx-auto w-full pt-10 pb-4 overflow-y-auto">
          <QuizTitle>
            What Would You<br />Like Within a Five-<br />Minute Walk?
          </QuizTitle>
          <div className="flex-1 py-4">
            <WalkCards
              selected={answers.walkPrefs}
              onChange={v => set('walkPrefs', v)}
              onComplete={() => scrollToSection(2)}
            />
          </div>
          <DownButton onClick={() => scrollToSection(2)} />
        </div>
      </section>

      {/* Q3 — Vibe slider */}
      <section ref={setRef(2)} className="quiz-section px-6 safe-top safe-bottom">
        <div className="flex-1 flex flex-col max-w-[430px] lg:max-w-[600px] mx-auto w-full pt-10 pb-4">
          <QuizTitle>
            Do You Prefer a<br />Quiet Neighborhood<br />or a Lively One?
          </QuizTitle>
          <div className="flex-1 flex flex-col justify-center py-8">
            <VibeSlider value={answers.vibe} onChange={v => set('vibe', v)} />
          </div>
          <DownButton onClick={() => scrollToSection(3)} />
        </div>
      </section>

      {/* Q4 — City center priority */}
      <section ref={setRef(3)} className="quiz-section px-6 safe-top safe-bottom">
        <div className="flex-1 flex flex-col max-w-[430px] lg:max-w-[600px] mx-auto w-full pt-10 pb-4">
          <QuizTitle>
            How Important Is It<br />for You to Get to<br />the City Center Quickly?
          </QuizTitle>
          <div className="flex-1 flex flex-col justify-center py-2">
            <PriorityScale
              value={answers.cityPriority}
              onChange={v => set('cityPriority', v)}
            />
          </div>
          <DownButton onClick={() => scrollToSection(4)} />
        </div>
      </section>

      {/* Q5 — Free text + Generate */}
      <section ref={setRef(4)} className="quiz-section px-6 safe-top safe-bottom">
        <div className="flex-1 flex flex-col max-w-[430px] lg:max-w-[600px] mx-auto w-full pt-10 pb-4">
          <QuizTitle>
            Other things you<br />would like us to<br />know…
          </QuizTitle>
          <div className="flex-1 flex flex-col justify-center py-4">
            <FreeText value={answers.freeText} onChange={v => set('freeText', v)} />
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => onGenerate(answers)}
            className="
              w-full bg-teal-deep text-white font-handwritten text-[22px]
              rounded-full py-4 min-h-[56px]
              hover:bg-teal-soft transition-colors duration-200
              shadow-md shrink-0
            "
          >
            Generate
          </motion.button>
          <p className="mt-3 font-handwritten text-[16px] text-ink/40 text-center">
            for {city}
          </p>
        </div>
      </section>
    </div>
  )
}

function QuizTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-[28px] lg:text-[38px] leading-[1.25] text-ink text-center mb-2 shrink-0">
      {children}
    </h2>
  )
}

function DownButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex justify-center py-3 shrink-0">
      <motion.button
        onClick={onClick}
        whileTap={{ scale: 0.90 }}
        whileHover={{ scale: 1.08 }}
        className="
          w-11 h-11 rounded-full border-[1.5px] border-teal-deep/50
          flex items-center justify-center text-teal-deep
          hover:bg-teal-deep hover:text-white hover:border-teal-deep
          transition-colors duration-200
        "
        aria-label="Continue to next question"
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path
            d="M7.5 2v11M2.5 8l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.button>
    </div>
  )
}

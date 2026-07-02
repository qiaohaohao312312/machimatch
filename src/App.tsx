import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { AnimationProps } from 'framer-motion'
import Landing from './screens/Landing'
import Quiz from './screens/Quiz'
import Loading from './screens/Loading'
import Results from './screens/Results'
import type { Screen, QuizAnswers } from './types'

const PAGE: AnimationProps = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.22, ease: 'easeOut' },
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('landing')
  const [city, setCity] = useState('')
  const [answers, setAnswers] = useState<QuizAnswers | null>(null)

  return (
    <div className="h-full bg-parchment overflow-hidden">
      <AnimatePresence mode="wait">
        {screen === 'landing' && (
          <motion.div key="landing" {...PAGE} className="h-full">
            <Landing
              onSelect={c => {
                setCity(c)
                setScreen('quiz')
              }}
            />
          </motion.div>
        )}

        {screen === 'quiz' && (
          <motion.div key="quiz" {...PAGE} className="h-full">
            <Quiz
              city={city}
              onGenerate={a => {
                setAnswers(a)
                setScreen('loading')
              }}
            />
          </motion.div>
        )}

        {screen === 'loading' && (
          <motion.div key="loading" {...PAGE} className="h-full">
            <Loading onDone={() => setScreen('results')} />
          </motion.div>
        )}

        {screen === 'results' && answers && (
          <motion.div key="results" {...PAGE} className="h-full overflow-y-auto">
            <Results
              city={city}
              answers={answers}
              onRestart={() => {
                setAnswers(null)
                setCity('')
                setScreen('landing')
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export type Screen = 'landing' | 'quiz' | 'loading' | 'results' | 'housing'

export interface QuizAnswers {
  windowView: number
  walkPrefs: string[]
  vibe: number
  cityPriority: number
  freeText: string
}

export interface DayMoment {
  time: string
  text: string
}

export interface Shop {
  name: string
  category: string
  blurb: string
  emoji: string
  coordinates: [number, number]  // [lat, lng]
}

export interface Neighborhood {
  id: number
  name: string
  district?: string
  city: string
  intro: string
  dayOpening: string
  dayMoments: DayMoment[]
  tags: string[]
  mapQuery: string
  coordinates?: [number, number]  // [lat, lng]
  shops?: Shop[]
}

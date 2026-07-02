// Mirrors src/types.ts — keep in sync
export interface QuizAnswers {
  windowView: number   // 0=green, 1=street, 2=city
  walkPrefs: string[]  // up to 3 amenities
  vibe: number         // 0=quiet … 100=lively
  cityPriority: number // 1–5
  freeText: string
}

export interface DayMoment {
  time: string
  text: string
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
}

export interface GenerateRequest {
  city: string
  answers: QuizAnswers
}

export interface GenerateResponse {
  neighborhoods: Neighborhood[]
}

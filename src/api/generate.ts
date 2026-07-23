import type { QuizAnswers, Neighborhood } from '../types'

export async function generateNeighborhoods(
  city: string,
  answers: QuizAnswers,
  lang: string = 'en'
): Promise<Neighborhood[]> {
  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ city, answers, lang }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error ?? 'Generation failed')
  }

  const data = await res.json() as { neighborhoods: Neighborhood[] }
  return data.neighborhoods
}

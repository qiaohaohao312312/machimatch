import type { GenerateRequest, Neighborhood } from '../types'

const WINDOW_LABELS = ['green view with trees', 'busy lively city street', 'city skyline high above']

function buildPrompt({ city, answers }: GenerateRequest): string {
  const { windowView, walkPrefs, vibe, cityPriority, freeText } = answers
  const vibeLabel = vibe < 30 ? 'quiet and calm' : vibe < 70 ? 'balanced energy' : 'lively and buzzing'
  const proximityLabel = ['not important', 'nice to have', 'somewhat important', 'pretty important', 'must be within 15 min'][cityPriority - 1]

  return `You are Machimatch, a neighborhood discovery tool. Based on the following lifestyle preferences, recommend 5 real neighborhoods in ${city} that genuinely fit this person.

PREFERENCES:
- Preferred window view: ${WINDOW_LABELS[windowView] ?? 'any'}
- Wants within 5-min walk: ${walkPrefs.length ? walkPrefs.join(', ') : 'flexible'}
- Neighborhood vibe: ${vibeLabel} (${vibe}/100)
- City center proximity: ${proximityLabel}
- Personal notes: "${freeText || 'none'}"

Return a JSON array of exactly 5 neighborhoods. Each must be a REAL neighborhood in ${city}. Format:

[
  {
    "id": 1,
    "name": "Neighborhood Name",
    "district": "Local name or district (optional)",
    "city": "${city}",
    "intro": "2-3 sentences: what this neighborhood is like, its character and feel.",
    "dayOpening": "One evocative sentence: how the morning feels when you wake up here. Second-person, sensory, no generic phrases.",
    "dayMoments": [
      { "time": "8:30 am", "text": "A specific moment in the morning. What you do, smell, see. Second-person, specific to this neighborhood." },
      { "time": "1:00 pm", "text": "A midday moment." },
      { "time": "7:00 pm", "text": "An evening moment. End with a feeling of belonging." }
    ],
    "tags": ["tag1", "tag2", "tag3", "tag4"],
    "mapQuery": "Neighborhood Name, City"
  }
]

Rules:
- Only real, specific neighborhoods — no invented places
- Stories must feel specific to the neighborhood, not generic
- Match the person's lifestyle: if they want quiet, suggest quieter areas; if lively, suggest vibrant ones
- "dayOpening" and "dayMoments.text" must be second-person ("you"), present-tense, sensory
- Tags: 4-5 short descriptive words/phrases
- Respond with ONLY the JSON array, no markdown, no explanation`
}

function parseNeighborhoods(raw: string): Neighborhood[] {
  // Strip any markdown code fences if DeepSeek wraps the response
  const cleaned = raw.replace(/^```(?:json)?\n?/m, '').replace(/\n?```$/m, '').trim()
  return JSON.parse(cleaned) as Neighborhood[]
}

export async function generateNeighborhoods(req: GenerateRequest): Promise<Neighborhood[]> {
  const response = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: buildPrompt(req) }],
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`DeepSeek API error ${response.status}: ${body}`)
  }

  const data = await response.json()
  const text = data.choices?.[0]?.message?.content
  if (!text) throw new Error('Unexpected DeepSeek response shape')

  return parseNeighborhoods(text)
}

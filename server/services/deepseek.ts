import type { GenerateRequest, Neighborhood } from '../types'

const WINDOW_LABELS = ['green view with trees', 'busy lively city street', 'city skyline high above']
const LANG_NAMES: Record<string, string> = { en: 'English', ja: 'Japanese', zh: 'Simplified Chinese' }

function buildPrompt({ city, answers, lang }: GenerateRequest): string {
  const { windowView, walkPrefs, vibe, cityPriority, freeText } = answers
  const vibeLabel = vibe < 30 ? 'quiet and calm' : vibe < 70 ? 'balanced energy' : 'lively and buzzing'
  const proximityLabel = ['not important', 'nice to have', 'somewhat important', 'pretty important', 'must be within 15 min'][cityPriority - 1]
  const language = LANG_NAMES[lang ?? 'en'] ?? 'English'

  return `You are Machimatch, a neighborhood discovery tool. Based on the following lifestyle preferences, recommend 5 real neighborhoods in ${city} that genuinely fit this person.

WRITE ALL HUMAN-READABLE TEXT IN ${language}. This applies to intro, dayOpening, every dayMoments.text, tags, and each shop's blurb — write them naturally in ${language} (not translated-sounding). Keep proper nouns (neighborhood names, shop names, station names) in their local form. Keep the JSON keys, "category" values, "nameJa", "wardSlug", "mapQuery" and all numbers exactly as specified below regardless of language.

PREFERENCES (five signals — treat them as roughly equal in importance):
1. Preferred window view: ${WINDOW_LABELS[windowView] ?? 'any'}
2. Wants within 5-min walk: ${walkPrefs.length ? walkPrefs.join(', ') : 'flexible'}
3. Neighborhood vibe: ${vibeLabel} (${vibe}/100)
4. City center proximity: ${proximityLabel}
5. Personal notes: "${freeText || 'none'}"

HOW TO WEIGH THESE:
- Give the five signals roughly equal weight. No single answer should dominate the outcome — a neighborhood that nails one dimension but ignores the rest is a poor match.
- Score each candidate on how well it balances ALL five signals together; prefer neighborhoods that satisfy more dimensions at once over ones that max out a single dimension.
- When two signals pull in different directions (e.g. a lively vibe but a green window view), look for neighborhoods that reconcile them rather than surrendering to just one.
- Personal notes are one signal among five, not an override — weave them in without letting them eclipse the other four.
- Across the 5 results, show range: cover different balanced trade-offs instead of repeating the same one-note match.

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
    "mapQuery": "Neighborhood Name, City",
    "coordinates": [35.6617, 139.6678],
    "nameJa": "",
    "wardSlug": "",
    "shops": [
      {
        "name": "Real business name",
        "category": "short category, e.g. coffee shops / bookshops / record shop / bakery / vintage boutique",
        "blurb": "One specific sentence about what makes this place worth visiting.",
        "emoji": "single emoji representing the category, e.g. ☕ 📚 💿 🥐 👗",
        "coordinates": [35.662, 139.668]
      }
    ]
  }
]

Rules:
- Only real, specific neighborhoods — no invented places
- Stories must feel specific to the neighborhood, not generic
- Apply the balanced weighting described above — every recommendation should reflect all five signals, not just the strongest one
- "dayOpening" and "dayMoments.text" must be second-person ("you"), present-tense, sensory
- Tags: 4-5 short descriptive words/phrases
- "coordinates" is the [latitude, longitude] of the neighborhood's center, as real decimal numbers
- "nameJa": the neighborhood's Japanese name if this city is in Japan (e.g. "下北沢"), otherwise "". "wardSlug": the romaji ward/city used by Japanese rental sites, lowercase letters only, no suffix (e.g. Shimokitazawa → "setagaya", Nakameguro → "meguro"), otherwise "". Leave BOTH as "" for any city outside Japan.
- "shops": exactly 3 REAL, currently operating small local businesses actually located in that neighborhood — no invented names. Prefer categories matching this person's 5-min-walk preferences (${walkPrefs.length ? walkPrefs.join(', ') : 'a natural local mix'}) where a real match exists, otherwise pick genuinely notable local spots (a cafe, a bookshop, a bar, a bakery, a boutique — whatever is actually there and well-regarded)
- Each shop's "coordinates" should be its real approximate location within the neighborhood
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

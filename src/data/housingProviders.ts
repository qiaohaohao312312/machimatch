// Real-housing deep-links.
//
// Machimatch does not list or price homes itself (see docs/PRODUCT.md) — this
// module builds pre-filtered SEARCH links that open live, real listings on the
// actual housing platforms. Every URL pattern here was verified to resolve.
// Native search where the platform supports it (Airbnb, Booking); Google
// site-scoped search for the local rental portals, which reliably lands on real
// current listings for the neighborhood in any city/language and never 404s.

export type StayBucket = 'short' | 'mid' | 'long'

export interface HousingPrefs {
  stay: StayBucket
  roomType: string // one of ROOM_TYPES id
  minSize: number  // m², 0 = any
  budget: number   // ¥/month max, 0 = any
}

export const STAYS: { id: StayBucket; label: string; hint: string }[] = [
  { id: 'short', label: 'Under 1 month', hint: 'furnished · short stay' },
  { id: 'mid',   label: '1–6 months',    hint: 'monthly · furnished' },
  { id: 'long',  label: '6 months +',    hint: 'local lease · unfurnished' },
]

export const ROOM_TYPES: { id: string; label: string; en: string; jp: string }[] = [
  { id: 'any',    label: 'Any',         en: '',                     jp: '' },
  { id: 'studio', label: 'Studio',      en: 'studio apartment',     jp: '1R 1K' },
  { id: '1br',    label: '1 bedroom',   en: '1 bedroom apartment',  jp: '1DK 1LDK' },
  { id: '2br',    label: '2 bedrooms',  en: '2 bedroom apartment',  jp: '2DK 2LDK' },
  { id: '3br',    label: '3 bedrooms +',en: '3 bedroom apartment',  jp: '3LDK' },
]

export const SIZES: { value: number; label: string }[] = [
  { value: 0,  label: 'Any' },
  { value: 20, label: '20 m²+' },
  { value: 30, label: '30 m²+' },
  { value: 40, label: '40 m²+' },
  { value: 50, label: '50 m²+' },
]

export const BUDGETS: { value: number; label: string }[] = [
  { value: 0,      label: 'Any' },
  { value: 80000,  label: '≤ ¥80k' },
  { value: 120000, label: '≤ ¥120k' },
  { value: 200000, label: '≤ ¥200k' },
  { value: 400000, label: '≤ ¥400k' },
]

export interface LinkCtx {
  city: string
  neighborhood: string
  jpName?: string // Japanese district name if available, for JP-site queries
  prefs: HousingPrefs
}

export interface HousingLink {
  id: string
  name: string
  note: string
  url: string
}

function roomOf(prefs: HousingPrefs) {
  return ROOM_TYPES.find(r => r.id === prefs.roomType) ?? ROOM_TYPES[0]
}

export function isJapan(city: string, extra = ''): boolean {
  const s = `${city} ${extra}`.toLowerCase()
  if (/tokyo|osaka|kyoto|yokohama|nagoya|fukuoka|sapporo|kobe|nara|japan/.test(s)) return true
  // any kana / kanji present
  return /[぀-ヿ一-龯]/.test(`${city}${extra}`)
}

function hasCJK(s: string): boolean {
  return /[぀-ヿ一-龯]/.test(s)
}

function g(query: string): string {
  return `https://www.google.com/search?q=${encodeURIComponent(query.replace(/\s+/g, ' ').trim())}`
}

// Build the visible set of real-listing links for the given context.
export function buildHousingLinks(ctx: LinkCtx): HousingLink[] {
  const { city, neighborhood, jpName, prefs } = ctx
  const loc = `${neighborhood}, ${city}`
  const room = roomOf(prefs)
  const jp = isJapan(city, `${neighborhood} ${jpName ?? ''}`)
  // Use the specific neighborhood as the keyword (more precise than the ward);
  // append the district only when it's an actual Japanese name, not romaji.
  const jpKw = neighborhood + (jpName && hasCJK(jpName) ? ` ${jpName}` : '')
  const sizeEn = prefs.minSize ? ` ${prefs.minSize}m2` : ''
  const budgetJp = prefs.budget ? ` ${Math.round(prefs.budget / 10000)}万円以下` : ''

  const links: HousingLink[] = []

  // ── Global, native platforms ──
  if (prefs.stay === 'short' || prefs.stay === 'mid') {
    links.push({
      id: 'airbnb',
      name: 'Airbnb',
      note: prefs.stay === 'mid' ? 'furnished · set monthly dates' : 'furnished · short stay',
      url: `https://www.airbnb.com/s/${encodeURIComponent(loc)}/homes?adults=1`,
    })
  }
  if (prefs.stay === 'short') {
    links.push({
      id: 'booking',
      name: 'Booking.com',
      note: 'short stays · nightly',
      url: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(loc)}`,
    })
  }
  if (prefs.stay === 'mid') {
    links.push({
      id: 'furnished',
      name: 'Furnished monthly',
      note: 'HousingAnywhere · Spotahome · Nestpick',
      url: g(`${loc} furnished monthly apartment for rent ${room.en}${sizeEn}`),
    })
  }
  if (prefs.stay === 'long') {
    links.push({
      id: 'localrent',
      name: 'Local rental listings',
      note: 'the main rental portal for this city',
      url: g(`${loc} apartments for rent ${room.en}${sizeEn}`),
    })
  }

  // ── Japan-specific portals (Google site-scoped → real listings) ──
  if (jp) {
    if (prefs.stay === 'long') {
      links.push({
        id: 'suumo',
        name: 'SUUMO',
        note: "Japan's largest rental site",
        url: g(`${jpKw} 賃貸 ${room.jp}${budgetJp} site:suumo.jp`),
      })
      links.push({
        id: 'homes',
        name: "LIFULL HOME'S",
        note: 'major Japanese rental portal',
        url: g(`${jpKw} 賃貸 ${room.jp}${budgetJp} site:homes.co.jp`),
      })
    }
    if (prefs.stay === 'mid' || prefs.stay === 'long') {
      links.push({
        id: 'gaijinpot',
        name: 'GaijinPot Housing',
        note: 'English · foreigner-friendly',
        url: g(`${neighborhood} Tokyo apartment rent ${room.en} site:apartments.gaijinpot.com`),
      })
      links.push({
        id: 'oakhouse',
        name: 'Oakhouse',
        note: 'English · monthly · share houses',
        url: g(`${neighborhood} site:oakhouse.jp`),
      })
    }
  }

  return links
}

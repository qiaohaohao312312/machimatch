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
  nameJa?: string   // Japanese neighborhood name, for JP-site freeword search
  wardSlug?: string // romaji ward for SUUMO ward pages, e.g. "setagaya"
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
  if (/tokyo|osaka|kyoto|yokohama|kawasaki|nagoya|fukuoka|sapporo|kobe|nara|sendai|hiroshima|japan/.test(s)) return true
  return /[぀-ヿ一-龯]/.test(`${city}${extra}`) // any kana / kanji
}

// City → prefecture slug used in SUUMO / AtHome / HOME'S rental URLs.
const PREF_SLUG: Record<string, string> = {
  tokyo: 'tokyo', osaka: 'osaka', kyoto: 'kyoto',
  yokohama: 'kanagawa', kawasaki: 'kanagawa', kanagawa: 'kanagawa',
  nagoya: 'aichi', aichi: 'aichi', fukuoka: 'fukuoka',
  sapporo: 'hokkaido', hokkaido: 'hokkaido', kobe: 'hyogo', hyogo: 'hyogo',
  nara: 'nara', sendai: 'miyagi', miyagi: 'miyagi', hiroshima: 'hiroshima',
}

function prefSlugOf(city: string): string | null {
  const key = city.toLowerCase()
  for (const k of Object.keys(PREF_SLUG)) {
    if (key.includes(k)) return PREF_SLUG[k]
  }
  return null
}

const safe = (s: string | undefined) => (s && /^[a-z]+$/.test(s) ? s : null)

// Build the visible set of real-listing links. JP portals link DIRECTLY to the
// site (native search URLs, verified to resolve), never through a search engine.
export function buildHousingLinks(ctx: LinkCtx): HousingLink[] {
  const { city, neighborhood, nameJa, wardSlug, prefs } = ctx
  const loc = `${neighborhood}, ${city}`
  const jp = isJapan(city, `${neighborhood} ${nameJa ?? ''}`)
  const pref = prefSlugOf(city)             // e.g. 'tokyo' | null
  const ward = safe(wardSlug?.toLowerCase()) // e.g. 'setagaya' | null
  const room = roomOf(prefs)
  const kwBase = nameJa || neighborhood      // freeword keyword for JP sites
  const kw = room.jp ? `${kwBase} ${room.jp.split(' ')[0]}` : kwBase

  const links: HousingLink[] = []

  // ── Global, native platforms ──
  if (prefs.stay === 'short' || prefs.stay === 'mid' || prefs.stay === 'long') {
    links.push({
      id: 'airbnb',
      name: 'Airbnb',
      note: prefs.stay === 'short' ? 'furnished · short stay' : 'furnished · set monthly dates',
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

  if (jp) {
    // ── Japan: direct native links to the real rental portals ──
    if (prefs.stay === 'long') {
      // SUUMO — Japan's #1. Ward-level page when we know the ward, else prefecture.
      const suumo = pref
        ? (ward ? `https://suumo.jp/chintai/${pref}/sc_${ward}/` : `https://suumo.jp/chintai/${pref}/`)
        : 'https://suumo.jp/chintai/'
      links.push({ id: 'suumo', name: 'SUUMO', note: "Japan's largest rental site", url: suumo })

      // AtHome — #2. Prefecture list with the neighborhood as keyword.
      const athome = pref
        ? `https://www.athome.co.jp/chintai/${pref}/list/?keyword=${encodeURIComponent(kw)}`
        : 'https://www.athome.co.jp/chintai/'
      links.push({ id: 'athome', name: 'AtHome', note: 'major nationwide rental site', url: athome })

      // LIFULL HOME'S — freeword search actually filters by the Japanese name.
      const homes = pref
        ? `https://www.homes.co.jp/chintai/${pref}/list/?fw=${encodeURIComponent(kw)}`
        : 'https://www.homes.co.jp/chintai/'
      links.push({ id: 'homes', name: "LIFULL HOME'S", note: 'filtered by neighborhood', url: homes })
    }
    if (prefs.stay === 'mid') {
      links.push({
        id: 'oakhouse',
        name: 'Oakhouse',
        note: 'English · monthly · share houses',
        url: 'https://www.oakhouse.jp/eng',
      })
    }
  }

  return links
}

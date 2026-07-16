// Real-housing deep-links.
//
// Machimatch does not list or price homes itself (see docs/PRODUCT.md) — this
// module builds pre-filtered links that open live, real listings on the actual
// housing platforms. Every URL pattern here was verified to resolve. On SUUMO
// (Japan's #1) the user's constraints — rent, area, walk-to-station and layout
// — are encoded directly into the search URL so the results honour them.

export type StayBucket = 'short' | 'mid' | 'long'

export interface HousingPrefs {
  stay: StayBucket
  roomType: string // one of ROOM_TYPES id
  minSize: number  // m², 0 = any
  budget: number   // ¥/month max, 0 = any
  walk: number     // max walk-to-station minutes, 0 = any
}

export const STAYS: { id: StayBucket; label: string; hint: string }[] = [
  { id: 'short', label: 'Under 1 month', hint: 'furnished · short stay' },
  { id: 'mid',   label: '1–6 months',    hint: 'monthly · furnished' },
  { id: 'long',  label: '6 months +',    hint: 'local lease · unfurnished' },
]

// suumoMd: SUUMO madori (layout) codes for the FR301FC005 search.
export const ROOM_TYPES: { id: string; label: string; en: string; jp: string; suumoMd: string[] }[] = [
  { id: 'any',    label: 'Any',         en: '',                     jp: '',        suumoMd: [] },
  { id: 'studio', label: 'Studio',      en: 'studio apartment',     jp: '1R 1K',   suumoMd: ['01', '02'] },
  { id: '1br',    label: '1 bedroom',   en: '1 bedroom apartment',  jp: '1DK 1LDK',suumoMd: ['03', '04'] },
  { id: '2br',    label: '2 bedrooms',  en: '2 bedroom apartment',  jp: '2DK 2LDK',suumoMd: ['05', '06', '07'] },
  { id: '3br',    label: '3 bedrooms +',en: '3 bedroom apartment',  jp: '3LDK',    suumoMd: ['08', '09', '10', '11', '12', '13'] },
]

export const WALKS: { value: number; label: string }[] = [
  { value: 0,  label: 'Any' },
  { value: 5,  label: '≤ 5 min' },
  { value: 10, label: '≤ 10 min' },
  { value: 15, label: '≤ 15 min' },
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

// SUUMO municipality codes (JIS) for Tokyo wards + nearby cities. When we know
// the ward we can build SUUMO's fully-filtered search (rent/area/walk/layout).
const SUUMO_TOKYO_SC: Record<string, string> = {
  chiyoda: '13101', chuo: '13102', minato: '13103', shinjuku: '13104',
  bunkyo: '13105', taito: '13106', sumida: '13107', koto: '13108',
  shinagawa: '13109', meguro: '13110', ota: '13111', setagaya: '13112',
  shibuya: '13113', nakano: '13114', suginami: '13115', toshima: '13116',
  kita: '13117', arakawa: '13118', itabashi: '13119', nerima: '13120',
  adachi: '13121', katsushika: '13122', edogawa: '13123',
  musashino: '13203', mitaka: '13204',
}

// Full SUUMO Tokyo search with the user's constraints baked in.
function suumoFilteredUrl(sc: string, prefs: HousingPrefs, md: string[]): string {
  const ct = prefs.budget > 0 ? (prefs.budget / 10000).toFixed(1) : '9999999'
  const et = prefs.walk > 0 ? String(prefs.walk) : '9999999'
  const mb = prefs.minSize > 0 ? String(prefs.minSize) : '0'
  const mdParams = md.map(c => `&md=${c}`).join('')
  return `https://suumo.jp/jj/chintai/ichiran/FR301FC005/?ar=030&bs=040&ta=13&sc=${sc}` +
    `&cb=0.0&ct=${ct}&mb=${mb}&mt=9999999&et=${et}&cn=9999999${mdParams}`
}

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
      // SUUMO — Japan's #1. If we know the ward code, bake in ALL the user's
      // filters (rent / area / walk / layout); otherwise fall back to the
      // ward-level or prefecture page.
      const sc = ward ? SUUMO_TOKYO_SC[ward] : undefined
      const suumo = sc
        ? suumoFilteredUrl(sc, prefs, room.suumoMd)
        : pref
          ? (ward ? `https://suumo.jp/chintai/${pref}/sc_${ward}/` : `https://suumo.jp/chintai/${pref}/`)
          : 'https://suumo.jp/chintai/'
      links.push({
        id: 'suumo',
        name: 'SUUMO',
        note: sc ? 'your filters applied · rent, size, walk, layout' : "Japan's largest rental site",
        url: suumo,
      })

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

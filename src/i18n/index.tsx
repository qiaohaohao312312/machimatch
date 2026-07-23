import { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import { STRINGS, type Lang } from './strings'

export type { Lang }

export const LANGS: { id: Lang; label: string }[] = [
  { id: 'en', label: 'EN' },
  { id: 'ja', label: '日本語' },
  { id: 'zh', label: '中文' },
]

const STORAGE_KEY = 'machimatch.lang'

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'ja' || saved === 'zh') return saved
  } catch { /* ignore */ }
  return 'en'
}

type TFn = (key: string, vars?: Record<string, string | number>) => string

interface Ctx {
  lang: Lang
  setLang: (l: Lang) => void
  t: TFn
}

const LangContext = createContext<Ctx | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try { localStorage.setItem(STORAGE_KEY, l) } catch { /* ignore */ }
    if (typeof document !== 'undefined') document.documentElement.lang = l
  }, [])

  const t = useCallback<TFn>((key, vars) => {
    const entry = STRINGS[key]
    let s = entry ? (entry[lang] ?? entry.en) : key
    if (vars) {
      for (const k of Object.keys(vars)) {
        s = s.replace(new RegExp(`\\{${k}\\}`, 'g'), String(vars[k]))
      }
    }
    return s
  }, [lang])

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>
}

export function useI18n(): Ctx {
  const c = useContext(LangContext)
  if (!c) throw new Error('useI18n must be used within LanguageProvider')
  return c
}

export function useT(): TFn {
  return useI18n().t
}

export function LanguageSwitcher() {
  const { lang, setLang } = useI18n()
  return (
    <div className="fixed top-3 right-3 z-[2000] flex items-center gap-0.5 bg-parchment/85 rounded-full px-1 py-1 shadow-sm ring-1 ring-ink/10 backdrop-blur-sm">
      {LANGS.map(l => (
        <button
          key={l.id}
          onClick={() => setLang(l.id)}
          aria-pressed={lang === l.id}
          className={`font-handwritten text-[14px] leading-none px-2.5 py-1.5 rounded-full transition-colors ${
            lang === l.id ? 'bg-teal-deep text-white' : 'text-ink/45 hover:text-ink'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}

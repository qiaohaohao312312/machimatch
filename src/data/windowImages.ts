export interface WindowOption {
  id: number
  label: string
  sublabel: string
  url: string
}

export const WINDOW_OPTIONS: WindowOption[] = [
  {
    id: 0,
    label: 'green view',
    sublabel: 'with trees',
    url: `${import.meta.env.BASE_URL}window-green.png`,
  },
  {
    id: 1,
    label: 'busy, lively',
    sublabel: 'city street',
    url: `${import.meta.env.BASE_URL}window-street.png`,
  },
  {
    id: 2,
    label: 'city skyline',
    sublabel: 'high above',
    url: `${import.meta.env.BASE_URL}window-city.png`,
  },
]

export interface WindowOption {
  id: number
  labelKey: string
  sublabelKey: string
  url: string
}

export const WINDOW_OPTIONS: WindowOption[] = [
  {
    id: 0,
    labelKey: 'win.green',
    sublabelKey: 'win.green.sub',
    url: `${import.meta.env.BASE_URL}window-green.png`,
  },
  {
    id: 1,
    labelKey: 'win.street',
    sublabelKey: 'win.street.sub',
    url: `${import.meta.env.BASE_URL}window-street.png`,
  },
  {
    id: 2,
    labelKey: 'win.city',
    sublabelKey: 'win.city.sub',
    url: `${import.meta.env.BASE_URL}window-city.png`,
  },
]

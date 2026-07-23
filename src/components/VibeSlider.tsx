import { useRef } from 'react'
import { useT } from '../i18n'

interface Props {
  value: number
  onChange: (v: number) => void
}

export default function VibeSlider({ value, onChange }: Props) {
  const t = useT()
  const trackRef = useRef<HTMLDivElement>(null)

  const progress = `${value}%`

  return (
    <div className="w-full px-1">
      <div className="relative">
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{ '--range-progress': progress } as React.CSSProperties}
          ref={trackRef as unknown as React.RefObject<HTMLInputElement>}
          className="w-full"
          aria-label="Vibe slider from Quiet to Lively"
        />
      </div>

      <div className="flex justify-between mt-4">
        <span
          className={`font-handwritten text-[20px] lg:text-[24px] transition-opacity duration-200 ${
            value < 30 ? 'text-teal-deep opacity-100' : 'text-ink opacity-50'
          }`}
        >
          {t('vibe.quiet')}
        </span>
        <span
          className={`font-handwritten text-[20px] lg:text-[24px] transition-opacity duration-200 ${
            value > 70 ? 'text-teal-deep opacity-100' : 'text-ink opacity-50'
          }`}
        >
          {t('vibe.lively')}
        </span>
      </div>

      {/* Current feeling label */}
      <div className="mt-6 text-center min-h-[28px]">
        <span className="font-handwritten text-[16px] text-ink/60">
          {value < 20
            ? t('vibe.f1')
            : value < 40
            ? t('vibe.f2')
            : value < 60
            ? t('vibe.f3')
            : value < 80
            ? t('vibe.f4')
            : t('vibe.f5')}
        </span>
      </div>
    </div>
  )
}

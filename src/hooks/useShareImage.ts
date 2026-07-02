import { useRef, useState, useCallback } from 'react'
import html2canvas from 'html2canvas'

export function useShareImage(neighborhoodName: string) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<'idle' | 'capturing' | 'done' | 'error'>('idle')

  const share = useCallback(async () => {
    if (!cardRef.current) return
    setState('capturing')

    try {
      // Ensure fonts are loaded before capture
      await document.fonts.ready

      const canvas = await html2canvas(cardRef.current, {
        scale: 2,           // 2× for retina → 1080px wide
        useCORS: true,
        backgroundColor: '#F5EEE4',
        logging: false,
        allowTaint: false,
      })

      canvas.toBlob(async blob => {
        if (!blob) { setState('error'); return }

        const filename = `${neighborhoodName.replace(/\s+/g, '-').toLowerCase()}-day.png`
        const file = new File([blob], filename, { type: 'image/png' })

        // Try native share with file (mobile)
        if (
          typeof navigator.share === 'function' &&
          typeof navigator.canShare === 'function' &&
          navigator.canShare({ files: [file] })
        ) {
          try {
            await navigator.share({
              title: `My day in ${neighborhoodName}`,
              files: [file],
            })
            setState('done')
            return
          } catch {
            // User cancelled native share — fall through to download
          }
        }

        // Fallback: download the image
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        a.click()
        URL.revokeObjectURL(url)
        setState('done')
      }, 'image/png')
    } catch (err) {
      console.error('[useShareImage]', err)
      setState('error')
    }

    setTimeout(() => setState('idle'), 2500)
  }, [neighborhoodName])

  return { cardRef, share, state }
}

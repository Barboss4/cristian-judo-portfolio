import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { GalleryItem } from '../types/athlete'
import { galleryIllustrations } from '../data/theme'
import { assetUrl, externalUrl } from '../lib/content'
import { ImagePlaceholder } from './ImagePlaceholder'

type Props = {
  item: GalleryItem
  index: number
  total: number
  onClose: () => void
  onStep: (offset: number) => void
}

export function Lightbox({ item, index, total, onClose, onStep }: Props) {
  const dialog = useRef<HTMLDialogElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const modal = dialog.current
    if (!modal) return
    const previousFocus = document.activeElement
    modal.showModal()
    closeButton.current?.focus()
    return () => {
      modal.close()
      if (previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true })
    }
  }, [])

  const embedUrl = item.video?.type === 'embed' ? externalUrl(item.video.url) : undefined

  return (
    <dialog
      ref={dialog}
      className="lightbox"
      aria-labelledby="lightbox-title"
      onCancel={(event) => { event.preventDefault(); onClose() }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose() }}
      onKeyDown={(event) => {
        if (total < 2 || ['VIDEO', 'IFRAME'].includes((event.target as HTMLElement).tagName)) return
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault()
          onStep(event.key === 'ArrowLeft' ? -1 : 1)
        }
      }}
    >
      <div className="lightbox-inner">
        <button type="button" ref={closeButton} className="icon-button lightbox-close" onClick={onClose} aria-label="Fechar galeria"><X aria-hidden="true" /></button>
        <div className="lightbox-media" key={item.id}>
          {embedUrl ? <iframe title={item.title} src={embedUrl} allow="fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
            : item.video?.type === 'file' && item.video.url
              ? <video controls playsInline preload="metadata" src={assetUrl(item.video.url)} aria-label={item.title} />
              : <ImagePlaceholder photo={item.photo} illustration={item.illustration ?? galleryIllustrations[item.category]} alt={item.title} eager />}
        </div>
        <div className="lightbox-footer">
          <div aria-live="polite"><p className="eyebrow">{item.category} · {index + 1} de {total}</p><h3 id="lightbox-title">{item.title}</h3>{item.caption && <p>{item.caption}</p>}</div>
          {total > 1 && <div className="lightbox-controls">
            <button type="button" className="icon-button" onClick={() => onStep(-1)} aria-label="Mídia anterior"><ChevronLeft aria-hidden="true" /></button>
            <button type="button" className="icon-button" onClick={() => onStep(1)} aria-label="Próxima mídia"><ChevronRight aria-hidden="true" /></button>
          </div>}
        </div>
      </div>
    </dialog>
  )
}



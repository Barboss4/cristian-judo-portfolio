import { lazy, Suspense, useState } from 'react'
import { Maximize, Play } from 'lucide-react'
import { athlete } from '../data/athlete'
import { galleryIllustrations } from '../data/theme'
import type { GalleryCategory } from '../types/athlete'
import { SectionHeading } from '../components/SectionHeading'
import { ImagePlaceholder } from '../components/ImagePlaceholder'

const Lightbox = lazy(() => import('../components/Lightbox').then((module) => ({ default: module.Lightbox })))
const categories = (['Competições', 'Treinos', 'Pódios', 'Bastidores'] as const)
  .filter((category) => athlete.gallery.some((item) => item.category === category))

export function Gallery() {
  const [category, setCategory] = useState<GalleryCategory | ''>('')
  const [open, setOpen] = useState<number | null>(null)
  const items = athlete.gallery.filter((item) => !category || item.category === category)

  return (
    <section id="galeria" tabIndex={-1} className="section gallery-section" aria-label="Galeria de fotografias e vídeos">
      <div className="gallery-scene">
        <div className="wide gallery-header">
          <SectionHeading label="Galeria" title="O judô em imagens.">
            {athlete.demo && <p className="demo-note">Acervo ilustrativo</p>}
          </SectionHeading>
          {categories.length > 1 && <div className="gallery-filters" aria-label="Filtrar mídia por categoria" role="group">
            <button type="button" aria-pressed={!category} onClick={() => setCategory('')}>Todas</button>
            {categories.map((value) => <button key={value} type="button" aria-pressed={category === value} onClick={() => setCategory(value)}>{value}</button>)}
          </div>}
        </div>
        {items.length ? <div className="wide gallery-window">
          <div className="gallery-grid">
            {items.map((item, index) => (
              <button className="gallery-tile" type="button" key={item.id} onClick={() => setOpen(index)} aria-haspopup="dialog">
                <ImagePlaceholder photo={item.photo} illustration={item.illustration ?? galleryIllustrations[item.category]} />
                <span className="tile-overlay">
                  <span><small>{item.category}</small><strong>{item.title}</strong></span>
                  {item.video ? <Play size={21} aria-hidden="true" /> : <Maximize size={20} aria-hidden="true" />}
                </span>
              </button>
            ))}
          </div>
        </div> : <p className="wide empty-copy">As próximas imagens serão publicadas aqui.</p>}
        <div className="wide gallery-scroll-guide">
          <span>Role para explorar a galeria</span>
          <div className="gallery-scroll-progress" aria-hidden="true"><span /></div>
        </div>
      </div>
      {open !== null && items[open] && <Suspense fallback={<span className="sr-only" role="status">Abrindo galeria</span>}>
        <Lightbox item={items[open]} index={open} total={items.length} onClose={() => setOpen(null)}
          onStep={(offset) => setOpen((index) => index === null ? null : (index + offset + items.length) % items.length)} />
      </Suspense>}
    </section>
  )
}


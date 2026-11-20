import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { Layers2 } from 'lucide-react'
import gsap from 'gsap'
import { athlete } from '../data/athlete'
import { motion } from '../data/theme'
import { ImagePlaceholder } from './ImagePlaceholder'

export function RevealImage() {
  const mask = useRef<HTMLDivElement>(null)
  const track = useRef({ x: 0, y: 0, inside: false })
  const move = useRef<{ x: gsap.QuickToFunc; y: gsap.QuickToFunc } | null>(null)
  const [alternate, setAlternate] = useState(false)
  const { hero } = athlete

  useEffect(() => {
    const layer = mask.current
    if (!layer) return
    layer.style.setProperty('--radius', `${hero.radius}px`)
    layer.style.setProperty('--feather', `${hero.feather}px`)
    layer.style.setProperty('--peek-transition', `${hero.transition}s`)
    const pointer = gsap.matchMedia()
    pointer.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      move.current = {
        x: gsap.quickTo(track.current, 'x', { duration: hero.smoothing, ease: motion.ease, onUpdate: render }),
        y: gsap.quickTo(track.current, 'y', { duration: hero.smoothing, ease: motion.ease, onUpdate: render }),
      }
      return () => {
        move.current = null
        track.current.inside = false
        layer.removeAttribute('data-peek')
      }
    })
    function render() {
      layer?.style.setProperty('--mx', `${track.current.x}px`)
      layer?.style.setProperty('--my', `${track.current.y}px`)
    }
    return () => pointer.revert()
  }, [hero])

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    const layer = mask.current
    if (!move.current || !layer || alternate || event.pointerType === 'touch') return
    const bounds = layer.getBoundingClientRect()
    if (!bounds.width || !bounds.height) return
    const x = (event.clientX - bounds.left) * layer.clientWidth / bounds.width
    const y = (event.clientY - bounds.top) * layer.clientHeight / bounds.height
    if (!track.current.inside) {
      track.current.inside = true
      move.current.x(x, x)
      move.current.y(y, y)
      layer.dataset.peek = 'true'
    } else {
      move.current.x(x)
      move.current.y(y)
    }
  }

  function endPeek() {
    track.current.inside = false
    mask.current?.removeAttribute('data-peek')
  }

  return (
    <>
      <div className="hero-art" onPointerMove={handleMove} onPointerLeave={endPeek}>
        <div className="hero-media">
          <ImagePlaceholder photo={hero.primary} illustration="images/hero/apresentacao.svg" alt="Ilustração de judoca com judogi branco" className="hero-image" eager priority />
          <div ref={mask} className="hero-alternate" data-alternate={alternate} aria-hidden={!alternate}>
            <ImagePlaceholder photo={hero.alternate} illustration="images/hero/revelacao.svg" alt="Ilustração de judoca com judogi azul" className="hero-image" eager />
          </div>
        </div>
        <div className="hero-art-shade" aria-hidden="true" />
        <div className="hero-art-wash" aria-hidden="true" />
        <span className="hero-kanji" aria-hidden="true" lang="ja">柔<br />道</span>
      </div>
      <button type="button" className="hero-toggle" aria-pressed={alternate} aria-label="Alternar retrato" onClick={() => { endPeek(); setAlternate(!alternate) }}>
        <Layers2 size={17} aria-hidden="true" /> <span>Alternar retrato</span>
      </button>
    </>
  )
}


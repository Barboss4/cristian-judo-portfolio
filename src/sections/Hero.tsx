import { ChevronDown } from 'lucide-react'
import { athlete } from '../data/athlete'
import { RevealImage } from '../components/RevealImage'

export function Hero() {
  return (
    <>
      <section id="inicio" className="hero" tabIndex={-1} aria-labelledby="athlete-title">
        <div className="hero-stage">
          <div className="hero-scroll-background" aria-hidden="true">
            <p className="hero-scroll-quote">{athlete.quote}</p>
          </div>
          <RevealImage />
          <svg className="hero-scroll-mark" viewBox="0 0 840 270" fill="none" aria-hidden="true">
            <path pathLength="1" d="M46 151C166 119 286 105 391 123L458 134C556 147 674 109 797 69" />
            <path pathLength="1" d="M62 168C205 135 312 128 402 144L443 153L474 131L442 111L403 128L443 153" />
            <path pathLength="1" d="M443 153C486 178 535 209 620 237M438 154C406 194 360 227 305 251" />
          </svg>
          <div className="wide hero-layout">
            <div className="hero-copy">
              <p className="eyebrow hero-eyebrow" data-hero-enter>Atleta de judô{athlete.demo && <span className="hero-demo">Perfil demonstrativo</span>}</p>
              <h1 id="athlete-title" data-hero-enter>{athlete.firstName}<span>{athlete.lastName}</span></h1>
              <p className="hero-belt" data-hero-enter><i aria-hidden="true" /> Faixa {athlete.belt}</p>
            </div>
            <a className="scroll-link" href="#sobre"><ChevronDown size={19} aria-hidden="true" /> Conheça o atleta</a>
          </div>
          <div className="hero-scroll-progress" aria-hidden="true"><span /></div>
        </div>
      </section>
      <div className="facts">
        <dl className="wide facts-inner">
          <div><dt>Modalidade</dt><dd>Judô</dd></div>
          {athlete.division && <div><dt>Categoria</dt><dd>{athlete.division}</dd></div>}
          <div><dt>Graduação</dt><dd><span className="belt-square" aria-hidden="true" /> Faixa {athlete.belt}</dd></div>
          {athlete.city && <div><dt>Base</dt><dd>{[athlete.city, athlete.state].filter(Boolean).join(', ')}</dd></div>}
        </dl>
      </div>
    </>
  )
}


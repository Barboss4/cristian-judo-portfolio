import { useRef, type CSSProperties } from 'react'
import { athlete } from './data/athlete'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Achievements } from './sections/Achievements'
import { Journey } from './sections/Journey'
import { Gallery } from './sections/Gallery'
import { Events } from './sections/Events'
import { Sponsors } from './sections/Sponsors'
import { Contact } from './sections/Contact'
import { usePortfolioMotion } from './lib/motion'

export default function App() {
  const viewport = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  usePortfolioMotion(viewport, content)

  return (
    <div style={{ '--belt-color': athlete.beltColor } as CSSProperties}>
      <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
      <Header />
      <div ref={viewport}>
        <div ref={content}>
          <main id="conteudo" tabIndex={-1}>
            <Hero />
            <About />
            <Achievements />
            <Journey />
            <Gallery />
            <Events />
            <Sponsors />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}

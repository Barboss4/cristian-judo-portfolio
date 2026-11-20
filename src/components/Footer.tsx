import { athlete } from '../data/athlete'
import { todayInBrazil } from '../lib/content'
import { Brand } from './Header'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wide footer-inner">
        <Brand />
        <p>© {todayInBrazil().slice(0, 4)} {athlete.fullName}{athlete.demo ? ' · Portfólio demonstrativo' : ''}</p>
        <nav aria-label="Links do rodapé">
          <a href="#inicio">Início</a>
          <a href="#patrocinadores">Patrocínio</a>
          <a href="#contato">Contato</a>
        </nav>
      </div>
    </footer>
  )
}

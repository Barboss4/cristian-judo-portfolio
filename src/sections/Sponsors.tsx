import { Download } from 'lucide-react'
import { athlete } from '../data/athlete'
import { assetUrl, externalUrl } from '../lib/content'
import { SectionHeading } from '../components/SectionHeading'
import { ImagePlaceholder } from '../components/ImagePlaceholder'

export function Sponsors() {
  return (
    <section id="patrocinadores" tabIndex={-1} className="section sponsors-section" aria-label="Patrocínio e apoio">
      <div className="wide sponsors-grid">
        <SectionHeading label="Patrocínio esportivo" title="Parcerias dentro e fora do tatame." />
        <div className="sponsor-copy" data-enter>
          <p>Associe sua marca à preparação, às competições e à trajetória de {athlete.firstName} no judô. Entre em contato para conversar sobre formatos de apoio e presença da marca.</p>
          <div className="flex flex-wrap gap-3">
            <a className="button button--light" href="#contato">Seja um patrocinador</a>
            {athlete.mediaKit
              ? <a className="button button--outline" href={assetUrl(athlete.mediaKit)} download><Download size={18} aria-hidden="true" /> Baixar mídia kit</a>
              : <button className="button button--outline" type="button" disabled><Download size={17} aria-hidden="true" /> Mídia kit indisponível</button>}
          </div>
        </div>
        {athlete.sponsors.length > 0 && <ul className="partner-list">
          {athlete.sponsors.map((partner) => {
            const url = externalUrl(partner.url)
            const content = <>{partner.logo && <ImagePlaceholder photo={partner.logo} className="partner-logo" />}
              <strong>{partner.name}</strong><span>{partner.category}</span></>
            return <li key={partner.name}>{url ? <a href={url}>{content}</a> : <div>{content}</div>}</li>
          })}
        </ul>}
      </div>
    </section>
  )
}

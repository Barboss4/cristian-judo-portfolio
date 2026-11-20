import { athlete } from '../data/athlete'
import { ImagePlaceholder } from '../components/ImagePlaceholder'
import { SectionHeading } from '../components/SectionHeading'
import { parseIsoDate, todayInBrazil } from '../lib/content'

export function About() {
  const today = todayInBrazil()
  const birthDate = athlete.birthDate
  const age = birthDate && parseIsoDate(birthDate) && (Number(today.slice(0, 4)) - Number(birthDate.slice(0, 4))
    - Number(today.slice(5) < birthDate.slice(5)))

  return (
    <section id="sobre" tabIndex={-1} className="paper section" aria-label="Sobre o atleta">
      <div className="wide about-grid">
        <figure className="about-figure" data-enter>
          <div className="about-photo">
            <ImagePlaceholder photo={athlete.portrait} illustration="images/athlete/retrato.svg" alt="Retrato ilustrado de um judoca" />
          </div>
          <figcaption>{athlete.portrait ? athlete.fullName : 'Retrato ilustrado'} <span lang="ja">柔道</span></figcaption>
        </figure>
        <div className="about-copy">
          <SectionHeading label="O atleta" title="Dentro e fora do tatame." />
          <blockquote data-enter>{athlete.quote}</blockquote>
          <div className="prose-copy" data-enter>
            {athlete.demo && <p className="demo-note">Perfil demonstrativo</p>}
            {athlete.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {athlete.goals && <p><strong>Objetivo esportivo.</strong> {athlete.goals}</p>}
          </div>
          <dl className="profile-facts" data-enter>
            <div><dt>Nome completo</dt><dd>{athlete.fullName}</dd></div>
            {athlete.city && <div><dt>Cidade</dt><dd>{[athlete.city, athlete.state].filter(Boolean).join(', ')}</dd></div>}
            {athlete.division && <div><dt>Categoria</dt><dd>{athlete.division}</dd></div>}
            <div><dt>Graduação</dt><dd>Faixa {athlete.belt}</dd></div>
            {typeof age === 'number' && Number.isFinite(age) && age >= 0 && <div><dt>Idade</dt><dd>{age} anos</dd></div>}
            {athlete.beganIn && <div><dt>No judô</dt><dd>Desde {athlete.beganIn}</dd></div>}
            {athlete.team && <div><dt>Equipe</dt><dd>{athlete.team}</dd></div>}
          </dl>
        </div>
      </div>
    </section>
  )
}


import { athlete } from '../data/athlete'
import { SectionHeading } from '../components/SectionHeading'
import { ImagePlaceholder } from '../components/ImagePlaceholder'

export function Journey() {
  const timeline = [...athlete.timeline].sort((a, b) => a.year - b.year)
  return (
    <section id="trajetoria" tabIndex={-1} className="paper section" aria-label="Trajetória esportiva">
      <div className="wide journey-grid">
        <SectionHeading label="Trajetória" title="A evolução de um judoca.">
          {athlete.demo && <p className="demo-note">Marcos demonstrativos</p>}
        </SectionHeading>
        {timeline.length ? <ol className="timeline">
          {timeline.map((item) => (
            <li className="timeline-item" key={item.id} data-enter>
              <time dateTime={String(item.year)}>{item.year}</time>
              <div><p className="eyebrow">{item.type}</p><h3>{item.title}</h3><p>{item.description}</p>
                {item.photo && <ImagePlaceholder photo={item.photo} illustration="images/athlete/retrato.svg" className="timeline-photo" />}
              </div>
            </li>
          ))}
        </ol> : <p className="empty-copy">Os primeiros marcos serão divulgados aqui.</p>}
      </div>
    </section>
  )
}

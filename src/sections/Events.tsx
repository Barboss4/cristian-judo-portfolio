import { CalendarDays } from 'lucide-react'
import { athlete } from '../data/athlete'
import type { Competition } from '../types/athlete'
import { SectionHeading } from '../components/SectionHeading'
import { parseIsoDate, todayInBrazil } from '../lib/content'

const monthFormat = new Intl.DateTimeFormat('pt-BR', { month: 'short', timeZone: 'UTC' })
type ScheduledCompetition = Competition & { day: Date }
const events = athlete.events.flatMap((event) => {
  const day = parseIsoDate(event.date)
  return day ? [{ ...event, day }] : []
}).sort((a, b) => a.date.localeCompare(b.date))

function EventList({ items }: { items: ScheduledCompetition[] }) {
  return (
    <ul className="events-list">
      {items.map((event) => (
        <li key={event.id}>
          <time dateTime={event.date}>
            <strong>{event.date.slice(8, 10)}</strong>
            <span>{monthFormat.format(event.day).replace('.', '')} {event.date.slice(0, 4)}</span>
          </time>
          <div><h4>{event.name}</h4><p>{[event.city, event.state, event.country, event.division].filter(Boolean).join(' · ')}</p></div>
          <span className={`event-status status--${event.status.toLowerCase()}`}>{event.status}</span>
        </li>
      ))}
    </ul>
  )
}

export function Events() {
  const today = todayInBrazil()
  const upcoming = events.filter((event) => event.date >= today && event.status !== 'Concluído')
  const past = events.filter((event) => event.date < today || event.status === 'Concluído')
  return (
    <section id="agenda" tabIndex={-1} className="paper section" aria-label="Agenda esportiva">
      <div className="wide events-grid">
        <SectionHeading label="Agenda" title="Próximas competições." />
        <div data-enter>
          {upcoming.length > 0 ? <EventList items={upcoming} /> : <div className="events-empty">
            <CalendarDays size={28} strokeWidth={1.4} aria-hidden="true" />
            <div><h3>Agenda em atualização</h3><p>As próximas competições serão divulgadas aqui.</p></div>
          </div>}
          {past.length > 0 && <div className="past-events"><h3>Competições anteriores</h3><EventList items={past} /></div>}
        </div>
      </div>
    </section>
  )
}


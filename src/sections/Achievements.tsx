import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { athlete } from '../data/athlete'
import type { Placement } from '../types/athlete'
import { ImagePlaceholder } from '../components/ImagePlaceholder'
import { SectionHeading } from '../components/SectionHeading'

const medalLabels: Partial<Record<number, string>> = { 1: 'Ouro', 2: 'Prata', 3: 'Bronze' }
const placementLabel = (place: Placement) => place === 'participação' ? 'Participação' : (medalLabels[place] ?? `${place}º lugar`)
const placementOrder = (place: Placement) => place === 'participação' ? Infinity : place
const results = [...athlete.results].sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
const years = [...new Set(results.flatMap((result) => result.year === undefined ? [] : [result.year]))]
const availablePlacements = [...new Set(results.map((result) => result.placement))]
  .sort((a, b) => placementOrder(a) - placementOrder(b))
const featured = results.filter((result) => result.featured)
const stats = [
  { label: 'Medalhas de ouro', total: results.filter((result) => result.placement === 1).length, tone: 'gold' },
  { label: 'Medalhas de prata', total: results.filter((result) => result.placement === 2).length, tone: 'silver' },
  { label: 'Medalhas de bronze', total: results.filter((result) => result.placement === 3).length, tone: 'bronze' },
  { label: 'Competições registradas', total: new Set(results.map((result) => result.competitionId || `${result.year}:${result.name}:${result.location}`)).size, tone: 'none' },
]
const hasMedals = stats.some((stat) => stat.tone !== 'none' && stat.total > 0)

export function Achievements() {
  const [year, setYear] = useState('')
  const [placement, setPlacement] = useState('')
  const filtered = results.filter((result) => (!year || String(result.year) === year) && (!placement || String(result.placement) === placement))

  return (
    <section id="conquistas" tabIndex={-1} className="section results-section" aria-label="Conquistas e resultados">
      <div className="wide">
        <SectionHeading label="Resultados" title="Conquistas no tatame.">
          {athlete.demo && <p className="demo-note">Resultados demonstrativos</p>}
        </SectionHeading>
        {hasMedals && <div className="stats" data-enter>
          {stats.map((stat) => <div className={`stat stat--${stat.tone}`} key={stat.label}>
            <strong><span data-count={stat.total} aria-hidden="true">{String(stat.total).padStart(2, '0')}</span><span className="sr-only">{stat.total}</span></strong>
            <span>{stat.label}</span>
          </div>)}
        </div>}
        {featured.length > 0 && <div className="result-highlights" data-enter>
          <p className="eyebrow">{featured.length === 1 ? 'Resultado em destaque' : 'Resultados em destaque'}</p>
          <ul>{featured.map((result) => <li className="result-feature" key={result.id}>
            <strong>{placementLabel(result.placement)}</strong>
            <div>
              <h3>{result.name}</h3>
              <p>{[result.location, result.year, result.bracketSize ? `${result.bracketSize} atletas na chave` : null].filter(Boolean).join(' · ')}</p>
            </div>
          </li>)}</ul>
        </div>}
        <div className="results-header">
          <h3>Histórico de resultados</h3>
          <div className="filters">
            {years.length > 1 && <label className="select-wrap"><span className="sr-only">Filtrar por ano</span><select value={year} onChange={(event) => setYear(event.target.value)}>
              <option value="">Todos os anos</option>
              {years.map((value) => <option key={value} value={value}>{value}</option>)}
            </select><ChevronDown size={15} aria-hidden="true" /></label>}
            {availablePlacements.length > 1 && <label className="select-wrap"><span className="sr-only">Filtrar por colocação</span><select value={placement} onChange={(event) => setPlacement(event.target.value)}>
              <option value="">Todas as colocações</option>
              {availablePlacements.map((place) => <option key={place} value={place}>{placementLabel(place)}</option>)}
            </select><ChevronDown size={15} aria-hidden="true" /></label>}
          </div>
        </div>
        <p role="status" className="sr-only">{filtered.length} {filtered.length === 1 ? 'resultado' : 'resultados'}</p>
        {filtered.length ? (
          <ul className="results-list">
            {filtered.map((result) => <li key={result.id} className={result.year !== undefined ? 'result-with-year' : undefined}>
              {result.year !== undefined && <time className="result-year" dateTime={String(result.year)}>{result.year}</time>}
              <div className="result-text">
                {result.photo && <ImagePlaceholder photo={result.photo} illustration="images/gallery/podio.svg" className="result-thumb" />}
                <div><h4>{result.name}</h4><p>{[result.location, result.division].filter(Boolean).join(' · ')}</p></div>
              </div>
              <span className={`result-place place--${result.placement}`}>{placementLabel(result.placement)}</span>
            </li>)}
          </ul>
        ) : <p className="empty-copy">{results.length ? 'Nenhum resultado corresponde aos filtros selecionados.' : 'Os resultados serão divulgados aqui.'}</p>}
      </div>
    </section>
  )
}

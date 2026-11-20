import { useState } from 'react'
import { ChevronDown, Medal } from 'lucide-react'
import { athlete } from '../data/athlete'
import type { Placement } from '../types/athlete'
import { ImagePlaceholder } from '../components/ImagePlaceholder'
import { SectionHeading } from '../components/SectionHeading'

const placements: Record<Placement, string> = { 1: 'Ouro', 2: 'Prata', 3: 'Bronze', participação: 'Participação' }
const results = [...athlete.results].sort((a, b) => b.year - a.year)
const years = [...new Set(results.map((result) => result.year))]
const availablePlacements = ([1, 2, 3, 'participação'] as const).filter((place) => results.some((result) => result.placement === place))
const titles = results.filter((result) => result.featured && result.placement === 1)
const stats = [
  { label: 'Medalhas de ouro', total: results.filter((result) => result.placement === 1).length, tone: 'gold' },
  { label: 'Medalhas de prata', total: results.filter((result) => result.placement === 2).length, tone: 'silver' },
  { label: 'Medalhas de bronze', total: results.filter((result) => result.placement === 3).length, tone: 'bronze' },
  { label: 'Competições', total: new Set(results.map((result) => result.competitionId || `${result.year}:${result.name}:${result.location}`)).size, tone: 'none' },
]

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
        <div className="stats" data-enter>
          {stats.map((stat) => <div className={`stat stat--${stat.tone}`} key={stat.label}>
            <strong><span data-count={stat.total} aria-hidden="true">{String(stat.total).padStart(2, '0')}</span><span className="sr-only">{stat.total}</span></strong>
            <span>{stat.label}</span>
          </div>)}
        </div>
        {titles.length > 0 && <div className="result-feature" data-enter><Medal aria-hidden="true" size={24} />
          <div><p className="eyebrow">{titles.length === 1 ? 'Título em destaque' : 'Títulos em destaque'}</p><p>{titles.map((title) => `${title.name} (${title.year})`).join(' · ')}</p></div>
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
              {availablePlacements.map((place) => <option key={place} value={place}>{placements[place]}</option>)}
            </select><ChevronDown size={15} aria-hidden="true" /></label>}
          </div>
        </div>
        <p role="status" className="sr-only">{filtered.length} {filtered.length === 1 ? 'resultado' : 'resultados'}</p>
        {filtered.length ? (
          <ul className="results-list">
            {filtered.map((result) => <li key={result.id}>
              <span className="result-year">{result.year}</span>
              <div className="result-text">
                {result.photo && <ImagePlaceholder photo={result.photo} illustration="images/gallery/podio.svg" className="result-thumb" />}
                <div><h4>{result.name}</h4><p>{result.location} · {result.division}</p></div>
              </div>
              <span className={`result-place place--${result.placement}`}>{placements[result.placement]}</span>
            </li>)}
          </ul>
        ) : <p className="empty-copy">{results.length ? 'Nenhum resultado corresponde aos filtros selecionados.' : 'Os resultados serão divulgados aqui.'}</p>}
      </div>
    </section>
  )
}

import type { Athlete } from '../types/athlete'

export const demoContent: Pick<Athlete, 'results' | 'timeline' | 'gallery'> = {
  results: [
    { id: 'r1', name: 'Copa Regional de Judô', year: 2025, location: 'São Paulo, SP', division: '−73 kg', placement: 1, featured: true },
    { id: 'r2', name: 'Circuito Estadual de Judô', year: 2025, location: 'Campinas, SP', division: '−73 kg', placement: 2 },
    { id: 'r3', name: 'Festival Interclubes', year: 2024, location: 'Santo André, SP', division: '−73 kg', placement: 3 },
    { id: 'r4', name: 'Torneio de Abertura', year: 2024, location: 'São Paulo, SP', division: '−73 kg', placement: 'participação' },
  ],
  timeline: [
    { id: 't1', year: 2021, title: 'O primeiro treino', description: 'O início no dojô, com a prática de quedas, deslocamentos e primeiras pegadas.', type: 'Início no judô' },
    { id: 't2', year: 2023, title: 'Estreia no circuito', description: 'A primeira competição trouxe novos ajustes na pegada e no ritmo de luta.', type: 'Primeira competição' },
    { id: 't3', year: 2025, title: 'Graduação à faixa roxa', description: 'Um novo ciclo de preparação, com mais atenção às transições e ao trabalho de solo.', type: 'Evolução de faixa' },
  ],
  gallery: [
    { id: 'g1', title: 'Concentração antes da luta', category: 'Competições' },
    { id: 'g2', title: 'O treino de todos os dias', category: 'Treinos' },
    { id: 'g3', title: 'Depois do combate', category: 'Pódios' },
    { id: 'g4', title: 'A faixa e o judogi', category: 'Bastidores' },
  ],
}


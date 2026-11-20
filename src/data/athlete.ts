import type { Athlete } from '../types/athlete'
import { demoContent } from './demo'

export const athlete: Athlete = {
  firstName: 'Cristian',
  lastName: 'Alves',
  fullName: 'Cristian Alves',
  demo: true,
  city: 'São Paulo',
  state: 'SP',
  division: '−73 kg',
  belt: 'roxa',
  beltColor: '#8164A5',
  beganIn: 2021,
  team: '',
  quote: 'Disciplina. Técnica. Evolução.',
  bio: [
    'Cristian encontrou no judô um esporte em que a precisão vale tanto quanto a força. No tatame, desenvolve seu repertório de técnicas, aprende a ler cada luta e leva essas lições para o treino seguinte.',
    'Faixa roxa, dedica-se à rotina de treinos e à preparação para competir na categoria até 73 kg.',
  ],
  goals: 'Consolidar a técnica em competição e evoluir no circuito estadual.',
  hero: {
    radius: 165,
    feather: 34,
    smoothing: 0.30,
    transition: 0.32,
    // primary: { src: 'images/hero/treino.webp', alt: 'Cristian com judogi branco' },
    // alternate: { src: 'images/hero/competicao.webp', alt: 'Cristian com judogi azul' },
  },
  // Substitua os exemplos por registros oficiais e ajuste demo para false.
  ...demoContent,
  events: [],
  sponsors: [],
  contact: {
    subject: 'Proposta de patrocínio | Cristian Alves',
    message: 'Olá, Cristian! Gostaria de conversar sobre uma proposta de patrocínio.',
    socials: [],
  },
  seo: {
    title: 'Cristian Alves | Atleta de Judô',
    description: 'Conheça o portfólio demonstrativo de Cristian Alves, com trajetória no judô, resultados, galeria e oportunidades de patrocínio.',
    image: 'images/hero/compartilhamento.png',
    siteUrl: 'https://barboss4.github.io/cristian-judo-portfolio/',
  },
}


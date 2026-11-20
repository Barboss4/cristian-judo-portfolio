import type { GalleryCategory } from '../types/athlete'

export const galleryIllustrations: Record<GalleryCategory, string> = {
  Competições: 'images/gallery/competicao.svg',
  Treinos: 'images/gallery/treino.svg',
  Pódios: 'images/gallery/podio.svg',
  Bastidores: 'images/gallery/bastidores.svg',
}
export const navigation = [
  ['inicio', 'Início'],
  ['sobre', 'Sobre'],
  ['conquistas', 'Conquistas'],
  ['trajetoria', 'Trajetória'],
  ['galeria', 'Galeria'],
  ['agenda', 'Agenda'],
  ['patrocinadores', 'Patrocinadores'],
  ['contato', 'Contato'],
] as const

export const motion = {
  ease: 'power2.out',
  entrance: 0.72,
  stagger: 0.075,
  scrollStart: 'top 92%',
  parallax: 6,
  scrollSmoothing: 0.56,
  heroScene: {
    desktop: { scrollLength: 0.95, portraitScale: 0.53 },
    mobile: { scrollLength: 0.48, portraitScale: 0.72 },
  },
}


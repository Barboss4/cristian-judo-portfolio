import gsap from 'gsap'
import { motion } from '../data/theme'

export function startHeroScene(root: HTMLElement, desktop: boolean) {
  const hero = root.querySelector<HTMLElement>('.hero')
  const stage = hero?.querySelector<HTMLElement>('.hero-stage')
  const portrait = stage?.querySelector<HTMLElement>('.hero-art')
  if (!hero || !stage || !portrait) return

  const { scrollLength, portraitScale } = desktop ? motion.heroScene.desktop : motion.heroScene.mobile
  stage.classList.add('has-hero-scene')

  gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: hero,
      pin: stage,
      start: 'top top',
      end: () => `+=${Math.round(stage.offsetHeight * scrollLength)}`,
      scrub: true,
      invalidateOnRefresh: true,
      refreshPriority: 2,
    },
  })
    .to(portrait, {
      x: () => (stage.clientWidth - portrait.offsetWidth) / 2 - portrait.offsetLeft,
      yPercent: desktop ? -2 : -9,
      scale: portraitScale,
      duration: .88,
      ease: 'power1.inOut',
    }, .02)
    .to('.hero-copy', { opacity: 0, y: -34, duration: .43 }, .04)
    .to('.hero-scroll-background', { opacity: 1, duration: .38 }, .03)
    .to('.hero-scroll-quote', { x: () => -stage.clientWidth * (desktop ? .58 : .86), duration: 1 }, 0)
    .to('.hero-art-shade', { opacity: .23, duration: .52 }, .10)
    .to('.hero-art-wash', { opacity: .32, duration: .29 }, .56)
    .to('.hero-scroll-mark path', { strokeDashoffset: 0, duration: .29, stagger: .06 }, .57)
    .to('.hero-scroll-progress > span', { scaleX: 1, duration: 1 }, 0)

  return () => stage.classList.remove('has-hero-scene')
}

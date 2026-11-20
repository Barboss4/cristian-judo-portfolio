import { useLayoutEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { motion } from '../data/theme'
import { startGalleryScene } from './galleryScroll'
import { startHeroScene } from './heroScroll'
import { startSmoothScroll } from './smoothScroll'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

export function usePortfolioMotion(
  viewport: RefObject<HTMLDivElement | null>,
  content: RefObject<HTMLDivElement | null>,
) {
  useLayoutEffect(() => {
    const wrapper = viewport.current
    const root = content.current
    if (!wrapper || !root) return
    const media = gsap.matchMedia(root)
    let introPlayed = false

    media.add({
      motionEnabled: '(prefers-reduced-motion: no-preference)',
      desktop: '(min-width: 1051px) and (hover: hover) and (pointer: fine)',
      roomForScene: '(min-width: 360px) and (min-height: 650px)',
    }, ({ conditions }) => {
      if (!conditions?.motionEnabled) return
      const desktop = conditions.desktop && ScrollTrigger.isTouch !== 1
      const removeScrollListeners = desktop ? startSmoothScroll(wrapper, root) : undefined
      const removeHeroScene = conditions.roomForScene ? startHeroScene(root, desktop) : undefined
      const removeGalleryScene = desktop && conditions.roomForScene ? startGalleryScene(root) : undefined

      if (!introPlayed && !window.location.hash && window.scrollY < 1) {
        gsap.from('[data-hero-enter]', {
          y: 21, autoAlpha: 0, duration: motion.entrance,
          stagger: motion.stagger, ease: motion.ease, clearProps: 'transform,opacity,visibility',
        })
        gsap.from('.hero-media', { scale: 1.046, duration: 1.35, ease: motion.ease, clearProps: 'transform' })
      }
      introPlayed = true

      if (desktop) {
        gsap.fromTo('.about-photo img', { yPercent: -motion.parallax }, {
          yPercent: motion.parallax, ease: 'none',
          scrollTrigger: { trigger: '.about-photo', scrub: true, start: 'top bottom', end: 'bottom top' },
        })
      }

      const elements = gsap.utils.toArray<HTMLElement>('[data-enter]')
        .filter((element) => !element.querySelector('a, button, input, select, textarea'))
      for (const element of elements) {
        gsap.from(element, {
          y: 22, opacity: .35, duration: motion.entrance, ease: motion.ease,
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: element, start: motion.scrollStart, once: true },
        })
      }
      for (const element of gsap.utils.toArray<HTMLElement>('[data-count]')) {
        const total = Number(element.dataset.count)
        const count = { value: 0 }
        gsap.to(count, {
          value: total, duration: 1.1, snap: { value: 1 }, ease: motion.ease,
          scrollTrigger: { trigger: element, start: motion.scrollStart, once: true },
          onStart: () => { element.textContent = '00' },
          onUpdate: () => { element.textContent = String(count.value).padStart(2, '0') },
        })
      }
      ScrollTrigger.refresh()
      return () => {
        removeGalleryScene?.()
        removeHeroScene?.()
        removeScrollListeners?.()
        root.querySelectorAll<HTMLElement>('[data-count]').forEach((element) => {
          element.textContent = (element.dataset.count || '0').padStart(2, '0')
        })
      }
    })

    const initialAnchor = requestAnimationFrame(() => {
      if (ScrollSmoother.get() || !location.hash) return
      const target = document.getElementById(location.hash.slice(1))
      if (target && root.contains(target)) target.scrollIntoView({ block: 'start', behavior: 'instant' })
    })

    return () => {
      cancelAnimationFrame(initialAnchor)
      media.revert()
    }
  }, [viewport, content])
}

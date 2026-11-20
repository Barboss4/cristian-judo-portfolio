import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { motion } from '../data/theme'

export function startSmoothScroll(wrapper: HTMLElement, content: HTMLElement) {
  const documentRoot = document.documentElement
  const initialPosition = scrollY
  documentRoot.classList.add('has-smooth-scroll')
  const smoother = ScrollSmoother.create({
    wrapper,
    content,
    smooth: motion.scrollSmoothing,
    ease: 'power3.out',
    smoothTouch: 0,
    onFocusIn: (_, { target }) => target instanceof HTMLElement && content.contains(target)
      && !target.matches('main, section[id]') && !target.closest('dialog, .has-gallery-scene .gallery-tile'),
  })

  function getAnchor(hash: string) {
    const target = document.getElementById(hash.slice(1))
    return target && content.contains(target) ? target : null
  }

  function goToAnchor(target: HTMLElement, animate: boolean) {
    const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0
    const top = target.getBoundingClientRect().top - content.getBoundingClientRect().top
    smoother.scrollTo(top - margin, animate)
  }

  function handleAnchorClick(event: MouseEvent) {
    if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
    const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null
    if (!link || link.target || link.hasAttribute('download')) return
    const hash = link.hash
    const target = getAnchor(hash)
    if (!target) return

    event.preventDefault()
    if (location.hash !== hash) history.pushState(null, '', hash)
    target.focus({ preventScroll: true })
    goToAnchor(target, true)
  }

  function syncHash(focusTarget: boolean) {
    const target = getAnchor(location.hash)
    if (!target) return false
    if (focusTarget) target.focus({ preventScroll: true })
    goToAnchor(target, false)
    return true
  }

  const handleHashChange = () => { syncHash(true) }
  const initialScroll = requestAnimationFrame(() => {
    if (!syncHash(false)) smoother.scrollTo(initialPosition, false)
  })
  addEventListener('hashchange', handleHashChange)
  document.addEventListener('click', handleAnchorClick)

  return () => {
    cancelAnimationFrame(initialScroll)
    removeEventListener('hashchange', handleHashChange)
    document.removeEventListener('click', handleAnchorClick)
    documentRoot.classList.remove('has-smooth-scroll')
  }
}

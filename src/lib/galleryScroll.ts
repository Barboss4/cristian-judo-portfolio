import gsap from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function startGalleryScene(root: HTMLElement) {
  const section = root.querySelector<HTMLElement>('.gallery-section')
  const stage = section?.querySelector<HTMLElement>('.gallery-scene')
  const clip = stage?.querySelector<HTMLElement>('.gallery-window')
  const track = clip?.querySelector<HTMLElement>('.gallery-grid')
  if (!section || !stage || !clip || !track) return

  const header = document.querySelector<HTMLElement>('.site-header')
  const topInset = () => (header?.offsetHeight ?? 0) + 18
  const travel = () => Math.max(1, track.scrollWidth - clip.clientWidth)
  let context: gsap.Context | undefined
  let pin: ScrollTrigger | undefined

  const layout = () => {
    context?.revert()
    context = undefined
    pin = undefined
    const horizontal = track.children.length >= 3
    section.classList.toggle('has-gallery-scene', horizontal)
    if (!horizontal) return

    context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: stage,
          pin: true,
          start: () => `top top+=${topInset()}`,
          end: () => `+=${travel()}`,
          scrub: true,
          invalidateOnRefresh: true,
          refreshPriority: 1,
        },
      })
        .to(track, { x: () => -travel() }, 0)
        .to('.gallery-scroll-progress > span', { scaleX: 1 }, 0)
      pin = timeline.scrollTrigger
    }, section)
  }

  const focusTile = (event: FocusEvent) => {
    const tile = event.target
    if (!pin || !(tile instanceof HTMLButtonElement) || tile.parentElement !== track) return
    const visible = clip.getBoundingClientRect()
    const bounds = tile.getBoundingClientRect()
    const verticallyVisible = bounds.top >= topInset() && bounds.bottom <= innerHeight
    if (verticallyVisible && bounds.left >= visible.left - 1 && bounds.right <= visible.right + 1) return
    if (verticallyVisible && bounds.right > visible.left && bounds.left < visible.right && !tile.matches(':focus-visible')) return

    const center = tile.offsetLeft + (tile.offsetWidth - clip.clientWidth) / 2
    pin.scroll(pin.start + gsap.utils.clamp(0, travel(), center))
    ScrollTrigger.update()
  }

  const changes = new MutationObserver(() => {
    const active = document.activeElement
    const focusedControl = active instanceof HTMLElement && stage.contains(active) ? active : null
    layout()
    ScrollTrigger.refresh()
    const smoother = ScrollSmoother.get()
    const top = stage.getBoundingClientRect().top + (smoother?.scrollTop() ?? scrollY) - topInset()
    if (smoother) smoother.scrollTo(pin?.start ?? top, false)
    else scrollTo({ top: pin?.start ?? top, behavior: 'instant' })
    focusedControl?.focus({ preventScroll: true })
  })

  layout()
  changes.observe(track, { childList: true })
  stage.addEventListener('focusin', focusTile)

  return () => {
    changes.disconnect()
    stage.removeEventListener('focusin', focusTile)
    context?.revert()
    section.classList.remove('has-gallery-scene')
  }
}

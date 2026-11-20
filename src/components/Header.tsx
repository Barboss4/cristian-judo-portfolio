import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import gsap from 'gsap'
import { athlete } from '../data/athlete'
import { motion, navigation } from '../data/theme'

export function Brand() {
  return (
    <a className="brand" href="#inicio" aria-label={`${athlete.fullName} · Início`}>
      <svg viewBox="0 0 44 36" width="40" height="33" fill="none" aria-hidden="true">
        <path d="M2 10h40v7H2zM20 17l9 3-6 14-7-3zm-5 0 7 4-11 11-5-5z" fill="currentColor" />
        <path d="M16 10h12v7H16z" fill="var(--belt-color)" />
      </svg>
      <span>{athlete.firstName}<b>Judô</b></span>
    </a>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('inicio')
  const button = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLElement>(null)

  useEffect(() => {
    const main = document.getElementById('conteudo')
    const sections = navigation.map(([id]) => document.getElementById(id))
    let frame = 0
    function update() {
      const pageTop = main?.getBoundingClientRect().top ?? -scrollY
      const threshold = pageTop + scrollY + Math.max(115, innerHeight * 0.26)
      let current: string = 'inicio'
      for (const section of sections) {
        if (section && section.getBoundingClientRect().top <= threshold) current = section.id
      }
      if (scrollY > 0 && scrollY + innerHeight >= document.documentElement.scrollHeight - 4) current = 'contato'
      setActive(current)
      frame = 0
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      removeEventListener('scroll', onScroll)
      removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    const desktop = matchMedia('(min-width: 1051px)')
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false) }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

  useEffect(() => {
    if (!open || !panel.current || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const tween = gsap.fromTo(panel.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: .26, ease: motion.ease })
    return () => { tween.revert() }
  }, [open])

  function links() {
    return navigation.map(([id, label]) => (
      <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => {
        if (!open) return
        setOpen(false)
        document.getElementById(id)?.focus({ preventScroll: true })
      }}>{label}</a>
    ))
  }

  return (
    <header className="site-header" onKeyDown={(event) => {
      if (event.key === 'Escape' && open) {
        setOpen(false)
        button.current?.focus()
      }
    }}>
      <div className="wide header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Navegação principal">{links()}</nav>
        <a className="header-cta" href="#patrocinadores">Parcerias</a>
        <button ref={button} type="button" className="menu-button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="menu-mobile" onClick={() => setOpen(!open)}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <nav ref={panel} id="menu-mobile" className="mobile-nav" aria-label="Navegação principal" hidden={!open}>{links()}</nav>
    </header>
  )
}

import { useEffect, useRef, useState } from 'react'
import { FolderIcon, HomeIcon, MailIcon, UserIcon } from './components/icons.jsx'
import { EMAIL, SECTIONS } from './data/site.js'
import { installReferenceReveals } from './lib/reveal.js'
import Landing from './sections/Landing.jsx'
import Profile from './sections/Profile.jsx'
import Projects from './sections/projects/Projects.jsx'

const NAV_ITEMS = {
  landing: { label: 'Home', Icon: HomeIcon },
  profile: { label: 'About', Icon: UserIcon },
  projects: { label: 'Projects', Icon: FolderIcon },
}

export default function App() {
  const [active, setActive] = useState('landing')
  const scrollRef = useRef(null)

  function scrollTo(id) {
    const container = scrollRef.current
    const section = document.getElementById(id)
    if (!container || !section) return
    const top =
      section.getBoundingClientRect().top -
      container.getBoundingClientRect().top +
      container.scrollTop
    container.scrollTo({ top, behavior: 'smooth' })
  }

  // Highlight the nav button for whichever section crosses the middle of the view.
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const observers = SECTIONS.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        // A thin band across the middle of the viewport, so tall sections still activate.
        { root: container, rootMargin: '-45% 0px -54% 0px', threshold: 0 },
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  // One-time reveals for Profile and Projects groups below the fold.
  useEffect(() => installReferenceReveals(), [])

  return (
    <div className="shell">
      <header className="topnav">
        <button
          className="nav-mark"
          onClick={() => scrollTo('landing')}
          aria-label="Bridget Crampton, back to top"
        >
          BC
        </button>
        <nav className="nav-pill" aria-label="Primary">
          {SECTIONS.map((id) => {
            const { label, Icon } = NAV_ITEMS[id]
            return (
              <button
                key={id}
                className={`nav-item ${active === id ? 'active' : ''}`}
                aria-current={active === id ? 'true' : undefined}
                onClick={() => scrollTo(id)}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            )
          })}
          <a className="nav-item" href={`mailto:${EMAIL}`}>
            <MailIcon size={18} />
            <span>Contact</span>
          </a>
        </nav>
      </header>

      <main className="page scroll-page" ref={scrollRef}>
        <section id="landing">
          <Landing />
        </section>
        <section id="profile">
          <Profile />
        </section>
        <section id="projects">
          <Projects />
        </section>
      </main>
    </div>
  )
}

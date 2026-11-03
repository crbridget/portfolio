import { useEffect, useRef, useState } from 'react'
import ExternalLink from './components/ExternalLink.jsx'
import { GithubIcon, LinkedinIcon, TableauIcon } from './components/icons.jsx'
import { SECTIONS, SOCIAL_LINKS } from './data/site.js'
import Landing from './sections/Landing.jsx'
import Profile from './sections/Profile.jsx'
import Projects from './sections/projects/Projects.jsx'

const NAV_LABELS = { landing: 'home', profile: 'profile', projects: 'projects' }

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

  // Highlight the nav button for whichever section is mostly in view.
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
        { root: container, threshold: 0.4 },
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  return (
    <div className="shell">
      <nav className="topnav">
        <button className="nav-logo" onClick={() => scrollTo('landing')}>
          BC
        </button>
        <div className="nav-links">
          {SECTIONS.map((id) => (
            <button
              key={id}
              className={`nav-btn ${active === id ? 'active' : ''}`}
              onClick={() => scrollTo(id)}
            >
              {NAV_LABELS[id]}
            </button>
          ))}
        </div>
        <div className="nav-social">
          <ExternalLink href={SOCIAL_LINKS.github} title="GitHub" aria-label="GitHub">
            <GithubIcon size={14} />
          </ExternalLink>
          <ExternalLink href={SOCIAL_LINKS.linkedin} title="LinkedIn" aria-label="LinkedIn">
            <LinkedinIcon size={14} />
          </ExternalLink>
          <ExternalLink href={SOCIAL_LINKS.tableau} title="Tableau" aria-label="Tableau">
            <TableauIcon size={14} />
          </ExternalLink>
        </div>
      </nav>

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

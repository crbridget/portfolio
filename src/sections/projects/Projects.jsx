import { useState } from 'react'
import { CATEGORIES, PROJECTS } from '../../data/projects.js'
import BentoView from './BentoView.jsx'

// Keep the projects section centered in the scroll container after the list resizes.
function centerProjectsSection() {
  const container = document.querySelector('.scroll-page')
  const section = document.getElementById('projects')
  if (!container || !section) return
  const sectionTop = section.getBoundingClientRect().top
  const containerTop = container.getBoundingClientRect().top
  const containerH = container.clientHeight
  const offset =
    sectionTop -
    containerTop +
    container.scrollTop -
    containerH / 2 +
    Math.min(section.clientHeight, containerH) / 2
  container.scrollTo({ top: offset, behavior: 'smooth' })
}

export default function Projects() {
  const [category, setCategory] = useState('All')
  // After the first user change, swapped-in cards get a short refresh fade.
  const [refreshed, setRefreshed] = useState(false)

  function changeCategory(c) {
    setCategory(c)
    setRefreshed(true)
    requestAnimationFrame(centerProjectsSection)
  }

  const filtered = PROJECTS.filter((p) => category === 'All' || p.category === category)

  return (
    <div className="projects-page">
      <div className="projects-header" data-reveal="rise">
        <p className="section-label projects-count">{filtered.length} projects</p>
        <h2 className="projects-title">Projects</h2>
        <p className="projects-sub">Coursework, internships, clubs, and personal builds.</p>
      </div>

      <div className="projects-controls" data-reveal="rise" data-reveal-delay="80">
        <div className="projects-filter-wrap">
          <div className="projects-filter" role="group" aria-label="Filter projects by category">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={`filter-btn ${category === c ? 'active' : ''}`}
                aria-pressed={category === c}
                onClick={() => changeCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="filter-scroll-hint" aria-hidden="true">
            ›
          </div>
        </div>
      </div>

      <BentoView projects={filtered} refreshed={refreshed} />
    </div>
  )
}

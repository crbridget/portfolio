import { useState } from 'react'
import { BentoIcon, TableIcon } from '../../components/icons.jsx'
import { CATEGORIES, PROJECTS } from '../../data/projects.js'
import BentoView from './BentoView.jsx'
import TableView from './TableView.jsx'

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
  const [view, setView] = useState(() => (window.innerWidth <= 600 ? 'table' : 'bento'))

  function changeCategory(c) {
    setCategory(c)
    requestAnimationFrame(centerProjectsSection)
  }

  const filtered = PROJECTS.filter((p) => category === 'All' || p.category === category)

  return (
    <div className="projects-page">
      <div className="projects-header">
        <h2 className="projects-title">PROJECTS</h2>
        <div className="projects-count">
          {filtered.length} projects · Coursework, internships, clubs, and personal builds.
        </div>
        <div className="view-toggle">
          <button
            className={`view-btn ${view === 'bento' ? 'active' : ''}`}
            onClick={() => setView('bento')}
            title="Bento grid"
            aria-label="Bento grid view"
          >
            <BentoIcon />
          </button>
          <button
            className={`view-btn ${view === 'table' ? 'active' : ''}`}
            onClick={() => setView('table')}
            title="DataFrame"
            aria-label="Table view"
          >
            <TableIcon />
          </button>
        </div>
      </div>

      <div className="projects-filter-wrap">
        <div className="projects-filter">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`filter-btn ${category === c ? 'active' : ''}`}
              onClick={() => changeCategory(c)}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="filter-scroll-hint">›</div>
      </div>

      {view === 'bento' ? <BentoView projects={filtered} /> : <TableView projects={filtered} />}
    </div>
  )
}

import { PROJECTS } from '../../data/projects.js'
import BentoView from './BentoView.jsx'

export default function Projects() {
  return (
    <div className="projects-page">
      <div className="projects-header" data-reveal="rise">
        <p className="section-label projects-count">{PROJECTS.length} projects</p>
        <h2 className="projects-title">Projects</h2>
        <p className="projects-sub">Coursework, internships, clubs, and personal builds.</p>
      </div>

      <BentoView projects={PROJECTS} />
    </div>
  )
}

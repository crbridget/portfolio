import { useState } from 'react'
import ProjectThumb from '../../components/ProjectThumb.jsx'
import ProjectModal from './ProjectModal.jsx'

function BentoCard({ project, index, onOpen }) {
  return (
    <div className="bento-card" style={{ '--i': index }} onClick={() => onOpen(project)}>
      <div className="bento-thumb">
        <ProjectThumb project={project} />
      </div>
      <div className="bento-title-bar">
        <div className="bento-cat">{project.category}</div>
        <div className="bento-name">{project.title}</div>
      </div>
    </div>
  )
}

export default function BentoView({ projects }) {
  const [selected, setSelected] = useState(null)
  const numCols = window.innerWidth <= 600 ? 1 : 4
  const cols = Array.from({ length: numCols }, (_, ci) =>
    projects.filter((_, i) => i % numCols === ci),
  )

  return (
    <>
      {/* key changes with the filtered set to retrigger the stagger animation */}
      <div className="bento-grid" key={projects.map((p) => p.num).join(',')}>
        {cols.map((col, ci) => (
          <div key={ci} className="bento-col">
            {col.map((p, i) => (
              <BentoCard key={p.title} project={p} index={i} onOpen={setSelected} />
            ))}
          </div>
        ))}
      </div>
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </>
  )
}

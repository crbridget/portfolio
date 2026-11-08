import { useEffect, useRef, useState } from 'react'
import ProjectThumb from '../../components/ProjectThumb.jsx'
import { PROJECTS } from '../../data/projects.js'
import ProjectModal from './ProjectModal.jsx'

// Near-square and very wide charts are shown whole on a matte instead of
// being cropped, so axes and labels survive.
const CONTAIN_BELOW_RATIO = 1.2
const CONTAIN_ABOVE_RATIO = 1.8

function BentoCard({ project, index, onOpen }) {
  // `fit: 'contain'` on a project always shows its whole image.
  const [contain, setContain] = useState(project.fit === 'contain')

  function onImgLoad(e) {
    const { naturalWidth: w, naturalHeight: h } = e.currentTarget
    if (w && h && (w / h < CONTAIN_BELOW_RATIO || w / h > CONTAIN_ABOVE_RATIO)) setContain(true)
  }

  return (
    <button
      type="button"
      className="bento-card"
      style={{ '--i': index }}
      data-reveal="rise"
      data-reveal-delay={(index % 2) * 70}
      onClick={(e) => onOpen(project, e.currentTarget)}
    >
      <span className={`bento-thumb${contain ? ' is-contain' : ''}`}>
        <ProjectThumb project={project} onImageLoad={onImgLoad} />
      </span>
      <span className="bento-cat">{project.category}</span>
      <span className="bento-name">{project.title}</span>
    </button>
  )
}

export default function BentoView({ projects }) {
  const [selected, setSelected] = useState(null)
  const triggerRef = useRef(null)

  function open(project, trigger) {
    triggerRef.current = trigger
    setSelected(project)
  }

  // Other sections (About Me) can ask to open a project by title.
  useEffect(() => {
    const onOpen = (e) => {
      const project = PROJECTS.find((p) => p.title === e.detail?.title)
      if (!project) return
      triggerRef.current = e.detail.trigger ?? null
      setSelected(project)
    }
    window.addEventListener('open-project', onOpen)
    return () => window.removeEventListener('open-project', onOpen)
  }, [])

  function close() {
    setSelected(null)
    triggerRef.current?.focus()
  }

  return (
    <>
      <div className="bento-grid">
        {projects.map((p, i) => (
          <BentoCard key={p.title} project={p} index={i} onOpen={open} />
        ))}
      </div>
      {selected && <ProjectModal project={selected} onClose={close} />}
    </>
  )
}

import ExternalLink from '../../components/ExternalLink.jsx'
import ProjectThumb from '../../components/ProjectThumb.jsx'

function projectLinks(p) {
  if (p.links) return p.links
  if (p.github) return [{ label: 'GitHub', url: p.github }]
  return []
}

export default function ProjectModal({ project: p, onClose }) {
  const links = projectLinks(p)
  const hasThumb = Boolean(p.Thumb || p.image)

  return (
    <div className="proj-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="proj-modal" role="dialog" aria-modal="true" aria-label={p.title}>
        <div className="proj-modal-header">
          <div className="proj-modal-filepath">{p.title.toLowerCase().replace(/ /g, '-')}.jsx</div>
          <div className="proj-modal-title">{p.title}</div>
          <button className="proj-modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="proj-modal-body">
          <div className="proj-modal-meta">
            <div className="proj-modal-meta-item">
              <div className="proj-modal-meta-label">CATEGORY</div>
              <div className="proj-modal-meta-value">{p.category}</div>
            </div>
            <div className="proj-modal-meta-item">
              <div className="proj-modal-meta-label">TOOLS</div>
              <div className="proj-modal-meta-value">{p.tags.join(' · ')}</div>
            </div>
            {hasThumb && (
              <div className="proj-modal-meta-item">
                <div className="proj-modal-meta-label">PREVIEW</div>
                <div className="proj-modal-thumb">
                  <ProjectThumb project={p} />
                </div>
              </div>
            )}
          </div>

          <div className="proj-modal-divider" />

          <div className="proj-modal-desc">{p.desc}</div>

          <div className="proj-modal-btns">
            {links.length > 0 ? (
              links.map((l) => (
                <ExternalLink key={l.label} href={l.url} className="proj-modal-pill">
                  {l.label} →
                </ExternalLink>
              ))
            ) : (
              <span className="proj-modal-pill proj-modal-pill-disabled">Private repo</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

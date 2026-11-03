import { useEffect, useRef } from 'react'
import ExternalLink from '../../components/ExternalLink.jsx'
import ProjectThumb from '../../components/ProjectThumb.jsx'

function projectLinks(p) {
  if (p.links) return p.links
  if (p.github) return [{ label: 'GitHub', url: p.github }]
  return []
}

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'

export default function ProjectModal({ project: p, onClose }) {
  const links = projectLinks(p)
  const hasThumb = Boolean(p.Thumb || p.image)
  const overlayRef = useRef(null)
  const panelRef = useRef(null)
  const closeBtnRef = useRef(null)
  const closingRef = useRef(false)

  // Reverse the entrance (scrim fades, panel drops 16px) before unmounting.
  function requestClose() {
    if (closingRef.current) return
    closingRef.current = true
    const overlay = overlayRef.current
    const panel = panelRef.current
    if (!overlay?.animate || window.matchMedia(REDUCED_QUERY).matches) {
      onClose()
      return
    }
    const opts = { duration: 200, easing: 'cubic-bezier(0.4, 0, 1, 1)', fill: 'forwards' }
    panel.animate(
      [
        { opacity: 1, transform: 'none' },
        { opacity: 0, transform: 'translateY(16px)' },
      ],
      opts,
    )
    overlay.animate([{ opacity: 1 }, { opacity: 0 }], opts).onfinish = onClose
  }

  useEffect(() => {
    closeBtnRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') requestClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
    // requestClose only reads refs and the latest onClose; bind once per open.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="proj-modal-overlay"
      ref={overlayRef}
      onClick={(e) => e.target === e.currentTarget && requestClose()}
    >
      <div
        className="proj-modal"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="proj-modal-title"
      >
        <div className="proj-modal-header">
          <div className="proj-modal-filepath">{p.title.toLowerCase().replace(/ /g, '-')}.jsx</div>
          <h3 className="proj-modal-title" id="proj-modal-title">
            {p.title}
          </h3>
          <button
            className="proj-modal-close"
            ref={closeBtnRef}
            onClick={requestClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="proj-modal-body">
          {hasThumb && (
            <div className="proj-modal-thumb">
              <ProjectThumb project={p} />
            </div>
          )}

          <div className="proj-modal-meta">
            <div className="proj-modal-meta-item">
              <div className="proj-modal-meta-label">Category</div>
              <div className="proj-modal-meta-value">{p.category}</div>
            </div>
            <div className="proj-modal-meta-item">
              <div className="proj-modal-meta-label">Tools</div>
              <div className="proj-modal-meta-value">{p.tags.join(' · ')}</div>
            </div>
          </div>

          <div className="proj-modal-desc">{p.desc}</div>

          <div className="proj-modal-btns">
            {links.length > 0 ? (
              links.map((l, i) => (
                <ExternalLink
                  key={l.label}
                  href={l.url}
                  className={`proj-modal-pill${i === 0 ? ' proj-modal-pill-primary' : ''}`}
                >
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

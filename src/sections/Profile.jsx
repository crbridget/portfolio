import { useState } from 'react'
import ExternalLink from '../components/ExternalLink.jsx'
import { ArrowRightIcon, FileIcon, MailIcon } from '../components/icons.jsx'
import { EXPERIENCE, TOOLKIT } from '../data/experience.js'
import { EMAIL, RESUME_URL } from '../data/site.js'

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'

// Scroll to Projects, then ask the card grid to open the matching modal.
function openProject(title, trigger) {
  const container = document.querySelector('.scroll-page')
  const section = document.getElementById('projects')
  const reduced = window.matchMedia(REDUCED_QUERY).matches
  if (container && section) {
    const top =
      section.getBoundingClientRect().top -
      container.getBoundingClientRect().top +
      container.scrollTop
    container.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' })
  }
  window.setTimeout(
    () => window.dispatchEvent(new CustomEvent('open-project', { detail: { title, trigger } })),
    reduced ? 0 : 450,
  )
}

function ExperienceRow({ item, index, open, onToggle }) {
  const panelId = `exp-panel-${item.id}`
  const buttonId = `exp-button-${item.id}`
  return (
    <li
      className={`exp-row${open ? ' is-open' : ''}`}
      data-reveal="rise"
      data-reveal-delay={Math.min(index * 60, 240)}
    >
      <h3 className="exp-heading">
        <button
          type="button"
          id={buttonId}
          className="exp-toggle"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="exp-titles">
            <span className="exp-org">{item.org}</span>
            <span className="exp-role">{item.role}</span>
            <span className="exp-meta">
              {item.dates}
              {item.orgNote && <> · {item.orgNote}</>}
            </span>
          </span>
          <span className="exp-icon" aria-hidden="true">
            <span className="exp-bar" />
            <span className="exp-bar exp-bar-v" />
          </span>
        </button>
      </h3>
      <div
        className="exp-panel"
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        inert={!open}
      >
        <div className="exp-panel-inner">
          <div className="exp-panel-content">
            <p className="exp-desc">{item.desc}</p>
            <ul className="tag-list" aria-label="Tools">
              {item.tags.map((t) => (
                <li key={t} className="tag">
                  {t}
                </li>
              ))}
            </ul>
            {item.project && (
              <button
                type="button"
                className="exp-link"
                onClick={(e) => openProject(item.project, e.currentTarget)}
              >
                View project
                <ArrowRightIcon size={16} />
                <span className="sr-only">: {item.project}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </li>
  )
}

export default function Profile() {
  const [openId, setOpenId] = useState(EXPERIENCE[0].id)

  return (
    <div className="profile-page">
      <div className="about-inner">
        <div className="about-aside">
          <div className="about-heading" data-reveal="slide">
            <p className="section-label">About me</p>
            <h2 className="about-title">About Me</h2>
            <p className="about-sub">Where I&apos;ve been building.</p>
          </div>

          <div className="about-intro-wrap" data-reveal="rise" data-reveal-delay="80">
            <p className="about-intro">
              I study data science at Northeastern and like work where data turns into a decision
              someone can act on. Right now that means pricing analytics and deal scoring as a
              Business Intelligence co-op at Klaviyo, and Bayesian modeling for a health app at
              Remetra.
            </p>
          </div>

          <div className="about-body" data-reveal="rise" data-reveal-delay="160">
            <div className="about-toolkit">
              <p className="about-toolkit-label">Toolkit</p>
              <ul className="tag-list">
                {TOOLKIT.map((t) => (
                  <li key={t} className="tag">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="profile-actions">
              <a className="profile-pill profile-pill-solid" href={`mailto:${EMAIL}`}>
                <MailIcon size={16} />
                {EMAIL}
              </a>
              <ExternalLink className="profile-pill profile-pill-outline" href={RESUME_URL}>
                <FileIcon size={16} />
                resume.pdf
              </ExternalLink>
            </div>
          </div>
        </div>

        <ol className="exp-list" aria-label="Experience">
          {EXPERIENCE.map((item, i) => (
            <ExperienceRow
              key={item.id}
              item={item}
              index={i}
              open={openId === item.id}
              onToggle={() => setOpenId((cur) => (cur === item.id ? null : item.id))}
            />
          ))}
        </ol>
      </div>
    </div>
  )
}

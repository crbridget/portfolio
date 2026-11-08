import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react'
import ExternalLink from '../components/ExternalLink.jsx'
import {
  ArrowRightIcon,
  ChartIcon,
  CpuIcon,
  DownloadIcon,
  GithubIcon,
  GraduationCapIcon,
  LinkedinIcon,
  TableauIcon,
} from '../components/icons.jsx'
import { EMAIL, PORTRAIT_URL, RESUME_URL, SOCIAL_LINKS } from '../data/site.js'

const ROLES = [
  'Data Science Student',
  'Machine Learning',
  'NLP & Applied AI',
  'Predictive Modeling',
]
const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)'
const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'

function subscribeReduced(callback) {
  const mq = window.matchMedia(REDUCED_QUERY)
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}
const getReduced = () => window.matchMedia(REDUCED_QUERY).matches
const getReducedServer = () => false

// Typewriter: starts with the first role fully shown, then deletes and cycles.
function useTypedRole(reduced) {
  const [text, setText] = useState(ROLES[0])
  useEffect(() => {
    if (reduced) return
    let role = 0
    let len = ROLES[0].length
    let deleting = true
    let timer
    const tick = () => {
      if (deleting) {
        len -= 1
        if (len <= 0) {
          len = 0
          deleting = false
          role = (role + 1) % ROLES.length
          setText('')
          timer = setTimeout(tick, 400)
          return
        }
        setText(ROLES[role].slice(0, len))
        timer = setTimeout(tick, 35)
      } else {
        const word = ROLES[role]
        len += 1
        setText(word.slice(0, len))
        if (len >= word.length) {
          deleting = true
          timer = setTimeout(tick, 1600)
        } else {
          timer = setTimeout(tick, 60)
        }
      }
    }
    timer = setTimeout(tick, 2400)
    return () => clearTimeout(timer)
  }, [reduced])
  return reduced ? ROLES[0] : text
}

// One-time load entrance for the hero. CSS keeps the final state; these owned
// animations only supply the starting frames and are cancelled on cleanup.
function useHeroEntrance(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || !root.animate) return
    const mq = window.matchMedia(REDUCED_QUERY)
    const scroller = document.querySelector('.scroll-page')
    if (
      mq.matches ||
      document.visibilityState === 'hidden' ||
      (scroller && scroller.scrollTop > 0) ||
      root.getBoundingClientRect().bottom <= 0
    )
      return

    const owned = []
    const run = (el, keyframes, options) => {
      const a = el.animate(keyframes, { fill: 'backwards', ...options })
      owned.push(a)
    }

    // Text stack in reading order, 40ms apart (240ms total stagger).
    root.querySelectorAll('[data-hero]').forEach((el, i) => {
      run(
        el,
        [
          { opacity: 0, transform: 'translateY(12px)' },
          { opacity: 1, transform: 'none' },
        ],
        { duration: 600, delay: Math.min(i * 40, 240), easing: EASE_OUT },
      )
    })

    const rule = root.querySelector('[data-hero-rule]')
    if (rule)
      run(rule, [{ transform: 'scaleX(0)' }, { transform: 'none' }], {
        duration: 500,
        delay: 320,
        easing: EASE_OUT,
      })

    // Portrait rises into its frame while the text stack enters.
    const portrait = root.querySelector('.landing-portrait')
    if (portrait)
      run(
        portrait,
        [
          { opacity: 0, transform: 'translateY(20px)' },
          { opacity: 1, transform: 'none' },
        ],
        { duration: 720, delay: 120, easing: EASE_OUT },
      )

    const cancelAll = () => owned.forEach((a) => a.cancel())
    const onChange = () => {
      if (mq.matches) cancelAll()
    }
    mq.addEventListener('change', onChange)
    return () => {
      mq.removeEventListener('change', onChange)
      cancelAll()
    }
  }, [rootRef])
}

export default function Landing() {
  const rootRef = useRef(null)
  const reduced = useSyncExternalStore(subscribeReduced, getReduced, getReducedServer)
  const role = useTypedRole(reduced)
  useHeroEntrance(rootRef)

  return (
    <div className="landing" ref={rootRef}>
      <div className="landing-inner">
        <div className="landing-text">
          <h1 className="landing-greeting" data-hero>
            Hi, I&apos;m Bridget.
          </h1>
          <p className="landing-role" data-hero>
            <span className="sr-only">{ROLES.join(', ')}</span>
            <span className="landing-role-text" aria-hidden="true">
              {role}
              <span className={`landing-cursor${reduced ? ' is-static' : ''}`} />
            </span>
          </p>
          <p className="landing-intro" data-hero>
            <span>
              I&apos;m a data science student at Northeastern University focused on machine learning
              and AI.
            </span>{' '}
            <span>
              I build models, from fraud detection to NLP, that turn messy data into clear
              predictions and insights.
            </span>
          </p>
          <ul className="landing-meta" data-hero>
            <li>
              <GraduationCapIcon size={16} />
              Northeastern University
            </li>
            <li>
              <CpuIcon size={16} />
              Machine Learning &amp; AI
            </li>
            <li>
              <ChartIcon size={16} />
              Python · scikit-learn · NLP
            </li>
          </ul>
          <div className="landing-actions" data-hero>
            <a className="btn btn-primary" href={`mailto:${EMAIL}`}>
              <ArrowRightIcon size={16} />
              Contact Me
            </a>
            <a className="btn btn-outline" href={RESUME_URL} download>
              <DownloadIcon size={16} />
              Download CV
            </a>
          </div>
          <hr className="landing-rule" data-hero-rule />
          <div className="landing-follow" data-hero>
            <span>Follow me:</span>
            <ExternalLink href={SOCIAL_LINKS.github} aria-label="GitHub">
              <GithubIcon size={20} />
            </ExternalLink>
            <ExternalLink href={SOCIAL_LINKS.linkedin} aria-label="LinkedIn">
              <LinkedinIcon size={20} />
            </ExternalLink>
            <ExternalLink href={SOCIAL_LINKS.tableau} aria-label="Tableau Public">
              <TableauIcon size={20} />
            </ExternalLink>
          </div>
        </div>
        <div className="landing-visual">
          <div className="landing-portrait">
            <img
              src={PORTRAIT_URL}
              alt="Bridget Crampton"
              width="1240"
              height="1268"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

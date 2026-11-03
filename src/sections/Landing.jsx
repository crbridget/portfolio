import LandingViz from '../components/viz/LandingViz.jsx'

export default function Landing() {
  return (
    <div className="landing">
      <div className="landing-viz">
        <LandingViz />
      </div>
      <h1 className="landing-title">
        <span className="port">PORT</span>
        <span className="folio">FOLIO</span>
      </h1>
      <div className="landing-meta">
        <div>
          <div className="landing-year">2026</div>
          <div className="landing-name">Bridget Crampton</div>
        </div>
        <div className="landing-label">
          DATA SCIENCE
          <br />
          NORTHEASTERN UNIVERSITY
        </div>
      </div>
    </div>
  )
}

import { useState, useEffect, useRef } from 'react'
import './App.css'

function GithubIcon({ size=14 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
}
function LinkedinIcon({ size=14 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
}
function TableauIcon({ size=14 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M11.14 2.4v2.47H8.67V6.2h2.47v2.47h1.33V6.2h2.47V4.87h-2.47V2.4h-1.33zM4.8 9.07v1.87H2.93v1.19H4.8v1.87H6v-1.87h1.87v-1.19H6V9.07H4.8zm12.4 0v1.87H15.33v1.19H17.2v1.87h1.2v-1.87H20.27v-1.19H18.4V9.07h-1.2zM11.14 15.73v2.47H8.67v1.33h2.47v2.47h1.33v-2.47h2.47v-1.33h-2.47v-2.47h-1.33z"/></svg>
}
function MailIcon({ size=14 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
}
function DocIcon({ size=12 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
}

// thumbnails
function ThumbFraud() { return <img src="/model-comparison.png" alt="" style={{width:'100%',height:'auto',display:'block'}}/> }
function ThumbCoopScout() { return <img src="/coopscout-photo.png" alt="" style={{width:'100%',height:'auto',display:'block'}}/> }
function ThumbTableau() { return <img src="/heatmap.png" alt="" style={{width:'100%',height:'auto',objectFit:'cover',display:'block'}}/> }
function ThumbAST() { return <img src="/codescape-photo.png" alt="" style={{width:'100%',height:'auto',display:'block'}}/> }
function ThumbGenerate() { return <img src="/application-system-photo.png" alt="" style={{width:'100%',height:'auto',display:'block'}}/> }
function ThumbConstitution() { return <img src="/constitutional-evolution-photo.png" alt="" style={{width:'100%',height:'auto',display:'block'}}/> }
function ThumbFEMA() { return <img src="/disasters-photo.png" alt="" style={{width:'100%',height:'auto',display:'block'}}/> }
function ThumbTA() {
  const grid=[[1,0,1,0,1],[0,1,0,1,0],[1,1,0,0,1],[0,0,1,1,0],[1,0,0,1,1]]
  return <svg width="100%" viewBox="0 0 220 140" preserveAspectRatio="xMidYMid slice"><rect width="220" height="140" fill="#F0EBE6"/>{grid.map((row,r)=>row.map((v,c)=><rect key={`${r}${c}`} x={18+c*38} y={8+r*26} width="34" height="22" rx="4" fill={v?'#99CDD8':'#DAEBE3'} opacity={v?0.7:0.4}/>))}</svg>
}
function ThumbSpotify() { return <img src="/spotify-insight-photo.png" alt="" style={{width:'100%',height:'auto',display:'block'}}/> }
function ThumbVishing() { return <img src="/vishing-photo.png" alt="" style={{width:'100%',height:'auto',display:'block'}}/> }
function ThumbSankey() { return <img src="/artist-sankey-photo.png" alt="" style={{width:'100%',height:'auto',display:'block'}}/> }
function ThumbDRV() { return <img src="/fast-food-photo.png" alt="" style={{width:'100%',height:'auto',display:'block'}}/> }
function ThumbFoxes() { return <img src="/rabbits-and-foxes-photo.png" alt="" style={{width:'100%',height:'auto',display:'block'}}/> }

const PROJECTS = [
  { num:'01', title:'Credit Card Fraud Detection', category:'Machine Learning', desc:'Final project for DS4400 Machine Learning at Northeastern. Trained 6 ML models on 590k+ IEEE-CIS fraud transactions, with XGBoost achieving AUC 0.9075. Built a stacking ensemble improving fraud precision to 0.67 vs. 0.26 for standalone XGBoost.', tags:['XGBoost','Scikit-Learn','Kaggle'], github:'https://github.com/crbridget/credit-card-fraud-detection', links:[{label:'GitHub',url:'https://github.com/crbridget/credit-card-fraud-detection'},{label:'Final Report',url:'/DS4440_Final_Project_Report.pdf'}], Thumb:ThumbFraud },
  { num:'02', title:'Co-opScout', category:'Full Stack', desc:'Python/Selenium scraper extracting 1000+ NUworks co-op postings, with a Flask REST API and TF-IDF content-based recommendation engine backed by PostgreSQL.', tags:['Flask','PostgreSQL','NLP'], github:'https://github.com/crbridget/coopscout', Thumb:ThumbCoopScout },
  { num:'03', title:'MLS Market Intelligence', category:'Data Visualization', desc:'Built during my Data Analyst Internship at IDX Exchange. Ingested 12+ months of CoreLogic MLS data, engineered 7+ market metrics, and delivered 6 Tableau dashboards plus a 1-page SF market intelligence report.', tags:['Tableau','Pandas','CoreLogic API'], github:'https://github.com/crbridget/IDX-Exchange', links:[{label:'GitHub',url:'https://github.com/crbridget/IDX-Exchange'},{label:'Market Analysis',url:'https://public.tableau.com/app/profile/bridget.crampton/viz/market_analysis_17798558681020/AffordabilityPulsePricevs_MortgageRate'},{label:'Competitive Analysis',url:'https://public.tableau.com/app/profile/bridget.crampton/viz/competitive_analysis_17804649003350/PriceSalesHeatMaps'},{label:'SF Market Report',url:'/San_Francisco_Market_Intelligence.pdf'}], Thumb:ThumbTableau },
  { num:'04', title:'Codebase Graph Visualizer', category:'Software Engineering', desc:"Built on a software product team at Forge, an engineering club at Northeastern. Uses Tree-sitter to parse codebases into ASTs, extracting 10+ structural metrics per file for 3D graph visualization.", tags:['Tree-sitter','AST'], github:'#', links:[{label:'Forge Website',url:'https://www.forgenu.com/home'}], Thumb:ThumbAST },
  { num:'05', title:'Generate Application Portal', category:'Full Stack', desc:'Full-stack application portal for Generate, an engineering club at Northeastern. Built with React, Vite, Clerk, and Supabase with role-based auth and admin review tooling.', tags:['React','Supabase','Clerk'], github:'#', links:[{label:'Generate Website',url:'https://generatenu.com/#directors'}], Thumb:ThumbGenerate },
  { num:'06', title:'Constitutional Evolution', category:'NLP', desc:'NLP pipeline analyzing linguistic patterns and thematic similarities across 17 constitutions spanning 1787–1997, visualized as an interactive similarity heatmap.', tags:['Python','NLP','Matplotlib'], github:'https://github.com/crbridget/constitutional-evolution-nlp', Thumb:ThumbConstitution },
  { num:'07', title:'The Geography of Disaster', category:'Data Visualization', desc:'Interactive visualization of FEMA disaster funding patterns across the US, surfacing geographic disparities and trends in federal disaster relief over time.', tags:['D3.js','FEMA','Python'], github:'https://github.com/crbridget/geography-of-disaster', Thumb:ThumbFEMA },
  { num:'08', title:'TA Assignment Optimizer', category:'Software Engineering', desc:'Evolutionary computing solution for optimally assigning TAs to course sections, using selection, crossover, and mutation to iteratively improve assignment quality.', tags:['Python','Evolutionary Alg.'], github:'https://github.com/crbridget/TA-Assignment-Optimizer', Thumb:ThumbTA },
  { num:'09', title:'Spotify Insight', category:'Machine Learning', desc:'Sentiment analysis on song titles, K-Means clustering by emotional tone, and ML models (Linear Regression, KNN, Random Forest) predicting song popularity.', tags:['Scikit-Learn','K-Means','NLP'], github:'https://github.com/crbridget/spotify-insight', Thumb:ThumbSpotify },
  { num:'10', title:'Vishing Message Analysis', category:'NLP', desc:'TextBlob sentiment analysis and Seaborn/WordCloud visualizations identifying linguistic patterns in vishing (voice phishing) message language.', tags:['TextBlob','NLP','Seaborn'], github:'https://github.com/crbridget/vishing-text-analysis', Thumb:ThumbVishing },
  { num:'11', title:'Artist Sankey', category:'Data Visualization', desc:'Multi-layer Sankey diagram visualizing MoMA artist demographics — decade, nationality, and gender — cleaned and aggregated from raw JSON data.', tags:['Pandas','Sankey','Matplotlib'], github:'#', Thumb:ThumbSankey },
  { num:'12', title:'Fast Food Analytics', category:'Machine Learning', desc:'Discrete Random Variable class modeling fast food profit distributions. Computes expected annual income (~$122k), PMF/CDF, and probability of profitability.', tags:['Python','Probability','Seaborn'], github:'#', Thumb:ThumbDRV },
  { num:'13', title:'Rabbits & Foxes', category:'Software Engineering', desc:'Animated predator-prey ecosystem simulation using NumPy and Matplotlib. Complex oscillating population dynamics emerge from simple rules over 4000+ generations.', tags:['NumPy','Matplotlib','Animation'], github:'#', Thumb:ThumbFoxes },
]
const CATEGORIES = ['All','Machine Learning','Data Visualization','NLP','Full Stack','Software Engineering']

// Modal
function ProjectModal({ p, onClose }) {
  const Thumb = p.Thumb
  return (
    <div className="proj-modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="proj-modal-v2">
        <div className="proj-modal-header">
          <div className="proj-modal-filepath">{p.title.toLowerCase().replace(/ /g,'-')}.jsx</div>
          <div className="proj-modal-h-title">{p.title}</div>
          <button className="proj-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="proj-modal-v2-body">
          <div className="proj-modal-meta">
            <div className="proj-modal-meta-item"><div className="proj-modal-meta-label">CATEGORY</div><div className="proj-modal-meta-value">{p.category}</div></div>
            <div className="proj-modal-meta-item"><div className="proj-modal-meta-label">TOOLS</div><div className="proj-modal-meta-value">{p.tags.join(' · ')}</div></div>
            {Thumb && <div className="proj-modal-meta-item proj-modal-thumb-inline"><div className="proj-modal-meta-label">PREVIEW</div><div className="proj-modal-thumb-sm"><Thumb/></div></div>}
          </div>
          <div className="proj-modal-divider"/>
          <div className="proj-modal-v2-desc">{p.desc}</div>
          <div className="proj-modal-btns">
            {p.links ? p.links.map(l=>(
              <a key={l.label} href={l.url} target="_blank" className="proj-modal-pill">
                {l.label} →
              </a>
            )) : p.github!=='#' ? (
              <a href={p.github} target="_blank" className="proj-modal-pill">GitHub →</a>
            ) : <span className="proj-modal-pill proj-modal-pill-disabled">Private repo</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

// Bento card
function BentoCard({ p, index, onOpen }) {
  const Thumb = p.Thumb
  return (
    <div className="bento-card" style={{'--i':index}} onClick={()=>onOpen(p)}>
      <div className="bento-thumb">{Thumb&&<Thumb/>}</div>
      <div className="bento-title-bar">
        <div className="bento-cat">{p.category}</div>
        <div className="bento-name">{p.title}</div>
      </div>
      <div className="bento-overlay">
        <div className="bento-cat">{p.category}</div>
        <div className="bento-name">{p.title}</div>
        <div className="bento-tags">{p.tags.map(t=><span key={t} className="proj-tag">{t}</span>)}</div>
      </div>
    </div>
  )
}

// Bento view
function BentoView({ projects }) {
  const [selected, setSelected] = useState(null)
  const isMobile = window.innerWidth <= 700
  const numCols = isMobile ? 1 : 4
  const cols = Array.from({length:numCols},(_,ci)=>projects.filter((_,i)=>i%numCols===ci))
  return (
    <>
      <div className="bento-grid" key={projects.map(p=>p.num).join(',')}>
        {cols.map((col,ci)=>(
          <div key={ci} className="bento-col">
            {col.map((p,i)=><BentoCard key={p.title} p={p} index={i} onOpen={setSelected}/>)}
          </div>
        ))}
      </div>
      {selected&&<ProjectModal p={selected} onClose={()=>setSelected(null)}/>}
    </>
  )
}

// Table view
function TableView({ projects }) {
  const [sort, setSort] = useState(null)
  const [dir, setDir] = useState(1)
  const [expanded, setExpanded] = useState(null)
  const sorted = [...projects].sort((a,b)=>!sort?0:a[sort]<b[sort]?-dir:dir)
  function toggleSort(col) { if(sort===col) setDir(d=>-d); else{setSort(col);setDir(1)} }
  const cols = [{key:'num',label:'idx',w:'52px'},{key:'title',label:'project',w:'auto'},{key:'category',label:'category',w:'200px'},{key:'tags',label:'tools',w:'200px'}]
  return (
    <div className="df-wrap">
      <div className="df-header"><span className="df-shape">DataFrame({projects.length} rows × {cols.length} cols)</span></div>
      <div className="df-table-wrap">
        <table className="df-table">
          <thead><tr>{cols.map(c=><th key={c.key} style={{width:c.w}} onClick={()=>toggleSort(c.key)}>{c.label}{sort===c.key&&<span className="df-sort">{dir>0?' ↑':' ↓'}</span>}</th>)}</tr></thead>
          <tbody>
            {sorted.map((p,i)=>(
              <>
                <tr key={p.title} className={`df-row ${expanded===p.title?'df-row-active':''} ${i%2===0?'df-row-even':''}`} onClick={()=>setExpanded(expanded===p.title?null:p.title)}>
                  <td className="df-idx">{i}</td>
                  <td className="df-project"><span className="df-num">{p.num}</span>{p.title}</td>
                  <td><span className="df-cat-pill">{p.category}</span></td>
                  <td className="df-tools">{p.tags.join(', ')}</td>
                </tr>
                {expanded===p.title&&(
                  <tr key={`${p.title}-exp`} className="df-expanded-row">
                    <td colSpan={4}>
                      <div className="df-expanded">
                        <div className="df-expanded-thumb">{p.Thumb&&<p.Thumb/>}</div>
                        <div className="df-expanded-info">
                          <div className="df-expanded-title">{p.title}</div>
                          <div className="df-expanded-desc">{p.desc}</div>
                          <div className="df-expanded-meta"><span><b>tools:</b> {p.tags.join(' · ')}</span></div>
                          {p.links ? p.links.map(l=><a key={l.label} href={l.url} target="_blank" className="proj-link">{l.label} →</a>) :
                           p.github!=='#'&&<a href={p.github} target="_blank" className="proj-link"><GithubIcon/> GitHub</a>}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Right panel projects
function RightPanel() {
  const [cat, setCat] = useState('All')
  const [view, setView] = useState(()=>window.innerWidth<=700?'table':'bento')
  const filtered = PROJECTS.filter(p=>cat==='All'||p.category===cat)
  function changeCategory(c) {
    setCat(c)
    const panel = document.querySelector('.right-panel')
    if (panel) panel.scrollTo({top:0, behavior:'smooth'})
  }
  return (
    <div className="right-panel">
      <div className="right-header">
        <div>
          <div className="right-title">PROJECTS</div>
          <div className="right-subtitle">{filtered.length} · Internships, coursework, clubs, and personal builds.</div>
        </div>
        <div className="view-toggle">
          <button className={`view-btn ${view==='bento'?'active':''}`} onClick={()=>setView('bento')} title="Grid">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="0" width="7" height="7" rx="1"/><rect x="9" y="0" width="7" height="7" rx="1"/><rect x="0" y="9" width="7" height="7" rx="1"/><rect x="9" y="9" width="7" height="7" rx="1"/></svg>
          </button>
          <button className={`view-btn ${view==='table'?'active':''}`} onClick={()=>setView('table')} title="Table">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="0" width="16" height="3" rx="1"/><rect x="0" y="5" width="16" height="2" rx="0.5" opacity="0.6"/><rect x="0" y="9" width="16" height="2" rx="0.5" opacity="0.6"/><rect x="0" y="13" width="16" height="2" rx="0.5" opacity="0.6"/></svg>
          </button>
        </div>
      </div>
      <div className="projects-filter-wrap">
        <div className="projects-filter">
          {CATEGORIES.map(c=><button key={c} className={`filter-btn ${cat===c?'active':''}`} onClick={()=>changeCategory(c)}>{c.toUpperCase()}</button>)}
        </div>
        <div className="filter-scroll-hint">›</div>
      </div>
      {view==='bento' ? <BentoView projects={filtered}/> : <TableView projects={filtered}/>}
    </div>
  )
}

export default function App() {
  return (
    <div className="app">
      {/* Left panel */}
      <div className="left-panel">
        <img src="/headshot.jpg" className="left-photo" alt="Bridget Crampton"/>
        <div className="left-hello">HELLO!</div>
        <div className="left-name">BRIDGET<br/><span>CRAMPTON.</span></div>
        <div className="left-role">Data Scientist · Analyst · Engineer</div>
        <div className="left-bio">
          <p>I'm a data science student at Northeastern. I believe data is one of the most powerful tools we have for understanding the world and making it better for the people in it.</p>
          <p>I build with intention and I want people to feel the impact of what I make. Right now I'm building my foundation through real estate analysis, machine learning, and business intelligence work at Klaviyo.</p>
        </div>
        <div className="left-spacer"/>
        <div className="left-bubbles">
          <a href="mailto:crampton.b@northeastern.edu" className="left-bubble filled">
            <MailIcon/> crampton.b@northeastern.edu
          </a>
          <a href="/Bridget-Crampton-Resume.pdf" target="_blank" className="left-bubble outline">
            <DocIcon/> resume.pdf
          </a>
        </div>
        <div className="left-social">
          <a href="https://github.com/crbridget" target="_blank" title="GitHub"><GithubIcon/></a>
          <a href="https://www.linkedin.com/in/bridget-crampton-7342692a7/" target="_blank" title="LinkedIn"><LinkedinIcon/></a>
          <a href="https://public.tableau.com/app/profile/bridget.crampton/vizzes" target="_blank" title="Tableau"><TableauIcon/></a>
        </div>
      </div>

      {/* Right panel */}
      <RightPanel/>
    </div>
  )
}

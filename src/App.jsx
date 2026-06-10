import { useState, useEffect, useRef } from 'react'
import './App.css'

// ── Icons ──────────────────────────────────────────────────────
function GithubIcon({ size=16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
}
function LinkedinIcon({ size=16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
}
function TableauIcon({ size=16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M11.14 2.4v2.47H8.67V6.2h2.47v2.47h1.33V6.2h2.47V4.87h-2.47V2.4h-1.33zM4.8 9.07v1.87H2.93v1.19H4.8v1.87H6v-1.87h1.87v-1.19H6V9.07H4.8zm12.4 0v1.87H15.33v1.19H17.2v1.87h1.2v-1.87H20.27v-1.19H18.4V9.07h-1.2zM11.14 15.73v2.47H8.67v1.33h2.47v2.47h1.33v-2.47h2.47v-1.33h-2.47v-2.47h-1.33z"/></svg>
}

// ── Decorative landing data viz ────────────────────────────────
function LandingViz() {
  const scatter = Array.from({length:40}, (_,i) => ({
    x: 10 + Math.sin(i*0.7)*38 + i*2.2,
    y: 30 + Math.cos(i*0.5)*28 + i*0.8,
    r: 2 + (i%5)*1.2,
    op: 0.08 + (i%4)*0.05
  }))
  const bars = [55,72,41,88,63,95,50,78,34,82,60,91]
  const lineW = 900, lineH = 120
  const pts = bars.map((v,i) => `${60+i*70},${lineH - v*1.1}`).join(' ')

  return (
    <svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
      {/* scatter cloud left */}
      {scatter.map((d,i) => (
        <circle key={i} cx={d.x*2.5} cy={d.y*4} r={d.r} fill="#4A78A8" opacity={d.op}/>
      ))}
      {/* scatter cloud right */}
      {scatter.map((d,i) => (
        <circle key={`r${i}`} cx={1000-d.x*2.5} cy={d.y*4} r={d.r} fill="#2F4156" opacity={d.op*0.8}/>
      ))}
      {/* bar chart bottom center */}
      {bars.map((h,i) => (
        <rect key={i} x={300+i*36} y={560-h*0.7} width="28" height={h*0.7}
          rx="3" fill="#4A78A8" opacity={0.08+i*0.012}/>
      ))}
      {/* sparkline */}
      <polyline points={pts.split(' ').map(p => { const [x,y]=p.split(','); return `${+x+50},${+y+390}` }).join(' ')}
        fill="none" stroke="#2F4156" strokeWidth="1.5" opacity="0.1" strokeLinecap="round"/>
      {/* network lines */}
      {[[500,300,380,200],[500,300,620,200],[500,300,480,440],[500,300,640,380],
        [500,300,360,380],[380,200,260,120],[620,200,740,120]].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#4A78A8" strokeWidth="1" opacity="0.1"/>
      ))}
      {[[500,300],[380,200],[620,200],[480,440],[640,380],[360,380],[260,120],[740,120]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r={i===0?8:5} fill="#4A78A8" opacity={i===0?0.15:0.1}/>
      ))}
      {/* circle arcs */}
      <circle cx="500" cy="300" r="160" fill="none" stroke="#2F4156" strokeWidth="0.8" opacity="0.07" strokeDasharray="6 10"/>
      <circle cx="500" cy="300" r="240" fill="none" stroke="#4A78A8" strokeWidth="0.8" opacity="0.05" strokeDasharray="4 14"/>
    </svg>
  )
}

// ── SVG project thumbnails ─────────────────────────────────────
function ThumbFraud() {
  const bars=[38,72,45,91,60,55,80,42,67,88,50,75,95,62,48]
  return <svg width="100%" height="100%" viewBox="0 0 220 140" preserveAspectRatio="xMidYMid slice">
    <rect width="220" height="140" fill="#EDE8E3"/>
    {bars.map((h,i)=><rect key={i} x={6+i*14} y={140-h} width="11" height={h} rx="2" fill={h>80?'#2F4156':'#4A78A8'} opacity={h>80?0.85:0.45}/>)}
    {[0.3,0.6,0.9].map((v,i)=><line key={i} x1="0" y1={140-v*110} x2="220" y2={140-v*110} stroke="#C4BAA2" strokeWidth="0.8"/>)}
    <text x="8" y="16" fill="#4A78A8" fontSize="8" fontFamily="monospace">AUC: 0.9075</text>
  </svg>
}
function ThumbCoopScout() {
  const n=[[110,70],[60,35],[160,35],[44,108],[176,108],[110,120],[75,75],[145,75]]
  const e=[[0,1],[0,2],[0,3],[0,4],[0,5],[1,6],[2,7],[3,6],[4,7]]
  return <svg width="100%" height="100%" viewBox="0 0 220 140" preserveAspectRatio="xMidYMid slice">
    <rect width="220" height="140" fill="#EDE8E3"/>
    {e.map(([a,b],i)=><line key={i} x1={n[a][0]} y1={n[a][1]} x2={n[b][0]} y2={n[b][1]} stroke="#4A78A8" strokeWidth="1.5" opacity="0.3"/>)}
    {n.map(([x,y],i)=><circle key={i} cx={x} cy={y} r={i===0?8:5} fill={i===0?'#4A78A8':'#C8D9E6'} stroke="#4A78A8" strokeWidth="1"/>)}
    <text x="8" y="14" fill="#4A78A8" fontSize="8" fontFamily="monospace">TF-IDF network</text>
  </svg>
}
function ThumbSEC() {
  const words=[{t:'risk',x:110,y:60,s:18},{t:'credit',x:72,y:82,s:13},{t:'debt',x:148,y:80,s:11},{t:'default',x:55,y:100,s:9},{t:'SEC',x:44,y:44,s:9},{t:'10-K',x:170,y:55,s:8}]
  return <svg width="100%" height="100%" viewBox="0 0 220 140" preserveAspectRatio="xMidYMid slice">
    <rect width="220" height="140" fill="#EDE8E3"/>
    {words.map((w,i)=><text key={i} x={w.x} y={w.y} fontSize={w.s} fill="#2F4156" fontFamily="monospace" textAnchor="middle" opacity={0.3+i*0.1}>{w.t}</text>)}
    <text x="8" y="14" fill="#4A78A8" fontSize="8" fontFamily="monospace">NLP · credit risk</text>
  </svg>
}
function ThumbSoccer() {
  const pl=[[66,44],[95,28],[125,28],[154,44],[110,62],[73,62],[147,62],[110,96],[66,96],[154,96],[110,116]]
  const ps=[[0,1],[1,2],[2,3],[3,4],[4,5],[4,6],[5,7],[6,7],[7,8],[7,9],[0,5],[3,6]]
  return <svg width="100%" height="100%" viewBox="0 0 220 140" preserveAspectRatio="xMidYMid slice">
    <rect width="220" height="140" fill="#EDE8E3"/>
    <rect x="30" y="12" width="160" height="116" rx="3" fill="none" stroke="#C4BAA2" strokeWidth="0.8"/>
    <ellipse cx="110" cy="70" rx="24" ry="24" fill="none" stroke="#C4BAA2" strokeWidth="0.8"/>
    {ps.map(([a,b],i)=><line key={i} x1={pl[a][0]} y1={pl[a][1]} x2={pl[b][0]} y2={pl[b][1]} stroke="#4A78A8" strokeWidth="1" opacity="0.2"/>)}
    {pl.map(([x,y],i)=><circle key={i} cx={x} cy={y} r="4" fill="#4A78A8" opacity={i===4?1:0.45}/>)}
  </svg>
}
function ThumbTableau() {
  const h=[0.9,0.4,0.7,0.3,0.8,0.5,0.6,0.2,0.3,0.8,0.5,0.9,0.2,0.7,0.4,0.6,0.6,0.3,0.9,0.5]
  return <svg width="100%" height="100%" viewBox="0 0 220 140" preserveAspectRatio="xMidYMid slice">
    <rect width="220" height="140" fill="#EDE8E3"/>
    {h.map((v,i)=>{const c=i%5,r=Math.floor(i/5);return<rect key={i} x={22+c*38} y={24+r*26} width="33" height="21" rx="3" fill="#4A78A8" opacity={0.08+v*0.65}/>})}
    <text x="8" y="14" fill="#4A78A8" fontSize="8" fontFamily="monospace">MLS heat map</text>
  </svg>
}
function ThumbAST() {
  const n=[[110,18],[66,52],[154,52],[44,88],[88,88],[132,88],[176,88],[33,116],[55,116],[110,116],[154,116]]
  const e=[[0,1],[0,2],[1,3],[1,4],[2,5],[2,6],[3,7],[3,8],[5,9],[6,10]]
  return <svg width="100%" height="100%" viewBox="0 0 220 130" preserveAspectRatio="xMidYMid slice">
    <rect width="220" height="130" fill="#EDE8E3"/>
    {e.map(([a,b],i)=><line key={i} x1={n[a][0]} y1={n[a][1]} x2={n[b][0]} y2={n[b][1]} stroke="#4A78A8" strokeWidth="1.5" opacity="0.35"/>)}
    {n.map(([x,y],i)=><circle key={i} cx={x} cy={y} r={i===0?6:i<3?5:3.5} fill="#F0EBE0" stroke="#4A78A8" strokeWidth={i===0?2:1.5} opacity={i===0?1:0.75}/>)}
    <text x="8" y="13" fill="#4A78A8" fontSize="8" fontFamily="monospace">AST graph</text>
  </svg>
}

const PROJECTS = [
  { num:'01', title:'Credit Card Fraud Detection', category:'Machine Learning', desc:'XGBoost on 590k+ transactions. AUC 0.9075. Feature engineering + stacking ensemble.', tags:['XGBoost','Scikit-Learn','Kaggle'], github:'#', Thumb:ThumbFraud },
  { num:'02', title:'Co-opScout', category:'Data Engineering', desc:'Selenium scraper + Flask API with TF-IDF recommendation system backed by PostgreSQL.', tags:['Flask','PostgreSQL','NLP'], github:'#', Thumb:ThumbCoopScout },
  { num:'03', title:'SEC Risk Agent', category:'NLP', desc:'Google ADK agent analyzing SEC 10-K filings to surface credit risk patterns.', tags:['NLP','Google ADK'], github:'https://github.com/crbridget/sec-risk-agent', Thumb:ThumbSEC },
  { num:'04', title:'Soccer Possession Networks', category:'Data Visualization', desc:'StatsBomb → NetworkX graphs. K-means classified 7 attack types.', tags:['NetworkX','K-Means'], github:'#', Thumb:ThumbSoccer },
  { num:'05', title:'MLS Market Intelligence', category:'Data Visualization', desc:'6 Tableau dashboards on 12+ months of CoreLogic MLS data with zip-code heat maps.', tags:['Tableau','Pandas'], github:'#', Thumb:ThumbTableau },
  { num:'06', title:'Codebase Graph Visualizer', category:'Data Engineering', desc:'Tree-sitter AST parser extracting complexity metrics for 3D graph visualization.', tags:['Tree-sitter','AST'], github:'#', Thumb:ThumbAST },
]
const CATEGORIES = ['All','Machine Learning','Data Engineering','NLP','Data Visualization']

const EXPERIENCE = [
  { title:'Incoming BI Co-op', company:'Klaviyo', date:'July 2026 – Present', bullets:['Data-driven decision making and analytics initiatives'] },
  { title:'Data Analyst Intern', company:'IDX Exchange', date:'March – June 2026', bullets:['Python/Pandas pipeline for 12+ months MLS data','6 Tableau dashboards with zip-code heat maps'] },
  { title:'Undergraduate Research Asst.', company:'Network Science Inst., NEU', date:'Nov 2025 – April 2026', bullets:['StatsBomb possession networks with NetworkX','K-means clustering for attack pattern detection'] },
  { title:'Data Science Intern', company:'SparkJar Agency', date:'May – July 2025', bullets:['SEC filing scraper (Beautiful Soup + Regex)','NLP AI agent via Google ADK for credit risk analysis'] },
]

const SKILLS_LIST = [
  { name:'Python', pct:95 }, { name:'Machine Learning', pct:85 }, { name:'SQL', pct:88 },
  { name:'Data Visualization', pct:87 }, { name:'NLP / Text Analysis', pct:78 },
  { name:'Data Engineering', pct:80 }, { name:'XGBoost / Scikit-Learn', pct:85 },
  { name:'Tableau / Plotly', pct:82 },
]

function SkillRow({ name, pct, animate }) {
  const [w, setW] = useState(0)
  useEffect(() => {
    if (animate) { const t = setTimeout(() => setW(pct), 100); return () => clearTimeout(t) }
  }, [animate, pct])
  return (
    <div className="skill-row">
      <span className="skill-name-sm">{name}</span>
      <div className="skill-bar-bg">
        <div className="skill-bar-fill" style={{width:`${w}%`, transition:'width 0.9s ease'}}/>
      </div>
    </div>
  )
}

// ── Pages ──────────────────────────────────────────────────────
function LandingPage({ goTo }) {
  return (
    <div className="landing">
      <div className="landing-viz"><LandingViz/></div>
      <div className="landing-title">
        <span className="port">PORT</span><span className="folio">FOLIO</span>
      </div>
      <div className="landing-meta">
        <div>
          <div className="landing-year">2025</div>
          <div className="landing-name">Bridget Crampton</div>
        </div>
        <div className="landing-label">DATA SCIENCE<br/>NORTHEASTERN UNIVERSITY</div>
      </div>
      <div className="landing-hint" style={{cursor:'pointer'}} onClick={() => goTo('profile')}>
        click to explore
      </div>
    </div>
  )
}

function ProfileViz() {
  const scatter = Array.from({length:28},(_,i)=>({
    x:30+Math.sin(i*0.9)*140+i*4, y:50+Math.cos(i*0.6)*90+i*1.5,
    r:2+(i%4)*1.8, op:0.06+(i%4)*0.04
  }))
  const nodes=[[820,180],[740,110],[910,120],[755,265],[895,270],[820,330],[695,200],[945,195]]
  const edges=[[0,1],[0,2],[0,3],[0,4],[0,5],[1,6],[2,7],[3,5],[4,5],[1,3],[2,4]]
  const bars=[45,68,35,82,52,90,44,72,58,84,38,66,94,55,76]
  const sparkD=[28,42,35,56,48,66,60,76,70,86,80,94]
  const sparkPts=sparkD.map((v,i)=>`${80+i*76},${390-(v*1.9)}`).join(' ')
  return (
    <svg style={{position:'absolute',inset:0,pointerEvents:'none',zIndex:1}} width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
      {/* subtle grid */}
      {[120,240,360,480].map(y=><line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="#4A78A8" strokeWidth="0.4" opacity="0.07"/>)}
      {[200,400,600,800].map(x=><line key={x} x1={x} y1="0" x2={x} y2="600" stroke="#4A78A8" strokeWidth="0.4" opacity="0.07"/>)}
      {/* scatter — top left */}
      {scatter.map((d,i)=><circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#4A78A8" opacity={d.op}/>)}
      {/* scatter — bottom right mirror */}
      {scatter.map((d,i)=><circle key={`b${i}`} cx={1000-d.x*0.85} cy={600-d.y*0.75} r={d.r*0.9} fill="#2F4156" opacity={d.op*0.8}/>)}
      {/* network — right */}
      {edges.map(([a,b],i)=><line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="#4A78A8" strokeWidth="1.5" opacity="0.1"/>)}
      {nodes.map(([x,y],i)=><circle key={i} cx={x} cy={y} r={i===0?11:6} fill="#4A78A8" opacity={i===0?0.14:0.09}/>)}
      {/* sparkline */}
      <polyline points={sparkPts} fill="none" stroke="#2F4156" strokeWidth="2" opacity="0.1" strokeLinecap="round" strokeLinejoin="round"/>
      {sparkD.map((_,i)=><circle key={i} cx={80+i*76} cy={390-(sparkD[i]*1.9)} r="4" fill="#4A78A8" opacity="0.1"/>)}
      {/* bar chart — bottom */}
      {bars.map((h,i)=><rect key={i} x={275+i*31} y={585-h*0.9} width="24" height={h*0.9} rx="2" fill="#4A78A8" opacity={0.07+i*0.007}/>)}
      {/* dashed circles */}
      <circle cx="160" cy="300" r="200" fill="none" stroke="#4A78A8" strokeWidth="0.8" opacity="0.08" strokeDasharray="5 14"/>
      <circle cx="840" cy="300" r="160" fill="none" stroke="#2F4156" strokeWidth="0.8" opacity="0.06" strokeDasharray="3 12"/>
      {/* left axis */}
      {[0,1,2,3,4,5].map(i=>(
        <g key={i}>
          <line x1="0" y1={100+i*82} x2="14" y2={100+i*82} stroke="#4A78A8" strokeWidth="1" opacity="0.2"/>
          <text x="20" y={104+i*82} fontSize="8" fill="#9A9888" opacity="0.45" fontFamily="monospace">{100-i*20}</text>
        </g>
      ))}
      <line x1="0" y1="100" x2="0" y2="590" stroke="#4A78A8" strokeWidth="0.8" opacity="0.15"/>
      {/* bottom axis */}
      {[0,1,2,3,4,5,6].map(i=>(
        <g key={i}>
          <line x1={100+i*135} y1="597" x2={100+i*135} y2="585" stroke="#4A78A8" strokeWidth="1" opacity="0.2"/>
          <text x={100+i*135} y="580" fontSize="8" fill="#9A9888" opacity="0.45" fontFamily="monospace" textAnchor="middle">{i*20}</text>
        </g>
      ))}
      <line x1="100" y1="597" x2="955" y2="597" stroke="#4A78A8" strokeWidth="0.8" opacity="0.15"/>
    </svg>
  )
}

function ProfilePage() {
  return (
    <div className="profile-page" style={{padding:0, position:'relative', overflow:'hidden', alignItems:'center', justifyContent:'center'}}>
      <ProfileViz/>
      <div style={{
        position:'relative', zIndex:2,
        display:'grid', gridTemplateColumns:'240px 1fr',
        gap:'52px', alignItems:'start',
        maxWidth:'980px', width:'100%',
        padding:'52px 56px 48px',
      }}>
        {/* Photo + bubbles */}
        <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', gap:'12px'}}>
          <img
            src="/headshot.jpg"
            alt="Bridget Crampton"
            style={{
              width:'230px', height:'276px',
              objectFit:'cover', objectPosition:'top center',
              display:'block',
              border:'3px solid var(--navy)',
              outline:'5px solid var(--sky)',
              outlineOffset:'5px',
              boxShadow:'5px 7px 0 var(--navy)',
            }}
          />
          {/* Bubbles */}
          <a href="mailto:crampton.b@northeastern.edu" style={{
            display:'inline-flex', alignItems:'center', gap:'7px',
            background:'var(--navy)', color:'#F7F4EF',
            fontFamily:'JetBrains Mono, monospace', fontSize:'10px',
            padding:'7px 14px', borderRadius:'999px',
            letterSpacing:'0.3px', textDecoration:'none',
            transition:'background 0.15s', width:'fit-content',
          }}
            onMouseOver={e=>e.currentTarget.style.background='var(--blue)'}
            onMouseOut={e=>e.currentTarget.style.background='var(--navy)'}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            crampton.b@northeastern.edu
          </a>
          <a href="#" style={{
            display:'inline-flex', alignItems:'center', gap:'7px',
            background:'transparent', color:'var(--navy)',
            fontFamily:'JetBrains Mono, monospace', fontSize:'10px',
            padding:'7px 14px', borderRadius:'999px',
            border:'1.5px solid var(--navy)',
            letterSpacing:'0.3px', textDecoration:'none',
            transition:'all 0.15s', width:'fit-content',
          }}
            onMouseOver={e=>{e.currentTarget.style.background='var(--navy)';e.currentTarget.style.color='#F7F4EF'}}
            onMouseOut={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='var(--navy)'}}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            resume.pdf
          </a>
        </div>

        {/* Text */}
        <div style={{marginTop:'-28px'}}>
          <div className="profile-hello">HELLO!</div>
          <div className="profile-inam" style={{marginBottom:'10px'}}>I'M <span>BRIDGET.</span></div>
          <div className="profile-role" style={{marginBottom:'22px'}}>Data Scientist · Analyst · Engineer</div>
          <div className="profile-bio" style={{fontSize:'14.5px'}}>
            <p style={{marginBottom:'14px'}}>I'm a data science student at Northeastern. I believe data is one of the most powerful tools we have for understanding the world and making it better for the people in it. I build with intention and I want people to feel the impact of what I make.</p>
            <p style={{marginBottom:'14px'}}>I didn't grow up coding. I grew up singing and acting, which is about as far from data science as you can get. When I finally got into this field I was convinced everyone else had a ten year head start on me. Maybe they did. Now you'll find me voluntarily watching YouTube videos about AI and machine learning on a Friday night and genuinely enjoying it.</p>
            <p>Right now I'm building my foundation through real estate analysis, machine learning, and business intelligence work at Klaviyo.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectsPage() {
  const [cat, setCat] = useState('All')
  const filtered = PROJECTS.filter(p => cat==='All' || p.category===cat)
  return (
    <div className="projects-page">
      <div className="projects-header">
        <div className="projects-title">PROJECTS</div>
        <div className="projects-count">{filtered.length} works · welcome to my brain</div>
      </div>
      <div className="projects-filter">
        {CATEGORIES.map(c => (
          <button key={c} className={`filter-btn ${cat===c?'active':''}`} onClick={()=>setCat(c)}>
            {c.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="projects-grid">
        {filtered.map((p) => (
          <div key={p.title} className="proj-card">
            <div className="proj-num">{p.num}</div>
            <div className="proj-thumb"><p.Thumb/></div>
            <div className="proj-title-bar">
              <div className="proj-title-bar-cat">{p.category}</div>
              <div className="proj-title-bar-name">{p.title}</div>
            </div>
            <div className="proj-info">
              <div className="proj-category">{p.category}</div>
              <div className="proj-title">{p.title}</div>
              <div className="proj-tags">{p.tags.map(t=><span key={t} className="proj-tag">{t}</span>)}</div>
              {p.github !== '#' && (
                <a href={p.github} target="_blank" className="proj-link">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                  source
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── App ────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState('landing')

  return (
    <div className="shell">
      <nav className="topnav">
        <div className="nav-logo" style={{cursor:'pointer'}} onClick={()=>setPage('landing')}>BC</div>
        <div className="nav-links">
          <button className={`nav-btn ${page==='landing'?'active':''}`} onClick={()=>setPage('landing')}>home</button>
          <button className={`nav-btn ${page==='profile'?'active':''}`} onClick={()=>setPage('profile')}>profile</button>
          <button className={`nav-btn ${page==='projects'?'active':''}`} onClick={()=>setPage('projects')}>projects</button>
        </div>
        <div className="nav-social">
          <a href="https://github.com/crbridget" target="_blank" title="GitHub"><GithubIcon size={14}/></a>
          <a href="https://www.linkedin.com/in/bridget-crampton-7342692a7/" target="_blank" title="LinkedIn"><LinkedinIcon size={14}/></a>
          <a href="https://public.tableau.com/app/profile/bridget.crampton/vizzes" target="_blank" title="Tableau"><TableauIcon size={14}/></a>
        </div>
      </nav>
      <div className="page">
        {page === 'landing'  && <LandingPage goTo={setPage}/>}
        {page === 'profile'  && <ProfilePage/>}
        {page === 'projects' && <ProjectsPage/>}
      </div>
    </div>
  )
}

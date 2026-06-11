import { useState, useEffect, useRef, useCallback } from 'react'
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
  const bars = [55,72,41,88,63,95,50,78,34,82,60,91]
  const sparkPts = bars.map((v,i)=>`${110+i*70},${510-v*1.0}`).join(' ')
  const sparkLen = 900

  const edges = [[500,300,380,200],[500,300,620,200],[500,300,480,440],
    [500,300,640,380],[500,300,360,380],[380,200,260,120],[620,200,740,120]]
  const nodes = [[500,300],[380,200],[620,200],[480,440],[640,380],[360,380],[260,120],[740,120]]

  return (
    <svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <style>{`
          @keyframes floatA{0%,100%{transform:translate(0,0)}33%{transform:translate(4px,-7px)}66%{transform:translate(-5px,4px)}}
          @keyframes floatB{0%,100%{transform:translate(0,0)}40%{transform:translate(-6px,5px)}70%{transform:translate(5px,-4px)}}
          @keyframes drawLine{from{stroke-dashoffset:1000}to{stroke-dashoffset:0}}
          @keyframes nodeFade{from{opacity:0}to{opacity:1}}
          @keyframes edgeDraw{from{stroke-dashoffset:300}to{stroke-dashoffset:0}}
        `}</style>
      </defs>


      {/* bar chart — fades in */}
      {bars.map((h,i) => (
        <rect key={i}
          x={300+i*36} y={560-h*0.7} width="28" height={h*0.7} rx="3"
          fill="#4A78A8" opacity={0.06+i*0.007}
          style={{animation:`nodeFade 0.4s ease ${1.2+i*0.05}s both`}}
        />
      ))}

      {/* self-drawing sparkline */}
      <polyline
        points={sparkPts}
        fill="none" stroke="#2F4156" strokeWidth="1.2"
        strokeLinecap="round" strokeLinejoin="round"
        opacity="0.07"
        strokeDasharray={sparkLen}
        strokeDashoffset={sparkLen}
        style={{animation:`drawLine 2.2s cubic-bezier(0.4,0,0.2,1) 0.6s forwards`}}
      />

      {/* network edges — draw in staggered */}
      {edges.map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#4A78A8" strokeWidth="0.8" opacity="0.11"
          strokeDasharray="300" strokeDashoffset="300"
          style={{animation:`edgeDraw 0.6s ease ${0.5+i*0.12}s forwards`}}
        />
      ))}

      {/* network nodes — fade in */}
      {nodes.map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy}
          r={i===0?6:4}
          fill="#4A78A8" opacity={i===0?0.14:0.09}
          style={{animation:`nodeFade 0.4s ease ${0.4+i*0.1}s both`}}
        />
      ))}

      {/* dashed arcs */}
      <circle cx="500" cy="300" r="160" fill="none" stroke="#2F4156" strokeWidth="0.6"
        opacity="0.06" strokeDasharray="6 10"
        style={{animation:`nodeFade 1s ease 1.4s both`}}/>
      <circle cx="500" cy="300" r="240" fill="none" stroke="#4A78A8" strokeWidth="0.6"
        opacity="0.05" strokeDasharray="4 14"
        style={{animation:`nodeFade 1s ease 1.6s both`}}/>
    </svg>
  )
}

// ── SVG project thumbnails ─────────────────────────────────────
function ThumbFraud() {
  return <img src="/model-comparison.png" alt="Model Comparison" style={{width:'100%',height:'auto',objectFit:'cover',display:'block'}}/>
}
function ThumbCoopScout() {
  return <img src="/coopscout-photo.png" alt="Co-opScout" style={{width:'100%',height:'auto',display:'block'}}/>
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
  return <img src="/netsci-photo.png" alt="Network Science" style={{width:'100%',height:'auto',display:'block'}}/>
}
function ThumbTableau() {
  return <img src="/heatmap.png" alt="Price & Sales Heat Maps" style={{width:'100%',height:'auto',objectFit:'cover',display:'block'}}/>
}
function ThumbAST() {
  return <img src="/codescape-photo.png" alt="Codescape" style={{width:'100%',height:'auto',display:'block'}}/>
}

// ── New thumbnails ──────────────────────────────────────────────
function ThumbGenerate() {
  return <img src="/application-system-photo.png" alt="Application System" style={{width:'100%',height:'auto',display:'block'}}/>
}
function ThumbConstitution() {
  return <img src="/constitutional-evolution-photo.png" alt="Constitutional Evolution" style={{width:'100%',height:'auto',display:'block'}}/>
}
function _ThumbConstitutionSVG() {
  const heat=[0.9,0.3,0.6,0.2,0.8,0.4,0.7,0.3,0.6,0.9,0.2,0.5,0.8,0.4,0.7,0.1,0.9,0.3,0.6,0.8,0.2,0.5,0.7,0.4,0.9]
  return <svg width="100%" height="100%" viewBox="0 0 220 140" preserveAspectRatio="xMidYMid slice">
    <rect width="220" height="140" fill="#EDE8E3"/>
    {heat.map((v,i)=>{const c=i%5,r=Math.floor(i/5);return<rect key={i} x={28+c*34} y={22+r*22} width="30" height="18" rx="2" fill="#4A78A8" opacity={0.1+v*0.7}/>})}
    <text x="8" y="13" fontSize="8" fill="#4A78A8" fontFamily="monospace">17 constitutions · 1787–1997</text>
    {[28,62,96,130,164].map((x,i)=><text key={i} x={x+15} y="135" fontSize="6" fill="#9A9888" fontFamily="monospace" textAnchor="middle">{['US','FR','DE','JP','BR'][i]}</text>)}
  </svg>
}
function ThumbFEMA() {
  return <img src="/disasters-photo.png" alt="Geography of Disaster" style={{width:'100%',height:'auto',display:'block'}}/>
}
function ThumbTA() {
  const grid=[[1,0,1,0,1],[0,1,0,1,0],[1,1,0,0,1],[0,0,1,1,0],[1,0,0,1,1]]
  return <svg width="100%" height="100%" viewBox="0 0 220 140" preserveAspectRatio="xMidYMid slice">
    <rect width="220" height="140" fill="#EDE8E3"/>
    {grid.map((row,r)=>row.map((v,c)=><rect key={`${r}${c}`} x={18+c*38} y={8+r*26} width="34" height="22" rx="3" fill={v?'#4A78A8':'#E8E0D4'} opacity={v?0.7:0.4}/>))}
  </svg>
}
function ThumbMBTA() {
  const lines=[
    {pts:[[20,70],[55,60],[90,50],[125,55],[160,65],[195,60]],c:'#DA291C'},
    {pts:[[20,90],[50,85],[85,75],[110,80],[145,88],[180,95],[210,90]],c:'#003DA5'},
    {pts:[[40,110],[75,100],[100,95],[130,98],[165,105]],c:'#00843D'},
  ]
  return <svg width="100%" height="100%" viewBox="0 0 220 140" preserveAspectRatio="xMidYMid slice">
    <rect width="220" height="140" fill="#EDE8E3"/>
    {lines.map((l,li)=><polyline key={li} points={l.pts.map(([x,y])=>`${x},${y}`).join(' ')} fill="none" stroke={l.c} strokeWidth="2.5" opacity="0.55" strokeLinecap="round" strokeLinejoin="round"/>)}
    {lines.flatMap((l,li)=>l.pts.map(([x,y],pi)=><circle key={`${li}${pi}`} cx={x} cy={y} r="3.5" fill="white" stroke={l.c} strokeWidth="1.5" opacity="0.7"/>))}
    <text x="8" y="13" fontSize="8" fill="#4A78A8" fontFamily="monospace">MBTA data dashboard</text>
  </svg>
}
function ThumbSpotify() {
  return <img src="/spotify-insight-photo.png" alt="Spotify Insight" style={{width:'100%',height:'auto',display:'block'}}/>
}
function ThumbVishing() {
  return <img src="/vishing-photo.png" alt="Vishing Analysis" style={{width:'100%',height:'auto',display:'block'}}/>
}

function ThumbSankey() {
  return <img src="/artist-sankey-photo.png" alt="Artist Sankey" style={{width:'100%',height:'auto',display:'block'}}/>
}
function _ThumbSankeySVG() {
  const layers = [[110], [60,160], [40,85,130,175]]
  const edges = [[110,60],[110,160],[60,40],[60,85],[160,130],[160,175]]
  return <svg width="100%" height="100%" viewBox="0 0 220 140" preserveAspectRatio="xMidYMid slice">
    <rect width="220" height="140" fill="#EDE8E3"/>
    {edges.map(([x1,x2],i)=><path key={i} d={`M${x1},30 C${x1},70 ${x2},70 ${x2},110`} fill="none" stroke="#4A78A8" strokeWidth={6-i*0.5} opacity="0.25"/>)}
    {layers[0].map((x,i)=><rect key={i} x={x-18} y={20} width="36" height="16" rx="3" fill="#2F4156" opacity="0.7"/>)}
    {layers[1].map((x,i)=><rect key={i} x={x-18} y={62} width="36" height="16" rx="3" fill="#4A78A8" opacity="0.65"/>)}
    {layers[2].map((x,i)=><rect key={i} x={x-18} y={104} width="36" height="16" rx="3" fill="#4A78A8" opacity={0.4+i*0.1}/>)}
    <text x="8" y="13" fontSize="8" fill="#4A78A8" fontFamily="monospace">artist sankey · MoMA</text>
    {['Decade','Nationality','Gender'].map((l,i)=><text key={i} x={8} y={32+i*42} fontSize="7" fill="#9A9888" fontFamily="monospace">{l}</text>)}
  </svg>
}
function ThumbDRV() {
  return <img src="/fast-food-photo.png" alt="Fast Food Analytics" style={{width:'100%',height:'auto',display:'block'}}/>
}
function ThumbFoxes() {
  return <img src="/rabbits-and-foxes-photo.png" alt="Rabbits and Foxes" style={{width:'100%',height:'auto',display:'block'}}/>
}

const PROJECTS = [
  { num:'01', title:'Credit Card Fraud Detection', category:'Machine Learning', desc:'Trained 6 ML models on 590k+ IEEE-CIS fraud transactions, with XGBoost achieving AUC 0.9075 (0.9195 on the public Kaggle leaderboard). I engineered 10+ features including card-level aggregations and amount deviation ratios, then built a stacking ensemble that improved fraud precision to 0.67 vs. 0.26 for standalone XGBoost.', tags:['XGBoost','Scikit-Learn','Kaggle'], github:'#', Thumb:ThumbFraud },
  { num:'02', title:'Co-opScout', category:'Full Stack', desc:'Built a Python/Selenium scraper to extract 1000+ co-op postings from NUworks, then engineered a Flask REST API with a content-based recommendation engine using TF-IDF vectorization and cosine similarity. The backend is backed by PostgreSQL via Supabase, with structured cleaning pipelines and duplicate prevention.', tags:['Flask','PostgreSQL','NLP'], github:'https://github.com/crbridget/coopscout', Thumb:ThumbCoopScout },
  { num:'03', title:'MLS Market Intelligence', category:'Data Visualization',
    desc:'Built during my Data Analyst Internship at IDX Exchange, ingesting 12+ months of CoreLogic Trestle MLS transaction data and engineering 7+ market metrics including price-to-list ratio, price per sq ft, and days on market. Applied IQR outlier detection and enriched the dataset with live FRED mortgage rates before building 6 Tableau dashboards covering market trends, agent rankings, and zip-code heat maps. Delivered a final 1-page San Francisco market intelligence report summarizing key housing market findings.',
    tags:['Python','Pandas','Tableau','CoreLogic API','FRED'],
    github:'https://github.com/crbridget/IDX-Exchange',
    links:[
      { label:'GitHub', url:'https://github.com/crbridget/IDX-Exchange' },
      { label:'Market Analysis Dashboard', url:'https://public.tableau.com/app/profile/bridget.crampton/viz/market_analysis_17798558681020/AffordabilityPulsePricevs_MortgageRate' },
      { label:'Competitive Analysis Dashboard', url:'https://public.tableau.com/app/profile/bridget.crampton/viz/competitive_analysis_17804649003350/PriceSalesHeatMaps' },
      { label:'SF Market Intelligence Report', url:'/San_Francisco_Market_Intelligence.pdf' },
    ],
    Thumb:ThumbTableau },
  { num:'04', title:'Codebase Graph Visualizer', category:'Software Engineering', desc:'Built as a member of a software product team at Forge, an engineering club at Northeastern, this project uses Tree-sitter to parse codebases into ASTs and extract 10+ structural metrics per file — cyclomatic complexity, class hierarchies, and dependency relationships. The structured graph data powers a 3D interactive visualization of codebase architecture.', tags:['Tree-sitter','AST'], github:'#', Thumb:ThumbAST },
  { num:'05', title:'Generate Application Portal', category:'Full Stack', desc:'Built a full-stack application portal for Generate, Northeastern\'s product development studio, using React, Vite, Clerk, and Supabase. The system supports role-based authentication, configurable application forms, and an admin review dashboard for managing submissions.', tags:['React','Supabase','Clerk'], github:'#', Thumb:ThumbGenerate },
  { num:'06', title:'Constitutional Evolution', category:'NLP', desc:'Developed a Python NLP pipeline to analyze linguistic patterns and thematic similarities across 17 national constitutions spanning 1787 to 1997. Used TF-IDF vectorization and cosine similarity to generate a constitutional similarity matrix, visualized as an interactive heatmap.', tags:['Python','NLP','Matplotlib'], github:'https://github.com/crbridget/constitutional-evolution-nlp', Thumb:ThumbConstitution },
  { num:'07', title:'The Geography of Disaster', category:'Data Visualization', desc:'Built an interactive data visualization analyzing FEMA disaster relief funding across the United States, surfacing geographic patterns and funding disparities over time. The project explores which regions receive the most federal aid and how disaster response trends have shifted across decades.', tags:['D3.js','FEMA','Python'], github:'https://github.com/crbridget/geography-of-disaster', Thumb:ThumbFEMA },
  { num:'08', title:'TA Assignment Optimizer', category:'Software Engineering', desc:'Designed an evolutionary computing solution to the TA assignment problem, optimizing pairings between teaching assistants and course sections across competing constraints and preferences. The algorithm uses selection, crossover, and mutation to iteratively improve assignment quality over generations.', tags:['Python','Evolutionary Alg.'], github:'https://github.com/crbridget/TA-Assignment-Optimizer', Thumb:ThumbTA },
  { num:'09', title:'Spotify Insight', category:'Machine Learning', desc:'Analyzed Spotify song data by engineering features from song titles and audio attributes, then applied TextBlob sentiment analysis to classify emotional tone. Used K-Means clustering to group songs by sentiment and built Linear Regression, KNN, and Random Forest models to predict song popularity.', tags:['Scikit-Learn','K-Means','NLP'], github:'https://github.com/crbridget/spotify-insight', Thumb:ThumbSpotify },
  { num:'10', title:'Vishing Message Analysis', category:'NLP', desc:'Preprocessed and cleaned a dataset of vishing (voice phishing) messages through language filtering, stopword removal, and normalization. Applied TextBlob sentiment analysis and visualized patterns using Seaborn and WordCloud to identify linguistic characteristics common in phishing attempts.', tags:['TextBlob','NLP','Seaborn'], github:'https://github.com/crbridget/vishing-text-analysis', Thumb:ThumbVishing },
  { num:'11', title:'Artist Sankey', category:'Data Visualization', desc:'Loaded, cleaned, and aggregated MoMA artist data to build a multi-layer Sankey diagram showing the flow between artist birth decade, nationality, and gender. Used Pandas for data preparation and a custom Sankey library to render the visualization, filtering to combos with 20+ artists for clarity.', tags:['Pandas','Sankey','Matplotlib'], github:'#', Thumb:ThumbSankey },
  { num:'12', title:'Fast Food Analytics', category:'Machine Learning', desc:'Built a Discrete Random Variable (DRV) class from scratch to model the probability distribution of a fast food restaurant\'s annual income. The class supports arithmetic operations between distributions, computes expected value (E[X] ≈ $122k), and plots both the PMF and cumulative distribution function.', tags:['Python','Probability','Seaborn'], github:'#', Thumb:ThumbDRV },
  { num:'13', title:'Rabbits & Foxes', category:'Software Engineering', desc:'Implemented an animated predator-prey ecosystem simulation using NumPy arrays and Matplotlib\'s animation library, modeling rabbits, foxes, and grass across a 200x200 grid. Complex oscillating population dynamics emerge from simple rules — rabbits starve without grass, foxes starve without rabbits — over 4000+ simulated generations.', tags:['NumPy','Matplotlib','Animation'], github:'#', Thumb:ThumbFoxes },
]
const CATEGORIES = ['All','Machine Learning','Data Visualization','NLP','Full Stack','Software Engineering']

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
          <div className="landing-year">2026</div>
          <div className="landing-name">Bridget Crampton</div>
        </div>
        <div className="landing-label">DATA SCIENCE<br/>NORTHEASTERN UNIVERSITY</div>
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

// ── 3. Typing effect hook ──────────────────────────────────────
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
          <a href="/Bridget-Crampton-Resume.pdf" target="_blank" style={{
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
            <p>Hi, I'm Bridget. I'm a data science student at Northeastern. I believe data is one of the most powerful tools we have for understanding the world and making it better for the people in it. I build with intention and I want people to feel the impact of what I make.</p>
            <p style={{marginTop:'12px'}}>Right now I'm building my foundation through real estate analysis, machine learning, and business intelligence work at Klaviyo.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Bento grid view ───────────────────────────────────────────
const BENTO_LAYOUT = [
  { num:'01', span:'bento-wide', featured:true },
  { num:'02', span:'bento-tall', featured:false },
  { num:'03', span:'bento-sq',   featured:false },
  { num:'04', span:'bento-sq',   featured:false },
]

function BentoCard({ p, onOpen, index }) {
  const Thumb = p.Thumb
  return (
    <div className="bento-card" style={{'--i': index}} onClick={() => onOpen(p)}>
      <div className="bento-thumb">{Thumb && <Thumb/>}</div>
      <div className="bento-title-bar">
        <div className="bento-cat">{p.category}</div>
        <div className="bento-name">{p.title}</div>
      </div>
    </div>
  )
}

function ProjectModal({ p, onClose }) {
  const Thumb = p.Thumb
  return (
    <div className="proj-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="proj-modal-v2">

        {/* Colored header with file path + big title */}
        <div className="proj-modal-header">
          <div className="proj-modal-filepath">
            {p.title.toLowerCase().replace(/ /g,'-')}.jsx
          </div>
          <div className="proj-modal-h-title">{p.title}</div>
          <button className="proj-modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="proj-modal-v2-body">

          {/* Metadata row */}
          <div className="proj-modal-meta">
            <div className="proj-modal-meta-item">
              <div className="proj-modal-meta-label">CATEGORY</div>
              <div className="proj-modal-meta-value">{p.category}</div>
            </div>
            <div className="proj-modal-meta-item">
              <div className="proj-modal-meta-label">TOOLS</div>
              <div className="proj-modal-meta-value">{p.tags.join(' · ')}</div>
            </div>
            {Thumb && (
              <div className="proj-modal-meta-item proj-modal-thumb-inline">
                <div className="proj-modal-meta-label">PREVIEW</div>
                <div className="proj-modal-thumb-sm"><Thumb/></div>
              </div>
            )}
          </div>

          <div className="proj-modal-divider"/>

          {/* Description */}
          <div className="proj-modal-v2-desc">{p.desc}</div>

          {/* Buttons */}
          <div className="proj-modal-btns">
            {p.links ? (
              p.links.map(l => (
                <a key={l.label} href={l.url} target="_blank" className="proj-modal-pill">
                  {l.label} →
                </a>
              ))
            ) : p.github !== '#' ? (
              <a href={p.github} target="_blank" className="proj-modal-pill">
                GitHub →
              </a>
            ) : (
              <span className="proj-modal-pill proj-modal-pill-disabled">Private repo</span>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

function BentoView({ projects }) {
  const [selected, setSelected] = useState(null)
  const cols = [0,1,2,3].map(ci => projects.filter((_,i) => i%4===ci))
  return (
    <>
      {/* 6. key changes with projects to retrigger stagger animation on filter */}
      <div className="bento-grid" key={projects.map(p=>p.num).join(',')}>
        {cols.map((col, ci) => (
          <div key={ci} className="bento-col">
            {col.map((p, i) => <BentoCard key={p.title} p={p} index={i} onOpen={setSelected}/>)}
          </div>
        ))}
      </div>
      {selected && <ProjectModal p={selected} onClose={() => setSelected(null)}/>}
    </>
  )
}
// ── end BentoView


// ── DataFrame table view ──────────────────────────────────────
function TableView({ projects }) {
  const [sort, setSort] = useState(null)
  const [dir, setDir] = useState(1)
  const [expanded, setExpanded] = useState(null)

  const sorted = [...projects].sort((a,b) => {
    if (!sort) return 0
    return a[sort] < b[sort] ? -dir : dir
  })

  function toggleSort(col) {
    if (sort === col) setDir(d => -d)
    else { setSort(col); setDir(1) }
  }

  const cols = [
    { key:'num',      label:'idx',      w:'52px'  },
    { key:'title',    label:'project',  w:'auto'  },
    { key:'category', label:'category', w:'200px' },
    { key:'tags',     label:'tools',    w:'200px' },
  ]

  return (
    <div className="df-wrap">
      <div className="df-header">
        <span className="df-shape">DataFrame({projects.length} rows × {cols.length} cols)</span>
      </div>
      <div className="df-table-wrap">
        <table className="df-table">
          <thead>
            <tr>
              {cols.map(c=>(
                <th key={c.key} style={{width:c.w}} onClick={()=>toggleSort(c.key)}>
                  {c.label}
                  {sort===c.key && <span className="df-sort">{dir>0?' ↑':' ↓'}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((p,i)=>(
              <>
                <tr key={p.title}
                  className={`df-row ${expanded===p.title?'df-row-active':''} ${i%2===0?'df-row-even':''}`}
                  onClick={()=>setExpanded(expanded===p.title?null:p.title)}>
                  <td className="df-idx">{i}</td>
                  <td className="df-project">
                    <span className="df-num">{p.num}</span> {p.title}
                  </td>
                  <td><span className="df-cat-pill">{p.category}</span></td>
                  <td className="df-tools">{p.tags.join(', ')}</td>
                </tr>
                {expanded===p.title && (
                  <tr key={`${p.title}-expand`} className="df-expanded-row">
                    <td colSpan={4}>
                      <div className="df-expanded">
                        <div className="df-expanded-thumb">
                          {p.Thumb && <p.Thumb/>}
                        </div>
                        <div className="df-expanded-info">
                          <div className="df-expanded-title">{p.title}</div>
                          <div className="df-expanded-desc">{p.desc}</div>
                          <div className="df-expanded-meta">
                            <span><b>category:</b> {p.category}</span>
                            <span><b>tools:</b> {p.tags.join(' · ')}</span>
                          </div>
                          {p.github !== '#' && (
                            <a href={p.github} target="_blank" className="proj-link" style={{marginTop:8,display:'inline-flex'}}>
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                              view source
                            </a>
                          )}
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

function ProjectsPage() {
  const [cat, setCat] = useState('All')
  const [view, setView] = useState('bento') // 'bento' | 'table'
  const pageRef = useRef(null)

  function changeCategory(c) {
    setCat(c)
    requestAnimationFrame(() => {
      const container = document.querySelector('.scroll-page')
      const section = document.getElementById('projects')
      if (!container || !section) return
      const sectionTop = section.getBoundingClientRect().top
      const containerTop = container.getBoundingClientRect().top
      const sectionH = section.clientHeight
      const containerH = container.clientHeight
      // center: offset to put section midpoint at viewport midpoint
      const offset = sectionTop - containerTop + container.scrollTop
        - containerH / 2
        + Math.min(sectionH, containerH) / 2
      container.scrollTo({ top: offset, behavior: 'smooth' })
    })
  }
  const filtered = PROJECTS.filter(p => cat==='All' || p.category===cat)

  return (
    <div className="projects-page" ref={pageRef}>
      <div className="projects-header">
        <div className="projects-title">PROJECTS</div>
        <div className="projects-count">{filtered.length} projects · welcome to my brain</div>
        {/* view toggle */}
        <div className="view-toggle">
          <button className={`view-btn ${view==='bento'?'active':''}`} onClick={()=>setView('bento')} title="Bento grid">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <rect x="0" y="0" width="6" height="10" rx="1"/><rect x="8" y="0" width="8" height="6" rx="1"/>
              <rect x="0" y="12" width="16" height="4" rx="1"/><rect x="8" y="8" width="8" height="2" rx="1"/>
            </svg>
          </button>
          <button className={`view-btn ${view==='table'?'active':''}`} onClick={()=>setView('table')} title="DataFrame">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <rect x="0" y="0" width="16" height="3" rx="1"/><rect x="0" y="5" width="16" height="2" rx="0.5" opacity="0.6"/>
              <rect x="0" y="9" width="16" height="2" rx="0.5" opacity="0.6"/><rect x="0" y="13" width="16" height="2" rx="0.5" opacity="0.6"/>
              <rect x="0" y="0" width="3" height="16" rx="0.5" opacity="0.3"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="projects-filter">
        {CATEGORIES.map(c => (
          <button key={c} className={`filter-btn ${cat===c?'active':''}`} onClick={()=>changeCategory(c)}>
            {c.toUpperCase()}
          </button>
        ))}
      </div>
      {view === 'bento' ? <BentoView projects={filtered}/> : <TableView projects={filtered}/>}
    </div>
  )
}

// ── App ────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState('landing')
  const scrollRef = useRef(null)

  function scrollTo(id) {
    const container = scrollRef.current
    const section = document.getElementById(id)
    if (!container || !section) return
    const target = section.getBoundingClientRect().top
                 - container.getBoundingClientRect().top
                 + container.scrollTop
    container.scrollTo({ top: target, behavior: 'smooth' })
  }

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return


    const sections = ['landing','profile','projects']
    const observers = sections.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { root: container, threshold: 0.4 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  return (
    <div className="shell">
      <nav className="topnav">
        <div className="nav-logo" style={{cursor:'pointer'}} onClick={()=>scrollTo('landing')}>BC</div>
        <div className="nav-links">
          <button className={`nav-btn ${active==='landing'?'active':''}`} onClick={()=>scrollTo('landing')}>home</button>
          <button className={`nav-btn ${active==='profile'?'active':''}`} onClick={()=>scrollTo('profile')}>profile</button>
          <button className={`nav-btn ${active==='projects'?'active':''}`} onClick={()=>scrollTo('projects')}>projects</button>
        </div>
        <div className="nav-social">
          <a href="https://github.com/crbridget" target="_blank" title="GitHub"><GithubIcon size={14}/></a>
          <a href="https://www.linkedin.com/in/bridget-crampton-7342692a7/" target="_blank" title="LinkedIn"><LinkedinIcon size={14}/></a>
          <a href="https://public.tableau.com/app/profile/bridget.crampton/vizzes" target="_blank" title="Tableau"><TableauIcon size={14}/></a>
        </div>
      </nav>
      <div className="page scroll-page" ref={scrollRef}>
        <section id="landing"><LandingPage goTo={scrollTo}/></section>
        <section id="profile"><ProfilePage/></section>
        <section id="projects"><ProjectsPage/></section>
      </div>
    </div>
  )
}

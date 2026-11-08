import TaGridThumb from '../components/thumbs/TaGridThumb.jsx'

const img = (file, alt) => ({ src: `/images/projects/${file}`, alt })

// Each project shows either an `image` or a custom `Thumb` component.
// `github` is omitted for private repos; `links` overrides the default GitHub button.
export const PROJECTS = [
  {
    num: '01',
    title: 'Credit Card Fraud Detection',
    category: 'Machine Learning',
    desc: 'Final project for DS4400 Machine Learning at Northeastern. Trained 6 ML models on 590k+ IEEE-CIS fraud transactions, with XGBoost achieving AUC 0.9075 (0.9195 on the public Kaggle leaderboard). Engineered 10+ features including card-level aggregations and amount deviation ratios, then built a stacking ensemble that improved fraud precision to 0.67 vs. 0.26 for standalone XGBoost.',
    tags: ['XGBoost', 'Scikit-Learn', 'Kaggle'],
    github: 'https://github.com/crbridget/credit-card-fraud-detection',
    links: [
      { label: 'GitHub', url: 'https://github.com/crbridget/credit-card-fraud-detection' },
      { label: 'Final Report', url: '/docs/DS4440_Final_Project_Report.pdf' },
    ],
    image: img('model-comparison.png', 'Model Comparison'),
  },
  {
    num: '02',
    title: 'Internship Tracker',
    category: 'Full Stack',
    desc: "Personal project that tracks 11,800+ job postings from 63 companies. A GitHub Actions poller checks Greenhouse and Lever every 30 minutes and stores postings in Postgres (Supabase). I used MiniLM sentence embeddings to rank ~250 internships against my target roles. To match full descriptions to a resume, I split each one into ~150-word chunks to fit within the model's 256-token limit. Built with Flask and React/TypeScript.",
    tags: ['Python', 'Flask', 'React', 'TypeScript', 'PostgreSQL', 'Sentence Embeddings'],
    github: 'https://github.com/crbridget/internship-tracker',
    links: [
      { label: 'Live App', url: 'https://internship-tracker-bety.vercel.app/' },
      { label: 'GitHub', url: 'https://github.com/crbridget/internship-tracker' },
    ],
    fit: 'contain',
    image: img(
      'internship-tracker.png',
      'Internship Tracker Find Roles view with internships ranked by match score and an application pipeline',
    ),
  },
  {
    num: '03',
    title: 'MLS Market Intelligence',
    category: 'Data Visualization',
    desc: 'Built during my Data Analyst Internship at IDX Exchange, ingesting 12+ months of CoreLogic Trestle MLS transaction data and engineering 7+ market metrics including price-to-list ratio, price per sq ft, and days on market. Applied IQR outlier detection and enriched the dataset with live FRED mortgage rates before building 6 Tableau dashboards covering market trends, agent rankings, and zip-code heat maps. Delivered a final 1-page San Francisco market intelligence report summarizing key housing market findings.',
    tags: ['Python', 'Pandas', 'Tableau', 'CoreLogic API', 'FRED'],
    github: 'https://github.com/crbridget/IDX-Exchange',
    links: [
      { label: 'GitHub', url: 'https://github.com/crbridget/IDX-Exchange' },
      {
        label: 'Market Analysis Dashboard',
        url: 'https://public.tableau.com/app/profile/bridget.crampton/viz/market_analysis_17798558681020/AffordabilityPulsePricevs_MortgageRate',
      },
      {
        label: 'Competitive Analysis Dashboard',
        url: 'https://public.tableau.com/app/profile/bridget.crampton/viz/competitive_analysis_17804649003350/PriceSalesHeatMaps',
      },
      {
        label: 'SF Market Intelligence Report',
        url: '/docs/San_Francisco_Market_Intelligence.pdf',
      },
    ],
    image: img('heatmap.png', 'Price & Sales Heat Maps'),
  },
  {
    num: '04',
    title: 'Codebase Graph Visualizer',
    category: 'Software Engineering',
    desc: 'Built as a member of a software product team at Forge, an engineering club at Northeastern, this project uses Tree-sitter to parse codebases into ASTs and extract 10+ structural metrics per file — cyclomatic complexity, class hierarchies, and dependency relationships. The structured graph data powers a 3D interactive visualization of codebase architecture.',
    tags: ['Tree-sitter', 'AST'],
    links: [{ label: 'Forge Website', url: 'https://www.forgenu.com/home' }],
    image: img('codescape-photo.png', 'Codescape'),
  },
  {
    num: '05',
    title: 'Constitutional Evolution',
    category: 'NLP',
    desc: 'Developed a Python NLP pipeline to analyze linguistic patterns and thematic similarities across 17 national constitutions spanning 1787 to 1997. Used TF-IDF vectorization and cosine similarity to generate a constitutional similarity matrix, visualized as an interactive heatmap.',
    tags: ['Python', 'NLP', 'Matplotlib'],
    github: 'https://github.com/crbridget/constitutional-evolution-nlp',
    image: img('constitutional-evolution-photo.png', 'Constitutional Evolution'),
  },
  {
    num: '06',
    title: 'TA Assignment Optimizer',
    category: 'Software Engineering',
    desc: 'Designed an evolutionary computing solution to the TA assignment problem, optimizing pairings between teaching assistants and course sections across competing constraints and preferences. The algorithm uses selection, crossover, and mutation to iteratively improve assignment quality over generations.',
    tags: ['Python', 'Evolutionary Alg.'],
    github: 'https://github.com/crbridget/TA-Assignment-Optimizer',
    Thumb: TaGridThumb,
  },
]

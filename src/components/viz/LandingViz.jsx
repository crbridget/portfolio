// Decorative, animated data-viz backdrop behind the landing title.
const BARS = [55, 72, 41, 88, 63, 95, 50, 78, 34, 82, 60, 91]
const SPARK_POINTS = BARS.map((v, i) => `${110 + i * 70},${510 - v}`).join(' ')
const SPARK_LENGTH = 900

const NODES = [
  [500, 300],
  [380, 200],
  [620, 200],
  [480, 440],
  [640, 380],
  [360, 380],
  [260, 120],
  [740, 120],
]
const EDGES = [
  [500, 300, 380, 200],
  [500, 300, 620, 200],
  [500, 300, 480, 440],
  [500, 300, 640, 380],
  [500, 300, 360, 380],
  [380, 200, 260, 120],
  [620, 200, 740, 120],
]

const KEYFRAMES = `
  @keyframes drawLine{from{stroke-dashoffset:1000}to{stroke-dashoffset:0}}
  @keyframes nodeFade{from{opacity:0}to{opacity:1}}
  @keyframes edgeDraw{from{stroke-dashoffset:300}to{stroke-dashoffset:0}}
`

export default function LandingViz() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <style>{KEYFRAMES}</style>
      </defs>

      {/* bar chart */}
      {BARS.map((h, i) => (
        <rect
          key={i}
          x={300 + i * 36}
          y={560 - h * 0.7}
          width="28"
          height={h * 0.7}
          rx="3"
          fill="#4A78A8"
          opacity={0.06 + i * 0.007}
          style={{ animation: `nodeFade 0.4s ease ${1.2 + i * 0.05}s both` }}
        />
      ))}

      {/* self-drawing sparkline */}
      <polyline
        points={SPARK_POINTS}
        fill="none"
        stroke="#2F4156"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.07"
        strokeDasharray={SPARK_LENGTH}
        strokeDashoffset={SPARK_LENGTH}
        style={{ animation: 'drawLine 2.2s cubic-bezier(0.4,0,0.2,1) 0.6s forwards' }}
      />

      {/* network edges */}
      {EDGES.map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#4A78A8"
          strokeWidth="0.8"
          opacity="0.11"
          strokeDasharray="300"
          strokeDashoffset="300"
          style={{ animation: `edgeDraw 0.6s ease ${0.5 + i * 0.12}s forwards` }}
        />
      ))}

      {/* network nodes */}
      {NODES.map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={i === 0 ? 6 : 4}
          fill="#4A78A8"
          opacity={i === 0 ? 0.14 : 0.09}
          style={{ animation: `nodeFade 0.4s ease ${0.4 + i * 0.1}s both` }}
        />
      ))}

      {/* dashed arcs */}
      <circle
        cx="500"
        cy="300"
        r="160"
        fill="none"
        stroke="#2F4156"
        strokeWidth="0.6"
        opacity="0.06"
        strokeDasharray="6 10"
        style={{ animation: 'nodeFade 1s ease 1.4s both' }}
      />
      <circle
        cx="500"
        cy="300"
        r="240"
        fill="none"
        stroke="#4A78A8"
        strokeWidth="0.6"
        opacity="0.05"
        strokeDasharray="4 14"
        style={{ animation: 'nodeFade 1s ease 1.6s both' }}
      />
    </svg>
  )
}

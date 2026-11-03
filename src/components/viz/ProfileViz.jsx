// Decorative chart-like backdrop behind the profile section.
const SCATTER = Array.from({ length: 28 }, (_, i) => ({
  x: 30 + Math.sin(i * 0.9) * 140 + i * 4,
  y: 50 + Math.cos(i * 0.6) * 90 + i * 1.5,
  r: 2 + (i % 4) * 1.8,
  op: 0.06 + (i % 4) * 0.04,
}))
const NODES = [
  [820, 180],
  [740, 110],
  [910, 120],
  [755, 265],
  [895, 270],
  [820, 330],
  [695, 200],
  [945, 195],
]
const EDGES = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [1, 6],
  [2, 7],
  [3, 5],
  [4, 5],
  [1, 3],
  [2, 4],
]
const BARS = [45, 68, 35, 82, 52, 90, 44, 72, 58, 84, 38, 66, 94, 55, 76]
const SPARK = [28, 42, 35, 56, 48, 66, 60, 76, 70, 86, 80, 94].map((v, i) => [
  80 + i * 76,
  390 - v * 1.9,
])
const SPARK_POINTS = SPARK.map(([x, y]) => `${x},${y}`).join(' ')

export default function ProfileViz() {
  return (
    <svg
      className="profile-viz"
      width="100%"
      height="100%"
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* subtle grid */}
      {[120, 240, 360, 480].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="1000"
          y2={y}
          stroke="#4A78A8"
          strokeWidth="0.4"
          opacity="0.07"
        />
      ))}
      {[200, 400, 600, 800].map((x) => (
        <line
          key={x}
          x1={x}
          y1="0"
          x2={x}
          y2="600"
          stroke="#4A78A8"
          strokeWidth="0.4"
          opacity="0.07"
        />
      ))}

      {/* scatter — top left, mirrored bottom right */}
      {SCATTER.map((d, i) => (
        <circle key={`a${i}`} cx={d.x} cy={d.y} r={d.r} fill="#4A78A8" opacity={d.op} />
      ))}
      {SCATTER.map((d, i) => (
        <circle
          key={`b${i}`}
          cx={1000 - d.x * 0.85}
          cy={600 - d.y * 0.75}
          r={d.r * 0.9}
          fill="#2F4156"
          opacity={d.op * 0.8}
        />
      ))}

      {/* network — right */}
      {EDGES.map(([a, b], i) => (
        <line
          key={i}
          x1={NODES[a][0]}
          y1={NODES[a][1]}
          x2={NODES[b][0]}
          y2={NODES[b][1]}
          stroke="#4A78A8"
          strokeWidth="1.5"
          opacity="0.1"
        />
      ))}
      {NODES.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i === 0 ? 11 : 6}
          fill="#4A78A8"
          opacity={i === 0 ? 0.14 : 0.09}
        />
      ))}

      {/* sparkline */}
      <polyline
        points={SPARK_POINTS}
        fill="none"
        stroke="#2F4156"
        strokeWidth="2"
        opacity="0.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {SPARK.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="#4A78A8" opacity="0.1" />
      ))}

      {/* bar chart — bottom */}
      {BARS.map((h, i) => (
        <rect
          key={i}
          x={275 + i * 31}
          y={585 - h * 0.9}
          width="24"
          height={h * 0.9}
          rx="2"
          fill="#4A78A8"
          opacity={0.07 + i * 0.007}
        />
      ))}

      {/* dashed circles */}
      <circle
        cx="160"
        cy="300"
        r="200"
        fill="none"
        stroke="#4A78A8"
        strokeWidth="0.8"
        opacity="0.08"
        strokeDasharray="5 14"
      />
      <circle
        cx="840"
        cy="300"
        r="160"
        fill="none"
        stroke="#2F4156"
        strokeWidth="0.8"
        opacity="0.06"
        strokeDasharray="3 12"
      />

      {/* left axis */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <line
            x1="0"
            y1={100 + i * 82}
            x2="14"
            y2={100 + i * 82}
            stroke="#4A78A8"
            strokeWidth="1"
            opacity="0.2"
          />
          <text
            x="20"
            y={104 + i * 82}
            fontSize="8"
            fill="#9A9888"
            opacity="0.45"
            fontFamily="monospace"
          >
            {100 - i * 20}
          </text>
        </g>
      ))}
      <line x1="0" y1="100" x2="0" y2="590" stroke="#4A78A8" strokeWidth="0.8" opacity="0.15" />

      {/* bottom axis */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <g key={i}>
          <line
            x1={100 + i * 135}
            y1="597"
            x2={100 + i * 135}
            y2="585"
            stroke="#4A78A8"
            strokeWidth="1"
            opacity="0.2"
          />
          <text
            x={100 + i * 135}
            y="580"
            fontSize="8"
            fill="#9A9888"
            opacity="0.45"
            fontFamily="monospace"
            textAnchor="middle"
          >
            {i * 20}
          </text>
        </g>
      ))}
      <line x1="100" y1="597" x2="955" y2="597" stroke="#4A78A8" strokeWidth="0.8" opacity="0.15" />
    </svg>
  )
}

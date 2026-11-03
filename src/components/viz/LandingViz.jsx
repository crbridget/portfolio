// Fine-line data drawing for the hero's right column: outlined bars, a rising
// sparkline and a small layered neural network. Stroke widths are in viewBox units (about 2x) so
// they render at roughly 1.5-1.8px at the column's size. Every stroke uses pathLength="1" so the hero can
// draw it in with stroke-dashoffset; the default (CSS) state is fully drawn.

const BASELINE = 860
const BAR_W = 36
const BAR_PITCH = 58
const BAR_X0 = 122
const BAR_HEIGHTS = [150, 230, 190, 300, 255, 365, 320, 425, 380]
const ACCENT_BAR = 7

const SPARK = [
  [100, 610],
  [170, 565],
  [240, 590],
  [310, 505],
  [380, 525],
  [450, 440],
  [520, 462],
  [590, 372],
  [650, 338],
]

// A small feed-forward network (3 → 4 → 3 → 2) drawn above the chart.
const LAYERS = [
  { x: 330, ys: [125, 195, 265] },
  { x: 435, ys: [90, 160, 230, 300] },
  { x: 540, ys: [125, 195, 265] },
  { x: 640, ys: [160, 230] },
]
const NODES = LAYERS.flatMap((l) => l.ys.map((y) => [l.x, y]))
const layerStart = (li) => LAYERS.slice(0, li).reduce((n, l) => n + l.ys.length, 0)
const EDGES = LAYERS.slice(0, -1).flatMap((l, li) =>
  l.ys.flatMap((_, a) =>
    LAYERS[li + 1].ys.map((_, b) => [layerStart(li) + a, layerStart(li + 1) + b]),
  ),
)
// One highlighted path through the network, input to output.
const ACCENT_PATH = [1, 5, 8, 10]
const isAccentEdge = ([a, b]) => ACCENT_PATH.some((n, i) => n === a && ACCENT_PATH[i + 1] === b)
const HUB = ACCENT_PATH.at(-1)

// Smooth a point list into a cubic path (midpoint control scheme).
function smoothPath(points) {
  let d = `M${points[0][0]},${points[0][1]}`
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1]
    const [x1, y1] = points[i]
    const mx = (x0 + x1) / 2
    d += ` C${mx},${y0} ${mx},${y1} ${x1},${y1}`
  }
  return d
}

const SPARK_D = smoothPath(SPARK)
const SPARK_PEAK_D = smoothPath(SPARK.slice(-3))

export default function LandingViz() {
  return (
    <svg
      className="landing-viz-svg"
      viewBox="0 0 700 900"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* network edges */}
        {EDGES.map((edge, i) => {
          const [a, b] = edge
          const accent = isAccentEdge(edge)
          return (
            <line
              key={`e${i}`}
              className="viz-edge"
              x1={NODES[a][0]}
              y1={NODES[a][1]}
              x2={NODES[b][0]}
              y2={NODES[b][1]}
              pathLength="1"
              stroke={accent ? 'var(--blue)' : 'var(--navy)'}
              strokeWidth={accent ? 3 : 1.8}
              strokeOpacity={accent ? 1 : 0.3}
            />
          )
        })}

        {/* baseline */}
        <path
          className="viz-draw"
          d={`M96,${BASELINE} H664`}
          pathLength="1"
          stroke="var(--navy)"
          strokeWidth="3"
        />

        {/* outlined bars, open at the baseline */}
        {BAR_HEIGHTS.map((h, i) => {
          const x = BAR_X0 + i * BAR_PITCH
          const top = BASELINE - h
          return (
            <path
              key={`b${i}`}
              className="viz-draw viz-bar"
              d={`M${x},${BASELINE} V${top + 4} Q${x},${top} ${x + 4},${top} H${x + BAR_W - 4} Q${x + BAR_W},${top} ${x + BAR_W},${top + 4} V${BASELINE}`}
              pathLength="1"
              stroke={i === ACCENT_BAR ? 'var(--blue)' : 'var(--navy)'}
              strokeWidth={i === ACCENT_BAR ? 3.4 : 3}
              strokeOpacity={i === ACCENT_BAR ? 1 : 0.85}
            />
          )
        })}

        {/* sparkline, with its rising peak segment in the accent */}
        <path
          className="viz-draw viz-spark"
          d={SPARK_D}
          pathLength="1"
          stroke="var(--navy)"
          strokeWidth="3.4"
        />
        <path
          className="viz-draw viz-spark"
          d={SPARK_PEAK_D}
          pathLength="1"
          stroke="var(--blue)"
          strokeWidth="3.4"
        />
      </g>

      {/* node dots */}
      {NODES.map(([cx, cy], i) => (
        <circle
          key={`n${i}`}
          className="viz-node"
          cx={cx}
          cy={cy}
          r={i === HUB ? 9 : 7}
          fill={ACCENT_PATH.includes(i) ? 'var(--blue)' : 'var(--navy)'}
        />
      ))}
      <circle
        className="viz-node"
        cx={SPARK.at(-1)[0]}
        cy={SPARK.at(-1)[1]}
        r="7"
        fill="var(--blue)"
      />
    </svg>
  )
}

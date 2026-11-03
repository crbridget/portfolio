const GRID = [
  [1, 0, 1, 0, 1],
  [0, 1, 0, 1, 0],
  [1, 1, 0, 0, 1],
  [0, 0, 1, 1, 0],
  [1, 0, 0, 1, 1],
]

// Illustrative assignment matrix used as the TA Assignment Optimizer thumbnail.
export default function TaGridThumb() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 220 140" preserveAspectRatio="xMidYMid slice">
      <rect width="220" height="140" fill="#EDE8E3" />
      {GRID.map((row, r) =>
        row.map((on, c) => (
          <rect
            key={`${r}-${c}`}
            x={18 + c * 38}
            y={8 + r * 26}
            width="34"
            height="22"
            rx="3"
            fill={on ? '#4A78A8' : '#E8E0D4'}
            opacity={on ? 0.7 : 0.4}
          />
        )),
      )}
    </svg>
  )
}

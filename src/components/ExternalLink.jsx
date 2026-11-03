// Anchor that opens in a new tab safely.
export default function ExternalLink({ children, ...props }) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  )
}

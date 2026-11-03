// Renders a project's custom thumbnail component, or its screenshot.
export default function ProjectThumb({ project }) {
  const { Thumb, image } = project
  if (Thumb) return <Thumb />
  if (image) return <img className="project-thumb-img" src={image.src} alt={image.alt} />
  return null
}

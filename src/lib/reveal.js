/** One-time scroll reveals. CSS keeps every element visible by default. */
export function installReferenceReveals(root = document) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)')
  const animations = new Map()
  const elements = [...root.querySelectorAll('[data-reveal]')]
  const release = (element) => {
    animations.get(element)?.cancel()
    animations.delete(element)
  }
  const finish = (element) => {
    element.dataset.revealPlayed = 'true'
    release(element)
  }
  const observer =
    typeof IntersectionObserver === 'function'
      ? new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) continue
              const element = entry.target
              observer.unobserve(element)
              element.dataset.revealPlayed = 'true'
              if (
                reduced.matches ||
                document.visibilityState === 'hidden' ||
                entry.boundingClientRect.bottom <= 0
              )
                finish(element)
              else animations.get(element)?.play()
            }
          },
          { threshold: 0, rootMargin: '0px 0px 96px 0px' },
        )
      : undefined
  // Cleanup restores visibility without marking unplayed elements as played,
  // so a remount (e.g. React StrictMode) can still reveal them once.
  const stop = () => {
    observer?.disconnect()
    elements.forEach(release)
  }
  const onPreference = () => {
    if (reduced.matches) {
      observer?.disconnect()
      elements.forEach(finish)
    }
  }
  reduced.addEventListener('change', onPreference)
  for (const element of elements) {
    if (element.dataset.revealPlayed === 'true') continue
    const rect = element.getBoundingClientRect()
    // Never hide already visible content after first paint or a restored scroll position.
    if (
      reduced.matches ||
      !observer ||
      !element.animate ||
      rect.top < innerHeight ||
      document.visibilityState === 'hidden'
    ) {
      finish(element)
      continue
    }
    const transform =
      element.dataset.reveal === 'media'
        ? 'translateY(20px) scale(1.025)'
        : element.dataset.reveal === 'slide'
          ? 'translateX(-12px)'
          : 'translateY(16px)'
    const delay = Math.min(Number(element.dataset.revealDelay) || 0, 240)
    const animation = element.animate(
      [
        { opacity: 0, transform },
        { opacity: 1, transform: 'none' },
      ],
      {
        duration: element.dataset.reveal === 'media' ? 560 : 520,
        delay,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        fill: 'backwards',
      },
    )
    animation.pause()
    animation.onfinish = () => finish(element)
    animations.set(element, animation)
    observer.observe(element)
  }
  return () => {
    stop()
    reduced.removeEventListener('change', onPreference)
  }
}

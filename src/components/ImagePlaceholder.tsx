import { useState } from 'react'
import type { Photo } from '../types/athlete'
import { assetUrl } from '../lib/content'

type Props = {
  photo?: Photo
  illustration?: string
  alt?: string
  className?: string
  eager?: boolean
  priority?: boolean
}

export function ImagePlaceholder({ photo, illustration, alt = '', className, eager, priority }: Props) {
  const [failed, setFailed] = useState<string[]>([])
  const path = photo?.src && !failed.includes(photo.src) ? photo.src : illustration
  if (!path || failed.includes(path)) {
    return alt ? <span className={`image-empty ${className ?? ''}`} role="img" aria-label={alt} /> : <span className={`image-empty ${className ?? ''}`} aria-hidden="true" />
  }
  return <img
    key={path}
    className={className}
    src={assetUrl(path)}
    alt={path === photo?.src ? photo.alt : alt}
    style={path === photo?.src && photo.position ? { objectPosition: photo.position } : undefined}
    loading={eager ? 'eager' : 'lazy'}
    fetchPriority={priority ? 'high' : undefined}
    decoding="async"
    onError={() => setFailed((paths) => [...paths, path])}
  />
}


export function assetUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return path
  return import.meta.env.BASE_URL + path.replace(/^\/+/, '')
}

export function externalUrl(value?: string) {
  if (!value) return undefined
  try {
    const url = new URL(value)
    if (url.protocol === 'https:' || url.protocol === 'http:') return url.href
  } catch {
    return undefined
  }
}

export function mailLink(email: string | undefined, subject: string, message: string) {
  const address = email?.trim()
  if (!address || !/^[\w.%+\-]+@[\w.-]+\.[a-z]{2,}$/i.test(address)) return undefined
  return `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
}

export function whatsappLink(number: string | undefined, message: string) {
  const digits = number?.replace(/[+()\s.-]/g, '')
  return digits && /^[1-9]\d{7,14}$/.test(digits)
    ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
    : undefined
}

export function todayInBrazil() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(new Date())
}

export function parseIsoDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  const date = new Date(`${value}T12:00:00Z`)
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value ? date : null
}

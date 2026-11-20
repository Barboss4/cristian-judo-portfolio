export type Photo = { src: string; alt: string; position?: string }
export type Placement = number | 'participação'
export type Result = {
  id: string; name: string; year?: number; location: string; division?: string
  placement: Placement; bracketSize?: number; featured?: boolean; photo?: Photo; competitionId?: string
}
export type Milestone = {
  id: string; year?: number; title: string; description: string; type: string; photo?: Photo
}
export type GalleryCategory = 'Competições' | 'Treinos' | 'Pódios' | 'Bastidores'
export type GalleryItem = {
  id: string; category: GalleryCategory; title: string; caption?: string
  photo?: Photo; illustration?: string; video?: { url: string; type: 'file' | 'embed' }
}
export type Competition = {
  id: string; name: string; date: string; city: string; state: string
  country: string; division: string; status: 'Confirmado' | 'Previsto' | 'Concluído'
}
export type Sponsor = { name: string; logo?: Photo; url?: string; category: string }
export type Athlete = {
  firstName: string; lastName: string; fullName: string; demo: boolean
  city: string; state: string; division: string; belt: string; beltColor: string
  nextDivision?: { year: number; label: string }
  age?: number; birthDate?: string; beganIn?: number; beganAtAge?: number; team?: string
  quote: string; bio: string[]; goals: string; portrait?: Photo
  hero: {
    primary?: Photo; alternate?: Photo
    radius: number; feather: number; smoothing: number; transition: number
  }
  results: Result[]; timeline: Milestone[]; gallery: GalleryItem[]
  events: Competition[]; sponsors: Sponsor[]; mediaKit?: string
  contact: {
    email?: string; commercialEmail?: string; whatsapp?: string; instagram?: string
    subject: string; message: string; socials: { label: string; url: string }[]
  }
  seo: { title: string; description: string; image?: string; siteUrl?: string }
}


export type DishCategory = 'Antipasti' | 'Primi' | 'Secondi' | 'Mare' | 'Pizza'

export interface Dish {
  id: string
  name: string
  category: DishCategory
  image: string
}

export interface StoryChapter {
  year: string
  title: string
  text: string
  image: string
  caption: string
}

export interface Space {
  id: string
  name: string
  kicker: string
  text: string
  image: string
  icon: string
}

export interface Service {
  title: string
  text: string
  icon: string
  image: string
}

export interface GiftCard {
  tier: 'Gold' | 'Silver' | 'Basic'
  price: number
  text: string
  tone: 'gold' | 'silver' | 'paper'
}

export interface Review {
  author: string
  meta: string
  text: string
  source: 'Google' | 'Tripadvisor'
}

export interface Platform {
  name: string
  rating: string
  count: string
  note: string
  icon: string
  href: string
}

export interface NavLink {
  label: string
  href: string
  image: string
}

export interface OpeningSlot {
  /** 0 = domenica … 6 = sabato */
  day: number
  label: string
  lunch: [string, string] | null
  dinner: [string, string] | null
}

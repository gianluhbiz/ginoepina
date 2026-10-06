import type { NavLink } from '../types'
import { dishPhoto, photos } from '../lib/images'

export const navLinks: NavLink[] = [
  { label: 'La storia', href: '#storia', image: photos.historic },
  { label: 'Pizzeria', href: '#pizzeria', image: photos.pizzaTop },
  { label: 'Cucina sannita', href: '#cucina', image: dishPhoto(6) },
  { label: 'Ambienti', href: '#ambienti', image: photos.sala },
  { label: 'Servizi', href: '#servizi', image: photos.enoteca },
  { label: 'Gift card', href: '#gift', image: dishPhoto(14) },
  { label: 'Dove siamo', href: '#contatti', image: photos.benevento },
]

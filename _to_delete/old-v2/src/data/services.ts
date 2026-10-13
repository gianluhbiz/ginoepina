import type { Service } from '../types'
import { dishPhoto, photos } from '../lib/images'

export const services: Service[] = [
  { title: 'Asporto', text: 'Le specialità sannite, comodamente a casa tua.', icon: 'ri-shopping-bag-3-line', image: dishPhoto(12) },
  { title: 'Catering', text: 'Per eventi e manifestazioni di ogni dimensione.', icon: 'ri-cake-3-line', image: dishPhoto(8) },
  { title: 'Caffetteria', text: 'Dolci colazioni, coffee break e aperitivi.', icon: 'ri-cup-line', image: photos.salaWide },
  { title: 'Degustazioni', text: 'Serate a tema e abbinamenti cibo‑vino.', icon: 'ri-goblet-2-line', image: photos.enoteca },
  { title: 'Sala meeting‑privé', text: 'Feste private, cerimonie e meeting aziendali.', icon: 'ri-presentation-line', image: photos.prive },
  { title: 'Personal chef', text: 'Il nostro cuoco, a domicilio.', icon: 'ri-knife-line', image: dishPhoto(30) },
  { title: 'Gruppi e agenzie', text: 'Menu tipici beneventani dedicati, per ogni budget.', icon: 'ri-bus-2-line', image: photos.benevento },
]

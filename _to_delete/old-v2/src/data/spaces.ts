import type { Space } from '../types'
import { photos } from '../lib/images'

export const spaces: Space[] = [
  {
    id: 'sala',
    name: 'Sala',
    kicker: 'Si respira aria di casa',
    text: 'Interamente in legno lamellare a forma di onda, tra arredi di legno e travi a vista. Il luogo ideale per intensi momenti di gusto.',
    image: photos.sala,
    icon: 'ri-restaurant-2-line',
  },
  {
    id: 'prive',
    name: 'Meeting / Privé',
    kicker: 'Il tuo evento, su misura',
    text: 'Tranquilla ed elegante: convegni, feste, pranzi e cene aziendali o private. Chiama per un preventivo.',
    image: photos.prive,
    icon: 'ri-team-line',
  },
  {
    id: 'enoteca',
    name: 'Enoteca',
    kicker: 'Legno, boiserie e grandi etichette',
    text: 'Vini sanniti, campani e nazionali, distillati ricercati e rum invecchiati. Per gli amanti del tabacco, una vetrina climatizzata con sigari italiani, cubani e dominicani.',
    image: photos.enoteca,
    icon: 'ri-goblet-line',
  },
  {
    id: 'dehors',
    name: 'Dehors giardino',
    kicker: 'Cena sotto le stelle',
    text: 'All’aria aperta, per un’esperienza gastronomica autentica nelle sere d’estate. Degustazioni e serate a tema.',
    image: photos.dehors,
    icon: 'ri-moon-clear-line',
  },
]

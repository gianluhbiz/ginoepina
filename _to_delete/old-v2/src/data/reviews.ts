import type { Platform, Review } from '../types'
import { site } from './site'

export const platforms: Platform[] = [
  {
    name: 'Google',
    rating: '4,1',
    count: '1.308 recensioni',
    note: 'Popolari: Parmigiana, Sua Maestà la Margherita',
    icon: 'ri-google-fill',
    href: site.mapsUrl,
  },
  {
    name: 'Tripadvisor',
    rating: '4,1',
    count: '659 recensioni',
    note: 'Travellers’ Choice · n. 7 su 218 a Benevento',
    icon: 'ri-star-smile-fill',
    href: site.socials[2].href,
  },
]

/** Estratti di recensioni pubbliche su Google Maps */
export const reviews: Review[] = [
  {
    author: 'Gengi Travel',
    meta: 'Local Guide',
    text: 'Bellissimo ristorante, con un proprietario gentilissimo che ti mette subito a tuo agio. Il locale è molto pulito e ben arredato con travi a vista.',
    source: 'Google',
  },
  {
    author: 'Sara',
    meta: 'Google',
    text: 'Il cibo di grande qualità e preparato con maestria, personale gentile e professionale, luogo accogliente e misterioso.',
    source: 'Google',
  },
  {
    author: 'René Verneau',
    meta: 'Local Guide',
    text: 'Il ristorante è davvero curato e il personale in sala è cortese e preparato.',
    source: 'Google',
  },
  {
    author: 'Ospite',
    meta: 'Google',
    text: 'Personale gentile, ottima cucina e da provare la pizza margherita: buonissima.',
    source: 'Google',
  },
  {
    author: 'Ospite',
    meta: 'Google',
    text: 'Posto consigliato, buona pizza e antipasto… a due passi dal centro città.',
    source: 'Google',
  },
]

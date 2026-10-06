import type { OpeningSlot } from '../types'

export const site = {
  name: 'Gino e Pina',
  fullName: 'Ristorante Pizzeria Enoteca Caffetteria Gino e Pina',
  founded: 1940,
  family: 'famiglia Palmieri',
  claim: "Dove l'arte della cucina incontra l'ospitalità",
  intro:
    'Uno dei locali più antichi e rinomati di Benevento. Una storia lunga quasi un secolo, oggi affidata alla terza generazione della famiglia Palmieri.',
  address: {
    street: "Viale dell'Università, 2",
    city: '82100 Benevento (BN)',
    lat: 41.1281144,
    lng: 14.7735495,
  },
  phone: { display: '0824 24947', href: 'tel:+39082424947' },
  mobile: { display: '347 197 2824', href: 'tel:+393471972824' },
  whatsapp: 'https://wa.me/393471972824',
  email: 'info@ginoepina.it',
  website: 'https://www.ginoepina.it',
  socials: [
    { label: 'Instagram', icon: 'ri-instagram-line', href: 'https://www.instagram.com/ginoepina1940/' },
    { label: 'Facebook', icon: 'ri-facebook-circle-line', href: 'https://www.facebook.com/ginoepinabenevento' },
    { label: 'Tripadvisor', icon: 'ri-star-smile-line', href: 'https://www.tripadvisor.it/Restaurant_Review-g194690-d2474845-Reviews-Ristorante_Pizzeria_Enoteca_Gino_e_Pina-Benevento_Province_of_Benevento_Campania.html' },
  ],
  mapsUrl:
    'https://www.google.com/maps/place/Ristorante+Pizzeria+Enoteca+Caffetteria+Gino+e+Pina/@41.1281144,14.7735495,17z',
  mapsEmbed:
    'https://maps.google.com/maps?q=Gino%20e%20Pina%2C%20Viale%20dell%27Universit%C3%A0%202%2C%20Benevento&z=16&output=embed',
  priceRange: '20–30 € a persona',
} as const

/** Orari dal sito ufficiale: pranzo 12–15, cena 19–23.30, chiusi domenica sera e giovedì sera */
export const hours: OpeningSlot[] = [
  { day: 1, label: 'Lunedì', lunch: ['12:00', '15:00'], dinner: ['19:00', '23:30'] },
  { day: 2, label: 'Martedì', lunch: ['12:00', '15:00'], dinner: ['19:00', '23:30'] },
  { day: 3, label: 'Mercoledì', lunch: ['12:00', '15:00'], dinner: ['19:00', '23:30'] },
  { day: 4, label: 'Giovedì', lunch: ['12:00', '15:00'], dinner: null },
  { day: 5, label: 'Venerdì', lunch: ['12:00', '15:00'], dinner: ['19:00', '23:30'] },
  { day: 6, label: 'Sabato', lunch: ['12:00', '15:00'], dinner: ['19:00', '23:30'] },
  { day: 0, label: 'Domenica', lunch: ['12:00', '15:00'], dinner: null },
]

export const nearby = [
  { label: 'Teatro Romano', distance: '200 m', icon: 'ri-ancient-pavilion-line' },
  { label: 'Parco De Mita e Parco delle Streghe', distance: '5 min a piedi', icon: 'ri-tree-line' },
  { label: 'Università del Sannio e Conservatorio', distance: 'pochi minuti', icon: 'ri-graduation-cap-line' },
  { label: 'Corso Garibaldi, isola pedonale', distance: '15 min a piedi', icon: 'ri-walk-line' },
  { label: 'Stadio "Ciro Vigorito" e PalaSannio', distance: 'vicinissimi', icon: 'ri-football-line' },
]

export const perks = [
  { label: 'Parcheggio auto e pullman GT', icon: 'ri-parking-box-line' },
  { label: 'Senza barriere architettoniche', icon: 'ri-wheelchair-line' },
  { label: 'Climatizzato', icon: 'ri-temp-cold-line' },
  { label: 'Wi‑Fi gratuito', icon: 'ri-wifi-line' },
  { label: 'Vegetariano, vegano e per celiaci', icon: 'ri-leaf-line' },
  { label: 'Pet friendly', icon: 'ri-footprint-line' },
]

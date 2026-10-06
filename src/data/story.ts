import type { StoryChapter } from '../types'
import { photos } from '../lib/images'

export const story: StoryChapter[] = [
  {
    year: '1940',
    title: 'Nel cuore della città',
    text: 'Gino e Pina aprono le porte a pochi passi dal centro storico. Da allora non c’è beneventano che, almeno una volta, non abbia assaggiato la loro cucina.',
    image: photos.historic,
    caption: 'Foto d’archivio — dal 1940',
  },
  {
    year: '3×',
    title: 'Pizzaioli da generazioni',
    text: 'Il forno a legna passa di mano in mano: tre generazioni di pizzaioli e lo stesso rispetto per l’impasto, il tempo e il fuoco.',
    image: photos.threeGenerations,
    caption: 'Tre generazioni di pizzaioli',
  },
  {
    year: '1994',
    title: 'A tavola con il Premio Strega',
    text: 'Ogni anno, prima della premiazione a Roma, gli scrittori finalisti visitano l’antica fabbrica del liquore Strega e la sera si siedono da Gino e Pina per le antiche ricette beneventane.',
    image: photos.salaWide,
    caption: 'La sala principale',
  },
  {
    year: '★',
    title: 'Guide, premi e attestati',
    text: 'Presente sulle maggiori guide nazionali e internazionali, Travellers’ Choice di Tripadvisor: tra il 10% dei migliori ristoranti al mondo.',
    image: photos.awards,
    caption: 'Riconoscimenti e attestati',
  },
  {
    year: 'Oggi',
    title: 'La terza generazione Palmieri',
    text: 'Materie prime a km zero e presidio Slow Food, scelte ogni mattina al vicino mercatino dai contadini sanniti. La tradizione resta, la cucina si rinnova con le stagioni.',
    image: photos.sala,
    caption: 'Legno lamellare a onda e travi a vista',
  },
]

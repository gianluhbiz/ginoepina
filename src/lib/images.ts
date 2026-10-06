/**
 * Tutte le immagini provengono dal sito ufficiale ginoepina.it.
 * Per servirle in locale: `npm run images` (scarica in /public/images)
 * e poi imposta IMG_BASE = '/images/'.
 */
export const IMG_BASE = 'https://www.ginoepina.it/wp-content/uploads/'

export const img = (path: string) => `${IMG_BASE}${path}`

/** Le 30 foto dei piatti: 2026/07/001.webp … 030.webp */
export const dishPhoto = (n: number) => img(`2026/07/${String(n).padStart(3, '0')}.webp`)

export const photos = {
  logo: img('2023/03/logo_.png'),
  fettuccine: img('2026/07/fettuccine-ai-funghi-porcini-pecorino.webp'),
  orecchiette: img('2026/07/orecchiette-melanzane-e-provolone.webp'),
  pizzaBanner: img('2023/11/pizza.jpg'),
  pizzaTop: img('2023/03/pizza.jpg'),
  historic: img('2023/10/FOTO-riserva-N-80-dal-1940-scaled-e1698655329184.jpg'),
  threeGenerations: img('2018/06/Tre-generazioni-pizzaioli.jpg'),
  sala: img('2026/07/foto-5-sala.webp'),
  prive: img('2026/07/foto-6-prive.webp'),
  enoteca: img('2026/07/foto-7-enoteca.webp'),
  dehors: img('2026/07/foto-8-dehors-2.webp'),
  awards: img('2026/07/riconoscimenti-e-attestati-2.webp'),
  salaWide: img('2018/05/GinoEpina-Slide-Ambienti.jpg'),
  benevento: img('2016/03/slidehomenew.jpg'),
  cityMap: img('2026/08/12.webp'),
  antipastiCollage: img('2026/08/11.webp'),
} as const

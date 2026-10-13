import type { Dish, DishCategory } from '../types'
import { dishPhoto, photos } from '../lib/images'

/**
 * Galleria "Alcune specialità" dal sito ufficiale.
 * NB: i nomi dei piatti sono descrittivi, da confermare con il ristorante.
 */
const raw: Array<[number, string, DishCategory]> = [
  [12, 'Sua Maestà la Margherita', 'Pizza'],
  [6, 'Parmigiana di melanzane', 'Antipasti'],
  [4, 'Spaghetti al ragù', 'Primi'],
  [19, 'Calamari alla griglia', 'Mare'],
  [26, 'Braciole al ragù', 'Secondi'],
  [14, 'Burrata e pomodorini', 'Antipasti'],
  [23, 'Paccheri ai gamberi', 'Mare'],
  [13, 'Pizza bianca dal forno a legna', 'Pizza'],
  [30, 'Gnocchi alle melanzane', 'Primi'],
  [17, 'Bistecca alla brace', 'Secondi'],
  [8, 'Il buffet di antipasti', 'Antipasti'],
  [20, 'Gamberoni in salsa', 'Mare'],
  [3, 'Lasagna verde di stagione', 'Primi'],
  [18, 'Carciofo ripieno', 'Antipasti'],
  [28, 'Tagliata su rucola', 'Secondi'],
  [5, 'Cannelloni al forno', 'Primi'],
  [21, 'Tegame di mare', 'Mare'],
  [11, 'Scarola e fagioli', 'Antipasti'],
  [7, 'Paccheri al pomodorino', 'Primi'],
  [25, 'Agnello del Sannio', 'Secondi'],
  [22, 'Spaghetti al pomodoro', 'Primi'],
  [1, "Verdure dell'orto sannita", 'Antipasti'],
  [27, 'Grigliata mista', 'Secondi'],
  [24, 'Paccheri, olive e pomodorini', 'Primi'],
  [9, 'Minestra della tradizione', 'Primi'],
  [15, 'Arrosto di maiale', 'Secondi'],
  [10, 'Involtini e verdure', 'Secondi'],
  [2, 'Paccheri e scaglie di formaggio', 'Primi'],
  [29, 'Tagliata e pomodorini', 'Secondi'],
  [16, 'Bocconcini saltati', 'Secondi'],
]

export const dishes: Dish[] = raw.map(([n, name, category]) => ({
  id: `d${n}`,
  name,
  category,
  image: dishPhoto(n),
}))

export const categories: Array<'Tutti' | DishCategory> = ['Tutti', 'Antipasti', 'Primi', 'Secondi', 'Mare', 'Pizza']

/** Le tre "copertine" ufficiali (banner 1920×695) */
export const signatureDishes = [
  { name: 'Fettuccine ai funghi porcini e pecorino', image: photos.fettuccine },
  { name: 'Orecchiette melanzane e provolone', image: photos.orecchiette },
  { name: 'Pizza napoletana, forno a legna', image: photos.pizzaBanner },
]

/** Foto per i marquee (alternate per non ripetere vicine) */
export const marqueeTop = [12, 6, 23, 14, 4, 19, 30, 13, 26, 21].map(dishPhoto)
export const marqueeBottom = [17, 8, 3, 20, 28, 18, 7, 25, 22, 11].map(dishPhoto)

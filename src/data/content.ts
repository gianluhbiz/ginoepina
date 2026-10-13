import type { Faq, L, Review, Space } from '../types'
import { photos } from '../lib/images'

const l = (it: string, en: string): L => ({ it, en })

export const spaces: Space[] = [
  {
    id: 'sala',
    title: l('Sala principale', 'Main dining room'),
    text: l('Calda e accogliente, tutta in legno lamellare a onda con travi a vista.', 'Warm and welcoming, in curved laminated wood with exposed beams.'),
    image: photos.sala,
  },
  {
    id: 'prive',
    title: l('Sala privé e meeting', 'Private room'),
    text: l('Per feste private, cerimonie, riunioni e cene aziendali.', 'For private parties, ceremonies, meetings and company dinners.'),
    image: photos.prive,
  },
  {
    id: 'enoteca',
    title: l('Enoteca', 'Wine shop'),
    text: l('Vini sanniti, campani e nazionali da acquistare, distillati e una vetrina di sigari.', 'Sannio, Campania and Italian wines to buy, spirits and a cigar cabinet.'),
    image: photos.enoteca,
  },
  {
    id: 'dehors',
    title: l('Giardino esterno', 'Garden'),
    text: l('D’estate si mangia in giardino, sotto le stelle.', 'In summer we serve dinner in the garden, under the stars.'),
    image: photos.dehors,
  },
]

/** Estratti di recensioni pubbliche su Google Maps (testo originale) */
export const reviews: Review[] = [
  { author: 'Gengi Travel', text: 'Bellissimo ristorante, con un proprietario gentilissimo che ti mette subito a tuo agio. Il locale è molto pulito e ben arredato con travi a vista.' },
  { author: 'Sara', text: 'Il cibo di grande qualità e preparato con maestria, personale gentile e professionale, luogo accogliente e misterioso.' },
  { author: 'René Verneau', text: 'Il ristorante è davvero curato e il personale in sala è cortese e preparato.' },
]

/** Domande frequenti dal sito ufficiale (ginoepina.it/faq) */
export const faqs: Faq[] = [
  {
    q: l('Siete attrezzati per cucinare senza glutine?', 'Do you cater for gluten-free diets?'),
    a: l(
      'Sì. Il menu ha già diversi piatti senza glutine e prepariamo con cura pietanze senza glutine; abbiamo anche grissini e dolci gluten free.',
      'Yes. The menu already has several gluten-free dishes, we carefully prepare gluten-free meals and also offer gluten-free breadsticks and desserts.',
    ),
  },
  {
    q: l('Avete piatti vegetariani e vegani?', 'Do you have vegetarian and vegan dishes?'),
    a: l(
      'Sì: il buffet di ortaggi e verdure a km zero, le zuppe sannite, i primi di pasta fresca, le parmigiane e i latticini. Per chi è vegano: insalate, verdure ripassate e grigliate, e diverse proposte del buffet.',
      'Yes: our buffet of local vegetables, Sannio soups, fresh pasta, parmigiane and cheeses. For vegans: salads, sautéed and grilled vegetables and many buffet dishes.',
    ),
  },
  {
    q: l('Avete proposte per i bambini?', 'Do you have options for children?'),
    a: l(
      'I bambini sono sempre i benvenuti: prepariamo porzioni e piatti dedicati ai più piccoli.',
      'Children are always welcome: we prepare smaller portions and dishes just for them.',
    ),
  },
  {
    q: l('Posso portare il mio cane?', 'Can I bring my dog?'),
    a: l('Sì, i cani educati e tenuti al guinzaglio sono i benvenuti.', 'Yes, well-behaved dogs on a lead are welcome.'),
  },
  {
    q: l('C’è parcheggio? Avete la ricarica per auto elettriche?', 'Is there parking? Do you have EV charging?'),
    a: l(
      'Sì, davanti al ristorante c’è un ampio parcheggio per auto e pullman con una postazione di ricarica veloce per auto elettriche.',
      'Yes, there is a large car and coach park in front of the restaurant with a fast EV charging point.',
    ),
  },
  {
    q: l('Si può prenotare una sala per un evento?', 'Can I book a room for an event?'),
    a: l(
      'Sì, abbiamo sale modulabili fino a 180 coperti in due sale, per comunioni, cresime, battesimi, compleanni, lauree e cene aziendali. Per gruppi oltre 15 persone si può concordare un menu a prezzo fisso.',
      'Yes, our flexible rooms seat up to 180 across two rooms, for christenings, birthdays, graduations and company dinners. Groups of more than 15 can arrange a fixed-price menu.',
    ),
  },
  {
    q: l('A che distanza siete dal centro storico?', 'How far are you from the old town?'),
    a: l(
      'A 200 metri dal Teatro Romano e a pochi passi dal centro storico. Corso Garibaldi e lo stadio “Ciro Vigorito” sono a circa 15 minuti a piedi.',
      '200 metres from the Roman Theatre and a few steps from the old town. Corso Garibaldi and the “Ciro Vigorito” stadium are about a 15-minute walk.',
    ),
  },
]

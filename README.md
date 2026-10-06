# Gino e Pina — sito web

Ristorante · Pizzeria · Enoteca · Caffetteria — Benevento, dal 1940.
React 19 + TypeScript + Vite, **Tailwind CSS v4** (unico sistema di stile), **framer-motion** per le animazioni, **Remix Icon** per le icone.

```bash
npm install
npm run dev      # sviluppo
npm run build    # build di produzione in /dist
npm run images   # (opzionale) scarica le foto in /public/images
```

## Struttura

```
src/
├── App.tsx                 # composizione delle sezioni + preloader
├── index.css               # @import tailwind + @theme (colori e font)
├── types/                  # tipi condivisi
├── data/                   # TUTTI i contenuti: modifica qui, non nei componenti
│   ├── site.ts             # contatti, indirizzo, orari, distanze, servizi extra
│   ├── navigation.ts       # voci del menu
│   ├── story.ts            # capitoli della storia
│   ├── pizzeria.ts         # numeri, passaggi e ingredienti
│   ├── dishes.ts           # galleria piatti + categorie
│   ├── spaces.ts           # ambienti
│   ├── services.ts         # servizi
│   ├── giftcards.ts        # gift card
│   └── reviews.ts          # valutazioni e recensioni
├── lib/                    # images.ts (URL foto), motion.ts (easing/varianti), cn.ts
├── hooks/                  # useOpenStatus (aperto/chiuso live), useLockBody
├── components/
│   ├── layout/             # Preloader, Navbar, MenuOverlay, Footer, ScrollProgress, Grain
│   └── ui/                 # RevealText, ParallaxImage, Marquee, Counter, Magnetic, ArrowLink, SectionLabel, Lightbox
└── sections/               # Hero, ZoomReveal, Manifesto, DishMarquee, Story, Pizzeria,
                            # Specialties, Spaces, Services, GiftCards, Reviews, Location
```

## Note sui contenuti
- Foto: prese dal sito ufficiale ginoepina.it (caricate direttamente da lì). Per servirle in locale usa `npm run images` e imposta `IMG_BASE = '/images/'` in `src/lib/images.ts`.
- I nomi dei piatti in `data/dishes.ts` sono descrittivi (le foto originali non hanno titolo): da confermare con il ristorante.
- Anno di fondazione: 1940 (foto d'archivio e Google); il vecchio slogan riportava "dal 1949".
- Valutazioni aggiornate a ottobre 2026: Google 4,1 (1.308), Tripadvisor 4,1 (659, n. 7 su 218).

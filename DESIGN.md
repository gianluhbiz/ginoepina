---
name: Gino e Pina — Insegna smaltata
description: Sito del ristorante come un'insegna smaltata anni '40, leggibile al volo e facile da usare
colors:
  green: "#0e4a3b"
  green-deep: "#08352a"
  green-soft: "#dfe8e1"
  enamel: "#f5f6f1"
  mist: "#e9ede6"
  red: "#c42b2b"
  red-deep: "#9c1f1f"
  yellow: "#f2c12e"
  ink: "#12201b"
  muted: "#4b5a53"
typography:
  sign:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 5.25rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "0.005em"
  body:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
rounded:
  plate: "18px"
  plate-inner: "13px"
  control: "12px"
  chip: "8px"
spacing:
  plate-rim: "6px"
  plate-pad: "24px"
  section: "80px"
components:
  plate-green:
    backgroundColor: "{colors.green}"
    textColor: "{colors.enamel}"
    rounded: "{rounded.plate}"
    padding: "{spacing.plate-rim}"
  plate-enamel:
    backgroundColor: "{colors.enamel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "{spacing.plate-rim}"
  button-primary:
    backgroundColor: "{colors.red}"
    textColor: "{colors.enamel}"
    rounded: "{rounded.control}"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.red-deep}"
  status-open:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.chip}"
  status-closed:
    backgroundColor: "{colors.enamel}"
    textColor: "{colors.red-deep}"
    rounded: "{rounded.chip}"
---

## Overview

Il sito è l'insegna smaltata della bottega: verde bottiglia come lamiera, bianco smalto per leggere, rosso per agire, giallo per dire "aperto". Prima viene l'uso: menu, orari, dove siamo e prenota sono sempre a un tocco, da telefono con la barra fissa in basso. Le foto sono solo quelle vere del locale e dei piatti.

## Colors

- **Verde (`green`)**: la lamiera. Testata, targhe principali, sezione gruppi, barra mobile. Copre una parte importante della pagina, non è un accento.
- **Bianco smalto (`enamel`) e `mist`**: fondi di lettura, alternati tra le sezioni.
- **Rosso (`red`)**: solo azioni (prenota, invia) e lo stato "chiuso"/"chiuso il giovedì sera".
- **Giallo (`yellow`)**: "aperto ora", la riga di oggi negli orari, i prezzi sulle targhe verdi, il "dal 1940".
- Testo secondario su fondi chiari: `muted` (contrasto ≥ 7:1). Su verde: bianco smalto pieno o all'85–90%. Mai testo semitrasparente sul rosso.

## Typography

Una sola famiglia, Archivo Variable (file woff2 in src/assets/fonts, asse larghezza 62–125). I titoli "da insegna" sono maiuscoli, extra-bold, condensati al 72% (`SignHeading`), max 5.25rem. Il corpo è Archivo a larghezza normale, 18px, righe ≤ 70 caratteri. Numeri tabulari per prezzi e orari.

## Layout

Contenitore max 1280px con 16–24px di margine. Home: targa con titolo, stato e prenotazione + foto; tre targhe pratiche (orari, dove, contatti); menu; il locale; gruppi; recensioni; FAQ; come arrivare. Pagina `/menu`: barra fissa con ricerca, filtro allergeni e categorie; voci in due colonne da desktop, una da telefono. Su mobile il contenuto lascia spazio (pb-28) alla barra azioni.

## Elevation & Depth

Profondità quasi piatta, come la lamiera: ombre morbide e con offset solo per la testata, la barra del menu e le targhe bianche. Niente vetro sfocato, niente ombre dure.

## Shapes

La targa (`Plate`): angoli 18px, bordo esterno di 6px nel colore della lamiera e filetto interno di 2px (bianco su verde/rosso, verde su bianco). Le foto stanno nella stessa cornice. Controlli: angoli 12px, altezza minima 48px (56px per le azioni principali).

## Components

- `Plate` (green / enamel / red / yellow): contenitore base. Mai una targa dentro un'altra.
- `Button`: rosso (primario), verde, bianco, contorno. `active:scale-[0.97]`, 150ms.
- `StatusPlate`: aperto/chiuso calcolato sull'ora di Europe/Rome.
- `BookingForm`: persone, giorno, ora, nome → apre WhatsApp con il messaggio pronto.
- `MobileActionBar`: Chiama, WhatsApp, Menu, Mappa.
- `MenuItemRow`: foto piccola opzionale, nome (+ traduzione in inglese), descrizione, allergeni numerati, prezzo.

## Do's and Don'ts

- Do: tenere le informazioni pratiche raggiungibili da ogni pagina; testi grandi; bersagli touch ≥ 44px.
- Do: animazioni brevi (150–250ms) solo per pannelli, fisarmoniche e stato; rispettare "riduci movimento".
- Do: aggiornare menu e prezzi solo in `src/data/menu.ts`.
- Don't: etichette sopra i titoli, numeri di sezione, gradienti, vetro sfocato, foto di repertorio.
- Don't: nascondere informazioni dietro il passaggio del mouse; inventare prezzi o recensioni.

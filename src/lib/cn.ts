/** Piccolo helper per comporre classi Tailwind condizionali */
export const cn = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(' ')

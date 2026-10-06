/** Grana "carta" su tutta la pagina, non intercetta i click */
export default function Grain() {
  return <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] bg-[url(/noise.svg)] opacity-[0.18] mix-blend-multiply" />
}

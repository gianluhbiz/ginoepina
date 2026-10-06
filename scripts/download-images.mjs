// Scarica tutte le immagini usate dal sito in /public/images
// Uso: npm run images  →  poi in src/lib/images.ts imposta IMG_BASE = '/images/'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { readFile, readdir } from 'node:fs/promises'

const BASE = 'https://www.ginoepina.it/wp-content/uploads/'
const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')

async function walk(dir) {
  const out = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) out.push(...(await walk(p)))
    else if (/\.(ts|tsx)$/.test(e.name)) out.push(p)
  }
  return out
}

const paths = new Set()
for (const f of await walk(join(root, 'src'))) {
  const src = await readFile(f, 'utf8')
  for (const m of src.matchAll(/img\('([^']+)'\)/g)) paths.add(m[1])
}
for (let i = 1; i <= 30; i++) paths.add(`2026/07/${String(i).padStart(3, '0')}.webp`)

for (const p of paths) {
  const res = await fetch(BASE + p)
  if (!res.ok) { console.warn('✗', p, res.status); continue }
  const dest = join(root, 'public', 'images', p)
  await mkdir(dirname(dest), { recursive: true })
  await writeFile(dest, Buffer.from(await res.arrayBuffer()))
  console.log('✓', p)
}

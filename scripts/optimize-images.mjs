// Génère des versions WebP optimisées des photos.
// Source : assets/originals/**  →  Sortie : public/images/** (.webp)
// Usage : npm run images
import { readdir, mkdir, stat } from 'node:fs/promises'
import { join, relative, dirname, extname } from 'node:path'
import sharp from 'sharp'

const SRC = 'assets/originals'
const OUT = 'public/images'
const MAX_WIDTH = 1600
const QUALITY = 72

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(path)
    else if (/\.(jpe?g|png)$/i.test(entry.name)) yield path
  }
}

let before = 0
let after = 0
for await (const file of walk(SRC)) {
  const rel = relative(SRC, file)
  const target = join(OUT, rel.slice(0, -extname(rel).length) + '.webp')
  await mkdir(dirname(target), { recursive: true })
  await sharp(file)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(target)
  const [a, b] = await Promise.all([stat(file), stat(target)])
  before += a.size
  after += b.size
  console.log(`${rel.padEnd(36)} ${(a.size / 1024).toFixed(0).padStart(6)} Ko → ${(b.size / 1024).toFixed(0).padStart(5)} Ko`)
}
console.log(`\nTotal : ${(before / 1048576).toFixed(1)} Mo → ${(after / 1048576).toFixed(1)} Mo`)

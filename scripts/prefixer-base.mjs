// Post-traitement du build pour un hébergement dans un sous-dossier
// (GitHub Pages : https://<compte>.github.io/<repo>/).
//
// Astro préfixe déjà les assets (/_astro/…) avec `base`. Ce script complète
// les liens internes écrits en dur (href="/galerie") et les URL absolues
// construites sans le sous-dossier (Open Graph, JSON-LD, robots.txt).
//
// Usage : node scripts/prefixer-base.mjs dist /site-sculpteur https://armelpltr.github.io
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const [dossier = 'dist', base = process.env.BASE_PATH, origine = process.env.SITE_URL] = process.argv.slice(2);
if (!base || base === '/') {
  console.log('Pas de sous-dossier : rien à faire.');
  process.exit(0);
}

const b = '/' + base.replace(/^\/|\/$/g, '');
const segment = b.slice(1).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const origineNette = new URL(origine).origin;
const origineEsc = origineNette.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// URL absolues du site sans le sous-dossier.
const reAbsolu = new RegExp(`${origineEsc}/(?!${segment}(?:[/"'?#<\\s]|$))`, 'g');
// Attributs pointant vers la racine du domaine.
const reAttribut = new RegExp(`(\\s(?:href|src|action|poster)=["'])/(?!/|${segment}(?:[/"'?#]|$))`, 'g');

async function* fichiers(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* fichiers(p);
    else if (/\.(html|xml|txt)$/.test(e.name)) yield p;
  }
}

let total = 0;
for await (const f of fichiers(dossier)) {
  const avant = await readFile(f, 'utf8');
  let apres = avant.replace(reAbsolu, `${origineNette}${b}/`);
  if (f.endsWith('.html')) apres = apres.replace(reAttribut, `$1${b}/`);
  if (apres !== avant) {
    await writeFile(f, apres);
    total++;
  }
}
console.log(`${total} fichier(s) préfixé(s) avec ${b}.`);

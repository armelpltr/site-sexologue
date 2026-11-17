// Génère des visuels placeholder neutres et apaisants (cabinet stylisé,
// textures, formes douces). À remplacer par de vraies photos du cabinet.
//
// Usage : node scripts/generer-placeholders.mjs
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dossier = path.join(racine, 'src/assets');
await mkdir(dossier, { recursive: true });

const rendre = (w, h, contenu, nom) =>
  sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">${contenu}</svg>`))
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(dossier, nom));

const feuille = (x, y, angle, l, couleur) =>
  `<ellipse cx="${x}" cy="${y}" rx="${l}" ry="${l * 0.32}" fill="${couleur}" transform="rotate(${angle} ${x} ${y})"/>`;

// Cabinet : fauteuil, plante, lampe, fenêtre lumineuse.
await rendre(
  1800,
  1200,
  `<defs>
    <linearGradient id="mur" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#efe8dc"/><stop offset="1" stop-color="#e4dccd"/></linearGradient>
    <linearGradient id="fen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbf8f2"/><stop offset="1" stop-color="#f1ebe0"/></linearGradient>
  </defs>
  <rect width="1800" height="1200" fill="url(#mur)"/>
  <rect y="930" width="1800" height="270" fill="#d9cdb9"/>
  <rect x="1080" y="140" width="520" height="640" rx="260" fill="url(#fen)"/>
  <rect x="1080" y="140" width="520" height="640" rx="260" fill="none" stroke="#d8cfbf" stroke-width="10"/>
  <ellipse cx="760" cy="960" rx="420" ry="30" fill="#000" opacity="0.06"/>
  <rect x="440" y="640" width="640" height="200" rx="90" fill="#9fb09a"/>
  <rect x="470" y="470" width="580" height="260" rx="110" fill="#aebdaa"/>
  <rect x="410" y="620" width="120" height="250" rx="60" fill="#93a58e"/>
  <rect x="990" y="620" width="120" height="250" rx="60" fill="#93a58e"/>
  <rect x="500" y="860" width="16" height="80" fill="#8d6e55"/><rect x="1004" y="860" width="16" height="80" fill="#8d6e55"/>
  <circle cx="660" cy="640" r="70" fill="#d9a588" opacity="0.9"/>
  <path d="M260 940 L300 760 L420 760 L460 940 Z" fill="#c98b6b"/>
  ${feuille(330, 620, -60, 120, '#7d8f7a')}${feuille(400, 600, -110, 130, '#6f8270')}${feuille(360, 520, -85, 140, '#879a83')}${feuille(300, 690, -20, 100, '#6f8270')}${feuille(430, 690, -160, 100, '#7d8f7a')}
  <rect x="1380" y="560" width="14" height="380" fill="#8d7b68"/>
  <path d="M1310 560 L1464 560 L1430 460 L1344 460 Z" fill="#f4ede1" stroke="#ddd2c1" stroke-width="4"/>
  <ellipse cx="1387" cy="945" rx="80" ry="12" fill="#8d7b68"/>`,
  'cabinet.jpg',
);

// Portrait placeholder : silhouette neutre.
await rendre(
  1000,
  1250,
  `<rect width="1000" height="1250" fill="#e9e2d6"/>
   <circle cx="500" cy="470" r="165" fill="#b9c3b4"/>
   <path d="M190 1250 C190 860 340 720 500 720 C660 720 810 860 810 1250 Z" fill="#b9c3b4"/>`,
  'praticien.jpg',
);

// Visuels d'articles : formes abstraites douces.
await rendre(
  1600,
  900,
  `<rect width="1600" height="900" fill="#e7eae2"/>
   <circle cx="420" cy="380" r="300" fill="#c9d3c4"/><circle cx="1150" cy="560" r="380" fill="#dfe5d9"/>
   <circle cx="820" cy="300" r="160" fill="#eee6d8"/>`,
  'blog-consulter.jpg',
);
await rendre(
  1600,
  900,
  `<rect width="1600" height="900" fill="#f1e7dd"/>
   <ellipse cx="560" cy="520" rx="420" ry="300" fill="#e6c4ad"/><ellipse cx="1000" cy="380" rx="360" ry="260" fill="#efd6c4"/>
   <ellipse cx="1200" cy="660" rx="260" ry="180" fill="#dcb398" opacity="0.7"/>`,
  'blog-desir.jpg',
);
await rendre(
  1600,
  900,
  `<rect width="1600" height="900" fill="#e6e9ec"/>
   <circle cx="640" cy="450" r="290" fill="#c3ccd4"/><circle cx="960" cy="450" r="290" fill="#e8dfd1" opacity="0.85"/>`,
  'blog-couple.jpg',
);

console.log('Placeholders générés dans src/assets.');

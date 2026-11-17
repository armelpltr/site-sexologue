import { site } from '@/config/site';

/** Données structurées du cabinet (SEO local). */
export function cabinetJsonLd(base: URL | undefined) {
  const a = site.adresse;
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'MedicalBusiness'],
    '@id': new URL('/#cabinet', base).href,
    name: `${site.nom}, ${site.titreCourt.toLowerCase()}`,
    description: site.description,
    url: new URL('/', base).href,
    telephone: site.contact.telephone,
    email: site.contact.email,
    image: new URL('/og-cabinet.jpg', base).href,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.rue,
      postalCode: a.codePostal,
      addressLocality: a.ville,
      addressCountry: 'FR',
    },
    geo: { '@type': 'GeoCoordinates', latitude: a.latitude, longitude: a.longitude },
    openingHoursSpecification: site.horaires.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.schema,
      opens: h.ouvre,
      closes: h.ferme,
    })),
    founder: { '@type': 'Person', name: site.nom, jobTitle: site.titreCourt },
  };
}

export function articleJsonLd(opts: { titre: string; description: string; url: string; date: Date; miseAJour?: Date; image?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.titre,
    description: opts.description,
    url: opts.url,
    datePublished: opts.date.toISOString(),
    dateModified: (opts.miseAJour ?? opts.date).toISOString(),
    ...(opts.image ? { image: opts.image } : {}),
    author: { '@type': 'Person', name: site.nom },
  };
}

export function faqJsonLd(questions: { q: string; r: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(({ q, r }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: r },
    })),
  };
}

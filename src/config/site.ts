/**
 * Contenu centralisé du site. Tout ce qui est entre crochets est un
 * placeholder à valider avec le ou la praticien·ne avant la mise en ligne.
 */
export const site = {
  nom: '[Prénom Nom]',
  /** Titre exact, à valider : sexologue / psychologue-sexologue / médecin sexologue. */
  titre: '[TITRE : sexologue / psychologue-sexologue / médecin sexologue]',
  /** Version courte utilisée dans les titres de page et le logo. */
  titreCourt: 'Sexologue',
  accroche: 'Un espace d’écoute pour parler de votre intimité, sans jugement.',
  description:
    'Cabinet de sexologie à [Ville] : consultations individuelles et de couple, en cabinet ou en visio. Écoute, confidentialité, non-jugement.',

  contact: {
    telephone: '01 23 45 67 89',
    email: 'contact@exemple-cabinet-sexologie.fr',
    /** Lien de prise de rendez-vous en ligne (Doctolib ou équivalent). */
    lienRdv: 'https://www.doctolib.fr/[specialite]/[ville]/[prenom-nom]',
    nomPlateformeRdv: 'Doctolib',
  },

  adresse: {
    rue: '[12 rue Exemple]',
    complement: '[2e étage, interphone « Cabinet »]',
    codePostal: '[00000]',
    ville: '[Ville]',
    /** Coordonnées GPS du cabinet, pour la carte OpenStreetMap et le SEO local. */
    latitude: 45.764,
    longitude: 4.8357,
    acces: [
      '[Métro ligne X, arrêt Exemple (5 min à pied)]',
      '[Bus 12 et 34, arrêt Place Exemple]',
      '[Stationnement : parking Exemple à 200 m]',
      '[Accessibilité PMR : à préciser]',
    ],
  },

  horaires: [
    { jours: 'Lundi – Vendredi', heures: '[9 h – 20 h]', schema: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], ouvre: '09:00', ferme: '20:00' },
    { jours: 'Samedi', heures: '[9 h – 13 h]', schema: ['Saturday'], ouvre: '09:00', ferme: '13:00' },
  ],

  /** Tarifs : montants à confirmer. */
  tarifs: [
    { prestation: 'Consultation individuelle', duree: '[50 min]', prix: '[70 €]' },
    { prestation: 'Consultation de couple', duree: '[1 h 15]', prix: '[90 €]' },
    { prestation: 'Consultation en visio', duree: '[50 min]', prix: '[70 €]' },
  ],
  moyensPaiement: '[Espèces, chèque, carte bancaire, virement]',
  remboursement:
    "[À valider selon le titre : les consultations de sexologie ne sont en général pas remboursées par l'Assurance maladie. Certaines mutuelles proposent une prise en charge partielle : renseignez-vous auprès de la vôtre. Une facture vous est remise à chaque séance.]",

  /** Témoignages : désactivés par défaut. N'activer qu'avec des avis réels et consentis par écrit. */
  temoignages: {
    actif: false,
    liste: [] as { texte: string; auteur: string }[],
  },

  /**
   * Mesure d'audience : aucune par défaut.
   * Pour l'activer sans bandeau cookies, choisir Plausible ou Umami (sans cookies).
   */
  audience: {
    outil: null as null | 'plausible' | 'umami',
    plausibleDomaine: '', // ex. 'exemple-cabinet-sexologie.fr'
    plausibleScript: 'https://plausible.io/js/script.js',
    umamiScript: '', // ex. 'https://cloud.umami.is/script.js'
    umamiWebsiteId: '',
  },

  formulaire: {
    service: 'netlify' as 'netlify' | 'formspree',
    formspreeId: '',
  },

  legal: {
    editeur: '[Prénom Nom], [TITRE]',
    statut: '[Entreprise individuelle / micro-entreprise / libéral]',
    siret: '[SIRET]',
    /** Psychologue : n° ADELI ou RPPS. Médecin : RPPS et ordre. Sexologue non réglementé : supprimer. */
    identifiantPro: '[N° ADELI / RPPS, si applicable]',
    ordre: '[Ordre professionnel ou association, si applicable]',
    assuranceRcPro: '[Assureur RC pro, n° de contrat]',
    directeurPublication: '[Prénom Nom]',
    hebergeur: '[Netlify, Inc. – 512 2nd Street, Suite 200, San Francisco, CA 94107, USA] ou [Vercel Inc.]',
    misAJour: '18 novembre 2026',
  },
} as const;

export const navigation = [
  { href: '/praticien', label: 'Le cabinet' },
  { href: '/motifs', label: 'Motifs de consultation' },
  { href: '/seance', label: 'Déroulement' },
  { href: '/tarifs', label: 'Tarifs & accès' },
  { href: '/faq', label: 'FAQ' },
  { href: '/blog', label: 'Ressources' },
] as const;

export const adresseComplete = `${site.adresse.rue}, ${site.adresse.codePostal} ${site.adresse.ville}`;
export const telLien = `tel:${site.contact.telephone.replace(/[^\d+]/g, '')}`;

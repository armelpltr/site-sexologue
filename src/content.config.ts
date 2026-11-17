import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const motifs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/motifs' }),
  schema: z.object({
    titre: z.string(),
    resume: z.string().max(180),
    /** Nom de l'icône (voir src/components/Icone.astro). */
    icone: z.enum(['couple', 'desir', 'douleur', 'identite', 'fonction', 'parcours']),
    ordre: z.number().default(100),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      titre: z.string(),
      description: z.string().max(200),
      date: z.coerce.date(),
      miseAJour: z.coerce.date().optional(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      brouillon: z.boolean().default(false),
    }),
});

export const collections = { motifs, blog };

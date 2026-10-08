import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string(),
    author: z.string().default('闪电猫 SpeedCAT 信息站'),
    category: z.string().default('使用指南'),
    keywords: z.array(z.string()).default([]),
    readTime: z.string().default('6 分钟'),
  }),
});

export const collections = { guides };

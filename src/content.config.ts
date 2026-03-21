import { defineCollection, reference } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";

const comparisonFieldSchema = z.enum([
  "players",
  "horrorLevel",
  "physicsChaos",
  "proximityChat",
  "progression",
  "priceLabel",
  "platforms",
  "tone",
  "sessionLength",
  "onboarding"
]);

const basePageFields = {
  title: z.string(),
  metaTitle: z.string().max(60),
  metaDescription: z.string().max(160),
  targetKeyword: z.string(),
  secondaryKeywords: z.array(z.string()).default([]),
  searchIntent: z.enum(["definition", "comparison", "recommendation"]),
  intro: z.string(),
  summary: z.string().optional(),
  draft: z.boolean().default(false),
  order: z.number().optional(),
  relatedPages: z.array(z.string()).default([]),
  gamesMentioned: z.array(reference("games")).default([]),
  keyTakeaways: z.array(z.string()).default([]),
  faq: z
    .array(
      z.object({
        q: z.string(),
        a: z.string()
      })
    )
    .default([]),
  updatedAt: z.coerce.date().optional()
};

const games = defineCollection({
  loader: file("src/data/games.json"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    players: z.string(),
    minPlayers: z.number().int().positive(),
    maxPlayers: z.number().int().positive(),
    horrorLevel: z.enum(["low", "medium", "high"]),
    physicsChaos: z.boolean(),
    proximityChat: z.boolean(),
    earlyAccess: z.boolean().default(false),
    officialUrl: z.string().url(),
    progression: z.enum(["low", "medium", "high"]),
    priceLabel: z.enum(["budget", "mid", "premium"]),
    tone: z.enum(["funny", "scary", "mixed"]),
    sessionLength: z.enum(["short", "medium", "long"]),
    onboarding: z.enum(["easy", "medium", "hard"]),
    platforms: z.array(z.string()),
    tags: z.array(z.string()).default([]),
    mechanics: z.array(z.string()).default([]),
    artwork: z
      .object({
        src: z.string(),
        alt: z.string()
      })
      .optional(),
    bestFor: z.string(),
    shortPitch: z.string()
  })
});

const pages = defineCollection({
  loader: glob({
    base: "./src/content/pages",
    pattern: "**/*.{md,mdx}"
  }),
  schema: z.discriminatedUnion("type", [
    z.object({
      ...basePageFields,
      type: z.literal("games_like"),
      featuredGame: reference("games"),
      shortlistGames: z.array(reference("games")).min(1),
      comparisonFields: z.array(comparisonFieldSchema).min(2)
    }),
    z.object({
      ...basePageFields,
      type: z.literal("best"),
      quickPickGames: z.array(reference("games")).min(1),
      comparisonFields: z.array(comparisonFieldSchema).min(2),
      rankingLabel: z.string()
    }),
    z.object({
      ...basePageFields,
      type: z.literal("explained"),
      exampleGames: z.array(reference("games")).min(1),
      glossaryLabel: z.string(),
      conceptPills: z.array(z.string()).default([])
    }),
    z.object({
      ...basePageFields,
      type: z.literal("feature"),
      comparedGames: z.array(reference("games")).min(2),
      comparisonFields: z.array(comparisonFieldSchema).min(2),
      winnerSummary: z.string()
    })
  ])
});

export const collections = { games, pages };

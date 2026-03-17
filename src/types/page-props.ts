import type { CollectionEntry } from "astro:content";

export type GameEntry = CollectionEntry<"games">;
export type PageEntry = CollectionEntry<"pages">;

export type SiteLink = {
  label: string;
  href: string;
  description?: string;
};

export type HomeHero = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: SiteLink;
  secondaryCta: SiteLink;
};

export type HomePageProps = {
  hero: HomeHero;
  shortcuts: SiteLink[];
  topPicks: SiteLink[];
  browseByVibe: SiteLink[];
  explainers: SiteLink[];
  comparisons: SiteLink[];
  fresh: SiteLink[];
};

export type HomeTemplateProps = {
  page: HomePageProps;
  games: GameEntry[];
};

export type ComparisonField =
  | "players"
  | "horrorLevel"
  | "physicsChaos"
  | "proximityChat"
  | "progression"
  | "priceLabel"
  | "platforms"
  | "tone"
  | "sessionLength"
  | "onboarding";

export type BaseTemplateProps = {
  page: PageEntry;
  relatedPages: PageEntry[];
};

export type GamesLikePageProps = BaseTemplateProps & {
  page: Extract<PageEntry, { data: { type: "games_like" } }>;
  games: GameEntry[];
  featuredGame: GameEntry;
  shortlistGames: GameEntry[];
  comparisonFields: ComparisonField[];
};

export type BestPageProps = BaseTemplateProps & {
  page: Extract<PageEntry, { data: { type: "best" } }>;
  games: GameEntry[];
  quickPickGames: GameEntry[];
  comparisonFields: ComparisonField[];
  rankingLabel: string;
};

export type ExplainedPageProps = BaseTemplateProps & {
  page: Extract<PageEntry, { data: { type: "explained" } }>;
  games: GameEntry[];
  exampleGames: GameEntry[];
  glossaryLabel: string;
  conceptPills: string[];
};

export type FeaturePageProps = BaseTemplateProps & {
  page: Extract<PageEntry, { data: { type: "feature" } }>;
  games: GameEntry[];
  comparedGames: GameEntry[];
  comparisonFields: ComparisonField[];
  winnerSummary: string;
};

export type ContentTemplateProps =
  | GamesLikePageProps
  | BestPageProps
  | ExplainedPageProps
  | FeaturePageProps;

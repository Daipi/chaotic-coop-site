import type { ComparisonField, GameEntry, PageEntry } from "../types/page-props";

const pageTypeLabels: Record<PageEntry["data"]["type"], string> = {
  games_like: "Games Like",
  best: "Best Of",
  explained: "Explained",
  feature: "Feature"
};

const comparisonFieldLabels: Record<ComparisonField, string> = {
  players: "Players",
  horrorLevel: "Horror",
  physicsChaos: "Physics chaos",
  proximityChat: "Proximity chat",
  progression: "Progression",
  priceLabel: "Price",
  platforms: "Platforms",
  tone: "Tone",
  sessionLength: "Session length",
  onboarding: "Onboarding"
};

const truthyLabels = {
  true: "Yes",
  false: "No"
};

export function pageHref(page: Pick<PageEntry, "id">): string {
  return `/${page.id}/`;
}

export function pageTypeLabel(type: PageEntry["data"]["type"]): string {
  return pageTypeLabels[type];
}

export function comparisonFieldLabel(field: ComparisonField): string {
  return comparisonFieldLabels[field];
}

export function formatDate(date?: Date): string | null {
  if (!date) {
    return null;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

export function formatComparisonValue(game: GameEntry, field: ComparisonField): string {
  const value = game.data[field];

  if (field === "platforms" && Array.isArray(value)) {
    return value.join(", ");
  }

  if (field === "physicsChaos" || field === "proximityChat") {
    return truthyLabels[String(value) as keyof typeof truthyLabels];
  }

  if (typeof value === "string") {
    return value.replace("-", " ");
  }

  return String(value);
}

export function gameSignalLabels(game: GameEntry): string[] {
  const labels = [
    game.data.horrorLevel === "high"
      ? "High fear"
      : game.data.horrorLevel === "medium"
        ? "Medium fear"
        : "Low fear",
    game.data.physicsChaos ? "Physics chaos" : null,
    game.data.proximityChat ? "Proximity chat" : null
  ];

  return labels.filter((label): label is string => Boolean(label));
}

export function sortPagesByIds(pages: PageEntry[], ids: string[]): PageEntry[] {
  const pageMap = new Map(pages.map((page) => [page.id, page]));

  return ids.map((id) => pageMap.get(id)).filter((page): page is PageEntry => Boolean(page));
}

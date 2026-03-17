import type { ComparisonField, GameEntry } from "../types/page-props";

export type ExplorerFilterOption = {
  value: string;
  label: string;
};

export type ExplorerFilterGroup = {
  key: ComparisonField;
  label: string;
  options: ExplorerFilterOption[];
};

const filterGroupLabels: Record<ComparisonField, string> = {
  players: "Group Size",
  horrorLevel: "Horror Level",
  physicsChaos: "Physics",
  proximityChat: "Voice Features",
  progression: "Progression",
  priceLabel: "Price",
  platforms: "Platform",
  tone: "Tone",
  sessionLength: "Session Length",
  onboarding: "Onboarding"
};

const filterValueLabels: Partial<Record<ComparisonField, Record<string, string>>> = {
  players: {
    "small-team": "1-4 players",
    party: "5+ players"
  },
  horrorLevel: {
    low: "Low fear",
    medium: "Medium fear",
    high: "High fear"
  },
  physicsChaos: {
    yes: "Physics-heavy"
  },
  proximityChat: {
    yes: "Proximity chat"
  },
  progression: {
    low: "Low progression",
    medium: "Medium progression",
    high: "High progression"
  },
  priceLabel: {
    budget: "Budget",
    mid: "Mid-range",
    premium: "Premium"
  },
  tone: {
    funny: "Funny",
    mixed: "Mixed",
    scary: "Scary"
  },
  sessionLength: {
    short: "Short sessions",
    medium: "Medium sessions",
    long: "Long sessions"
  },
  onboarding: {
    easy: "Easy to learn",
    medium: "Medium ramp",
    hard: "Harder ramp"
  }
};

const filterValueOrders: Partial<Record<ComparisonField, string[]>> = {
  players: ["small-team", "party"],
  horrorLevel: ["low", "medium", "high"],
  tone: ["funny", "mixed", "scary"],
  progression: ["low", "medium", "high"],
  priceLabel: ["budget", "mid", "premium"],
  sessionLength: ["short", "medium", "long"],
  onboarding: ["easy", "medium", "hard"]
};

function toSlug(input: string): string {
  return input.toLowerCase().replace(/\s+/g, "-");
}

function sortFilterValues(field: ComparisonField, values: string[]): string[] {
  const ordered = filterValueOrders[field];

  if (!ordered) {
    return [...values].sort((left, right) => left.localeCompare(right));
  }

  return [...values].sort((left, right) => ordered.indexOf(left) - ordered.indexOf(right));
}

export function filterValuesForGame(game: GameEntry, field: ComparisonField): string[] {
  switch (field) {
    case "players": {
      const buckets = new Set<string>();

      if (game.data.minPlayers <= 4) {
        buckets.add("small-team");
      }

      if (game.data.maxPlayers >= 5) {
        buckets.add("party");
      }

      return [...buckets];
    }
    case "physicsChaos":
      return game.data.physicsChaos ? ["yes"] : [];
    case "proximityChat":
      return game.data.proximityChat ? ["yes"] : [];
    case "platforms":
      return game.data.platforms.map((platform) => toSlug(platform));
    default: {
      const value = game.data[field];
      return typeof value === "string" ? [value] : [];
    }
  }
}

export function filterLabelForValue(field: ComparisonField, value: string): string {
  if (field === "platforms") {
    return value
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }

  return filterValueLabels[field]?.[value] ?? value;
}

export function buildExplorerFilterGroups(
  games: GameEntry[],
  filterKeys: ComparisonField[]
): ExplorerFilterGroup[] {
  const uniqueKeys = [...new Set(filterKeys)];

  return uniqueKeys
    .map((key) => {
      const values = new Set<string>();

      for (const game of games) {
        for (const value of filterValuesForGame(game, key)) {
          values.add(value);
        }
      }

      const orderedValues = sortFilterValues(key, [...values]);

      if (orderedValues.length < 2) {
        return null;
      }

      return {
        key,
        label: filterGroupLabels[key],
        options: orderedValues.map((value) => ({
          value,
          label: filterLabelForValue(key, value)
        }))
      };
    })
    .filter((group): group is ExplorerFilterGroup => Boolean(group));
}

export function explorerDataForGame(game: GameEntry) {
  return {
    players: filterValuesForGame(game, "players").join("|"),
    horrorLevel: filterValuesForGame(game, "horrorLevel").join("|"),
    physicsChaos: filterValuesForGame(game, "physicsChaos").join("|"),
    proximityChat: filterValuesForGame(game, "proximityChat").join("|"),
    progression: filterValuesForGame(game, "progression").join("|"),
    priceLabel: filterValuesForGame(game, "priceLabel").join("|"),
    platforms: filterValuesForGame(game, "platforms").join("|"),
    tone: filterValuesForGame(game, "tone").join("|"),
    sessionLength: filterValuesForGame(game, "sessionLength").join("|"),
    onboarding: filterValuesForGame(game, "onboarding").join("|")
  };
}


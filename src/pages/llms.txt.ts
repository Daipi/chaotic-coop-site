import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { pageHref } from "../lib/page-utils";

export const prerender = true;

const typeLabels = {
  games_like: "Recommendation pages",
  best: "Best-of lists",
  explained: "Explainers",
  feature: "Comparison and intent-split pages"
} as const;

function toPublicUrl(path: string, site?: URL): string {
  const hasRealSite = Boolean(site) && site.hostname !== "example.com";

  return hasRealSite ? new URL(path, site).toString() : path;
}

export const GET: APIRoute = async ({ site }) => {
  const pages = await getCollection("pages", ({ data }) => !data.draft);
  const sectionOrder: Array<keyof typeof typeLabels> = ["games_like", "best", "explained", "feature"];
  const lines = [
    "# CoopQueue",
    "",
    "> English editorial site about chaotic co-op, physics-heavy co-op horror, and games like R.E.P.O.",
    "",
    "## Homepage",
    `- CoopQueue: ${toPublicUrl("/", site)}`,
    "",
    "## Coverage",
    "- Topics: chaotic co-op, co-op horror, physics-heavy multiplayer, proximity chat horror",
    "- Audience: English-speaking PC players looking for recommendation and explainer content",
    "- Format: static editorial pages with comparison tables and internal links",
    ""
  ];

  for (const type of sectionOrder) {
    const sectionPages = pages
      .filter((page) => page.data.type === type)
      .sort((left, right) => left.data.title.localeCompare(right.data.title));

    if (sectionPages.length === 0) {
      continue;
    }

    lines.push(`## ${typeLabels[type]}`);

    for (const page of sectionPages) {
      lines.push(`- ${page.data.title}: ${toPublicUrl(pageHref(page), site)}`);
    }

    lines.push("");
  }

  lines.push("## Notes");
  lines.push("- The site is written in English.");
  lines.push("- URLs become absolute automatically when SITE_URL is configured at build time.");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
};

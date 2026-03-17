import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const hasRealSite = Boolean(site) && site.hostname !== "example.com";
  const lines = ["User-agent: *", "Allow: /"];

  if (hasRealSite) {
    lines.push("", `Sitemap: ${new URL("/sitemap-index.xml", site).toString()}`);
  }

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
};

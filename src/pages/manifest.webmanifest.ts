import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = () => {
  const manifest = {
    name: "CoopQueue",
    short_name: "CoopQueue",
    description: "Editorial site about chaotic co-op, physics horror, and games like R.E.P.O.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f0efed",
    theme_color: "#f0efed",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any"
      }
    ]
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      "Content-Type": "application/manifest+json; charset=utf-8"
    }
  });
};

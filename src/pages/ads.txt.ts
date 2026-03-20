import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = () => {
  const configuredLines = import.meta.env.ADS_TXT_LINES?.trim();
  const body =
    configuredLines ||
    "# ads.txt intentionally empty until ad networks are enabled.";

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
};

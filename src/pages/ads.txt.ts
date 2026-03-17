import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = () => {
  const configuredLines = import.meta.env.ADS_TXT_LINES?.trim();
  const body =
    configuredLines ||
    [
      "# Configure ADS_TXT_LINES before enabling ad networks.",
      "# Example:",
      "# google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0"
    ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
};

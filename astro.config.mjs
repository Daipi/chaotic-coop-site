import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

const site = process.env.SITE_URL;

export default defineConfig({
  site,
  integrations: site ? [mdx(), sitemap()] : [mdx()]
});

import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

const site = process.env.SITE_URL;

export default defineConfig({
  site,
  integrations: site ? [mdx()] : [mdx()]
});

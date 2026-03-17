# Chaotic Co-op Site

Astro static site for an English editorial project about chaotic co-op games, discovery guides, and `games like R.E.P.O.` style recommendations.

## What is included

- Astro v5 static build
- Content collections for `pages` and `games`
- Editorial content pages with reusable templates
- Structured data, sitemap support, `robots.txt`, `llms.txt`, manifest, favicon
- Compliance pages: about, contact, privacy policy, terms, disclosure
- Vercel deployment config with basic security headers

## Local development

```bash
npm install
cp .env.example .env
npm run dev
```

## Environment variables

```bash
SITE_URL=https://www.your-domain.com
PUBLIC_SITE_NAME=Chaotic Co-op Site
PUBLIC_ORGANIZATION_NAME=Chaotic Co-op Site
PUBLIC_CONTACT_EMAIL=contact@your-domain.com
ADS_TXT_LINES=google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

`SITE_URL` should be set in production so canonical URLs, Open Graph URLs, and sitemap output use the real domain.

`PUBLIC_CONTACT_EMAIL` should be replaced before launch. The default placeholder is only there to keep legal pages renderable during development.

`ADS_TXT_LINES` should match the ad network account you actually use. Do not publish example values in production.

## Deploy to Vercel

1. Import the project into Vercel.
2. Set the environment variables from `.env.example`.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy as a static Astro site.

The included `vercel.json` adds basic security headers. If you deploy elsewhere, keep equivalent headers at the platform layer.

## Release verification

After building with production-like environment variables, run:

```bash
npm run verify:release
```

The script checks:

- placeholder env values are gone
- `dist/` contains the required compliance and crawler files
- sitemap, canonical tags, and `og:url` use the configured `SITE_URL`
- contact page renders the configured inbox
- `ads.txt` matches `ADS_TXT_LINES` when set

## CI

If the project is hosted on GitHub, the workflow at `.github/workflows/release-check.yml` will:

- install dependencies with `npm ci`
- build with non-placeholder production-like env values
- run `npm run verify:release`
- upload the generated `dist/` bundle as a workflow artifact

## Live verification

After the production site is deployed, run:

```bash
npm run verify:live -- https://www.your-domain.com contact@your-domain.com 'google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0'
```

See `docs/deploy-vercel.md` for the full Vercel deployment and post-deploy checklist.

## Launch checklist

- Set `SITE_URL` to the production domain.
- Replace `PUBLIC_CONTACT_EMAIL` with a real monitored inbox.
- Replace `ADS_TXT_LINES` with your real ad network record before enabling ads.
- Review privacy policy again before enabling ads, analytics, or affiliate links.
- If ads are added later, update `privacy-policy` and `disclosure` before switching them on.
- Rebuild and verify `robots.txt`, `llms.txt`, and `sitemap-index.xml` on the production URL.

## Structure

```text
src/
  content/
    pages/
      best/
      explained/
      features/
      games-like/
  data/
    games.json
  layouts/
    BaseLayout.astro
  lib/
    home-data.ts
    site-config.ts
  pages/
    [...slug].astro
    about.astro
    contact.astro
    disclosure.astro
    privacy-policy.astro
    terms.astro
    index.astro
  types/
    page-props.ts
```

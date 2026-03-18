# Deploy to Vercel

This project is already prepared as a static Astro site. The remaining work is mostly environment setup and post-deploy checks.

## 1. Push the repository

Push the project to a Git provider that Vercel can import.

## 2. Import into Vercel

Create a new Vercel project from the repository.

Recommended build settings:

- Framework preset: `Astro`
- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: `dist`

## 3. Configure production environment variables

Add these in the Vercel project settings:

```bash
SITE_URL=https://www.your-domain.com
PUBLIC_SITE_NAME=CoopQueue
PUBLIC_ORGANIZATION_NAME=CoopQueue
PUBLIC_CONTACT_EMAIL=contact@your-domain.com
ADS_TXT_LINES=google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

Notes:

- `SITE_URL` must be the final canonical production domain.
- `PUBLIC_CONTACT_EMAIL` must be a real monitored inbox.
- If ads are not enabled yet, you can leave `ADS_TXT_LINES` empty or omit it. The site will still expose `/ads.txt`, but with placeholder guidance text.
- Once real ads go live, replace `ADS_TXT_LINES` with the exact record required by the ad network.

## 4. Attach the domain

In Vercel:

1. Add the production domain.
2. Complete DNS setup.
3. Wait for the domain to become active.

The production domain must match `SITE_URL`.

## 5. Deploy

Trigger a production deployment after the environment variables are in place.

## 6. Verify the built package locally first

Before relying on the Vercel deployment, you can run the local release check with production-like values:

```bash
SITE_URL=https://www.your-domain.com \
PUBLIC_CONTACT_EMAIL=contact@your-domain.com \
ADS_TXT_LINES='google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0' \
npm run build

SITE_URL=https://www.your-domain.com \
PUBLIC_CONTACT_EMAIL=contact@your-domain.com \
ADS_TXT_LINES='google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0' \
npm run verify:release
```

## 7. Verify the live deployment

After Vercel is live, run:

```bash
npm run verify:live -- https://www.your-domain.com contact@your-domain.com 'google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0'
```

That command checks:

- homepage and key content pages return `200`
- `robots.txt`, `llms.txt`, `ads.txt`, `manifest.webmanifest`, and `sitemap-index.xml` are reachable
- canonical URLs and `og:url` match the live domain
- contact page renders the expected email
- `ads.txt` matches the expected ad line if provided
- a fake missing URL returns `404` or at least warns if the platform is misconfigured

## 8. Manual post-deploy checks

These are still worth checking in a browser:

- homepage hero and cards look correct on desktop and mobile
- contact, privacy, disclosure, and terms pages are reachable from the footer
- 404 page renders with the custom design
- social preview tags look correct when tested with a card debugger
- if ads are enabled, policy/disclosure copy reflects the real setup

## 9. Search console follow-up

After the live domain is stable:

1. submit the sitemap in Google Search Console
2. submit the sitemap in Bing Webmaster Tools
3. monitor index coverage and crawl issues

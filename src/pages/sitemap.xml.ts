import { prerender } from 'astro:env/server';
import sitemapDates from '../data/sitemap-dates.json' with { type: 'json' };

export const GET = async ({ site }) => {
  if (!site || site.hostname === 'example.com') {
    return new Response('', { status: 404 });
  }

  // All known URLs with their dates and frequencies
  const pages = Object.entries(sitemapDates).map(([url, lastmod]) => {
    const changefreq = url.startsWith('/features/') || url.startsWith('/games-like/') || url.startsWith('/best/') || url.startsWith('/blog/')
      ? 'weekly' : 'daily';
    return { url, lastmod, changefreq };
  });

  // Add static pages with today's date
  const today = new Date().toISOString().split('T')[0];
  const staticPages = ['/about/', '/contact/', '/disclosure/', '/privacy-policy/', '/terms/'];
  for (const url of staticPages) {
    if (!pages.find(p => p.url === url)) {
      pages.push({ url, lastmod: today, changefreq: 'monthly' });
    }
  }

  // Sort by URL
  pages.sort((a, b) => a.url.localeCompare(b.url));

  const siteHref = site.href.endsWith('/') ? site.href : site.href + '/';

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
  xml += 'xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" ';
  xml += 'xmlns:xhtml="http://www.w3.org/1999/xhtml" ';
  xml += 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" ';
  xml += 'xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';

  for (const { url, lastmod, changefreq } of pages) {
    const fullUrl = new URL(url, siteHref).href;
    xml += '  <url>\n';
    xml += `    <loc>${fullUrl}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' }
  });
};

export const prerender = true;

export function GET({ site }) {
  if (!site || site.hostname === 'example.com') {
    return new Response('', { status: 404 });
  }

  const today = new Date().toISOString().split('T')[0];
  const sitemapUrl = new URL('/sitemap.xml', site.href.endsWith('/') ? site.href : site.href + '/').href;

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  xml += '  <sitemap>\n';
  xml += `    <loc>${sitemapUrl}</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += '  </sitemap>\n';
  xml += '</sitemapindex>\n';

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' }
  });
}

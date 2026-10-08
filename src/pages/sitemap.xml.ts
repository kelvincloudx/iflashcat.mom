import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const domain = 'https://iflashcat.mom';
  const currentDate = '2026-03-21';

  const urls = [
    { loc: `${domain}/`, priority: '1.0', changefreq: 'daily' },
    { loc: `${domain}/pricing/`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${domain}/guides/`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${domain}/faq/`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${domain}/guides/speedcat-plans/`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${domain}/guides/speedcat-windows/`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${domain}/guides/speedcat-clashparty/`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${domain}/guides/speedcat-nodes/`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${domain}/guides/speedcat-data/`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${domain}/guides/speedcat-mobile/`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${domain}/guides/speedcat-troubleshooting/`, priority: '0.7', changefreq: 'monthly' },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (item) => `  <url>
    <loc>${item.loc}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};

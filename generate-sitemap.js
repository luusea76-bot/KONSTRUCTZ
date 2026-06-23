import fs from 'fs';

const baseUrl = 'https://konstructzmachinery.com';
const lastmod = '2026-06-19';

// 1. Core pages
const pages = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: '/?page=all-products', priority: '0.9', changefreq: 'weekly' },
  { path: '/?page=attachments', priority: '0.9', changefreq: 'weekly' },
  { path: '/?page=blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/?page=topic', priority: '0.8', changefreq: 'monthly' },
  { path: '/?page=about', priority: '0.7', changefreq: 'monthly' },
  { path: '/?page=contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/?page=support', priority: '0.7', changefreq: 'monthly' },
];

const categories = [
  'Konstructz',
  'Mini Excavator',
  'Wheel Loader',
  'Skid Steer',
  'Forklift',
  'Road Roller',
  'Scissor Lifts',
  'Backhoe'
];

categories.forEach(category => {
  pages.push({
    path: `/?page=all-products&category=${encodeURIComponent(category)}`,
    priority: '0.8',
    changefreq: 'weekly'
  });
});

const blogPosts = [
  { slug: 'excavator-maintenance-tips', updatedDate: '2026-06-17' },
  { slug: 'choosing-wheel-loaders-and-skid-steers', updatedDate: '2026-06-17' },
  { slug: 'heavy-machinery-jobsite-safety', updatedDate: '2026-06-17' },
  { slug: 'future-of-construction-technology', updatedDate: '2026-06-17' }
];

blogPosts.forEach(post => {
  pages.push({
    path: `/?page=blog-post&id=${post.slug}`,
    priority: '0.75',
    changefreq: 'monthly',
    lastmod: post.updatedDate
  });
});

// 2. Read equipment products JSON
try {
  const rawProducts = fs.readFileSync('src/data/equipment-products.json', 'utf8');
  const products = JSON.parse(rawProducts);
  products.forEach(p => {
    if (p.slug) {
      pages.push({
        path: `/?page=product-detail&id=${p.slug}`,
        priority: '0.8',
        changefreq: 'weekly'
      });
    }
  });
} catch (e) {
  console.warn('Could not read or parse equipment-products.json:', e.message);
}

// 3. Read catalog.js for featured products and attachments
try {
  const catalogContent = fs.readFileSync('src/data/catalog.js', 'utf8');
  const idRegex = /id:\s*["']([^"']+)["']/g;
  let match;
  const catalogIds = new Set();
  while ((match = idRegex.exec(catalogContent)) !== null) {
    const id = match[1];
    if (id.startsWith('featured-') || id.startsWith('imported-')) {
      catalogIds.add(id);
    }
  }
  catalogIds.forEach(id => {
    pages.push({
      path: `/?page=product-detail&id=${id}`,
      priority: '0.65',
      changefreq: 'weekly'
    });
  });
} catch (e) {
  console.warn('Could not read or parse catalog.js:', e.message);
}

// 4. Generate XML sitemap
const uniquePages = Array.from(
  new Map(pages.map(page => [page.path, page])).values()
);

const xmlEntries = uniquePages.map(page => {
  const url = `${baseUrl}${page.path}`;
  const escapedUrl = url.replace(/&/g, '&amp;');
  return `  <url>
    <loc>${escapedUrl}</loc>
    <lastmod>${page.lastmod || lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
});

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries.join('\n')}
</urlset>`;

fs.writeFileSync('public/sitemap.xml', sitemapXml, 'utf8');
console.log(`Successfully generated sitemap with ${uniquePages.length} URLs in public/sitemap.xml`);

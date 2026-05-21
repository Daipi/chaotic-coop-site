#!/usr/bin/env node
// Extracts updatedAt dates from content frontmatter for sitemap generation
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

function getAllMdx(dir) {
  let results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getAllMdx(fullPath));
    } else if (entry.name.endsWith('.mdx')) {
      results.push(fullPath);
    }
  }
  return results;
}

const baseDir = 'src/content';
const pageFiles = getAllMdx(join(baseDir, 'pages'));
const blogFiles = getAllMdx(join(baseDir, 'blog'));
const dateMap = {};

for (const file of pageFiles) {
  const content = readFileSync(file, 'utf-8');
  const match = content.match(/updatedAt:\s*(\d{4}-\d{2}-\d{2})/);
  if (match) {
    const slug = file.replace(/^src\/content\/pages\//, '').replace(/\.mdx$/, '');
    const url = `/${slug}/`;
    dateMap[url] = match[1];
  }
}

// Add blog posts
for (const file of blogFiles) {
  const content = readFileSync(file, 'utf-8');
  const match = content.match(/updatedAt:\s*(\d{4}-\d{2}-\d{2})/);
  if (match) {
    const slug = file.replace(/^src\/content\/blog\//, '').replace(/\.mdx$/, '');
    const url = `/blog/${slug}/`;
    dateMap[url] = match[1];
  }
}

// Add blog listing page
dateMap['/blog/'] = new Date().toISOString().split('T')[0];

// Add homepage with today's date
dateMap['/'] = new Date().toISOString().split('T')[0];

writeFileSync('src/data/sitemap-dates.json', JSON.stringify(dateMap, null, 2) + '\n');
console.log(`Wrote ${Object.keys(dateMap).length} dates to src/data/sitemap-dates.json`);

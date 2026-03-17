import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

function parseEnvFile(contents) {
  const result = {};

  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    result[key] = value;
  }

  return result;
}

function loadLocalEnv() {
  const fileNames = [".env", ".env.local", ".env.production", ".env.production.local"];
  const loaded = {};

  for (const fileName of fileNames) {
    const filePath = path.join(rootDir, fileName);

    if (!fs.existsSync(filePath)) {
      continue;
    }

    Object.assign(loaded, parseEnvFile(fs.readFileSync(filePath, "utf8")));
  }

  return {
    ...loaded,
    ...process.env
  };
}

function isPlaceholderSiteUrl(value) {
  if (!value) {
    return true;
  }

  try {
    const url = new URL(value);
    return ["example.com", "www.example.com", "your-domain.com", "www.your-domain.com"].includes(
      url.hostname
    );
  } catch {
    return true;
  }
}

function isPlaceholderEmail(value) {
  if (!value) {
    return true;
  }

  return ["contact@example.com", "contact@your-domain.com"].includes(value);
}

function isPlaceholderAdsLine(value) {
  if (!value) {
    return true;
  }

  return value.includes("pub-XXXXXXXXXXXXXXXX");
}

function assertFile(relativePath, failures) {
  const absolutePath = path.join(distDir, relativePath);

  if (!fs.existsSync(absolutePath)) {
    failures.push(`Missing build artifact: dist/${relativePath}`);
    return null;
  }

  return absolutePath;
}

function assertIncludes(filePath, expected, description, failures) {
  const contents = fs.readFileSync(filePath, "utf8");

  if (!contents.includes(expected)) {
    failures.push(`${description} not found in ${path.relative(rootDir, filePath)}`);
  }
}

function printSection(title, items) {
  console.log(`\n${title}`);

  for (const item of items) {
    console.log(`- ${item}`);
  }
}

const env = loadLocalEnv();
const failures = [];
const warnings = [];
const passes = [];

if (!fs.existsSync(distDir)) {
  failures.push("Missing dist/ directory. Run `npm run build` before `npm run verify:release`.");
}

const siteUrlRaw = env.SITE_URL?.trim();
const contactEmail = env.PUBLIC_CONTACT_EMAIL?.trim();
const adsTxtLines = env.ADS_TXT_LINES?.trim();

if (!siteUrlRaw) {
  failures.push("SITE_URL is missing.");
} else if (isPlaceholderSiteUrl(siteUrlRaw)) {
  failures.push("SITE_URL is still using a placeholder domain.");
}

let siteUrl;

if (!failures.length || siteUrlRaw) {
  try {
    siteUrl = new URL(siteUrlRaw);

    if (!["http:", "https:"].includes(siteUrl.protocol)) {
      failures.push("SITE_URL must use http or https.");
    } else if (siteUrl.protocol !== "https:") {
      warnings.push("SITE_URL is not https. Production should normally use https.");
    } else {
      passes.push(`SITE_URL looks valid: ${siteUrl.toString()}`);
    }
  } catch {
    failures.push("SITE_URL is not a valid absolute URL.");
  }
}

if (!contactEmail) {
  failures.push("PUBLIC_CONTACT_EMAIL is missing.");
} else if (isPlaceholderEmail(contactEmail) || contactEmail.endsWith("@example.com")) {
  failures.push("PUBLIC_CONTACT_EMAIL is still using a placeholder inbox.");
} else if (!contactEmail.includes("@")) {
  failures.push("PUBLIC_CONTACT_EMAIL is not a valid email address.");
} else {
  passes.push(`PUBLIC_CONTACT_EMAIL looks valid: ${contactEmail}`);
}

if (!adsTxtLines) {
  warnings.push("ADS_TXT_LINES is empty. That is fine if ads are not enabled yet.");
} else if (isPlaceholderAdsLine(adsTxtLines)) {
  warnings.push("ADS_TXT_LINES still uses the example publisher ID.");
} else {
  passes.push("ADS_TXT_LINES is configured.");
}

if (fs.existsSync(distDir)) {
  const requiredFiles = [
    "index.html",
    "404.html",
    "robots.txt",
    "llms.txt",
    "manifest.webmanifest",
    "ads.txt",
    "about/index.html",
    "contact/index.html",
    "privacy-policy/index.html",
    "disclosure/index.html",
    "terms/index.html",
    "games-like/repo/index.html"
  ];

  const resolvedFiles = requiredFiles.map((relativePath) => assertFile(relativePath, failures));

  if (siteUrl && !isPlaceholderSiteUrl(siteUrl.toString())) {
    const sitemapPath = assertFile("sitemap-index.xml", failures);
    const robotsPath = path.join(distDir, "robots.txt");
    const indexPath = path.join(distDir, "index.html");
    const contentPath = path.join(distDir, "games-like/repo/index.html");

    if (sitemapPath) {
      passes.push("sitemap-index.xml was generated.");
    }

    if (fs.existsSync(robotsPath)) {
      assertIncludes(
        robotsPath,
        `Sitemap: ${new URL("/sitemap-index.xml", siteUrl).toString()}`,
        "Sitemap line",
        failures
      );
    }

    if (fs.existsSync(indexPath)) {
      assertIncludes(
        indexPath,
        `<link rel="canonical" href="${new URL("/", siteUrl).toString()}">`,
        "Homepage canonical",
        failures
      );
      assertIncludes(
        indexPath,
        `<meta property="og:url" content="${new URL("/", siteUrl).toString()}">`,
        "Homepage og:url",
        failures
      );
    }

    if (fs.existsSync(contentPath)) {
      assertIncludes(
        contentPath,
        `<link rel="canonical" href="${new URL("/games-like/repo/", siteUrl).toString()}">`,
        "Content canonical",
        failures
      );
      assertIncludes(
        contentPath,
        `<meta property="og:url" content="${new URL("/games-like/repo/", siteUrl).toString()}">`,
        "Content og:url",
        failures
      );
    }
  }

  const manifestPath = path.join(distDir, "manifest.webmanifest");
  const contactPath = path.join(distDir, "contact/index.html");
  const adsPath = path.join(distDir, "ads.txt");
  const notFoundPath = path.join(distDir, "404.html");

  if (fs.existsSync(manifestPath)) {
    assertIncludes(manifestPath, '"theme_color": "#f0efed"', "Manifest theme color", failures);
  }

  if (fs.existsSync(contactPath)) {
    const contactContents = fs.readFileSync(contactPath, "utf8");

    if (contactEmail && !contactContents.includes(contactEmail)) {
      failures.push("Configured contact email was not rendered into contact page output.");
    }

    if (
      contactEmail &&
      !isPlaceholderEmail(contactEmail) &&
      contactContents.includes("contact@example.com")
    ) {
      failures.push("Contact page still contains placeholder email after configuration.");
    }
  }

  if (fs.existsSync(adsPath)) {
    const adsContents = fs.readFileSync(adsPath, "utf8");

    if (adsTxtLines && !isPlaceholderAdsLine(adsTxtLines) && !adsContents.includes(adsTxtLines)) {
      failures.push("ads.txt does not contain ADS_TXT_LINES from environment.");
    }

    if (!adsTxtLines || isPlaceholderAdsLine(adsTxtLines)) {
      warnings.push("dist/ads.txt is still using placeholder guidance text.");
    }
  }

  if (fs.existsSync(notFoundPath)) {
    assertIncludes(notFoundPath, 'meta name="robots" content="noindex,follow"', "404 robots meta", failures);
  }

  if (resolvedFiles.every(Boolean)) {
    passes.push("Core build artifacts are present.");
  }
}

if (passes.length > 0) {
  printSection("Checks passed", passes);
}

if (warnings.length > 0) {
  printSection("Warnings", warnings);
}

if (failures.length > 0) {
  printSection("Failures", failures);
  process.exit(1);
}

console.log("\nRelease verification passed.");

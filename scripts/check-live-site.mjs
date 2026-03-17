import process from "node:process";

function usage() {
  console.error(
    [
      "Usage:",
      "  npm run verify:live -- <site-url> [expected-contact-email] [expected-ads-line]",
      "",
      "Example:",
      "  npm run verify:live -- https://www.example.com contact@example.com 'google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0'"
    ].join("\n")
  );
}

function normalizeBaseUrl(input) {
  const url = new URL(input);

  if (!url.pathname.endsWith("/")) {
    url.pathname = `${url.pathname}/`;
  }

  return url;
}

function canonicalFor(baseUrl, pathName) {
  return new URL(pathName, baseUrl).toString();
}

async function fetchText(baseUrl, pathName, expectedStatus = 200) {
  const url = new URL(pathName, baseUrl);

  try {
    const response = await fetch(url, {
      redirect: "follow"
    });

    const body = await response.text();

    return {
      url: url.toString(),
      status: response.status,
      ok: response.status === expectedStatus,
      body
    };
  } catch (error) {
    return {
      url: url.toString(),
      status: 0,
      ok: false,
      body: "",
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

function requireMatch(haystack, needle, description, failures, sourceLabel) {
  if (!haystack.includes(needle)) {
    failures.push(`${description} missing in ${sourceLabel}`);
  }
}

function firstLocFromSitemapIndex(xml) {
  const match = xml.match(/<loc>([^<]+)<\/loc>/i);
  return match ? match[1] : null;
}

const [siteUrlArg, expectedEmail, expectedAdsLine] = process.argv.slice(2);

if (!siteUrlArg) {
  usage();
  process.exit(1);
}

const baseUrl = normalizeBaseUrl(siteUrlArg);
const failures = [];
const warnings = [];
const passes = [];

const homepage = await fetchText(baseUrl, "/");
const repoPage = await fetchText(baseUrl, "/games-like/repo/");
const contactPage = await fetchText(baseUrl, "/contact/");
const robotsFile = await fetchText(baseUrl, "/robots.txt");
const llmsFile = await fetchText(baseUrl, "/llms.txt");
const adsFile = await fetchText(baseUrl, "/ads.txt");
const manifestFile = await fetchText(baseUrl, "/manifest.webmanifest");
const sitemapFile = await fetchText(baseUrl, "/sitemap-index.xml");
const notFoundPage = await fetchText(baseUrl, "/this-page-should-not-exist-release-check", 404);
let sitemapContentFile = null;

for (const [label, result] of [
  ["Homepage", homepage],
  ["Games like R.E.P.O. page", repoPage],
  ["Contact page", contactPage],
  ["robots.txt", robotsFile],
  ["llms.txt", llmsFile],
  ["ads.txt", adsFile],
  ["manifest.webmanifest", manifestFile],
  ["sitemap-index.xml", sitemapFile]
]) {
  if (!result.ok) {
    failures.push(
      result.error
        ? `${label} request failed: ${result.error}`
        : `${label} returned ${result.status}, expected 200`
    );
  } else {
    passes.push(`${label} returned 200`);
  }
}

if (homepage.ok) {
  requireMatch(
    homepage.body,
    `<link rel="canonical" href="${canonicalFor(baseUrl, "/")}">`,
    "Homepage canonical",
    failures,
    homepage.url
  );
  requireMatch(
    homepage.body,
    `<meta property="og:url" content="${canonicalFor(baseUrl, "/")}">`,
    "Homepage og:url",
    failures,
    homepage.url
  );
}

if (repoPage.ok) {
  requireMatch(
    repoPage.body,
    `<link rel="canonical" href="${canonicalFor(baseUrl, "/games-like/repo/")}">`,
    "Content canonical",
    failures,
    repoPage.url
  );
  requireMatch(
    repoPage.body,
    `<meta property="og:url" content="${canonicalFor(baseUrl, "/games-like/repo/")}">`,
    "Content og:url",
    failures,
    repoPage.url
  );
}

if (robotsFile.ok) {
  requireMatch(
    robotsFile.body,
    `Sitemap: ${canonicalFor(baseUrl, "/sitemap-index.xml")}`,
    "robots.txt sitemap line",
    failures,
    robotsFile.url
  );
}

if (sitemapFile.ok) {
  requireMatch(
    sitemapFile.body,
    canonicalFor(baseUrl, "/sitemap-0.xml"),
    "sitemap index child entry",
    failures,
    sitemapFile.url
  );

  const childSitemapUrl = firstLocFromSitemapIndex(sitemapFile.body);

  if (!childSitemapUrl) {
    failures.push(`Could not find a child sitemap in ${sitemapFile.url}`);
  } else {
    try {
      const childUrl = new URL(childSitemapUrl);
      sitemapContentFile = await fetchText(baseUrl, childUrl.pathname);

      if (!sitemapContentFile.ok) {
        failures.push(
          sitemapContentFile.error
            ? `Child sitemap request failed: ${sitemapContentFile.error}`
            : `Child sitemap returned ${sitemapContentFile.status}, expected 200`
        );
      } else {
        passes.push("Child sitemap returned 200");
        requireMatch(
          sitemapContentFile.body,
          canonicalFor(baseUrl, "/games-like/repo/"),
          "sitemap content URL",
          failures,
          sitemapContentFile.url
        );
      }
    } catch {
      failures.push(`Invalid child sitemap URL in ${sitemapFile.url}`);
    }
  }
}

if (manifestFile.ok) {
  requireMatch(
    manifestFile.body,
    '"theme_color": "#f0efed"',
    "Manifest theme color",
    failures,
    manifestFile.url
  );
}

if (contactPage.ok && expectedEmail) {
  requireMatch(
    contactPage.body,
    expectedEmail,
    "Configured contact email",
    failures,
    contactPage.url
  );

  if (expectedEmail !== "contact@example.com" && contactPage.body.includes("contact@example.com")) {
    failures.push(`Placeholder contact email still appears in ${contactPage.url}`);
  }
}

if (adsFile.ok) {
  if (expectedAdsLine) {
    requireMatch(
      adsFile.body,
      expectedAdsLine,
      "ads.txt line",
      failures,
      adsFile.url
    );
  } else if (adsFile.body.includes("pub-XXXXXXXXXXXXXXXX")) {
    warnings.push("ads.txt still shows the placeholder publisher ID.");
  }
}

if (notFoundPage.ok) {
  passes.push("Missing page returned 404");
} else if (notFoundPage.status === 200) {
  warnings.push("Missing page returned 200. Check platform 404 configuration.");
} else if (notFoundPage.status > 0) {
  warnings.push(`Missing page returned ${notFoundPage.status} instead of 404.`);
} else if (notFoundPage.error) {
  warnings.push(`Could not verify 404 behavior: ${notFoundPage.error}`);
}

if (notFoundPage.body && !notFoundPage.body.includes("Page not found")) {
  warnings.push("404 body does not include the expected page-not-found copy.");
}

if (passes.length > 0) {
  console.log("\nChecks passed");

  for (const pass of passes) {
    console.log(`- ${pass}`);
  }
}

if (warnings.length > 0) {
  console.log("\nWarnings");

  for (const warning of warnings) {
    console.log(`- ${warning}`);
  }
}

if (failures.length > 0) {
  console.log("\nFailures");

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("\nLive site verification passed.");

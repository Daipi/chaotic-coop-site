import {
  contactEmail,
  hasConfiguredContactEmail,
  organizationName,
  siteDescription,
  siteName
} from "./site-config";

type BreadcrumbItem = {
  name: string;
  path: string;
};

function absoluteUrl(site: URL | undefined, path: string): string | undefined {
  if (!site) {
    return undefined;
  }

  return new URL(path, site).toString();
}

export function buildBreadcrumbSchema(site: URL | undefined, items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const entry: Record<string, unknown> = {
        "@type": "ListItem",
        position: index + 1,
        name: item.name
      };
      const url = absoluteUrl(site, item.path);

      if (url) {
        entry.item = url;
      }

      return entry;
    })
  };
}

export function buildOrganizationSchema(site: URL | undefined) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: organizationName || siteName,
    description: siteDescription
  };
  const homeUrl = absoluteUrl(site, "/");

  if (homeUrl) {
    schema.url = homeUrl;
  }

  if (hasConfiguredContactEmail) {
    schema.email = contactEmail;
  }

  return schema;
}

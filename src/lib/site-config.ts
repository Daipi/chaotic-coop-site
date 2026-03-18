import type { SiteLink } from "../types/page-props";

export const siteName = import.meta.env.PUBLIC_SITE_NAME?.trim() || "CoopQueue";
export const siteDescription =
  "An English recommendation site for players choosing the next co-op game after R.E.P.O., Lethal Company, and similar breakout hits.";
export const organizationName = import.meta.env.PUBLIC_ORGANIZATION_NAME?.trim() || siteName;

const configuredContactEmail = import.meta.env.PUBLIC_CONTACT_EMAIL?.trim();

export const contactEmail = configuredContactEmail || "contact@example.com";
export const hasConfiguredContactEmail = Boolean(configuredContactEmail);

export const primaryNavLinks: SiteLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Disclosure", href: "/disclosure/" },
  { label: "Contact", href: "/contact/" }
];

export const footerNavLinks: SiteLink[] = [
  { label: "About", href: "/about/" },
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms", href: "/terms/" },
  { label: "Disclosure", href: "/disclosure/" },
  { label: "Contact", href: "/contact/" }
];

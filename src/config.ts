/**
 * config.ts — the association's external links in one place, imported by components.
 */

/** Association's public presence. Order = display order. icon = filename in public/rrss/. */
export const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/guluc3m', icon: 'github.svg' },
  { label: 'YouTube', href: 'https://youtube.com/c/guluc3m', icon: 'youtube.svg' },
  { label: 'Twitter', href: 'https://twitter.com/guluc3m', icon: 'twitter.svg' },
  { label: 'Instagram', href: 'https://www.instagram.com/guluc3m/', icon: 'ig.svg' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/gul-uc3m/', icon: 'linkedin.svg' },
] as const;

/** Email address. Components obfuscate it before rendering HTML. */
export const CONTACT = {
  email: 'info@gul.uc3m.es',
} as const;

/** obfuscates email addresses for the generated HTML to _try_ and disuade bots. This is intended to be used at build time */
export const obfuscateEmail = (email: string) => email.replace('@', ' AT ');

/** Office address, copied verbatim from the 2021 site (see CLAUDE.md). Single
 * source so the footer's "visita" line and legal block never drift apart. */
export const ADDRESS =
  'Despacho 2.3.C05, Edificio Sabatini, Avenida de la Universidad, 30, 28911 Leganés, Madrid';

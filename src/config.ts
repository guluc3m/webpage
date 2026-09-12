/**
 * config.ts — the association's external links in one place, imported by components.
 */

/** Association's public presence. Order = display order.*/
export const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/guluc3m' },
  { label: 'YouTube', href: 'https://youtube.com/c/guluc3m' },
  { label: 'X (Twitter)', href: 'https://x.com/guluc3m' },
  { label: 'Instagram', href: 'https://www.instagram.com/guluc3m/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/gul-uc3m/' },
] as const;

/** email is obfuscated on purpose - render as text, never a mailto: link. */
export const CONTACT = {
  email: 'info AT gul.uc3m.es',
  mailingList: 'https://lista-gul.uc3m.es/postorius/lists/lista.gul.uc3m.es/',
} as const;

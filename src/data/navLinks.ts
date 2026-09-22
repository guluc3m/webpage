// Header nav links — single source shared by index.astro (the real site) and
// styleguide.astro (which renders GulHeader to document it), so they can't drift.
export const navLinks = [
  // `icon` es el estado compacto del enlace en md+: el texto sólo aparece al
  // pasar el ratón. Un nombre de archivo de src/icons/header/ si existe; si
  // no, una clave de los placeholders de ICONS en gul-Nav.astro.
  { label: 'Actividades', href: '/actividades/', icon: 'checklist' },
  { label: 'Guía', href: '/guia/', icon: 'book' },
  { label: 'FTP', href: '/ftp/', icon: 'folder' },
  // { label: 'Jornadas', href: '/jornadas/', icon: 'calendar' },
];

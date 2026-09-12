// Header nav links — single source shared by index.astro (the real site) and
// styleguide.astro (which renders GulHeader to document it), so they can't drift.
//
// JAMon and Guía sub-items assume /jamon/ exposes a #talleres section the way
// index.astro uses section ids; Guía's sub-items link straight to the relevant
// file in guluc3m/linux-install since /guia/ itself just redirects there.
export const navLinks = [
  {
    label: 'JAMon',
    href: '/jamon/',
    children: [
      {
        label: 'Información',
        href: '/jamon/',
        icon: 'info',
        description: 'Qué es la JAMon y cómo participar.',
      },
      {
        label: 'Talleres',
        href: '/jamon/#talleres',
        icon: 'wrench',
        description: 'Charlas y talleres previos a la jam.',
      },
      {
        label: 'Competición',
        href: 'https://itch.io/jam/gul-jamon-2025',
        icon: 'trophy',
        description: 'Inscríbete y sube tu juego en itch.io.',
      },
    ],
  },
  { label: 'Jornadas', href: '/jornadas/' },
  {
    label: 'Guía',
    href: '/guia/',
    children: [
      {
        label: 'Instalación completa',
        href: 'https://github.com/guluc3m/linux-install/blob/main/full-install.md',
        icon: 'download',
        description: 'Borra Windows y quédate solo con Linux.',
      },
      {
        label: 'Dual boot',
        href: 'https://github.com/guluc3m/linux-install/blob/main/dualboot-install.md',
        icon: 'split',
        description: 'Instala Linux junto a Windows o macOS.',
      },
      {
        label: 'Post-instalación',
        href: 'https://github.com/guluc3m/linux-install/blob/main/post-install.md',
        icon: 'checklist',
        description: 'Primeros pasos tras instalar tu distro.',
      },
      {
        label: 'Solución de problemas',
        href: 'https://github.com/guluc3m/linux-install/blob/main/troubleshoot.md',
        icon: 'alert',
        description: 'Wi-Fi, drivers y otros líos habituales.',
      },
    ],
  },
];

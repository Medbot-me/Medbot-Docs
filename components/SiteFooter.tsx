import Link from 'next/link';

import { MedbotLogo } from '@/components/MedbotMark';

const COLUMNS = [
  {
    title: 'Documentation',
    links: [
      { label: 'Medbot app', href: '/docs' },
      { label: 'Medbot Health', href: '/patient' },
      { label: 'Medbot CMS', href: '/cms' },
      { label: 'About', href: '/about' },
    ],
  },
  {
    title: 'Ecosystem',
    links: [
      { label: 'Medbot AI', href: 'https://medbot.me/medbot-ai' },
      { label: 'Medbot Health', href: 'https://health.medbot.me' },
      { label: 'medbot.me', href: 'https://medbot.me' },
      { label: 'Privacy policy', href: 'https://medbot.me/privacy' },
    ],
  },
];

/** The footer of the Medbot public pages, for the docs. */
export function SiteFooter() {
  return (
    <div className="w-full">
      <div className="grid gap-10 pb-10 sm:grid-cols-2 md:grid-cols-[1.5fr_repeat(2,1fr)]">
        <div>
          <Link href="/" className="inline-flex">
            <MedbotLogo />
          </Link>
          <p className="text-muted-foreground mt-3 max-w-xs text-sm leading-relaxed">
            Guides for Medbot AI, Medbot Health and Medbot CMS, on one shared
            record.
          </p>
        </div>
        {COLUMNS.map((column) => (
          <div key={column.title}>
            <p className="text-foreground text-sm font-medium">
              {column.title}
            </p>
            <ul className="mt-3 space-y-2">
              {column.links.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith('http') ? (
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="text-muted-foreground border-t py-6 text-xs">
        © {new Date().getFullYear()} Medbot AI Pte Ltd. Medbot supports clinical
        judgement and does not replace it.
      </p>
    </div>
  );
}

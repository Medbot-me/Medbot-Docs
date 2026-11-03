import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Landing patterns shared with the Medbot CMS public pages
 * (`apps/medbot-cms/src/features/landing/components.tsx` in the main
 * repository) and medbot.me: section washes drawn from the logo, an amber
 * eyebrow over each heading, and soft cards.
 */

const TINTS = {
  white: 'var(--background)',
  amber: 'color-mix(in oklch, var(--primary) 12%, var(--background))',
  teal: 'color-mix(in oklch, var(--secondary) 18%, var(--background))',
  gold: 'color-mix(in oklch, var(--chart-3) 36%, var(--background))',
} as const;

export type Tint = keyof typeof TINTS;

/** A section held in `tint`, blending into `next` over its last third. */
export function wash(tint: Tint, next: Tint = tint): CSSProperties {
  return {
    backgroundImage: `linear-gradient(to bottom, ${TINTS[tint]} 0%, ${TINTS[tint]} 65%, ${TINTS[next]} 100%)`,
  };
}

/** The faint dot grid behind the hero. */
export function DotGrid() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] [background-size:22px_22px]"
    />
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'center' | 'left';
}) {
  return (
    <div
      className={
        align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'
      }
    >
      <p className="text-amber-text text-sm font-medium">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-muted-foreground mt-4 text-base leading-relaxed text-pretty sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

const TILE_TINTS = {
  amber: 'bg-primary/10 text-amber-text',
  teal: 'bg-secondary/12 text-secondary',
  gold: 'bg-chart-3/36 text-amber-text',
  outline: 'bg-background border shadow-xs text-amber-text',
} as const;

export function IconTile({
  icon: Icon,
  tint = 'amber',
}: {
  icon: LucideIcon;
  tint?: keyof typeof TILE_TINTS;
}) {
  return (
    <span
      className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${TILE_TINTS[tint]}`}
    >
      <Icon className="size-5" aria-hidden="true" />
    </span>
  );
}

/** One product's guides: a card with its icon, a line and a link. */
export function ProductCard({
  icon,
  tint,
  title,
  description,
  href,
}: {
  icon: LucideIcon;
  tint: 'amber' | 'teal' | 'gold';
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group bg-card text-card-foreground focus-visible:ring-ring/50 flex flex-col rounded-xl border p-6 shadow-sm transition-shadow outline-none hover:shadow-lg focus-visible:ring-[3px]"
    >
      <IconTile icon={icon} tint={tint} />
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground mt-2 grow text-sm leading-relaxed">
        {description}
      </p>
      <span className="text-amber-text mt-5 inline-flex items-center gap-1.5 text-sm font-medium">
        Read the guides
        <ArrowRight
          className="size-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}

/** A guide within a product: a compact card. */
export function GuideCard({
  icon,
  title,
  description,
  href,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="bg-card text-card-foreground hover:border-primary/40 focus-visible:ring-ring/50 flex gap-4 rounded-xl border p-5 shadow-sm transition-colors outline-none focus-visible:ring-[3px]"
    >
      <IconTile icon={icon} tint="outline" />
      <span>
        <span className="block font-medium">{title}</span>
        <span className="text-muted-foreground mt-1 block text-sm leading-relaxed">
          {description}
        </span>
      </span>
    </Link>
  );
}

/** A worked example: an icon beside a title and a line, no card. */
export function FeatureRow({
  icon,
  title,
  description,
  href,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group focus-visible:ring-ring/50 -m-2 flex gap-4 rounded-lg p-2 outline-none focus-visible:ring-[3px]"
    >
      <IconTile icon={icon} />
      <span>
        <span className="group-hover:text-amber-text block font-medium transition-colors">
          {title}
        </span>
        <span className="text-muted-foreground mt-1 block text-sm leading-relaxed">
          {description}
        </span>
      </span>
    </Link>
  );
}

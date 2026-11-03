import {
  ArrowRight,
  BackpackIcon,
  BinocularsIcon,
  BotIcon,
  HeartPulseIcon,
  HospitalIcon,
  MicroscopeIcon,
  MonitorPlayIcon,
  NotebookTextIcon,
  PencilLineIcon,
  SliceIcon,
  TabletsIcon,
} from 'lucide-react';
import Link from 'next/link';

import {
  DotGrid,
  FeatureRow,
  GuideCard,
  ProductCard,
  SectionHeading,
  wash,
} from '@/components/landing';

const POPULAR_GUIDES = [
  {
    title: 'Create an account and sign in',
    product: 'Medbot app',
    href: '/docs/getting-started',
  },
  { title: 'Draft a note with agents', product: 'Medbot app', href: '/docs/agents' },
  {
    title: 'Run the reception queue',
    product: 'Medbot CMS',
    href: '/cms/reception-queue',
  },
  {
    title: 'Connect to your clinic',
    product: 'Medbot Health',
    href: '/patient/connected-clinics',
  },
];

export default function Page() {
  return (
    <div className="bg-background text-foreground w-full font-sans">
      {/* Hero */}
      <section className="relative overflow-hidden" style={wash('white', 'teal')}>
        <DotGrid />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pt-12 pb-20 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:pt-20 lg:pb-28">
          <div>
            <span className="bg-background inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium">
              <span className="bg-primary size-1.5 rounded-full" />
              Medbot documentation
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Guides for every part of{' '}
              <span className="text-primary">Medbot</span>
            </h1>
            <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed text-pretty">
              Medbot is an AI agent platform that automates manual,
              labour-intensive clinical tasks and healthcare administration.
              Learn the clinical workspace, the patient app and the clinic
              management system.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/docs/getting-started"
                className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring/50 inline-flex h-10 items-center justify-center gap-2 rounded-md px-6 text-sm font-medium shadow-xs transition-colors outline-none focus-visible:ring-[3px]"
              >
                Get started
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/cms"
                className="bg-background hover:bg-accent focus-visible:ring-ring/50 inline-flex h-10 items-center justify-center rounded-md border px-6 text-sm font-medium shadow-xs transition-colors outline-none focus-visible:ring-[3px]"
              >
                Browse CMS guides
              </Link>
            </div>
          </div>
          <div className="bg-card text-card-foreground rounded-xl border p-6 shadow-sm">
            <p className="text-amber-text text-sm font-medium">Popular guides</p>
            <ul className="mt-3 divide-y">
              {POPULAR_GUIDES.map((guide) => (
                <li key={guide.href}>
                  <Link
                    href={guide.href}
                    className="hover:text-amber-text flex items-center justify-between gap-4 py-3 text-sm font-medium transition-colors"
                  >
                    {guide.title}
                    <span className="text-muted-foreground shrink-0 font-normal">
                      {guide.product}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 sm:py-24" style={wash('teal', 'white')}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Products"
            title="Pick the product you use"
            description="Each product has its own guides. They share one record, so a clinic and its patients see the same visit."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <ProductCard
              icon={BotIcon}
              tint="amber"
              title="Medbot app"
              description="The clinical workspace: notes, agents, Deep Research and clinical resources."
              href="/docs"
            />
            <ProductCard
              icon={HeartPulseIcon}
              tint="teal"
              title="Medbot Health"
              description="The patient app: connected clinics, health log, visits, results and records."
              href="/patient"
            />
            <ProductCard
              icon={HospitalIcon}
              tint="gold"
              title="Medbot CMS"
              description="Run a clinic day: queue, chart, orders, billing and Smart CMS claims."
              href="/cms"
            />
          </div>
        </div>
      </section>

      {/* Medbot app features */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            align="left"
            eyebrow="Medbot app"
            title="Learn the clinical workspace"
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <GuideCard
              icon={MonitorPlayIcon}
              title="Getting started"
              description="Create an account and learn the basics of Medbot."
              href="/docs/getting-started"
            />
            <GuideCard
              icon={NotebookTextIcon}
              title="Workspace"
              description="Write and organise notes in the Medbot workspace."
              href="/docs/workspace"
            />
            <GuideCard
              icon={BotIcon}
              title="Agents"
              description="Create and use agents to streamline clinical note taking."
              href="/docs/agents"
            />
            <GuideCard
              icon={MicroscopeIcon}
              title="Deep Research"
              description="Run agents for comprehensive medical research."
              href="/docs/deep-research"
            />
          </div>

          <div className="mt-24">
            <SectionHeading
              align="left"
              eyebrow="Use cases"
              title="See agents at work"
              description="Worked examples of agents taking on surveillance, care bundles and reporting."
            />
          </div>
          <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureRow
              icon={SliceIcon}
              title="Surgical site infection"
              description="Automate the detection and reporting of surgical site infections."
              href="/docs/use-cases/ssi"
            />
            <FeatureRow
              icon={BinocularsIcon}
              title="Syndromic surveillance"
              description="Use agents for syndromic surveillance in healthcare settings."
              href="/docs/use-cases/syndromic-surveillance"
            />
            <FeatureRow
              icon={BackpackIcon}
              title="Sepsis bundle"
              description="Carry out sepsis bundles efficiently with Medbot agents."
              href="/docs/use-cases/sepsis"
            />
            <FeatureRow
              icon={TabletsIcon}
              title="Antimicrobial stewardship programme"
              description="Strengthen antimicrobial stewardship with AI-driven agents."
              href="/docs/use-cases/asp"
            />
            <FeatureRow
              icon={PencilLineIcon}
              title="Medical report writing"
              description="Streamline medical report writing with Medbot."
              href="/docs/use-cases/medical-report"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

// Run with `pnpm test` (node --test). Checks the help routes the apps
// rely on, and that every rule points at a page that exists.
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { RULES, SURFACES, TOPICS, resolveHelpPath } from './help-routing.mjs'

const appDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'app')

function pageFile(target) {
  const [path] = target.split('#')
  if (path === '/') return join(appDir, 'page.tsx')
  return join(appDir, path, 'page.mdx')
}

/** Nextra's heading ids: lower case, spaces to dashes, punctuation dropped. */
function anchorsOf(file) {
  return readFileSync(file, 'utf8')
    .split('\n')
    .filter((line) => /^#{1,6} /.test(line))
    .map((line) =>
      line
        .replace(/^#+ /, '')
        .trim()
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s-]/gu, '')
        .replace(/\s+/g, '-')
    )
}

const targets = new Set([
  ...Object.values(SURFACES).map((s) => s.root),
  ...Object.values(RULES).flatMap((rules) => rules.map(([, t]) => t)),
  ...Object.values(TOPICS).flatMap((t) => Object.values(t)),
])

for (const target of targets) {
  test(`target exists: ${target}`, () => {
    const file = pageFile(target)
    assert.ok(existsSync(file), `no page at ${file}`)
    const anchor = target.split('#')[1]
    if (anchor) assert.ok(anchorsOf(file).includes(anchor), `no #${anchor}`)
  })
}

const cases = [
  // Product-level: where the user opened the docs from.
  [{ surface: 'cms' }, '/cms'],
  [{ surface: 'patient' }, '/patient'],
  [{ surface: 'health' }, '/patient'],
  [{ surface: 'agents' }, '/docs/agents'],
  [{ surface: 'app' }, '/docs'],
  [{ surface: 'cms-desktop' }, '/cms/downtime/cms-desktop'],
  [{ surface: 'patient-mobile' }, '/patient/mobile-app'],
  // Screen-level.
  [{ surface: 'cms', path: '/queue' }, '/cms/front-desk/reception-queue'],
  [{ surface: 'cms', path: '/notifications' }, '/cms/clinical-care/notifications'],
  [{ surface: 'cms', path: '/tasks' }, '/cms/clinical-care/notifications'],
  [{ surface: 'cms', path: '/inbox' }, '/cms/clinical-care/messaging#the-clinic-inbox'],
  [{ surface: 'cms', path: '/services/inbox' }, '/cms/clinical-care/notifications'],
  [{ surface: 'cms', path: '/services/s1/notifications' }, '/cms/clinical-care/notifications#a-services-notifications'],
  [{ surface: 'app', path: '/inbox' }, '/cms/clinical-care/notifications'],
  [{ surface: 'cms', path: '/workstation/patients' }, '/cms/services/workstation'],
  [{ surface: 'cms', path: '/services/s1/workstation/patients' }, '/cms/services/workstation'],
  [{ surface: 'cms', path: '/services/s1/patients/p1' }, '/cms/services/patients#a-patients-page'],
  [{ surface: 'cms', path: '/preferences/shortcuts' }, '/cms/reference/keyboard-shortcuts#preferences-keyboard-shortcuts'],
  [{ surface: 'cms', path: '/workstation/appointments/requests' }, '/cms/front-desk/appointments#responding-to-portal-booking-requests'],
  [{ surface: 'cms', path: '/appointments/requests' }, '/cms/front-desk/appointments#responding-to-portal-booking-requests'],
  [{ surface: 'cms', path: '/onboarding/services' }, '/cms/services/getting-started#your-organisations-first-service'],
  [{ surface: 'cms', path: '/organisations/new' }, '/cms/administration/create-organisation'],
  [{ surface: 'cms', path: '/organisations/o1/settings', topic: 'public-profile' }, '/cms/administration/settings#public-profile'],
  [{ surface: 'cms', path: '/queue', topic: 'keyboard-shortcuts' }, '/cms/reference/keyboard-shortcuts'],
  [{ surface: 'patient', path: '/find-care/near-me' }, '/patient/find-care#find-care-near-you'],
  [{ surface: 'patient', path: '/find-care/clinics/org1' }, '/patient/find-care#a-clinics-page'],
  [{ surface: 'patient', path: '/clinics/org1/request' }, '/patient/find-care#asking-a-new-clinic-for-an-appointment'],
  [{ surface: 'patient', path: '/clinics' }, '/patient/connected-clinics'],
  [{ surface: 'patient', path: '/appointments/change' }, '/patient/visits#changing-the-time'],
  [{ surface: 'patient', path: '/find-care/listings/l1' }, '/patient/find-care#ask-them-to-contact-you'],
  [{ surface: 'patient', path: '/find-care/interests' }, '/patient/find-care#follow-your-requests'],
  [{ surface: 'patient', path: '/appointments/new' }, '/patient/visits#booking-or-asking-for-an-appointment'],
  [{ surface: 'patient', path: '/appointments/rebook' }, '/patient/visits#book-again'],
  [{ surface: 'cms', path: '/patients/p1/medications' }, '/cms/clinical-care/prescribing'],
  [{ surface: 'cms', path: '/patients/p1' }, '/cms/clinical-care/patient-records'],
  [{ surface: 'cms', path: '/services/s1/workstation/pre-visit/x' }, '/cms/services/pre-visit-and-escalations'],
  [{ surface: 'cms', path: '/services/s1/workstation' }, '/cms/services/workstation'],
  [{ surface: 'cms', path: '/agents/a1/workflow' }, '/docs/agents/workflow'],
  [{ surface: 'cms', path: '/claims/medisave' }, '/cms/smartcms/claims'],
  [{ surface: 'cms', path: '/Queue?tab=today#x' }, '/cms/front-desk/reception-queue'],
  [{ surface: 'cms', path: '/(staff)/queue' }, '/cms/front-desk/reception-queue'],
  [{ surface: 'cms-desktop', path: '/queue' }, '/cms/front-desk/reception-queue'],
  [{ surface: 'patient', path: '/log/plan/goals/new' }, '/patient/health-plan'],
  [{ surface: 'patient', path: '/log/meal' }, '/patient/health-log'],
  [{ surface: 'app', path: '/agents' }, '/docs/agents'],
  [{ surface: 'app', path: '/research/r1' }, '/docs/deep-research/review-workspace'],
  [{ surface: 'app', path: '/research/new' }, '/docs/deep-research/start-a-review'],
  [{ surface: 'desktop', path: '/notes/abc' }, '/docs/workspace/notes'],
  [{ surface: 'agents', path: '/a1/refine' }, '/docs/agents/refine'],
  [{ surface: 'agents', path: '/new' }, '/docs/agents/create-an-agent'],
  // Unknown screens fall back to the surface's introduction.
  [{ surface: 'cms', path: '/brand-new-screen' }, '/cms'],
  [{ surface: 'patient', path: '/nowhere/yet' }, '/patient'],
  // Topics win over the path, and fall back when a product lacks one.
  [{ surface: 'patient', path: '/log', topic: 'report-a-problem' }, '/patient/report-a-problem'],
  [{ surface: 'patient', path: '/log', topic: 'roles' }, '/patient/health-log'],
  // No surface: the Referer decides, else the docs home.
  [{ referer: 'https://cms.medbot.me/queue' }, '/cms'],
  [{ referer: 'https://cms.staging.medbot.me/' }, '/cms'],
  [{ referer: 'https://health.medbot.me/' }, '/patient'],
  [{ referer: 'https://app.medbot.me/' }, '/docs'],
  [{ surface: 'queue', referer: 'https://cms.medbot.me/' }, '/cms/front-desk/reception-queue'],
  [{ referer: 'https://www.google.com/' }, '/'],
  [{ referer: 'not a url' }, '/'],
  [{}, '/'],
  // Review fixes.
  [{ surface: 'agents', path: '/agents/a1/workflow' }, '/docs/agents/workflow'],
  [{ surface: 'agents', path: '/agents/new' }, '/docs/agents/create-an-agent'],
  [{ surface: 'agents', path: '/agentsx' }, '/docs/agents/running-agents'],
  [{ surface: 'ai', referer: 'https://cms.medbot.me/' }, '/cms/home-assistant'],
  [{ surface: 'queue', from: 'cms' }, '/cms/front-desk/reception-queue'],
  [{ surface: 'foo', path: '/queue', explicitPath: true, from: 'cms' }, '/cms/front-desk/reception-queue'],
  [{ surface: 'cms', path: '/patients/p%23x/medications' }, '/cms/clinical-care/prescribing'],
  [{ surface: 'cms', path: '/patients/invite' }, '/cms/clinical-care/patient-portal'],
  [{ surface: 'cms', path: '/admin/requests/claims/c1' }, '/docs/admin/claims'],
  [{ surface: 'cms', path: '/workstation' }, '/cms/services/workstation'],
  [{ surface: 'app', path: '/agents/a1' }, '/docs/agents/running-agents'],
  [{ surface: 'app', path: '/agents/new' }, '/docs/agents/create-an-agent'],
  [{ surface: 'app', path: '/agents/result' }, '/docs/agents/results'],
  [{ surface: 'app', path: '/admin/support-requests/s1' }, '/docs/admin/billing-and-support'],
  [{ referer: 'http://cms.medbot.me:abc' }, '/cms'],
  [{ referer: 'https://evil.example/?u=https://app.medbot.me' }, '/'],
  // Second review: prototype keys, encoded slots, new CMS rules.
  [{ surface: 'constructor' }, '/'],
  [{ surface: '__proto__' }, '/'],
  [{ surface: 'toString', from: 'cms' }, '/cms'],
  [{ surface: 'constructor', referer: 'https://cms.medbot.me/' }, '/cms'],
  [{ from: 'constructor' }, '/'],
  [{ from: '__proto__', referer: 'https://health.medbot.me/' }, '/patient'],
  [{ surface: 'cms', path: '/queue', topic: 'constructor' }, '/cms/front-desk/reception-queue'],
  [{ surface: 'cms', path: '/queue', topic: '__proto__' }, '/cms/front-desk/reception-queue'],
  [{ surface: 'cms', path: '/queue', topic: 'roles' }, '/cms/roles-and-permissions'],
  [{ surface: 'cms', path: '/%40modal/queue' }, '/cms/front-desk/reception-queue'],
  [{ surface: 'cms', path: '/%28staff%29/queue' }, '/cms/front-desk/reception-queue'],
  [{ surface: 'cms', path: '/patients/%ZZ/medications' }, '/cms/clinical-care/prescribing'],
  [{ surface: 'cms', path: '/organisations/-/credits' }, '/cms/administration/settings#ai-credits'],
  [{ surface: 'cms', path: '/organisations/-/data-location' }, '/cms/administration/settings#data-location'],
  [{ surface: 'cms', path: '/organisations/claims/-' }, '/cms/administration/create-organisation'],
  [{ surface: 'cms', path: '/services/-/settings' }, '/cms/services/getting-started#4-the-service-page'],
  [{ surface: 'cms', path: '/services/-/workstation/visits/-/consult' }, '/cms/services/workstation#the-clinical-consult'],
  [{ surface: 'cms', path: '/services/-/workstation/encounters/-' }, '/cms/services/workstation#the-clinical-consult'],
  [{ surface: 'cms', path: '/verify/-' }, '/cms/clinical-care/documents-and-certificates#checking-a-document'],
  [{ surface: 'cms', path: '/campaigns/new' }, '/cms'],
]

for (const [request, expected] of cases) {
  test(`${JSON.stringify(request)} -> ${expected}`, () => {
    assert.equal(resolveHelpPath(request), expected)
  })
}

// The Medbot apps' product tour "Learn more" links (Medbot
// `feat/product-tour`: apps/medbot-cms/src/tours, apps/patient/src/tours,
// packages/personal-features/src/{tours,agents/tours.ts}). Each must open its
// own guide, never just a section's introduction, so a docs move that breaks
// one fails here first.
const TOUR_LINKS = [
  [{ surface: 'cms', path: '/organisations' }, '/cms/administration/switching'],
  [{ surface: 'cms', path: '/ai' }, '/cms/home-assistant'],
  [{ surface: 'cms', path: '/patients' }, '/cms/clinical-care/patient-records'],
  [{ surface: 'cms', path: '/workstation' }, '/cms/services/workstation'],
  [{ surface: 'patient', topic: 'caregivers' }, '/patient/caregivers'],
  [{ surface: 'patient', path: '/ask' }, '/patient/ask-medbot'],
  [{ surface: 'patient', path: '/log' }, '/patient/health-log'],
  [{ surface: 'patient', path: '/visits' }, '/patient/visits'],
  [{ surface: 'patient', path: '/results' }, '/patient/results'],
  [{ surface: 'patient', path: '/profile/sharing' }, '/patient/clinic-sharing'],
  [{ surface: 'app', path: '/workspace' }, '/docs/workspace'],
  [{ surface: 'app', path: '/agents' }, '/docs/agents'],
  [{ surface: 'app', path: '/research' }, '/docs/deep-research'],
  [{ surface: 'app', path: '/ai-usage' }, '/docs/ai-usage'],
  [{ surface: 'app', path: '/datasets' }, '/docs/agents/datasets'],
  [{ surface: 'agents', path: '/agents/new' }, '/docs/agents/create-an-agent'],
  [{ surface: 'agents', path: '/agents/-' }, '/docs/agents/running-agents'],
  [{ surface: 'agents', path: '/agents/-/workflow' }, '/docs/agents/workflow'],
  [{ surface: 'agents', path: '/agents/-/evaluate' }, '/docs/agents/validation'],
]
for (const [request, expected] of TOUR_LINKS) {
  test(`product tour Learn more ${JSON.stringify(request)} -> ${expected}`, () => {
    assert.equal(resolveHelpPath(request), expected)
    assert.ok(
      existsSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'app', expected.slice(1), 'page.mdx')),
      `${expected} has no page`
    )
  })
}

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
  [{ surface: 'cms', path: '/queue' }, '/cms/reception-queue'],
  [{ surface: 'cms', path: '/patients/p1/medications' }, '/cms/prescribing'],
  [{ surface: 'cms', path: '/patients/p1' }, '/cms/patient-records'],
  [{ surface: 'cms', path: '/services/s1/workstation/pre-visit/x' }, '/cms/services/pre-visit-and-escalations'],
  [{ surface: 'cms', path: '/services/s1/workstation' }, '/cms/services/workstation'],
  [{ surface: 'cms', path: '/agents/a1/workflow' }, '/docs/agents/workflow'],
  [{ surface: 'cms', path: '/claims/medisave' }, '/cms/smartcms/claims'],
  [{ surface: 'cms', path: '/Queue?tab=today#x' }, '/cms/reception-queue'],
  [{ surface: 'cms', path: '/(staff)/queue' }, '/cms/reception-queue'],
  [{ surface: 'cms-desktop', path: '/queue' }, '/cms/reception-queue'],
  [{ surface: 'patient', path: '/log/plan/goals/new' }, '/patient/health-plan'],
  [{ surface: 'patient', path: '/log/meal' }, '/patient/health-log'],
  [{ surface: 'patient', path: '/appointments/new' }, '/patient/visits#appointments'],
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
  [{ surface: 'queue', referer: 'https://cms.medbot.me/' }, '/cms/reception-queue'],
  [{ referer: 'https://www.google.com/' }, '/'],
  [{ referer: 'not a url' }, '/'],
  [{}, '/'],
  // Review fixes.
  [{ surface: 'agents', path: '/agents/a1/workflow' }, '/docs/agents/workflow'],
  [{ surface: 'agents', path: '/agents/new' }, '/docs/agents/create-an-agent'],
  [{ surface: 'agents', path: '/agentsx' }, '/docs/agents/running-agents'],
  [{ surface: 'ai', referer: 'https://cms.medbot.me/' }, '/cms/home-assistant'],
  [{ surface: 'queue', from: 'cms' }, '/cms/reception-queue'],
  [{ surface: 'foo', path: '/queue', explicitPath: true, from: 'cms' }, '/cms/reception-queue'],
  [{ surface: 'cms', path: '/patients/p%23x/medications' }, '/cms/prescribing'],
  [{ surface: 'cms', path: '/patients/invite' }, '/cms/patient-portal'],
  [{ surface: 'cms', path: '/admin/requests/claims/c1' }, '/docs/admin/claims'],
  [{ surface: 'cms', path: '/workstation' }, '/cms/services/workstation'],
  [{ surface: 'app', path: '/agents/a1' }, '/docs/agents/running-agents'],
  [{ surface: 'app', path: '/agents/new' }, '/docs/agents/create-an-agent'],
  [{ surface: 'app', path: '/agents/result' }, '/docs/agents/results'],
  [{ surface: 'app', path: '/admin/support-requests/s1' }, '/docs/admin/billing-and-support'],
  [{ referer: 'http://cms.medbot.me:abc' }, '/cms'],
  [{ referer: 'https://evil.example/?u=https://app.medbot.me' }, '/'],
]

for (const [request, expected] of cases) {
  test(`${JSON.stringify(request)} -> ${expected}`, () => {
    assert.equal(resolveHelpPath(request), expected)
  })
}

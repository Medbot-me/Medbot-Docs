/**
 * Context-aware entry into the docs from the Medbot apps.
 *
 * Every app links to `https://docs.medbot.me/help/<surface>/<app path>`:
 * the surface it runs on (CMS, the patient portal, the Medbot app, a
 * desktop or mobile shell) and the screen the user is on. The resolver
 * picks the most specific guide for that screen and falls back to the
 * surface's own introduction, so a link never lands on a 404 and the apps
 * never hard-code the docs' page structure.
 *
 *   /help/cms/queue                       -> /cms/reception-queue
 *   /help/cms/patients/abc/medications    -> /cms/prescribing
 *   /help/patient/log/plan                -> /patient/health-plan
 *   /help/app/agents/abc/workflow         -> /docs/agents/workflow
 *   /help/agents                          -> /docs/agents
 *   /help/cms/some/new/screen             -> /cms
 *
 * Apps may also send `?path=/queue` instead of path segments, and
 * `?topic=<key>` to ask for a named guide (see TOPICS). With no surface,
 * the Referer's host picks one, and with neither the docs home opens.
 *
 * Plain JavaScript so that `next.config.mjs` and the route handler both
 * import it; `help-routing.test.mjs` runs it with `node --test`.
 */

/** @typedef {{ product: 'cms' | 'patient' | 'app', root: string }} Surface */

/** @type {Record<string, Surface>} */
export const SURFACES = {
  // Medbot CMS, the clinic management system (cms.medbot.me).
  cms: { product: 'cms', root: '/cms' },
  'cms-desktop': { product: 'cms', root: '/cms/downtime/cms-desktop' },
  // Medbot Health, the patient portal (health.medbot.me).
  patient: { product: 'patient', root: '/patient' },
  'patient-mobile': { product: 'patient', root: '/patient/mobile-app' },
  // Medbot app, the clinical workspace (app.medbot.me).
  app: { product: 'app', root: '/docs' },
  desktop: { product: 'app', root: '/docs/desktop-and-mobile/desktop' },
  mobile: { product: 'app', root: '/docs/desktop-and-mobile/mobile' },
  // The AI agents module, wherever it is opened from.
  agents: { product: 'app', root: '/docs/agents' },
}

/**
 * Other names the apps or people may use for a surface. None may equal a
 * first path segment of an app route (`ai`, `workspace`, …): the short
 * form `/help/<screen>` would then pick the wrong product.
 */
export const SURFACE_ALIASES = {
  'medbot-cms': 'cms',
  clinic: 'cms',
  health: 'patient',
  portal: 'patient',
  'patient-portal': 'patient',
  'medbot-health': 'patient',
  web: 'app',
  'medbot-ai': 'app',
  'ai-agents': 'agents',
}

/**
 * Hosts whose Referer picks a surface when a link gives none, as regular
 * expression source (`next.config.mjs` matches the same hosts). Apps that
 * send `rel="noreferrer"` must name the surface in the path instead.
 */
export const REFERER_HOSTS = [
  ['cms(?:\\.staging)?\\.medbot\\.me', 'cms'],
  ['(?:health|portal)(?:\\.staging)?\\.medbot\\.me', 'patient'],
  ['(?:app\\.)?staging\\.medbot\\.me', 'app'],
  ['app\\.medbot\\.me', 'app'],
]

/**
 * Screen-to-guide rules for the agents module. The module ships in both
 * the Medbot app and Medbot CMS, so both surfaces share these rules.
 * `:` matches any one segment; a rule matches the path and anything below
 * it, and the rule with the most segments wins.
 */
const AGENT_RULES = [
  ['/agents', '/docs/agents'],
  ['/browse-agents', '/docs/agents'],
  ['/agents/new', '/docs/agents/create-an-agent'],
  ['/agents/:/edit', '/docs/agents/create-an-agent'],
  ['/agents/:/workflow', '/docs/agents/workflow'],
  ['/agents/:/registry/versions', '/docs/agents/workflow'],
  ['/agents/:/evaluate', '/docs/agents/validation'],
  ['/agents/:/registry/evaluate', '/docs/agents/validation'],
  ['/agents/:/registry/performance', '/docs/agents/validation'],
  ['/agents/:/refine', '/docs/agents/refine'],
  ['/agents/:/results', '/docs/agents/results'],
  ['/agents/result', '/docs/agents/results'],
  // An agent's own page. Last, so equally specific rules above win.
  ['/agents/:', '/docs/agents/running-agents'],
]

/** @type {Record<'cms' | 'patient' | 'app', Array<[string, string]>>} */
export const RULES = {
  cms: [
    ...AGENT_RULES,
    // Sign-in, onboarding and organisations
    ['/login', '/cms/getting-started'],
    ['/sign-up', '/cms/getting-started'],
    ['/verify-email', '/cms/getting-started'],
    ['/welcome', '/cms/getting-started'],
    ['/onboarding', '/cms/getting-started'],
    ['/join', '/cms/join-an-organisation'],
    ['/choose-service', '/cms/switching'],
    ['/organisations', '/cms/switching'],
    ['/organisations/new', '/cms/create-organisation'],
    ['/organisations/claim', '/cms/create-organisation'],
    ['/organisations/:/seed', '/cms/seed-data'],
    ['/organisations/:/settings', '/cms/settings'],
    ['/organisations/:/smartcms', '/cms/smartcms/settings'],
    ['/organisation-settings', '/cms/settings'],
    ['/settings', '/cms/settings'],
    ['/staff', '/cms/staff'],
    ['/ai-policy', '/cms/ai-policy'],
    ['/about', '/cms/overview'],
    ['/features', '/cms/overview'],
    // Home and the assistant
    ['/home', '/cms/home-assistant'],
    ['/ai', '/cms/home-assistant'],
    // Patients and clinical care
    ['/patients', '/cms/patient-records'],
    ['/patients/invite', '/cms/patient-portal'],
    ['/patients/:/encounters', '/cms/encounters'],
    ['/patients/:/ai-encounters', '/cms/encounters'],
    ['/patients/:/medications', '/cms/prescribing'],
    ['/patients/:/vaccinations', '/cms/vaccinations'],
    ['/patients/:/results', '/cms/diagnostic-results'],
    ['/patients/:/documents', '/cms/documents-and-certificates'],
    ['/patients/:/photos', '/cms/clinical-photos'],
    ['/patients/:/messages', '/cms/messaging'],
    ['/patients/:/notes', '/cms/patient-notes'],
    ['/patients/:/shared', '/cms/patient-concerns'],
    ['/identity-changes', '/cms/patient-records'],
    ['/notes', '/cms/patient-notes'],
    ['/results', '/cms/diagnostic-results'],
    ['/explanation-library', '/cms/diagnostic-results'],
    ['/capture', '/cms/clinical-photos'],
    ['/concerns', '/cms/patient-concerns'],
    ['/answer-reports', '/cms/patient-concerns'],
    ['/reports/patient-questions', '/cms/patient-concerns'],
    ['/inbox', '/cms/messaging'],
    ['/tasks', '/cms/tasks'],
    ['/document-templates', '/cms/documents-and-certificates'],
    ['/templates', '/cms/documents-and-certificates'],
    ['/teleconsult', '/cms/encounters'],
    // Front desk and scheduling
    ['/queue', '/cms/reception-queue'],
    ['/session', '/cms/session-setup'],
    ['/appointments', '/cms/appointments'],
    ['/workstation', '/cms/services/workstation'],
    ['/workstation/appointments', '/cms/appointments'],
    ['/display', '/cms/display-boards'],
    ['/roster', '/cms/rostering'],
    ['/roster/attendance', '/cms/attendance'],
    ['/kiosk', '/cms/services/kiosk'],
    // Billing, pharmacy and inventory
    ['/billing', '/cms/billing'],
    ['/billable-services', '/cms/billable-catalog'],
    ['/catalog', '/cms/billable-catalog'],
    ['/consumables', '/cms/services-and-consumables'],
    ['/formulary', '/cms/formulary'],
    ['/order-sets', '/cms/orders-and-order-sets'],
    ['/dosing-rules', '/cms/dosing-rules'],
    ['/reports/dose-overrides', '/cms/allergies-and-medication-safety'],
    ['/reports/medication-safety', '/cms/allergies-and-medication-safety'],
    ['/inventory', '/cms/inventory-and-stock'],
    ['/stock', '/cms/inventory-and-stock'],
    // SmartCMS (Singapore)
    ['/claims', '/cms/smartcms/claims'],
    ['/smartcms', '/cms/smartcms'],
    ['/smartcms/messages', '/cms/smartcms/messages'],
    ['/reports', '/cms/smartcms/reports'],
    // Services
    ['/services', '/cms/services'],
    ['/services/new', '/cms/services/getting-started'],
    ['/services/:/setup', '/cms/services/getting-started'],
    ['/services/:/agents', '/cms/services/agents'],
    ['/services/:/appointments', '/cms/services/appointments'],
    ['/services/:/board', '/cms/display-boards'],
    ['/services/:/patients', '/cms/services/patients'],
    ['/services/:/protocols', '/cms/services/context-and-content'],
    ['/services/:/queue', '/cms/reception-queue'],
    ['/services/:/referrals', '/cms/services/referrals'],
    ['/services/:/roster', '/cms/rostering'],
    ['/services/:/workstation', '/cms/services/workstation'],
    ['/services/:/workstation/appointments', '/cms/services/appointments'],
    ['/services/:/workstation/cycles', '/cms/services/ivf-cycles'],
    ['/services/:/workstation/encounters', '/cms/services/encounters'],
    ['/services/:/workstation/escalations', '/cms/services/pre-visit-and-escalations'],
    ['/services/:/workstation/health-plans', '/cms/services/health-plans'],
    ['/services/:/workstation/pre-visit', '/cms/services/pre-visit-and-escalations'],
    ['/services/:/workstation/referrals', '/cms/services/referrals'],
    ['/content-library', '/cms/services/context-and-content'],
    // Outages and downtime
    ['/downtime', '/cms/downtime'],
    ['/downtime-devices', '/cms/downtime/devices'],
    ['/downtime-recovery', '/cms/downtime/recovery'],
    ['/status', '/cms/system-status'],
    // Platform administration
    ['/admin', '/cms/platform-administration'],
    ['/admin/status', '/cms/system-status'],
    ['/admin/requests/claims', '/docs/admin/claims'],
    ['/admin/requests/physician-verifications', '/docs/admin/billing-and-support'],
    ['/admin/bug-reports', '/docs/admin/billing-and-support'],
    ['/admin/directory', '/docs/admin/directory'],
    ['/admin/directory/interests', '/docs/admin/referral-requests'],
  ],

  patient: [
    ['/sign-in', '/patient/getting-started'],
    ['/sign-up', '/patient/getting-started'],
    ['/onboarding', '/patient/getting-started'],
    ['/home', '/patient/getting-started'],
    ['/register', '/patient/invites'],
    ['/join', '/patient/invites'],
    ['/claim', '/patient/invites'],
    ['/link', '/patient/connected-clinics'],
    ['/clinics', '/patient/connected-clinics'],
    ['/profile/connect', '/patient/connected-clinics'],
    ['/profile/sharing', '/patient/clinic-sharing'],
    ['/ask', '/patient/ask-medbot'],
    ['/ask/plan', '/patient/health-plan'],
    ['/messages', '/patient/messages'],
    ['/notifications', '/patient/notifications'],
    ['/log', '/patient/health-log'],
    ['/log/plan', '/patient/health-plan'],
    ['/log/scan', '/patient/lab-reports'],
    ['/plan-review', '/patient/health-plan'],
    ['/cycle', '/patient/health-plan'],
    ['/profile/devices', '/patient/devices'],
    ['/visits', '/patient/visits'],
    ['/appointments', '/patient/visits#appointments'],
    ['/appointments/check-in', '/patient/visits#pre-visit-check-in'],
    ['/checkin', '/patient/visits#pre-visit-check-in'],
    ['/encounters', '/patient/pre-visit-history'],
    ['/escalations', '/patient/pre-visit-history#if-you-mention-a-warning-sign'],
    ['/referral', '/patient/visits'],
    ['/handover', '/patient/record-services'],
    ['/handovers', '/patient/record-services'],
    ['/results', '/patient/results'],
    ['/records', '/patient/health-records'],
    ['/health-records', '/patient/health-records'],
    ['/history', '/patient/medical-history'],
    ['/card', '/patient/profile'],
    ['/find-care', '/patient/find-care'],
    ['/profile/record-services', '/patient/record-services'],
    ['/profile', '/patient/profile'],
    ['/profile/language', '/patient/language'],
    ['/profile/caregivers', '/patient/caregivers'],
    ['/caregiver', '/patient/caregivers'],
    ['/family', '/patient/family'],
    ['/setup/family', '/patient/family'],
    ['/report', '/patient/report-a-problem'],
  ],

  app: [
    ...AGENT_RULES,
    ['/login', '/docs/getting-started'],
    ['/sign-up', '/docs/getting-started'],
    ['/onboarding', '/docs/getting-started#onboarding'],
    ['/home', '/docs/getting-started/home'],
    ['/workspace', '/docs/workspace'],
    ['/notes', '/docs/workspace/notes'],
    ['/templates', '/docs/workspace/templates'],
    ['/document-templates', '/docs/workspace/templates'],
    ['/datasets', '/docs/agents/datasets'],
    ['/datasets/import', '/docs/agents/datasets/import'],
    ['/datasets/connectors', '/docs/agents/connectors'],
    ['/research', '/docs/deep-research'],
    ['/research/new', '/docs/deep-research/start-a-review'],
    ['/research/:', '/docs/deep-research/review-workspace'],
    ['/resources', '/docs/clinical_resources'],
    ['/resources/new', '/docs/clinical_resources/set-up'],
    ['/teams', '/docs/teams'],
    ['/ai-usage', '/docs/ai-usage'],
    ['/pricing', '/docs/plans-and-billing'],
    ['/settings', '/docs/advanced#settings'],
    ['/my-account', '/docs/advanced#account-settings'],
    ['/report', '/docs/advanced#report-a-problem'],
    ['/support', '/docs/admin/billing-and-support'],
    ['/admin', '/docs/admin'],
    ['/admin/bug-reports', '/docs/admin/billing-and-support'],
    ['/admin/support-requests', '/docs/admin/billing-and-support'],
    ['/medbot-cms', '/cms'],
    ['/medbot-health', '/patient'],
  ],
}

/**
 * Named guides, for links that are about a task rather than a screen
 * (a "Learn more" in a product tour, an error hint). `?topic=` wins over
 * the path.
 */
export const TOPICS = {
  'getting-started': {
    cms: '/cms/getting-started',
    patient: '/patient/getting-started',
    app: '/docs/getting-started',
  },
  'report-a-problem': {
    cms: '/cms/troubleshooting',
    patient: '/patient/report-a-problem',
    app: '/docs/advanced#report-a-problem',
  },
  troubleshooting: {
    cms: '/cms/troubleshooting',
    patient: '/patient/report-a-problem',
    app: '/docs/advanced#report-a-problem',
  },
  account: {
    cms: '/cms/settings',
    patient: '/patient/profile',
    app: '/docs/advanced#account-settings',
  },
  roles: { cms: '/cms/roles-and-permissions' },
  glossary: { cms: '/cms/glossary' },
  'guide-doctor': { cms: '/cms/guides/doctor' },
  'guide-nurse': { cms: '/cms/guides/nurse' },
  'guide-receptionist': { cms: '/cms/guides/receptionist' },
  'guide-admin': { cms: '/cms/guides/admin' },
  agents: { cms: '/docs/agents', app: '/docs/agents' },
  'create-an-agent': {
    cms: '/docs/agents/create-an-agent',
    app: '/docs/agents/create-an-agent',
  },
  'deep-research': { app: '/docs/deep-research' },
  'clinical-resources': { app: '/docs/clinical_resources' },
  'ask-medbot': { patient: '/patient/ask-medbot' },
  caregivers: { patient: '/patient/caregivers' },
}

/** Turns a surface name or alias into a known surface key, or null. */
export function normaliseSurface(name) {
  if (!name) return null
  const key = String(name).toLowerCase()
  if (SURFACES[key]) return key
  return SURFACE_ALIASES[key] ?? null
}

/** Picks a surface from a Referer header, or null. */
export function surfaceFromReferer(referer) {
  if (!referer) return null
  // The same reading as next.config.mjs's header match, so the two can
  // never disagree (a disagreement would bounce between `/` and `/help`).
  const host = /^https?:\/\/([^/:?#]+)/i.exec(String(referer))?.[1]?.toLowerCase()
  if (!host) return null
  for (const [pattern, surface] of REFERER_HOSTS) {
    if (new RegExp(`^${pattern}$`).test(host)) return surface
  }
  return null
}

function segmentsOf(path) {
  return String(path ?? '')
    .split(/[?#]/)[0]
    .split('/')
    .filter(Boolean)
    // Route groups and parallel-route slots never show in a real URL, but
    // an app passing its file-system route might include them.
    .filter((s) => !/^\(.*\)$/.test(s) && !s.startsWith('@'))
    .map((s) => s.toLowerCase())
}

/** The guide for an app path on a product, or null when no rule matches. */
export function matchRule(product, appPath) {
  const path = segmentsOf(appPath)
  let best = null
  let bestLength = -1
  for (const [pattern, target] of RULES[product] ?? []) {
    const rule = segmentsOf(pattern)
    if (rule.length > path.length || rule.length <= bestLength) continue
    if (rule.every((seg, i) => seg === ':' || seg === path[i])) {
      best = target
      bestLength = rule.length
    }
  }
  return best
}

/**
 * Resolves a help request to a docs path (with an optional `#anchor`).
 *
 * `from` names the surface when the first segment does not, and
 * `explicitPath` says the path came from `?path=` whole, so an unknown
 * first segment is not prepended to it.
 *
 * @param {{ surface?: string | null, path?: string | null, topic?: string | null, referer?: string | null, from?: string | null, explicitPath?: boolean }} request
 * @returns {string}
 */
export function resolveHelpPath({
  surface,
  path,
  topic,
  referer,
  from,
  explicitPath = false,
} = {}) {
  let key = normaliseSurface(surface)
  // An unknown first segment is treated as part of the app path, so
  // `/help/queue` from cms.medbot.me still finds the queue guide.
  let appPath = path ?? ''
  if (!key && surface && !explicitPath) appPath = `/${surface}/${appPath}`
  key = key ?? normaliseSurface(from) ?? surfaceFromReferer(referer)
  if (!key) return '/'

  const { product, root } = SURFACES[key]

  if (topic) {
    const byProduct = TOPICS[String(topic).toLowerCase()]
    if (byProduct?.[product]) return byProduct[product]
  }

  // The agents surface is the module itself: its paths are relative to it.
  // Accepts both `/new` and the app's full pathname, `/agents/new`.
  if (key === 'agents') {
    const inModule = appPath.replace(/^\/*agents(?=\/|$)/i, '')
    return matchRule('app', `/agents/${inModule}`) ?? root
  }

  return matchRule(product, appPath) ?? root
}

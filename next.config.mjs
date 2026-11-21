import nextra from 'nextra'
 
// Set up Nextra with its configuration
const withNextra = nextra({
  // ... Add Nextra-specific options here
})
 
// Export the final Next.js config with Nextra included
export default withNextra({
  async redirects() {
    return [
      // Medbot CMS pages grouped into collapsible sidebar folders.
      {
        source: '/cms/patient-records',
        destination: '/cms/clinical-care/patient-records',
        permanent: true,
      },
      {
        source: '/cms/encounters',
        destination: '/cms/clinical-care/encounters',
        permanent: true,
      },
      {
        source: '/cms/vitals',
        destination: '/cms/clinical-care/vitals',
        permanent: true,
      },
      {
        source: '/cms/allergies-and-medication-safety',
        destination: '/cms/clinical-care/allergies-and-medication-safety',
        permanent: true,
      },
      {
        source: '/cms/vaccinations',
        destination: '/cms/clinical-care/vaccinations',
        permanent: true,
      },
      {
        source: '/cms/orders-and-order-sets',
        destination: '/cms/clinical-care/orders-and-order-sets',
        permanent: true,
      },
      {
        source: '/cms/prescribing',
        destination: '/cms/clinical-care/prescribing',
        permanent: true,
      },
      {
        source: '/cms/diagnostic-results',
        destination: '/cms/clinical-care/diagnostic-results',
        permanent: true,
      },
      {
        source: '/cms/documents-and-certificates',
        destination: '/cms/clinical-care/documents-and-certificates',
        permanent: true,
      },
      {
        source: '/cms/clinical-photos',
        destination: '/cms/clinical-care/clinical-photos',
        permanent: true,
      },
      {
        source: '/cms/messaging',
        destination: '/cms/clinical-care/messaging',
        permanent: true,
      },
      {
        source: '/cms/tasks',
        destination: '/cms/clinical-care/tasks',
        permanent: true,
      },
      {
        source: '/cms/patient-notes',
        destination: '/cms/clinical-care/patient-notes',
        permanent: true,
      },
      {
        source: '/cms/patient-portal',
        destination: '/cms/clinical-care/patient-portal',
        permanent: true,
      },
      {
        source: '/cms/patient-concerns',
        destination: '/cms/clinical-care/patient-concerns',
        permanent: true,
      },
      {
        source: '/cms/appointments',
        destination: '/cms/front-desk/appointments',
        permanent: true,
      },
      {
        source: '/cms/reception-queue',
        destination: '/cms/front-desk/reception-queue',
        permanent: true,
      },
      {
        source: '/cms/session-setup',
        destination: '/cms/front-desk/session-setup',
        permanent: true,
      },
      {
        source: '/cms/display-boards',
        destination: '/cms/front-desk/display-boards',
        permanent: true,
      },
      {
        source: '/cms/rostering',
        destination: '/cms/front-desk/rostering',
        permanent: true,
      },
      {
        source: '/cms/attendance',
        destination: '/cms/front-desk/attendance',
        permanent: true,
      },
      {
        source: '/cms/billable-catalog',
        destination: '/cms/billing/billable-catalog',
        permanent: true,
      },
      {
        source: '/cms/services-and-consumables',
        destination: '/cms/billing/services-and-consumables',
        permanent: true,
      },
      {
        source: '/cms/formulary',
        destination: '/cms/pharmacy/formulary',
        permanent: true,
      },
      {
        source: '/cms/dosing-rules',
        destination: '/cms/pharmacy/dosing-rules',
        permanent: true,
      },
      {
        source: '/cms/inventory-and-stock',
        destination: '/cms/pharmacy/inventory-and-stock',
        permanent: true,
      },
      {
        source: '/cms/staff',
        destination: '/cms/administration/staff',
        permanent: true,
      },
      {
        source: '/cms/create-organisation',
        destination: '/cms/administration/create-organisation',
        permanent: true,
      },
      {
        source: '/cms/physician-family-organisation',
        destination: '/cms/administration/physician-family-organisation',
        permanent: true,
      },
      {
        source: '/cms/join-an-organisation',
        destination: '/cms/administration/join-an-organisation',
        permanent: true,
      },
      {
        source: '/cms/switching',
        destination: '/cms/administration/switching',
        permanent: true,
      },
      {
        source: '/cms/members-and-roles',
        destination: '/cms/administration/members-and-roles',
        permanent: true,
      },
      {
        source: '/cms/seed-data',
        destination: '/cms/administration/seed-data',
        permanent: true,
      },
      {
        source: '/cms/settings',
        destination: '/cms/administration/settings',
        permanent: true,
      },
      {
        source: '/cms/ai-policy',
        destination: '/cms/administration/ai-policy',
        permanent: true,
      },
      {
        source: '/cms/scoping',
        destination: '/cms/administration/scoping',
        permanent: true,
      },
      {
        source: '/cms/platform-administration',
        destination: '/cms/administration/platform-administration',
        permanent: true,
      },
      {
        source: '/cms/system-status',
        destination: '/cms/downtime/system-status',
        permanent: true,
      },
      {
        source: '/cms/glossary',
        destination: '/cms/reference/glossary',
        permanent: true,
      },
      {
        source: '/cms/troubleshooting',
        destination: '/cms/reference/troubleshooting',
        permanent: true,
      },

      // Care Programs were renamed to Services.
      {
        source: '/docs/care-programs',
        destination: '/cms/services',
        permanent: true,
      },
      {
        source: '/docs/care-programs/:path*',
        destination: '/cms/services/:path*',
        permanent: true,
      },

      // Medplum was replaced by Medbot's own patient records store: there are
      // no organisation credentials to manage and no hosted/own choice.
      {
        source: '/cms/medplum-credentials',
        destination: '/cms/administration/scoping',
        permanent: true,
      },
      {
        source: '/cms/hosted-organisations',
        destination: '/cms/administration/create-organisation',
        permanent: true,
      },

      // Services moved from the Medbot app to Medbot CMS (Home and CMS split).
      {
        source: '/docs/services',
        destination: '/cms/services',
        permanent: true,
      },
      {
        source: '/docs/services/:path*',
        destination: '/cms/services/:path*',
        permanent: true,
      },

      // CMS feature pages moved from Documentation to the CMS tab.
      {
        source: '/docs/medbot-cms',
        destination: '/cms/overview',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/getting-started',
        destination: '/cms/getting-started',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/roles-and-access',
        destination: '/cms/roles-and-permissions',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/staff-management',
        destination: '/cms/administration/staff',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/session-setup',
        destination: '/cms/front-desk/session-setup',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/reception-queue',
        destination: '/cms/front-desk/reception-queue',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/display-boards',
        destination: '/cms/front-desk/display-boards',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/appointments',
        destination: '/cms/front-desk/appointments',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/rostering',
        destination: '/cms/front-desk/rostering',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/attendance',
        destination: '/cms/front-desk/attendance',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/documents-and-certificates',
        destination: '/cms/clinical-care/documents-and-certificates',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/diagnostic-results',
        destination: '/cms/clinical-care/diagnostic-results',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/patient-records',
        destination: '/cms/clinical-care/patient-records',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/formulary',
        destination: '/cms/pharmacy/formulary',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/orders-and-order-sets',
        destination: '/cms/clinical-care/orders-and-order-sets',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/vitals',
        destination: '/cms/clinical-care/vitals',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/vaccinations',
        destination: '/cms/clinical-care/vaccinations',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/catalog-and-inventory',
        destination: '/cms/pharmacy/inventory-and-stock',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/billing',
        destination: '/cms/billing',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/patient-portal',
        destination: '/cms/clinical-care/patient-portal',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/messaging',
        destination: '/cms/clinical-care/messaging',
        permanent: true,
      },

      // Agents redesign and the Deep Research review pipeline replaced these pages.
      {
        source: '/docs/agents/agent-demo',
        destination: '/docs/agents/workflow',
        permanent: true,
      },
      {
        source: '/docs/agents/agent-evaluation',
        destination: '/docs/agents/validation',
        permanent: true,
      },
      {
        source: '/docs/agents/types/deep-research',
        destination: '/docs/deep-research',
        permanent: true,
      },
      {
        source: '/docs/deep-research/create-research-question',
        destination: '/docs/deep-research/question-and-criteria',
        permanent: true,
      },
      {
        source: '/docs/deep-research/create-inclusion-exclusion-criteria',
        destination: '/docs/deep-research/question-and-criteria',
        permanent: true,
      },
      {
        source: '/docs/deep-research/create-search-strategy',
        destination: '/docs/deep-research/search',
        permanent: true,
      },
      {
        source: '/docs/deep-research/run-search-strategy',
        destination: '/docs/deep-research/search',
        permanent: true,
      },
      {
        source: '/docs/deep-research/use-inclusion-exclusion-agents',
        destination: '/docs/deep-research/screening-and-eligibility',
        permanent: true,
      },
      {
        source: '/docs/deep-research/evaluate-results',
        destination: '/docs/deep-research/screening-and-eligibility',
        permanent: true,
      },
      {
        source: '/docs/deep-research/default_agents',
        destination: '/docs/deep-research',
        permanent: true,
      },
    ]
  },
})

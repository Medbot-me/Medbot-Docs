import nextra from 'nextra'
 
// Set up Nextra with its configuration
const withNextra = nextra({
  // ... Add Nextra-specific options here
})
 
// Export the final Next.js config with Nextra included
export default withNextra({
  async redirects() {
    return [
      // Care Programs were renamed to Services.
      {
        source: '/docs/care-programs',
        destination: '/docs/services',
        permanent: true,
      },
      {
        source: '/docs/care-programs/:path*',
        destination: '/docs/services/:path*',
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
        destination: '/cms/staff',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/session-setup',
        destination: '/cms/session-setup',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/reception-queue',
        destination: '/cms/reception-queue',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/display-boards',
        destination: '/cms/display-boards',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/appointments',
        destination: '/cms/appointments',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/rostering',
        destination: '/cms/rostering',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/attendance',
        destination: '/cms/attendance',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/documents-and-certificates',
        destination: '/cms/documents-and-certificates',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/diagnostic-results',
        destination: '/cms/diagnostic-results',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/patient-records',
        destination: '/cms/patient-records',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/formulary',
        destination: '/cms/formulary',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/orders-and-order-sets',
        destination: '/cms/orders-and-order-sets',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/vitals',
        destination: '/cms/vitals',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/vaccinations',
        destination: '/cms/vaccinations',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/catalog-and-inventory',
        destination: '/cms/inventory-and-stock',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/billing',
        destination: '/cms/billing',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/patient-portal',
        destination: '/cms/patient-portal',
        permanent: true,
      },
      {
        source: '/docs/medbot-cms/messaging',
        destination: '/cms/messaging',
        permanent: true,
      },
    ]
  },
})

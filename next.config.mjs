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
    ]
  },
})

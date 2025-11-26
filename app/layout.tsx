import React from 'react'
import type { Metadata } from 'next'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export const metadata: Metadata = {
  title: 'Docs',
  description: 'Project documentation'
}

const banner: React.ReactNode = <Banner storageKey="some-key">Nextra 4.0 is released 🎉</Banner>
const navbar: React.ReactNode = (
  <Navbar
    logo={<b>Nextra</b>}
    // ... Your additional navbar options
  />
)
const footer: React.ReactNode = <Footer>MIT {new Date().getFullYear()} © Nextra.</Footer>

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const pageMap = await getPageMap()

  return (
    <html
      // Not required, but good for SEO
      lang="en"
      // Required to be set
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >
      <Head
        // ... Your additional head options
      >
        {/* Your additional tags should be passed as `children` of `<Head>` element */}
      </Head>
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/shuding/nextra/tree/main/docs"
          footer={footer}
          // ... Your additional layout options
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}

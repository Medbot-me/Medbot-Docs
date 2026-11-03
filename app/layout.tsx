import React from 'react'
import type { Metadata } from 'next'
import { JetBrains_Mono, Outfit } from 'next/font/google'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { MedbotLogo } from '@/components/MedbotMark'
import { SiteFooter } from '@/components/SiteFooter'
import './globals.css'

/* The Medbot interface faces (`--font-sans` and `--font-mono` in the main
 * repository's design tokens). */
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono'
})

export const metadata: Metadata = {
  title: {
    default: 'Medbot Docs',
    template: '%s | Medbot Docs'
  },
  description:
    'Guides for Medbot AI, Medbot Health and Medbot CMS: the clinical workspace, the patient app and the clinic management system.',
  icons: { icon: '/medbot-mark.svg' }
}

const navbar: React.ReactNode = <Navbar logo={<MedbotLogo />} />

const footer: React.ReactNode = (
  <Footer className="medbot-footer">
    <SiteFooter />
  </Footer>
)

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const pageMap = await getPageMap()

  return (
    <html
      lang="en"
      dir="ltr"
      className={`${outfit.variable} ${jetbrainsMono.variable}`}
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >
      <Head
        // Medbot's amber `primary` (#d87943 light, #e78a53 dark), held
        // darker in the light theme so links and active items pass AA.
        color={{
          hue: 22,
          saturation: { light: 66, dark: 76 },
          lightness: { light: 40, dark: 62 }
        }}
        // Medbot's `background`: white, and oklch(0.1797 0.0043 308) dark.
        backgroundColor={{ light: '#ffffff', dark: '#121113' }}
      />
      <body>
        <Layout
          navbar={navbar}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/Medbot-me/Medbot-Docs/tree/main"
          footer={footer}
          sidebar={{ autoCollapse: false }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}

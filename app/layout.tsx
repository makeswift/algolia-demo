import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { draftMode } from 'next/headers'

import { DraftModeScript } from '@makeswift/runtime/next/server'

import '@/lib/makeswift/components'
import { MakeswiftProvider } from '@/lib/makeswift/provider'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  other: {
    'algolia-site-verification': 'E64C5BE6EB326C2E',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <DraftModeScript />
      </head>
      <body className={inter.className}>
        <MakeswiftProvider previewMode={(await draftMode()).isEnabled}>
          {children}
        </MakeswiftProvider>
      </body>
    </html>
  )
}

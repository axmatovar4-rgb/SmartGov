import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SmartGov — Davlat Xizmatlari Portali',
  description: 'Fuqarolarga davlat xizmatlarini onlayn taqdim etuvchi platforma',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  )
}

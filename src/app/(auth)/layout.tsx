'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import LangSwitcher from '@/components/LangSwitcher'
import { useLangStore } from '@/lib/langStore'
import { translations } from '@/lib/i18n'

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { lang } = useLangStore()
  const t = translations[lang]

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SG</span>
            </div>
            <div className="leading-tight">
              <p className="font-semibold text-text-primary text-sm">SmartGov</p>
              <p className="text-xs text-text-secondary">{t.portal}</p>
            </div>
          </Link>

          <div className="flex items-center gap-4 text-sm text-text-secondary">
            <LangSwitcher />
            <Phone size={15} className="text-primary" />
            <span>{t.callCenter}</span>
            <a href="tel:1195" className="font-semibold text-text-primary hover:text-primary transition-colors">
              1195
            </a>
            <span className="flex items-center gap-1 text-xs text-green-600">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              24/7
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-white border-t border-border py-4">
        <div className="max-w-6xl mx-auto px-4 text-center text-xs text-text-secondary">
          © {new Date().getFullYear()} SmartGov. {t.rights}
        </div>
      </footer>
    </div>
  )
}

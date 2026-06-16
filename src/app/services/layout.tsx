import type { ReactNode } from 'react'
import Link from 'next/link'
import { Phone } from 'lucide-react'

import LangSwitcher from '@/components/LangSwitcher'

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SG</span>
            </div>
            <div className="leading-tight">
              <p className="font-semibold text-text-primary text-sm">SmartGov</p>
              <p className="text-xs text-text-secondary">Davlat xizmatlari portali</p>
            </div>
          </Link>
          <div className="flex items-center gap-5">
            <LangSwitcher />
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <span>Call center</span>
              <a href="tel:1195" className="flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded-lg font-semibold text-sm hover:bg-primary-dark transition-colors">
                <Phone size={14} />
                1195
              </a>
              <span className="flex items-center gap-1 text-xs text-green-600">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                24/7
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t border-border">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">SG</span>
            </div>
            <span className="text-sm font-medium text-text-primary">SmartGov</span>
          </Link>
          <div className="flex items-center gap-4 text-sm text-text-secondary">
            <span>Call center</span>
            <a href="tel:1195" className="flex items-center gap-1.5 font-semibold text-text-primary hover:text-primary transition-colors">
              <Phone size={14} />
              1195
            </a>
          </div>
          <p className="text-xs text-text-secondary">
            © {new Date().getFullYear()} SmartGov. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </footer>
    </div>
  )
}

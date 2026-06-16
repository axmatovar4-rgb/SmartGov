'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Users, FileText,
  Settings, LogOut, Menu, X,
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { href: '/admin',              icon: LayoutDashboard, label: 'Dashboard'        },
  { href: '/admin/users',        icon: Users,           label: 'Foydalanuvchilar' },
  { href: '/admin/applications', icon: FileText,        label: 'Arizalar'         },
  { href: '/admin/services',     icon: Settings,        label: 'Xizmatlar'        },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex bg-surface">

      {/* ── SIDEBAR ── */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-primary flex flex-col
        transform transition-transform duration-200
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SG</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">SmartGov</p>
              <p className="text-white/60 text-xs">Admin panel</p>
            </div>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/60 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = pathname === href
            return (
              <Link key={href} href={href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${active
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}>
                <Icon size={18} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Chiqish */}
        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={() => {
              localStorage.removeItem('role')
              localStorage.removeItem('username')
              window.location.href = '/'
            }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm
                       text-white/70 hover:bg-white/10 hover:text-white transition-colors w-full">
            <LogOut size={18} />
            Chiqish
          </button>
        </div>
      </aside>

      {/* Overlay (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden"
             onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── ASOSIY KONTENT ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-border px-4 h-14 flex items-center justify-between sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-text-secondary hover:text-primary">
            <Menu size={22} />
          </button>
          <div className="hidden lg:block">
            <p className="text-sm font-medium text-text-primary">
              {navItems.find(n => n.href === pathname)?.label ?? 'Admin panel'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">A</span>
            </div>
            <span className="text-sm font-medium text-text-primary hidden sm:block">Admin</span>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

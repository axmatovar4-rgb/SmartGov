'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FileText, Clock, CheckCircle, XCircle, LogOut, User } from 'lucide-react'

const mockApps = [
  { id: '#101', service: "Tug'ilganlik haqida ma'lumotnoma", status: 'APPROVED',  date: '10.06.2026' },
  { id: '#98',  service: "Talabalik ma'lumotnomasi",         status: 'IN_REVIEW', date: '08.06.2026' },
  { id: '#85',  service: "Yashash joyi ma'lumotnomasi",      status: 'SUBMITTED', date: '01.06.2026' },
]

const statusBadge: Record<string, string> = {
  SUBMITTED: 'bg-blue-50 text-blue-700',
  IN_REVIEW: 'bg-yellow-50 text-yellow-700',
  APPROVED:  'bg-green-50 text-green-700',
  REJECTED:  'bg-red-50 text-red-600',
}
const statusLabel: Record<string, string> = {
  SUBMITTED: 'Qabul qilindi',
  IN_REVIEW: "Ko'rib chiqilmoqda",
  APPROVED:  'Tasdiqlandi',
  REJECTED:  'Rad etildi',
}

export default function DashboardPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')

  useEffect(() => {
    const role = localStorage.getItem('role')
    const name = localStorage.getItem('username')
    if (!role) { router.push('/login'); return }
    if (role === 'ADMIN') { router.push('/admin'); return }
    setUsername(name ?? 'Foydalanuvchi')
  }, [router])

  const logout = () => {
    localStorage.removeItem('role')
    localStorage.removeItem('username')
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">SG</span>
            </div>
            <span className="font-semibold text-text-primary text-sm">SmartGov</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <User size={16} className="text-primary" />
              <span className="font-medium text-text-primary">{username}</span>
            </div>
            <button onClick={logout}
              className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-red-500 transition-colors">
              <LogOut size={15} />
              Chiqish
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-xl font-bold text-text-primary">Shaxsiy kabinet</h1>

        {/* Stat kartalar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: FileText,    label: 'Jami arizalar',       value: '3',  color: 'text-primary bg-primary/10'  },
            { icon: Clock,       label: "Ko'rib chiqilmoqda",  value: '1',  color: 'text-yellow-600 bg-yellow-50' },
            { icon: CheckCircle, label: 'Tasdiqlandi',         value: '1',  color: 'text-green-600 bg-green-50'  },
            { icon: XCircle,     label: 'Rad etildi',          value: '0',  color: 'text-red-500 bg-red-50'      },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="bg-white rounded-xl border border-border p-4">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${color}`}>
                <Icon size={18} />
              </div>
              <p className="text-xl font-bold text-text-primary">{value}</p>
              <p className="text-xs text-text-secondary mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Arizalar ro'yxati */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-text-primary">Mening arizalarim</h2>
            <Link href="/services" className="btn-primary text-sm px-4 py-2">
              + Yangi ariza
            </Link>
          </div>
          <div className="divide-y divide-border">
            {mockApps.map(app => (
              <div key={app.id} className="px-5 py-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium text-text-primary text-sm truncate">{app.service}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{app.id} · {app.date}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${statusBadge[app.status]}`}>
                  {statusLabel[app.status]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

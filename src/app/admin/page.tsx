'use client'

import { Users, FileText, CheckCircle, Clock, XCircle, InboxIcon } from 'lucide-react'

// Mock statistika
const stats = [
  { label: 'Jami foydalanuvchilar', value: '1 248', icon: Users,    color: 'bg-blue-50 text-blue-600'   },
  { label: 'Jami arizalar',         value: '3 572', icon: FileText, color: 'bg-primary/10 text-primary' },
  { label: 'Tasdiqlandi',           value: '2 104', icon: CheckCircle, color: 'bg-green-50 text-green-600' },
  { label: 'Rad etildi',            value: '318',   icon: XCircle,  color: 'bg-red-50 text-red-500'     },
]

const statusData = [
  { label: "Qabul qilindi",       value: 820,  color: 'bg-blue-500',   pct: 23 },
  { label: "Ko'rib chiqilmoqda",  value: 330,  color: 'bg-yellow-500', pct: 9  },
  { label: "Tasdiqlandi",         value: 2104, color: 'bg-green-500',  pct: 59 },
  { label: "Rad etildi",          value: 318,  color: 'bg-red-500',    pct: 9  },
]

const serviceData = [
  { label: "Tug'ilganlik haqida ma'lumotnoma", count: 1240, pct: 85 },
  { label: "Talabalik ma'lumotnomasi",         count: 890,  pct: 61 },
  { label: "Yashash joyi ma'lumotnomasi",      count: 670,  pct: 46 },
  { label: "OTM qabul",                         count: 450,  pct: 31 },
  { label: "Diagnostik test",                   count: 322,  pct: 22 },
]

const recentApps = [
  { id: '#3572', user: 'Alisher Valiyev',  service: "Tug'ilganlik",    status: 'SUBMITTED',  date: '16.06.2026' },
  { id: '#3571', user: 'Malika Rahimova',  service: "Talabalik",       status: 'APPROVED',   date: '16.06.2026' },
  { id: '#3570', user: 'Jasur Toshmatov',  service: "Yashash joyi",    status: 'IN_REVIEW',  date: '15.06.2026' },
  { id: '#3569', user: 'Nilufar Qosimova', service: "OTM qabul",       status: 'REJECTED',   date: '15.06.2026' },
  { id: '#3568', user: 'Bobur Ismoilov',   service: "Diagnostik test", status: 'APPROVED',   date: '14.06.2026' },
]

const statusBadge: Record<string, string> = {
  SUBMITTED:  'bg-blue-50 text-blue-700',
  IN_REVIEW:  'bg-yellow-50 text-yellow-700',
  APPROVED:   'bg-green-50 text-green-700',
  REJECTED:   'bg-red-50 text-red-600',
}
const statusLabel: Record<string, string> = {
  SUBMITTED: 'Qabul qilindi',
  IN_REVIEW: "Ko'rib chiqilmoqda",
  APPROVED:  'Tasdiqlandi',
  REJECTED:  'Rad etildi',
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-text-primary">Dashboard</h1>

      {/* ── STAT KARTALAR ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl border border-border p-5">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${color}`}>
              <Icon size={20} />
            </div>
            <p className="text-2xl font-bold text-text-primary">{value}</p>
            <p className="text-sm text-text-secondary mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ── HOLAT BO'YICHA TAQSIMOT ── */}
        <div className="bg-white rounded-xl border border-border p-5">
          <h2 className="font-semibold text-text-primary mb-4">Holat bo&apos;yicha taqsimot</h2>
          <div className="space-y-3">
            {statusData.map(({ label, value, color, pct }) => (
              <div key={label}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-text-secondary">{label}</span>
                  <span className="font-medium text-text-primary">{value}</span>
                </div>
                <div className="h-2 bg-surface rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── XIZMAT BO'YICHA TAQSIMOT ── */}
        <div className="bg-white rounded-xl border border-border p-5">
          <h2 className="font-semibold text-text-primary mb-4">Xizmat bo&apos;yicha taqsimot</h2>
          <div className="space-y-3">
            {serviceData.map(({ label, count, pct }) => (
              <div key={label}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-text-secondary truncate max-w-[70%]">{label}</span>
                  <span className="font-medium text-text-primary">{count}</span>
                </div>
                <div className="h-2 bg-surface rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SO'NGGI ARIZALAR ── */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <InboxIcon size={18} className="text-primary" />
          <h2 className="font-semibold text-text-primary">So&apos;nggi arizalar</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface">
              <tr>
                {['ID', 'Foydalanuvchi', 'Xizmat', 'Holat', 'Sana'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentApps.map((app) => (
                <tr key={app.id} className="hover:bg-surface transition-colors">
                  <td className="px-4 py-3 font-mono text-text-secondary">{app.id}</td>
                  <td className="px-4 py-3 font-medium text-text-primary">{app.user}</td>
                  <td className="px-4 py-3 text-text-secondary">{app.service}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge[app.status]}`}>
                      {statusLabel[app.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{app.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

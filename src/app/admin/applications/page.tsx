'use client'

import { useState } from 'react'
import { Search, ChevronLeft, ChevronRight, Eye, X } from 'lucide-react'

type Status = 'SUBMITTED' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED'

const allApps = [
  { id: '#3572', user: 'Alisher Valiyev',   service: "Tug'ilganlik haqida ma'lumotnoma", status: 'SUBMITTED' as Status,  date: '16.06.2026', comment: '' },
  { id: '#3571', user: 'Malika Rahimova',   service: "Talabalik ma'lumotnomasi",         status: 'APPROVED'  as Status,  date: '16.06.2026', comment: 'Hujjatlar to\'g\'ri' },
  { id: '#3570', user: 'Jasur Toshmatov',   service: "Yashash joyi ma'lumotnomasi",      status: 'IN_REVIEW' as Status,  date: '15.06.2026', comment: '' },
  { id: '#3569', user: 'Nilufar Qosimova',  service: "OTM qabul",                         status: 'REJECTED'  as Status,  date: '15.06.2026', comment: 'Hujjat yetishmaydi' },
  { id: '#3568', user: 'Bobur Ismoilov',    service: "Diagnostik test",                   status: 'APPROVED'  as Status,  date: '14.06.2026', comment: '' },
  { id: '#3567', user: 'Sarvinoz Yusupova', service: "Tug'ilganlik haqida ma'lumotnoma", status: 'IN_REVIEW' as Status,  date: '13.06.2026', comment: '' },
  { id: '#3566', user: 'Doniyor Xolmatov',  service: "Talabalik ma'lumotnomasi",         status: 'SUBMITTED' as Status,  date: '12.06.2026', comment: '' },
  { id: '#3565', user: 'Gulnora Mirzayeva', service: "Yashash joyi ma'lumotnomasi",      status: 'APPROVED'  as Status,  date: '11.06.2026', comment: 'Tasdiqlandi' },
]

const statusBadge: Record<Status, string> = {
  SUBMITTED: 'bg-blue-50 text-blue-700',
  IN_REVIEW: 'bg-yellow-50 text-yellow-700',
  APPROVED:  'bg-green-50 text-green-700',
  REJECTED:  'bg-red-50 text-red-600',
}
const statusLabel: Record<Status, string> = {
  SUBMITTED: 'Qabul qilindi',
  IN_REVIEW: "Ko'rib chiqilmoqda",
  APPROVED:  'Tasdiqlandi',
  REJECTED:  'Rad etildi',
}

const PAGE_SIZE = 6

export default function AdminApplicationsPage() {
  const [search, setSearch]     = useState('')
  const [filter, setFilter]     = useState<Status | 'ALL'>('ALL')
  const [page, setPage]         = useState(1)
  const [selected, setSelected] = useState<typeof allApps[0] | null>(null)

  const filtered = allApps.filter(a => {
    const matchSearch = a.user.toLowerCase().includes(search.toLowerCase()) ||
                        a.service.toLowerCase().includes(search.toLowerCase()) ||
                        a.id.includes(search)
    const matchFilter = filter === 'ALL' || a.status === filter
    return matchSearch && matchFilter
  })
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paged = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE)

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-text-primary">Barcha arizalar</h1>

      {/* Filter + qidiruv */}
      <div className="bg-white rounded-xl border border-border p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1) }}
            placeholder="Ariza ID, ism yoki xizmat..." className="input pl-9" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['ALL', 'SUBMITTED', 'IN_REVIEW', 'APPROVED', 'REJECTED'] as const).map(s => (
            <button key={s} onClick={() => { setFilter(s); setPage(1) }}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors border ${
                filter === s
                  ? 'bg-primary text-white border-primary'
                  : 'border-border text-text-secondary hover:border-primary hover:text-primary'
              }`}>
              {s === 'ALL' ? 'Barchasi' : statusLabel[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Jadval */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface">
              <tr>
                {['ID', 'Foydalanuvchi', 'Xizmat', 'Holat', 'Sana', ''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paged.map(app => (
                <tr key={app.id} className="hover:bg-surface transition-colors">
                  <td className="px-4 py-3 font-mono text-text-secondary text-xs">{app.id}</td>
                  <td className="px-4 py-3 font-medium text-text-primary">{app.user}</td>
                  <td className="px-4 py-3 text-text-secondary max-w-48 truncate">{app.service}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge[app.status]}`}>
                      {statusLabel[app.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-secondary whitespace-nowrap">{app.date}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => setSelected(app)}
                      className="flex items-center gap-1 text-xs text-primary hover:underline">
                      <Eye size={13} /> Ko'rish
                    </button>
                  </td>
                </tr>
              ))}
              {paged.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-text-secondary">Hech narsa topilmadi</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-border flex items-center justify-between">
            <p className="text-xs text-text-secondary">Jami: <span className="font-medium">{filtered.length}</span> ta</p>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1}
                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center disabled:opacity-40 hover:border-primary transition-colors">
                <ChevronLeft size={14} />
              </button>
              {Array.from({length: totalPages}, (_,i)=>i+1).map(p=>(
                <button key={p} onClick={()=>setPage(p)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${p===page?'bg-primary text-white':'border border-border hover:border-primary'}`}>
                  {p}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages,p+1))} disabled={page===totalPages}
                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center disabled:opacity-40 hover:border-primary transition-colors">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl border border-border shadow-modal w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="font-semibold text-text-primary">Ariza tafsiloti</h2>
              <button onClick={() => setSelected(null)} className="text-text-secondary hover:text-primary"><X size={20}/></button>
            </div>
            <div className="px-6 py-5 space-y-0">
              {[
                ['Ariza ID',    selected.id],
                ['Foydalanuvchi', selected.user],
                ['Xizmat',     selected.service],
                ['Holat',      statusLabel[selected.status]],
                ['Sana',       selected.date],
                ['Izoh',       selected.comment || '—'],
              ].map(([label, value]) => (
                <div key={label} className="flex items-start justify-between py-2.5 border-b border-border last:border-0">
                  <span className="text-sm text-text-secondary w-32 flex-shrink-0">{label}</span>
                  <span className="text-sm font-medium text-text-primary text-right">{value}</span>
                </div>
              ))}
            </div>
            <div className="px-6 pb-5">
              <button onClick={() => setSelected(null)} className="btn-outline w-full">Yopish</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

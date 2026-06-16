'use client'

import { useState } from 'react'
import { Search, ChevronLeft, ChevronRight, Eye, X } from 'lucide-react'

const allUsers = [
  { id: '1', fullName: 'Alisher Valiyev',   username: 'ali_valiyev',   phone: '+998901234567', pinfl: '12345678901234', role: 'USER',  createdAt: '10.01.2026', apps: 5  },
  { id: '2', fullName: 'Malika Rahimova',   username: 'malika_r',      phone: '+998931112233', pinfl: '23456789012345', role: 'USER',  createdAt: '12.01.2026', apps: 3  },
  { id: '3', fullName: 'Jasur Toshmatov',   username: 'jasur_t',       phone: '+998901234568', pinfl: '34567890123456', role: 'USER',  createdAt: '15.01.2026', apps: 8  },
  { id: '4', fullName: 'Nilufar Qosimova',  username: 'nilufar_q',     phone: '+998909876543', pinfl: '45678901234567', role: 'USER',  createdAt: '20.01.2026', apps: 2  },
  { id: '5', fullName: 'Bobur Ismoilov',    username: 'bobur_i',       phone: '+998971234567', pinfl: '56789012345678', role: 'ADMIN', createdAt: '01.01.2026', apps: 0  },
  { id: '6', fullName: 'Sarvinoz Yusupova', username: 'sarvinoz_y',    phone: '+998901234569', pinfl: '67890123456789', role: 'USER',  createdAt: '22.02.2026', apps: 1  },
  { id: '7', fullName: 'Doniyor Xolmatov',  username: 'doniyor_x',     phone: '+998931234567', pinfl: '78901234567890', role: 'USER',  createdAt: '05.03.2026', apps: 4  },
  { id: '8', fullName: 'Gulnora Mirzayeva', username: 'gulnora_m',     phone: '+998901112233', pinfl: '89012345678901', role: 'USER',  createdAt: '10.03.2026', apps: 6  },
]

const PAGE_SIZE = 5

export default function AdminUsersPage() {
  const [search, setSearch]       = useState('')
  const [page, setPage]           = useState(1)
  const [selected, setSelected]   = useState<typeof allUsers[0] | null>(null)

  const filtered = allUsers.filter(u =>
    u.fullName.toLowerCase().includes(search.toLowerCase()) ||
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.phone.includes(search)
  )
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-text-primary">Foydalanuvchilar</h1>

      {/* Qidiruv */}
      <div className="bg-white rounded-xl border border-border p-4">
        <div className="relative max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            placeholder="Ism, username yoki telefon..."
            className="input pl-9"
          />
        </div>
      </div>

      {/* Jadval */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface">
              <tr>
                {['#', 'To\'liq ism', 'Username', 'Telefon', 'Rol', 'Arizalar', 'Sana', ''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paged.map((user, i) => (
                <tr key={user.id} className="hover:bg-surface transition-colors">
                  <td className="px-4 py-3 text-text-secondary">{(page-1)*PAGE_SIZE + i + 1}</td>
                  <td className="px-4 py-3 font-medium text-text-primary">{user.fullName}</td>
                  <td className="px-4 py-3 text-text-secondary">{user.username}</td>
                  <td className="px-4 py-3 text-text-secondary">{user.phone}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === 'ADMIN' ? 'bg-primary/10 text-primary' : 'bg-surface text-text-secondary border border-border'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-text-secondary">{user.apps}</td>
                  <td className="px-4 py-3 text-text-secondary">{user.createdAt}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => setSelected(user)}
                      className="flex items-center gap-1.5 text-xs text-primary hover:underline">
                      <Eye size={14} /> Ko'rish
                    </button>
                  </td>
                </tr>
              ))}
              {paged.length === 0 && (
                <tr><td colSpan={8} className="px-4 py-8 text-center text-text-secondary">Hech narsa topilmadi</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-border flex items-center justify-between">
            <p className="text-xs text-text-secondary">
              Jami: <span className="font-medium">{filtered.length}</span> ta
            </p>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}
                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center
                           disabled:opacity-40 hover:border-primary hover:text-primary transition-colors">
                <ChevronLeft size={14} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i+1).map(p => (
                <button key={p} onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                    p === page ? 'bg-primary text-white' : 'border border-border hover:border-primary hover:text-primary'
                  }`}>
                  {p}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages}
                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center
                           disabled:opacity-40 hover:border-primary hover:text-primary transition-colors">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal — foydalanuvchi ma'lumotlari */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl border border-border shadow-modal w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="font-semibold text-text-primary">Foydalanuvchi ma&apos;lumotlari</h2>
              <button onClick={() => setSelected(null)} className="text-text-secondary hover:text-primary">
                <X size={20} />
              </button>
            </div>
            <div className="px-6 py-5 space-y-3">
              {[
                ['To\'liq ism',  selected.fullName],
                ['Username',     selected.username],
                ['Telefon',      selected.phone],
                ['PINFL',        selected.pinfl],
                ['Rol',          selected.role],
                ['Arizalar soni', String(selected.apps)],
                ['Ro\'yxatdan o\'tgan sana', selected.createdAt],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm text-text-secondary">{label}</span>
                  <span className="text-sm font-medium text-text-primary">{value}</span>
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

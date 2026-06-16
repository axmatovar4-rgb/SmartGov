'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react'

type Category = 'BIRTH_CERTIFICATE' | 'STUDENT_CERTIFICATE' | 'RESIDENCE_CERTIFICATE' | 'OTHER'

interface Service {
  id: string
  name: string
  category: Category
  description: string
  estimatedDays: number
  isActive: boolean
}

const categoryLabel: Record<Category, string> = {
  BIRTH_CERTIFICATE:    "Tug'ilganlik haqida ma'lumotnoma",
  STUDENT_CERTIFICATE:  "Talabalik ma'lumotnomasi",
  RESIDENCE_CERTIFICATE:"Yashash joyi ma'lumotnomasi",
  OTHER:                'Boshqa',
}

const initServices: Service[] = [
  { id: '1', name: "Tug'ilganlik haqida ma'lumotnoma", category: 'BIRTH_CERTIFICATE',     description: "Fuqaroning tug'ilganligini tasdiqlovchi rasmiy hujjat.",     estimatedDays: 3,  isActive: true  },
  { id: '2', name: "Talabalik ma'lumotnomasi",          category: 'STUDENT_CERTIFICATE',   description: "Talaba ekanligini tasdiqlovchi ma'lumotnoma.",                estimatedDays: 2,  isActive: true  },
  { id: '3', name: "Yashash joyi ma'lumotnomasi",       category: 'RESIDENCE_CERTIFICATE', description: "Fuqaroning doimiy yashash joyini tasdiqlovchi hujjat.",      estimatedDays: 5,  isActive: true  },
  { id: '4', name: "OTM qabul xizmati",                  category: 'OTHER',                 description: "Oliy ta'lim muassasalariga qabul uchun ariza berish.",       estimatedDays: 10, isActive: true  },
  { id: '5', name: "Diagnostik test",                    category: 'OTHER',                 description: "Bilim darajasini baholash uchun diagnostik test o'tkazish.", estimatedDays: 1,  isActive: false },
]

const emptyForm: Omit<Service, 'id'> = {
  name: '', category: 'OTHER', description: '', estimatedDays: 1, isActive: true,
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>(initServices)
  const [modal, setModal]       = useState<'add' | 'edit' | null>(null)
  const [form, setForm]         = useState<Omit<Service,'id'>>(emptyForm)
  const [editId, setEditId]     = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const openAdd = () => { setForm(emptyForm); setModal('add') }
  const openEdit = (s: Service) => {
    const { id, ...rest } = s
    setEditId(id); setForm(rest); setModal('edit')
  }

  const save = () => {
    if (!form.name.trim()) return
    if (modal === 'add') {
      setServices(prev => [...prev, { ...form, id: String(Date.now()) }])
    } else if (modal === 'edit' && editId) {
      setServices(prev => prev.map(s => s.id === editId ? { ...form, id: editId } : s))
    }
    setModal(null)
  }

  const confirmDelete = () => {
    if (deleteId) setServices(prev => prev.filter(s => s.id !== deleteId))
    setDeleteId(null)
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-text-primary">Xizmatlar</h1>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2 text-sm">
          <Plus size={16} /> Yangi xizmat
        </button>
      </div>

      {/* Jadval */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface">
              <tr>
                {['#', 'Xizmat nomi', 'Kategoriya', 'Muddat', 'Holat', ''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {services.map((s, i) => (
                <tr key={s.id} className="hover:bg-surface transition-colors">
                  <td className="px-4 py-3 text-text-secondary">{i+1}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-text-primary">{s.name}</p>
                    <p className="text-xs text-text-secondary mt-0.5 max-w-xs truncate">{s.description}</p>
                  </td>
                  <td className="px-4 py-3 text-text-secondary text-xs whitespace-nowrap">{categoryLabel[s.category]}</td>
                  <td className="px-4 py-3 text-text-secondary whitespace-nowrap">{s.estimatedDays} kun</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      s.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {s.isActive ? 'Faol' : 'Nofaol'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(s)}
                        className="w-8 h-8 rounded-lg border border-border flex items-center justify-center
                                   text-text-secondary hover:text-primary hover:border-primary transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => setDeleteId(s.id)}
                        className="w-8 h-8 rounded-lg border border-border flex items-center justify-center
                                   text-text-secondary hover:text-red-500 hover:border-red-300 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl border border-border shadow-modal w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="font-semibold text-text-primary">
                {modal === 'add' ? 'Yangi xizmat qo\'shish' : 'Xizmatni tahrirlash'}
              </h2>
              <button onClick={() => setModal(null)} className="text-text-secondary hover:text-primary"><X size={20}/></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Xizmat nomi</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  className="input" placeholder="Xizmat nomini kiriting" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Kategoriya</label>
                <select value={form.category} onChange={e => setForm({...form, category: e.target.value as Category})}
                  className="input bg-white">
                  {(Object.keys(categoryLabel) as Category[]).map(k => (
                    <option key={k} value={k}>{categoryLabel[k]}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Tavsif</label>
                <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                  className="input resize-none" rows={3} placeholder="Qisqa tavsif..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Ko'rib chiqish muddati (kun)</label>
                <input type="number" min={1} max={30} value={form.estimatedDays}
                  onChange={e => setForm({...form, estimatedDays: Number(e.target.value)})}
                  className="input w-32" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="isActive" checked={form.isActive}
                  onChange={e => setForm({...form, isActive: e.target.checked})}
                  className="w-4 h-4 accent-primary" />
                <label htmlFor="isActive" className="text-sm text-text-primary cursor-pointer">Faol holat</label>
              </div>
            </div>
            <div className="px-6 pb-5 flex gap-3">
              <button onClick={() => setModal(null)} className="btn-outline flex-1">Bekor qilish</button>
              <button onClick={save} className="btn-primary flex-1 flex items-center justify-center gap-2">
                <Save size={16} />
                {modal === 'add' ? 'Qo\'shish' : 'Saqlash'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* O'chirish tasdiqlash */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl border border-border shadow-modal w-full max-w-sm p-6 text-center">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={22} className="text-red-500" />
            </div>
            <h2 className="font-semibold text-text-primary mb-2">Xizmatni o'chirish</h2>
            <p className="text-sm text-text-secondary mb-5">Bu xizmatni o'chirishni tasdiqlaysizmi? Bu amalni qaytarib bo'lmaydi.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="btn-outline flex-1">Bekor qilish</button>
              <button onClick={confirmDelete}
                className="flex-1 bg-red-500 text-white font-medium py-2 rounded hover:bg-red-600 transition-colors">
                O'chirish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

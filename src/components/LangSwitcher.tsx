'use client'

import { useState, useRef, useEffect } from 'react'
import { Globe, ChevronDown, Check } from 'lucide-react'
import { useLangStore } from '@/lib/langStore'

const langs = [
  { code: 'uz' as const, label: "O'z", full: "O'zbek" },
  { code: 'ru' as const, label: 'Ru',  full: 'Русский' },
  { code: 'en' as const, label: 'En',  full: 'English' },
]

export default function LangSwitcher() {
  const { lang, setLang } = useLangStore()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const current = langs.find((l) => l.code === lang)!

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-sm text-text-secondary
                   hover:text-primary transition-colors px-2 py-1 rounded
                   hover:bg-surface"
      >
        <Globe size={15} />
        <span className="font-medium">{current.label}</span>
        <ChevronDown size={13} className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-36 bg-white
                        border border-border rounded-xl shadow-modal z-50 overflow-hidden">
          {langs.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false) }}
              className="w-full flex items-center justify-between px-4 py-2.5
                         text-sm hover:bg-surface transition-colors text-text-primary"
            >
              <span className="font-medium">{l.full}</span>
              {lang === l.code && <Check size={14} className="text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

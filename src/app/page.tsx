'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  Building2, BarChart2, FlaskConical, Languages,
  Megaphone, ArrowRight, Phone, Globe,
  GraduationCap, Scale, University,
  ClipboardList, FileSearch, FileCheck,
} from 'lucide-react'
import PartnersMarquee from '@/components/PartnersMarquee'
import LangSwitcher from '@/components/LangSwitcher'
import { useLangStore } from '@/lib/langStore'
import { translations } from '@/lib/i18n'

const servicesByTab: Record<string, { icon: React.ElementType; label: string }[]> = {
  tabMain: [
    { icon: GraduationCap, label: "Oliy va kasbiy ta'lim tashkilotlariga qabul (2026-2027)" },
    { icon: Scale,         label: "O'zbekiston Respublikasi Huquqni muhofaza qilish akademiyasi" },
    { icon: University,    label: "Profi University" },
    { icon: Scale,         label: "Huquqni muhofaza qilish akademiyasi Magistraturasiga qabul" },
    { icon: Building2,     label: "«ToshTech» texnika universiteti" },
    { icon: ClipboardList, label: "Diagnostik test materiallariga buyurtma berish" },
    { icon: FileSearch,    label: "Onlayn diagnostik test sinovi" },
    { icon: FileCheck,     label: "Aprobatsiya" },
    { icon: BarChart2,     label: "Diagnostik test sinovlari natijasini onlayn tekshirish" },
  ],
  tabAdmission: [
    { icon: GraduationCap, label: "Oliy ta'lim muassasalariga qabul" },
    { icon: University,    label: "Magistraturaga qabul" },
    { icon: Building2,     label: "Texnikum va kollejlarga qabul" },
  ],
  tabResults: [
    { icon: FileSearch, label: "Test natijalarini tekshirish" },
    { icon: BarChart2,  label: "Reyting natijalarini ko'rish" },
  ],
  tabDiag: [
    { icon: ClipboardList, label: "Diagnostik test buyurtma" },
    { icon: FileSearch,    label: "Onlayn diagnostik test" },
    { icon: FileCheck,     label: "Natijani tekshirish" },
  ],
  tabAbit: [
    { icon: FileCheck,     label: "Abituriyent ruxsatnomasi olish" },
    { icon: ClipboardList, label: "Ruxsatnoma holatini tekshirish" },
  ],
}

const TAB_KEYS = ['tabMain', 'tabAdmission', 'tabResults', 'tabDiag', 'tabAbit'] as const

export default function HomePage() {
  const { lang } = useLangStore()
  const t = translations[lang]
  const [activeTab, setActiveTab] = useState<typeof TAB_KEYS[number]>('tabMain')

  const quickServices = [
    { icon: Building2,    label: t.otm,      disabled: false },
    { icon: BarChart2,    label: t.texnikum, disabled: true  },
    { icon: FlaskConical, label: t.ilmiy,    disabled: true  },
    { icon: Languages,    label: t.tillar,   disabled: true  },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-surface">

      {/* HEADER */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
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
          <div className="flex items-center gap-5">
            <LangSwitcher />
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <span>{t.callCenter}</span>
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

      {/* HERO */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="bg-surface rounded-2xl border border-border px-8 py-10 flex items-center justify-between gap-8">
            <div className="max-w-xl">
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary leading-snug mb-6">
                {t.heroTitle}
              </h1>
              <div className="flex items-center gap-3">
                <Link href="/login" className="btn-primary px-5 py-2 text-sm">{t.login}</Link>
                <Link href="/register" className="btn-outline px-5 py-2 text-sm">{t.register}</Link>
              </div>
            </div>
            <div className="hidden md:grid grid-cols-2 gap-2 flex-shrink-0">
              <div className="w-16 h-16 rounded-xl bg-primary opacity-80" />
              <div className="w-16 h-16 rounded-full bg-primary/40 border-4 border-primary/60" />
              <div className="w-16 h-16 rounded-xl bg-primary/30 grid grid-cols-3 gap-0.5 p-1.5">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="rounded-sm bg-primary/60" />
                ))}
              </div>
              <div className="w-16 h-16 rounded-full border-4 border-primary/50 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-primary/40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BANNER */}
      <section className="max-w-6xl mx-auto px-4 mb-6 w-full">
        <div className="bg-white border border-border rounded-xl px-5 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Megaphone size={20} className="text-primary flex-shrink-0" />
            <p className="text-sm text-text-primary truncate">{t.bannerText}</p>
          </div>
          <Link href="/services" className="btn-primary flex items-center gap-1.5 text-sm px-4 py-2 flex-shrink-0">
            {t.useService}
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* TEZKOR XIZMATLAR */}
      <section className="max-w-6xl mx-auto px-4 mb-10 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickServices.map(({ icon: Icon, label, disabled }) =>
            disabled ? (
              <div key={label}
                className="bg-white border border-border rounded-xl p-5
                           flex flex-col items-center gap-3 text-center
                           opacity-50 cursor-not-allowed select-none relative">
                <Icon size={32} className="text-gray-300" />
                <span className="text-sm font-medium text-gray-400">{label}</span>
                <span className="absolute top-2 right-2 text-[10px] bg-gray-100
                                 text-gray-400 px-1.5 py-0.5 rounded-full leading-none">
                  {t.comingSoon}
                </span>
              </div>
            ) : (
              <Link key={label} href="/services"
                className="bg-white border border-border rounded-xl p-5
                           flex flex-col items-center gap-3 text-center
                           hover:border-primary hover:shadow-card
                           transition-all duration-200 group">
                <Icon size={32} className="text-text-secondary group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-text-primary">{label}</span>
              </Link>
            )
          )}
        </div>
      </section>

      {/* XIZMATLAR BO'LIMI */}
      <section className="max-w-6xl mx-auto px-4 mb-10 w-full">
        <div className="bg-white rounded-2xl border border-border p-6">
          <h2 className="text-2xl font-bold text-text-primary text-center mb-6">{t.services}</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {TAB_KEYS.map((key) => (
              <button key={key} onClick={() => setActiveTab(key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150 ${
                  activeTab === key
                    ? 'bg-primary text-white'
                    : 'bg-surface text-text-secondary border border-border hover:border-primary hover:text-primary'
                }`}>
                {t[key]}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(servicesByTab[activeTab] ?? []).map(({ icon: Icon, label }) => (
              <Link key={label} href="/services"
                className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary hover:shadow-card bg-white transition-all duration-200 group">
                <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                  <Icon size={20} className="text-text-secondary group-hover:text-primary transition-colors" />
                </div>
                <span className="text-sm text-text-primary leading-snug">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MOBIL ILOVA */}
      <section className="max-w-6xl mx-auto px-4 mb-10 w-full">
        <div className="bg-white rounded-2xl border border-border px-8 py-8 flex items-center justify-between gap-8">
          <div className="max-w-sm">
            <h2 className="text-2xl font-bold text-text-primary mb-2">{t.mobileTitle}</h2>
            <p className="text-sm text-text-secondary mb-6">{t.mobileDesc}</p>
            <div className="flex items-center gap-3">
              <a href="#" className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-xl hover:bg-gray-900 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M3.18 23.76c.3.17.64.24.99.2l11.53-11.53L12.24 9l-9.06 14.76z"/>
                  <path d="M20.47 10.36l-2.58-1.49-3.12 3.12 3.12 3.13 2.61-1.51c.74-.43.74-1.31-.03-1.75z"/>
                  <path d="M3.18.24C2.84.2 2.5.28 2.2.44L13.69 11.93l3.12-3.12L3.18.24z"/>
                </svg>
                <div>
                  <p className="text-xs leading-none opacity-70">GET IT ON</p>
                  <p className="text-sm font-semibold leading-tight">Google Play</p>
                </div>
              </a>
              <a href="#" className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-xl hover:bg-gray-900 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div>
                  <p className="text-xs leading-none opacity-70">Download on the</p>
                  <p className="text-sm font-semibold leading-tight">App Store</p>
                </div>
              </a>
            </div>
          </div>
          <div className="hidden md:flex flex-col items-center gap-2 flex-shrink-0">
            <div className="w-32 h-32 bg-surface border-2 border-border rounded-xl flex items-center justify-center">
              <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
                <rect x="4" y="4" width="28" height="28" rx="3" fill="#0F172A"/>
                <rect x="8" y="8" width="20" height="20" rx="2" fill="white"/>
                <rect x="12" y="12" width="12" height="12" rx="1" fill="#0F172A"/>
                <rect x="64" y="4" width="28" height="28" rx="3" fill="#0F172A"/>
                <rect x="68" y="8" width="20" height="20" rx="2" fill="white"/>
                <rect x="72" y="12" width="12" height="12" rx="1" fill="#0F172A"/>
                <rect x="4" y="64" width="28" height="28" rx="3" fill="#0F172A"/>
                <rect x="8" y="68" width="20" height="20" rx="2" fill="white"/>
                <rect x="12" y="72" width="12" height="12" rx="1" fill="#0F172A"/>
                <rect x="40" y="4" width="8" height="8" fill="#0F172A"/>
                <rect x="52" y="4" width="8" height="8" fill="#0F172A"/>
                <rect x="40" y="16" width="8" height="8" fill="#0F172A"/>
                <rect x="40" y="40" width="8" height="8" fill="#0F172A"/>
                <rect x="52" y="40" width="8" height="8" fill="#0F172A"/>
                <rect x="64" y="40" width="8" height="8" fill="#0F172A"/>
                <rect x="40" y="52" width="16" height="8" fill="#0F172A"/>
                <rect x="64" y="52" width="8" height="8" fill="#0F172A"/>
                <rect x="40" y="64" width="8" height="16" fill="#0F172A"/>
                <rect x="52" y="64" width="8" height="8" fill="#0F172A"/>
                <rect x="64" y="64" width="8" height="8" fill="#0F172A"/>
              </svg>
            </div>
            <p className="text-xs text-text-secondary">{t.qrLabel}</p>
          </div>
        </div>
      </section>

      {/* HAMKOR TASHKILOTLAR */}
      <PartnersMarquee />

      {/* FOOTER */}
      <footer className="bg-white border-t border-border mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">SG</span>
            </div>
            <span className="text-sm font-medium text-text-primary">SmartGov</span>
          </Link>
          <div className="flex items-center gap-4 text-sm text-text-secondary">
            <span>{t.callCenter}</span>
            <a href="tel:1195" className="flex items-center gap-1.5 font-semibold text-text-primary hover:text-primary transition-colors">
              <Phone size={14} />
              1195
            </a>
            <span className="flex items-center gap-1 text-xs text-green-600">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              24/7
            </span>
          </div>
          <p className="text-xs text-text-secondary">
            © {new Date().getFullYear()} SmartGov. {t.rights}
          </p>
        </div>
      </footer>
    </div>
  )
}

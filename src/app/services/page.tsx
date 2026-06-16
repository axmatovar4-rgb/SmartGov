'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  GraduationCap, Scale, University, Building2,
  ClipboardList, FileSearch, FileCheck, BarChart2,
  ChevronDown, Share2, Star, Clock, Users,
  ArrowLeft,
} from 'lucide-react'

const service = {
  icon: GraduationCap,
  title: "Oliy va kasbiy (professional) ta'lim tashkilotlariga qabul (2026-2027-o'quv yili uchun)",
  rating: 4.72,
  time: '5 daqiqa',
  timeLabel: 'Ariza qoldirish uchun yetadi',
  usageLabel: 'Marotaba foydalanilgan',
  usageCount: '12 450',
}

const accordions: { id: string; icon: React.ElementType; label: string; content: React.ReactNode }[] = [
  {
    id: 'users',
    icon: Users,
    label: 'Xizmatdan foydalanuvchilar',
    content: (
      <p>Jismoniy shaxslar</p>
    ),
  },
  {
    id: 'price',
    icon: ClipboardList,
    label: 'Xizmat narxi',
    content: (
      <ul className="space-y-1.5">
        <li>• Test sinovida ishtirok etish uchun to&apos;lov miqdori — 206 000 so&apos;m (0,5 BHM)</li>
        <li className="font-semibold text-text-primary mt-2">
          Quyidagi toifadagi abituriyentlardan to&apos;lov undirilmaydi:
        </li>
        <ul className="ml-4 space-y-1">
          <li>◦ &quot;Yoshlar daftari&quot;ga kiritilgan yoshlar;</li>
          <li>◦ &quot;Ijtimoiy himoya yagona reyestri&quot; axborot tizimida ro&apos;yxatga olingan shaxslar va ularning farzandlari;</li>
          <li>◦ Nogironligi bo&apos;lgan shaxslar;</li>
          <li>◦ To&apos;liq davlat ta&apos;minotidagi shaxslar;</li>
          <li>◦ Joriy yil bitiruvchilari;</li>
          <li>◦ Imtihonlarsiz talabalikka tavsiya etiladigan abituriyentlar.</li>
        </ul>
      </ul>
    ),
  },
  {
    id: 'contact',
    icon: FileSearch,
    label: "Bog'lanish",
    content: (
      <p>Koll markaz: <a href="tel:1195" className="font-semibold text-primary hover:underline">1195</a></p>
    ),
  },
]

const otherServices = [
  { icon: GraduationCap, label: "Oliy va kasbiy ta'lim tashkilotlariga qabul (2026-2027)" },
  { icon: Scale,         label: "O'zbekiston Respublikasi Huquqni muhofaza qilish akademiyasi" },
  { icon: University,    label: "Profi University" },
  { icon: Building2,     label: "«ToshTech» texnika universiteti" },
  { icon: ClipboardList, label: "Diagnostik test materiallariga buyurtma berish" },
  { icon: FileSearch,    label: "Onlayn diagnostik test sinovi" },
  { icon: FileCheck,     label: "Aprobatsiya" },
  { icon: BarChart2,     label: "Diagnostik test sinovlari natijasini onlayn tekshirish" },
]

export default function ServicesPage() {
  const [open, setOpen] = useState<string | null>(null)
  const Icon = service.icon

  return (
    <div className="min-h-screen bg-surface">

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-text-secondary">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <ArrowLeft size={14} />
            Asosiy sahifa
          </Link>
          <span>/</span>
          <span className="text-text-primary font-medium">Xizmatlar</span>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── CHAP: Xizmat ma'lumotlari ── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Sarlavha kartasi */}
            <div className="bg-white rounded-2xl border border-border p-6">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={24} className="text-primary" />
                </div>
                <h1 className="text-xl font-bold text-text-primary leading-snug">
                  {service.title}
                </h1>
              </div>

              {/* Reyting + Vaqt + Foydalanish */}
              <div className="flex flex-wrap items-center gap-6 mb-6">
                {/* Reyting */}
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {[1,2,3,4,5].map((i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i <= Math.round(service.rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-200 fill-gray-200'}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-sm text-text-primary">{service.rating}</span>
                </div>

                {/* Vaqt */}
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Clock size={16} className="text-primary" />
                  <span className="font-semibold text-text-primary">{service.time}</span>
                  <span>{service.timeLabel}</span>
                </div>

                {/* Foydalanish */}
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Users size={16} className="text-primary" />
                  <span className="font-semibold text-text-primary">{service.usageCount}</span>
                  <span>{service.usageLabel}</span>
                </div>
              </div>

              {/* Tugmalar */}
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="btn-primary flex items-center gap-2 px-6 py-2.5"
                >
                  Xizmatdan foydalanish
                </Link>
                <button
                  className="w-10 h-10 rounded-lg border border-border flex items-center justify-center
                             text-text-secondary hover:text-primary hover:border-primary transition-colors"
                  title="Ulashish"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            {/* Accordion bo'limlari */}
            <div className="space-y-2">
              {accordions.map(({ id, icon: AccIcon, label, content }) => (
                <div key={id} className="bg-white rounded-xl border border-border overflow-hidden">
                  <button
                    onClick={() => setOpen(open === id ? null : id)}
                    className="w-full flex items-center justify-between px-5 py-4
                               hover:bg-surface transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <AccIcon size={18} className="text-primary" />
                      <span className="font-medium text-text-primary text-sm">{label}</span>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-text-secondary transition-transform duration-200
                        ${open === id ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {open === id && (
                    <div className="px-5 pb-4 text-sm text-text-secondary border-t border-border pt-3">
                      {content}
                    </div>
                  )}                </div>
              ))}
            </div>
          </div>

          {/* ── O'NG: Video ── */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-border overflow-hidden">
              {/* YouTube thumbnail + link */}
              <a
                href="https://youtu.be/v1bzwnBPaxI"
                target="_blank"
                rel="noopener noreferrer"
                className="relative block w-full aspect-video group"
              >
                {/* YouTube thumbnail rasmi */}
                <img
                  src="https://img.youtube.com/vi/v1bzwnBPaxI/hqdefault.jpg"
                  alt="Davlat oliy va kasbiy ta'lim tashkilotlari"
                  className="w-full h-full object-cover"
                />
                {/* Play tugmasi overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center
                                bg-black/30 group-hover:bg-black/40 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center
                                  group-hover:scale-110 transition-transform duration-200 shadow-lg">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#1A5C38">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-white text-xs mt-2 font-medium drop-shadow">Tomosha qiling</p>
                </div>
                {/* YouTube badge */}
                <div className="absolute bottom-3 right-3 bg-red-600 text-white text-xs
                                px-2 py-1 rounded flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                    <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.6 2.8 12 2.8 12 2.8s-4.6 0-6.8.2c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.3v2c0 2.1.3 4.3.3 4.3s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.5 21.8 12 21.8 12 21.8s4.6 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.1.3-4.3v-2C23.3 9.1 23 7 23 7zM9.7 15.5V8.2l8.1 3.7-8.1 3.6z"/>
                  </svg>
                  YouTube
                </div>
              </a>
              <div className="p-4">
                <p className="text-sm font-medium text-text-primary">
                  Davlat oliy va kasbiy ta&apos;lim tashki...
                </p>
                <p className="text-xs text-text-secondary mt-1">
                  Bilimni baholash agentligi
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOSHQA XIZMATLAR ── */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-text-primary mb-4">Boshqa xizmatlar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {otherServices.map(({ icon: OtherIcon, label }) => (
              <Link
                key={label}
                href="/services"
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-border
                           hover:border-primary hover:shadow-card transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center
                                flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                  <OtherIcon size={20} className="text-text-secondary group-hover:text-primary transition-colors" />
                </div>
                <span className="text-sm text-text-primary leading-snug">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

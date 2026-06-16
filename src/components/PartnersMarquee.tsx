'use client'

// Hamkor tashkilotlar — cheksiz chapdan o'ngga harakatlanuvchi galereya

const partners = [
  {
    name: 'GRE',
    bg: '#006B9F',
    text: '#FFFFFF',
    abbr: 'GRE',
    full: 'Educational Testing Service',
  },
  {
    name: 'CITO',
    bg: '#E8610A',
    text: '#FFFFFF',
    abbr: 'CiTO',
    full: '',
  },
  {
    name: 'NILE',
    bg: '#1A5C38',
    text: '#FFFFFF',
    abbr: 'NILE',
    full: 'National Institute',
  },
  {
    name: 'British Council',
    bg: '#003087',
    text: '#FFFFFF',
    abbr: 'BC',
    full: 'British Council',
  },
  {
    name: 'OSYM',
    bg: '#C0392B',
    text: '#FFFFFF',
    abbr: 'ÖSYM',
    full: '',
  },
  {
    name: 'Oxford',
    bg: '#002147',
    text: '#FFFFFF',
    abbr: 'Oxford',
    full: 'University Press',
  },
  {
    name: 'Alte',
    bg: '#F5A623',
    text: '#FFFFFF',
    abbr: 'ALTE',
    full: 'Association',
  },
  {
    name: 'Scantron',
    bg: '#4A4A9C',
    text: '#FFFFFF',
    abbr: 'SCAN',
    full: 'Scantron',
  },
]

export default function PartnersMarquee() {
  const doubled = [...partners, ...partners]

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 mb-6">
        <h2 className="text-xl font-semibold text-text-primary">
          Hamkor tashkilotlar
        </h2>
      </div>

      <div className="relative overflow-hidden">
        {/* Gradient tutun — chap */}
        <div className="absolute left-0 top-0 h-full w-24 z-10
                        bg-gradient-to-r from-white to-transparent pointer-events-none" />
        {/* Gradient tutun — o'ng */}
        <div className="absolute right-0 top-0 h-full w-24 z-10
                        bg-gradient-to-l from-white to-transparent pointer-events-none" />

        {/* Harakatlanuvchi qator */}
        <div className="flex gap-4 animate-marquee w-max">
          {doubled.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex flex-col items-center justify-center
                         w-44 h-24 bg-white border border-border
                         rounded-xl shadow-card flex-shrink-0
                         hover:shadow-md hover:border-primary-light
                         transition-all duration-200 overflow-hidden"
            >
              {/* Rangli logo blok */}
              <div
                className="w-full flex flex-col items-center justify-center gap-0.5 h-full px-3"
                style={{ background: `${partner.bg}15` }}
              >
                {/* Rangli badge */}
                <div
                  className="px-3 py-1 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: partner.bg }}
                >
                  <span
                    className="font-bold text-base tracking-wide leading-none"
                    style={{ color: partner.text }}
                  >
                    {partner.abbr}
                  </span>
                </div>
                {/* Quyi matn */}
                {partner.full && (
                  <span className="text-[10px] text-text-secondary text-center leading-tight mt-1">
                    {partner.full}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

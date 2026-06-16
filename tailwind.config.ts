import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // --- Asosiy yashil ---
        primary: {
          DEFAULT: '#1A5C38',
          dark:    '#0F3D24',
          light:   '#2D7A4F',
        },
        // --- Sabzirang aksent ---
        accent: {
          DEFAULT: '#E8610A',
          dark:    '#C4500A',
          light:   '#F97316',
        },
        // --- Fon va yuza ---
        surface: '#F8FAFC',
        // --- Matn ---
        'text-primary':   '#0F172A',
        'text-secondary': '#64748B',
        // --- Chegaralar ---
        border: '#E2E8F0',
        // --- Holat ranglari ---
        status: {
          submitted: {
            bg:   '#EFF6FF',
            text: '#1D4ED8',
          },
          review: {
            bg:   '#FFF7ED',
            text: '#C4500A',
          },
          approved: {
            bg:   '#F0FDF4',
            text: '#15803D',
          },
          rejected: {
            bg:   '#FFF1F2',
            text: '#BE123C',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.07)',
        modal: '0 20px 60px -10px rgb(0 0 0 / 0.25)',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
      },
      // Hamkor tashkilotlar marquee animatsiyasi
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
          // -50% chunki ro'yxat 2x takrorlangan — birinchi yarmi tugagach
          // ikkinchi yarmi bir xil ko'rinadi, seamless loop hosil bo'ladi
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        // 30s — tezlikni shunga qarab moslashtiring (kichik = tez, katta = sekin)
      },
    },
  },
  plugins: [],
}

export default config

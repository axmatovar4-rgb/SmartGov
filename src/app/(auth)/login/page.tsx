'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, LogIn, Lock } from 'lucide-react'
import { useLangStore } from '@/lib/langStore'
import { translations } from '@/lib/i18n'

const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8),
})
type LoginForm = z.infer<typeof loginSchema>

// Mock foydalanuvchilar
const MOCK_USERS = [
  { username: 'admin',      password: 'admin123',    role: 'ADMIN' },
  { username: 'ali_valiyev', password: 'Parol1234',  role: 'USER'  },
]

export default function LoginPage() {
  const router = useRouter()
  const { lang } = useLangStore()
  const t = translations[lang]

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    setLoading(true)
    setServerError('')

    // Mock login — backend bo'lguncha
    await new Promise(r => setTimeout(r, 600)) // loading effekti
    const found = MOCK_USERS.find(
      u => u.username === data.username && u.password === data.password
    )
    if (!found) {
      setServerError(
        lang === 'uz' ? "Username yoki parol noto'g'ri" :
        lang === 'ru' ? 'Неверное имя пользователя или пароль' :
        'Incorrect username or password'
      )
      setLoading(false)
      return
    }
    // Rolni saqlash
    localStorage.setItem('role', found.role)
    localStorage.setItem('username', found.username)

    // Yo'naltirish
    if (found.role === 'ADMIN') {
      router.push('/admin')
    } else {
      router.push('/dashboard')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Breadcrumb */}
        <nav className="text-sm text-text-secondary mb-6">
          <Link href="/" className="hover:text-primary transition-colors">
            {t.loginBreadcrumb}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-text-primary font-medium">{t.loginTitle}</span>
        </nav>

        <div className="bg-white rounded-xl border border-border shadow-card px-8 py-10">
          <h1 className="text-2xl font-bold text-text-primary mb-1">{t.loginTitle}</h1>
          <p className="text-sm text-text-secondary mb-6">
            {t.loginNewUser}{' '}
            <Link href="/register" className="text-primary font-medium hover:underline">
              {t.loginRegisterLink}
            </Link>
          </p>

          {/* Demo ma'lumotlar */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg px-4 py-3 mb-5 text-xs space-y-1">
            <p className="font-semibold text-primary mb-1">Demo kirish:</p>
            <p className="text-text-secondary">👨‍💼 Admin: <span className="font-mono font-medium text-text-primary">admin</span> / <span className="font-mono font-medium text-text-primary">admin123</span></p>
            <p className="text-text-secondary">👤 User: <span className="font-mono font-medium text-text-primary">ali_valiyev</span> / <span className="font-mono font-medium text-text-primary">Parol1234</span></p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                {t.loginUsername}
              </label>
              <input
                {...register('username')}
                type="text"
                placeholder="ali_valiyev"
                className="input"
                autoComplete="username"
              />
              {errors.username && (
                <p className="mt-1 text-xs text-red-600">{errors.username.message}</p>
              )}
            </div>

            {/* Parol */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                {t.loginPassword}
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className="input pr-10"
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Server xatosi */}
            {serverError && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                <p className="text-sm text-red-700">{serverError}</p>
              </div>
            )}

            {/* Parolni tiklash + Kirish */}
            <div className="flex items-center justify-between pt-1">
              <Link href="/forgot-password"
                className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary transition-colors">
                <Lock size={14} />
                {t.loginForgot}
              </Link>
              <button type="submit" disabled={loading}
                className="btn-primary flex items-center gap-2 px-6">
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    {t.loginLoading}
                  </>
                ) : (
                  <>
                    {t.loginBtn}
                    <LogIn size={16} />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Ajratuvchi */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-text-secondary">{t.loginOr}</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* OneID */}
          <a href="https://id.egov.uz/oz"
            className="w-full flex items-center justify-center gap-2
                       bg-primary text-white font-medium py-2.5 rounded
                       hover:bg-primary-dark transition-colors duration-150">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="8" height="8" rx="1" fill="white" fillOpacity="0.9"/>
              <rect x="13" y="3" width="8" height="8" rx="1" fill="white" fillOpacity="0.6"/>
              <rect x="3" y="13" width="8" height="8" rx="1" fill="white" fillOpacity="0.6"/>
              <rect x="13" y="13" width="8" height="8" rx="1" fill="white" fillOpacity="0.3"/>
            </svg>
            {t.loginOneId}
          </a>
        </div>
      </div>
    </div>
  )
}

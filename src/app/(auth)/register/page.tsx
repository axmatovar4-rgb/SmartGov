'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, ArrowRight, Lock, HelpCircle } from 'lucide-react'
import { useLangStore } from '@/lib/langStore'
import { translations } from '@/lib/i18n'

const registerSchema = z.object({
  passportSerial: z.string().regex(/^[A-Z]{2}\d{7}$/, 'AA1234567'),
  pinfl: z.string().regex(/^\d{14}$/, '14 digits'),
  phoneNumber: z.string().regex(/^\+998\d{9}$/, '+998XXXXXXXXX'),
  password: z.string().min(8).regex(/\d/),
  confirmPassword: z.string(),
  agree: z.literal(true, { errorMap: () => ({ message: '!' }) }),
}).refine((d) => d.password === d.confirmPassword, {
  message: '!',
  path: ['confirmPassword'],
})
type RegisterForm = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const { lang } = useLangStore()
  const t = translations[lang]

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showPinflHint, setShowPinflHint] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true)
    setServerError('')
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passportSerial: data.passportSerial,
          pinfl: data.pinfl,
          phoneNumber: data.phoneNumber,
          password: data.password,
        }),
      })
      if (!res.ok) {
        const err = await res.json()
        setServerError(err.message || t.registerBtn)
        return
      }
      router.push('/login?registered=1')
    } catch {
      setServerError(lang === 'uz'
        ? "Xatolik yuz berdi. Qayta urinib ko'ring."
        : lang === 'ru'
        ? 'Произошла ошибка. Попробуйте снова.'
        : 'An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-xl border border-border shadow-card px-8 py-10">
          <h1 className="text-2xl font-bold text-text-primary mb-6">{t.registerTitle}</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

            {/* Pasport + PINFL */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  {t.registerPassport}
                </label>
                <input {...register('passportSerial')} type="text"
                  placeholder="AA1234567" className="input uppercase" maxLength={9} />
                {errors.passportSerial && (
                  <p className="mt-1 text-xs text-red-600">{errors.passportSerial.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1 flex items-center gap-1">
                  {t.registerPinfl}
                  <button type="button" onClick={() => setShowPinflHint(!showPinflHint)}
                    className="text-text-secondary hover:text-primary transition-colors">
                    <HelpCircle size={15} />
                  </button>
                </label>
                <input {...register('pinfl')} type="text"
                  placeholder="12345678901234" className="input" maxLength={14} />
                {showPinflHint && (
                  <p className="mt-1 text-xs text-text-secondary bg-surface border border-border rounded px-3 py-2">
                    {t.registerPinflHint}
                  </p>
                )}
                {errors.pinfl && (
                  <p className="mt-1 text-xs text-red-600">{errors.pinfl.message}</p>
                )}
              </div>
            </div>

            {/* Telefon */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                {t.registerPhone}
              </label>
              <input {...register('phoneNumber')} type="tel"
                placeholder="+998 90 123 45 67" className="input" autoComplete="tel" />
              {errors.phoneNumber && (
                <p className="mt-1 text-xs text-red-600">{errors.phoneNumber.message}</p>
              )}
            </div>

            {/* Parol */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                {t.registerPassword}
              </label>
              <div className="relative">
                <input {...register('password')} type={showPassword ? 'text' : 'password'}
                  className="input pr-10" autoComplete="new-password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Parolni qayta kiriting */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                {t.registerConfirm}
              </label>
              <div className="relative">
                <input {...register('confirmPassword')} type={showConfirm ? 'text' : 'password'}
                  className="input pr-10" autoComplete="new-password" />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary transition-colors">
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Rozilik */}
            <div className="flex items-start gap-3">
              <input {...register('agree')} id="agree" type="checkbox"
                className="mt-0.5 w-4 h-4 accent-primary rounded cursor-pointer" />
              <label htmlFor="agree" className="text-sm text-text-secondary cursor-pointer">
                <Link href="/terms" className="text-primary hover:underline font-medium">
                  {t.registerAgreeLink}
                </Link>{' '}
                {t.registerAgree}
              </label>
            </div>
            {errors.agree && (
              <p className="text-xs text-red-600 -mt-3">{errors.agree.message}</p>
            )}

            {/* Server xatosi */}
            {serverError && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                <p className="text-sm text-red-700">{serverError}</p>
              </div>
            )}

            {/* Kirish + Ro'yxatdan o'tish */}
            <div className="flex items-center justify-between pt-1">
              <Link href="/login"
                className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary transition-colors">
                <Lock size={14} />
                {t.registerLoginLink}
              </Link>
              <button type="submit" disabled={loading}
                className="btn-primary flex items-center gap-2 px-6">
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    {t.registerSaving}
                  </>
                ) : (
                  <>
                    {t.registerBtn}
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

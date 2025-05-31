'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import RegisterInitForm from '@/features/auth/components/email-registration-form'
import VerifyOtpForm from '@/features/auth/components/verify-otp-form'
import CompleteRegisterForm from '@/features/auth/components/complete-registration-form'
import { AuthResponse } from '@/features/auth/types'
import { ErrorDialog } from '@/components/umum/error-dialog'

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState<'init' | 'verify' | 'complete'>('init')
  const [email, setEmail] = useState('')
  const [registerToken, setRegisterToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInitSuccess = (response: AuthResponse) => {
    setEmail(response.data?.email || '')
    setStep('verify')
  }

  const handleVerifySuccess = (response: AuthResponse) => {
    setRegisterToken(response.data?.register_token || '')
    setStep('complete')
  }

  const handleCompleteSuccess = () => {
    router.push('/login')
  }

return (
  <>
    <div className="flex items-center justify-center min-h-screen w-full md:px-10 px-5 py-15 bg-cover bg-no-repeat bg-center">
      <section className="flex flex-col gap-5 text-accent-1 w-fit min-w-[400px] h-fit bg-[url('/images/background-register.png')] shadow-lg rounded-none rounded-bl-[70px] rounded-tr-[70px] px-6 py-15">
        {step === 'init' && (
          <RegisterInitForm
            onSuccess={handleInitSuccess}
            setError={setError}
            setLoading={setLoading}
            loading={loading}
          />
        )}

        {step === 'verify' && (
          <VerifyOtpForm
            email={email}
            onSuccess={handleVerifySuccess}
            onBack={() => setStep('init')}
            setError={setError}
            setLoading={setLoading}
            loading={loading}
          />
        )}

        {step === 'complete' && (
          <CompleteRegisterForm
            email={email}
            registerToken={registerToken}
            onSuccess={handleCompleteSuccess}
            setError={setError}
            setLoading={setLoading}
            loading={loading}
          />
        )}
      </section>
    </div>

    <ErrorDialog
      open={!!error}
      message={error || ''}
      onClose={() => setError(null)}
    />
  </>
)

}

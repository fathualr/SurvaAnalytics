'use client'

import { useRegister } from '@/features/auth/hooks/useRegister'
import { EmailRegisterForm } from '@/features/auth/components/email-registration-form'
import { VerifyOtpForm } from '@/features/auth/components/verify-otp-form'
import { CompleteRegisterForm } from '@/features/auth/components/complete-registration-form'
import { ErrorDialog } from '@/components/umum/error-dialog'

export default function RegisterPage() {
  const {
    step,
    email,
    loading,
    loadingResend,
    error,
    initRegister,
    resendOtp, 
    verifyOtp,
    completeRegister,
    setStep,
    setError,
  } = useRegister()

  return (
    <>
      <div className="flex items-center justify-center min-h-screen w-full md:px-10 px-5 py-15">
        <section
          className="flex flex-col gap-5 text-accent-1 w-full self-center h-fit bg-cover bg-[url('/images/register-page/background.png')] shadow-lg rounded-none rounded-bl-[70px] rounded-tr-[70px] px-6 py-15"
          style={{ maxWidth: step === 'complete' ? 600 : 400 }}
        >
          {step === 'init' && (
            <EmailRegisterForm
              onSubmit={initRegister}
              loading={loading} 
            />
          )}

          {step === 'verify' && (
            <VerifyOtpForm
              email={email}
              onSubmit={verifyOtp}
              onBack={() => setStep('init')}
              onResend={resendOtp}
              loading={loading}
              loadingResend={loadingResend}
            />
          )}

          {step === 'complete' && (
            <CompleteRegisterForm
              email={email}
              onSubmit={completeRegister}
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

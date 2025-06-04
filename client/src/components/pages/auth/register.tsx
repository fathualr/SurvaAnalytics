'use client'

import { useRegister } from '@/features/auth/hooks/useRegister'
import { EmailRegisterForm } from '@/features/auth/components/email-registration-form'
import { VerifyOtpForm } from '@/features/auth/components/verify-otp-form'
import { CompleteAccountForm } from '@/features/auth/components/complete-registration-form'
import { ErrorDialog } from '@/components/umum/error-dialog'

export function RegisterPage() {
  const {
    step,
    email,
    setStep,
    clearError,
    errorMessage,
    emailRegister,
    resendOtp,
    verifyOtp,
    completeAccount,
  } = useRegister();

  return (
    <>
      <div className="flex items-center justify-center min-h-screen w-full md:px-10 px-5 py-15">
        <section
          className="flex flex-col gap-5 text-accent-1 w-full self-center h-fit bg-cover bg-[url('/images/auth-page/background.png')] shadow-lg rounded-none rounded-bl-[70px] rounded-tr-[70px] px-6 py-15"
          style={{ maxWidth: step === 'complete' ? 600 : 400 }}
        >
          {step === 'init' && (
            <EmailRegisterForm
              onSubmit={emailRegister.mutate}
              loading={emailRegister.isPending}
            />
          )}

          {step === 'verify' && (
            <VerifyOtpForm
              email={email}
              onSubmit={verifyOtp.mutate}
              onBack={() => setStep('init')}
              onResend={() => resendOtp.mutateAsync({ email })}
              loading={verifyOtp.isPending}
              loadingResend={resendOtp.isPending}
            />
          )}

          {step === 'complete' && (
            <CompleteAccountForm
              email={email}
              onSubmit={completeAccount.mutate}
              loading={completeAccount.isPending}
            />
          )}
        </section>
      </div>

      <ErrorDialog
        open={!!errorMessage}
        message={errorMessage || ''}
        onClose={clearError}
      />
    </>
  )
}

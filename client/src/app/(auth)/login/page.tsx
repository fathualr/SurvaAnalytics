'use client'

import { useAuthContext } from '@/features/auth/context/AuthContext'
import { LoginForm } from '@/features/auth/components/login-form'
import { ErrorDialog } from '@/components/umum/error-dialog'

export default function LoginPage() {
  const { loading, error, login, setError } = useAuthContext()

  return (
    <>
      <div className="flex items-center justify-center min-h-screen w-full md:px-10 px-5 py-15">
        <section className="flex flex-col gap-5 text-accent-1 w-full max-w-[400px] self-center h-fit bg-cover bg-[url('/images/auth-page/background.png')] shadow-lg rounded-none rounded-bl-[70px] rounded-tr-[70px] px-6 py-15">
          <LoginForm
            onSubmit={login}
            loading={loading}
          />
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

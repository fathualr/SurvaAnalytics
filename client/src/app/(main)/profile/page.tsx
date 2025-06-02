// src/app/(umum)/profile/page.tsx
'use client';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { useProfile } from '@/features/profile/hooks/useProfile';
import { ProfileForm } from '@/features/profile/components/profile-form';
import { NavUmum } from '@/components/umum/nav-umum';
import { ErrorDialog } from '@/components/umum/error-dialog';

export default function ProfilePage() {
  const { user } = useAuth();
  const {
    isEditing,
    loading,
    error,
    setIsEditing,
    updateProfile,
    setError,
  } = useProfile();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex flex-col w-full overflow-hidden min-h-screen pt-16 pb-5 md:px-10 px-5">
      <NavUmum />

      <section className="flex flex-col flex-grow">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Profil Pengguna
        </h1>

        <article className="bg-primary-2 text-accent-1 py-10 sm:px-10 px-5 rounded-xl flex flex-col justify-between">
          <ProfileForm
            user={user}
            isEditing={isEditing}
            loading={loading}
            onEditToggle={() => setIsEditing(!isEditing)}
            onSubmit={updateProfile}
          />
        </article>
      </section>

      <ErrorDialog
        open={!!error}
        message={error || ''}
        onClose={() => setError(null)}
      />
    </main>
  );
}

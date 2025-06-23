'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useProfile } from '@/features/profile/hooks/useProfile';
import { ProfileForm } from '@/features/profile/components/profile-form';
import { NavUmum } from '@/components/umum/nav-umum';
import { ErrorDialog } from '@/components/umum/error-dialog';
import { SuccessDialog } from '@/components/umum/success-dialog';
import { updateProfileForm } from '@/features/profile/hooks/useProfile';

export function ProfilePage() {
  const router = useRouter();
  const { user, isLoggedIn, loading: authLoading } = useAuth();
  const shouldFetch = isLoggedIn && !authLoading;
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const {
    profile,
    isLoading,
    isError,
    refetch,
    updateProfile,
    errorMessage,
    clearError,
  } = useProfile(shouldFetch);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      router.push('/login');
    }
  }, [authLoading, isLoggedIn, router]);

  const handleUpdateProfile = (data: updateProfileForm) => {
    updateProfile.mutate(data, {
      onSuccess: (res) => {
        setIsEditing(false);
        setSuccessMessage(res?.message || 'Profil berhasil diperbarui!');
        setShowSuccess(true);
      },
    });
  };

  return (
    <main className="flex flex-col w-full overflow-hidden min-h-screen pt-16 pb-5 md:px-10 px-5">
      <NavUmum />

      <section className="flex flex-col flex-grow mt-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Profil Pengguna
        </h1>

        <article className="bg-primary-2/90 text-accent-1 sm:p-10 p-5 rounded-xl flex flex-col flex-grow justify-between shadow-lg">
          {isLoggedIn && (
            <ProfileForm
              user={profile}
              isLoadingUser={authLoading || isLoading}
              isError={isError}
              isEditing={isEditing}
              isPending={updateProfile.isPending}
              onEditToggle={() => setIsEditing(!isEditing)}
              onSubmit={handleUpdateProfile}
              onRetry={refetch}
            />
          )}
        </article>
      </section>

      <ErrorDialog
        open={!!errorMessage}
        message={errorMessage || ''}
        onClose={clearError}
      />
      <SuccessDialog
        open={showSuccess}
        message={successMessage}
        onClose={() => setShowSuccess(false)}
      />
    </main>
  );
}

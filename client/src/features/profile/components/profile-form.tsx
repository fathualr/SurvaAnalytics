'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ProfileFormField } from '@/components/umum/form/profile-form-field';
import { UserProfile } from '../types';
import { updateProfileForm } from '../hooks/useProfile';

interface ProfileFormProps {
  user?: UserProfile | null;
  isEditing: boolean;
  isPending: boolean;
  isLoadingUser: boolean;
  isError: boolean;
  onEditToggle: () => void;
  onSubmit: (data: updateProfileForm) => void;
  onRetry: () => void;
}

export function ProfileForm({
  user,
  isEditing,
  isPending,
  isLoadingUser,
  isError,
  onEditToggle,
  onSubmit,
  onRetry,
}: ProfileFormProps) {
  const [formData, setFormData] = useState({
    nama: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    region: '',
    status: '',
    nama_klien: '',
    kontak_klien: '',
    alamat_klien: '',
  });

  useEffect(() => {
    if (!user) return;

    setFormData({
      nama: user.Umum?.nama ?? '',
      tanggal_lahir: user.Umum?.profil_responden?.tanggal_lahir ?? '',
      jenis_kelamin: user.Umum?.profil_responden?.jenis_kelamin ?? '',
      region: user.Umum?.profil_responden?.region ?? '',
      status: user.Umum?.profil_responden?.status ?? '',
      nama_klien: user.Umum?.profil_klien?.nama_klien ?? '',
      kontak_klien: user.Umum?.profil_klien?.kontak_klien ?? '',
      alamat_klien: user.Umum?.profil_klien?.alamat_klien ?? '',
    });
  }, [user]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      umum: {
        nama: formData.nama,
        profil_responden: {
          tanggal_lahir: formData.tanggal_lahir,
          jenis_kelamin: formData.jenis_kelamin,
          region: formData.region,
          status: formData.status,
        },
        profil_klien: {
          nama_klien: formData.nama_klien,
          kontak_klien: formData.kontak_klien,
          alamat_klien: formData.alamat_klien,
        },
      },
    });
  };

  if (isLoadingUser) {
    return (
      <div className="h-full w-full rounded animate-pulse" />
    );
  }

  if (isError || !user) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center bg-red-50 border border-red-200 text-red-700 px-4 py-6 rounded">
        <p>Gagal memuat profil pengguna.</p>
        <Button variant="destructive" onClick={onRetry}>
          Coba Lagi
        </Button>
      </div>
    );
  }

  return (
    <form className="space-y-4 text-sm" onSubmit={handleSubmit}>
      <ProfileFormField
        label="Email"
        id="email"
        value={user.email ?? ''}
        readOnly
      />
      <Separator />

      <div className="grid md:grid-cols-2 gap-8 w-full">
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-base font-bold text-white">
            <span className="inline-block w-1.5 h-5 bg-white rounded-sm" />
            Profil Responden
          </h2>

          <ProfileFormField
            label="Nama"
            id="nama"
            value={formData.nama}
            onChange={handleChange}
            isEditing={isEditing}
          />
          <ProfileFormField
            label="Tanggal Lahir"
            id="tanggal_lahir"
            type="date"
            value={formData.tanggal_lahir}
            onChange={handleChange}
            isEditing={isEditing}
          />
          <ProfileFormField
            label="Jenis Kelamin"
            id="jenis_kelamin"
            type="select"
            value={formData.jenis_kelamin}
            onChange={handleChange}
            isEditing={isEditing}
            options={[
              { value: 'laki laki', label: 'Laki-laki' },
              { value: 'perempuan', label: 'Perempuan' },
            ]}
          />
          <ProfileFormField
            label="Region"
            id="region"
            value={formData.region}
            onChange={handleChange}
            isEditing={isEditing}
          />
          <ProfileFormField
            label="Status"
            id="status"
            value={formData.status}
            onChange={handleChange}
            isEditing={isEditing}
          />
        </div>

        <div className="space-y-4 md:border-l md:pl-6 border-white/30">
          <h2 className="flex items-center gap-2 text-base font-bold text-white">
            <span className="inline-block w-1.5 h-5 bg-white rounded-sm" />
            Profil Klien
          </h2>

          <ProfileFormField
            label="Nama Klien"
            id="nama_klien"
            value={formData.nama_klien}
            onChange={handleChange}
            isEditing={isEditing}
          />
          <ProfileFormField
            label="Kontak Klien"
            id="kontak_klien"
            value={formData.kontak_klien}
            onChange={handleChange}
            isEditing={isEditing}
          />
          <ProfileFormField
            label="Alamat Klien"
            id="alamat_klien"
            value={formData.alamat_klien}
            onChange={handleChange}
            isEditing={isEditing}
          />
        </div>
      </div>

      <footer className="flex justify-end mt-10">
        {isEditing ? (
          <div className="flex gap-3">
            <Button
              type="button"
              onClick={onEditToggle}
              variant="outline"
              className="cursor-pointer bg-accent-1 text-black hover:bg-primary-2 hover:text-accent-1"
              disabled={isPending}
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="cursor-pointer bg-secondary-1 hover:bg-secondary-2 text-sm text-primary-1 font-semibold"
              disabled={isPending}
            >
              {isPending ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            onClick={onEditToggle}
            className="cursor-pointer bg-secondary-1 hover:bg-secondary-2 text-sm text-primary-1 font-semibold"
          >
            Edit Profil
          </Button>
        )}
      </footer>
    </form>
  );
}

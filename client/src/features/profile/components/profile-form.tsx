'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import { UserProfile } from "../types";
import { ProfileFormField } from "@/components/umum/form/profile-form-field";

interface ProfileFormProps {
  user: UserProfile;
  isEditing: boolean;
  loading: boolean;
  onEditToggle: () => void;
  onSubmit: (data: Partial<UserProfile>) => Promise<void>;
}

export function ProfileForm({
  user,
  isEditing,
  loading,
  onEditToggle,
  onSubmit
}: ProfileFormProps) {
  const [formData, setFormData] = useState({
    nama: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    region: '',
    status: '',
    nama_klien: '',
    kontak_klien: '',
    alamat_klien: ''
  });

  useEffect(() => {
    setFormData({
      nama: user.Umum?.nama || '',
      tanggal_lahir: user.Umum?.profil_responden?.tanggal_lahir || '',
      jenis_kelamin: user.Umum?.profil_responden?.jenis_kelamin || '',
      region: user.Umum?.profil_responden?.region || '',
      status: user.Umum?.profil_responden?.status || '',
      nama_klien: user.Umum?.profil_klien?.nama_klien || '',
      kontak_klien: user.Umum?.profil_klien?.kontak_klien || '',
      alamat_klien: user.Umum?.profil_klien?.alamat_klien || ''
    });
  }, [user]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      Umum: {
        nama: formData.nama,
        profil_responden: {
          tanggal_lahir: formData.tanggal_lahir,
          jenis_kelamin: formData.jenis_kelamin,
          region: formData.region,
          status: formData.status
        },
        profil_klien: {
          nama_klien: formData.nama_klien,
          kontak_klien: formData.kontak_klien,
          alamat_klien: formData.alamat_klien
        }
      }
    });
  };

  return (
    <form className="space-y-4 text-sm" onSubmit={handleSubmit}>
      <ProfileFormField
        label="Email"
        id="email"
        value={user.email}
        readOnly
      />
      <Separator />
      <p className="font-bold text-base w-full text-center pb-0 pt-10">Profil Responden</p>

      <ProfileFormField
        label="Nama"
        id="nama"
        value={formData.nama}
        onChange={handleChange}
        isEditing={isEditing}
      />
      <Separator />
      <ProfileFormField
        label="Tanggal Lahir"
        id="tanggal_lahir"
        type="date"
        value={formData.tanggal_lahir}
        onChange={handleChange}
        isEditing={isEditing}
      />
      <Separator />
      <ProfileFormField
        label="Jenis Kelamin"
        id="jenis_kelamin"
        type="select"
        value={formData.jenis_kelamin}
        onChange={handleChange}
        isEditing={isEditing}
        options={[
          { value: 'laki laki', label: 'Laki-laki' },
          { value: 'perempuan', label: 'Perempuan' }
        ]}
      />
      <Separator />
      <ProfileFormField
        label="region"
        id="region"
        value={formData.region}
        onChange={handleChange}
        isEditing={isEditing}
      />
      <Separator />
      <ProfileFormField
        label="Status"
        id="status"
        value={formData.status}
        onChange={handleChange}
        isEditing={isEditing}
      />
      <Separator />

      <p className="font-bold text-base w-full text-center pb-0 pt-10">Profil Klien</p>

      <ProfileFormField
        label="Nama klien"
        id="nama_klien"
        value={formData.nama_klien}
        onChange={handleChange}
        isEditing={isEditing}
      />
      <Separator />
      <ProfileFormField
        label="Kontak klien"
        id="kontak_klien"
        value={formData.kontak_klien}
        onChange={handleChange}
        isEditing={isEditing}
      />
      <Separator />
      <ProfileFormField
        label="Alamat klien"
        id="alamat_klien"
        value={formData.alamat_klien}
        onChange={handleChange}
        isEditing={isEditing}
      />
      <Separator />

      <footer className="flex justify-end mt-10">
        {isEditing ? (
          <div className="flex gap-3">
            <Button
              type="button"
              onClick={onEditToggle}
              variant="outline"
              className="cursor-pointer bg-accent-1 text-black hover:bg-primary-2 hover:text-accent-1"
              disabled={loading}
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="cursor-pointer bg-secondary-1 hover:bg-secondary-2 text-sm text-primary-1 font-semibold"
              disabled={loading}
            >
              {loading ? 'Menyimpan...' : 'Simpan'}
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

export const kalkulasiJumlahTagihanSurvei = (konfigurasi, survei, jumlahPertanyaan) => {
  const durasiHari = Math.ceil(
    (new Date(survei.tanggal_berakhir) - new Date(survei.tanggal_mulai)) / (1000 * 60 * 60 * 24)
  );

  const hargaDasar = Number(konfigurasi.harga_dasar);
  const hargaPertanyaan = Number(konfigurasi.harga_per_pertanyaan) * jumlahPertanyaan;
  const hargaResponden = Number(konfigurasi.harga_per_responden) * survei.jumlah_responden;
  const hargaDurasi = Number(konfigurasi.harga_per_durasi) * durasiHari;

  return hargaDasar + hargaPertanyaan + hargaResponden + hargaDurasi;
};

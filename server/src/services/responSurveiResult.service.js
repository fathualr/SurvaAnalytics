import db from "../models/index.js";
const { PertanyaanSurvei, ResponSurvei } = db;

export const showSummary = async (surveiId) => {
  const pertanyaanList = await PertanyaanSurvei.findAll({
    where: { id_survei: surveiId },
    attributes: ['id', 'teks_pertanyaan', 'tipe_pertanyaan', 'tipe_visualisasi', 'index'],
    order: [['index', 'ASC']],
    raw: true
  });

  if (!pertanyaanList.length) {
    throw new Error('Survei tidak ditemukan atau belum memiliki pertanyaan');
  }

  const responList = await ResponSurvei.findAll({
    where: { id_survei: surveiId, is_completed: true },
    attributes: ['respon'],
    raw: true
  });

  const totalResponden = responList.length;

  return pertanyaanList.map(pertanyaan => {
    const responses = responList
      .map(r => r.respon[pertanyaan.id])
      .filter(answer => answer !== undefined && answer !== null && answer !== '')

    const summary = pertanyaan.tipe_pertanyaan === 'essay'
      ? responses
      : responses.flat().reduce((acc, answer) => {
          acc[answer] = (acc[answer] || 0) + 1;
          return acc;
        }, {});

		return {
			id_pertanyaan: pertanyaan.id,
			index: pertanyaan.index,
			teks_pertanyaan: pertanyaan.teks_pertanyaan,
			tipe_pertanyaan: pertanyaan.tipe_pertanyaan,
			tipe_visualisasi: pertanyaan.tipe_visualisasi,
			summary,
			total_responden: totalResponden,
			total_respon: responses.length
		};
  });
};

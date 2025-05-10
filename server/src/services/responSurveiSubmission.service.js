import db from '../models/index.js';
const { ResponSurvei, Umum, sequelize, Survei } = db;

export const getOrCreateDraft = async (surveiId, umumId) => {
  const survei = await Survei.findByPk(surveiId);
  if (!survei) throw { status: 404, message: 'Survei not found' };

  if (survei.id_umum === umumId) {
    throw { status: 400, message: 'You cannot fill your own survei' };
  }

  const existingCompleted = await ResponSurvei.findOne({
    where: {
      id_survei: surveiId,
      id_umum: umumId,
      is_completed: true
    }
  });

  if (existingCompleted) {
    throw { status: 400, message: 'You have submitted respon survei, cannot send more in this survei' };
  }

  return await ResponSurvei.findOrCreate({
    where: {
      id_survei: surveiId,
      id_umum: umumId,
      is_completed: false
    }
  });
};

export const saveDraftResponse = async (surveiId, umumId, respons) => {
  const transaction = await sequelize.transaction();
  
  try {
    const [responSurvei] = await getOrCreateDraft(surveiId, umumId);
    await responSurvei.update(
      {
        respon: {
          ...responSurvei.respon,
          ...respons
        }
      },
      { transaction }
    );
    
    await transaction.commit();
    return await ResponSurvei.findByPk(responSurvei.id);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const submitFinalResponse = async (surveiId, umumId) => {
  const transaction = await sequelize.transaction();

  try {
    const draft = await ResponSurvei.findOne({
      where: {
        id_survei: surveiId,
        id_umum: umumId,
        is_completed: false
      },
      include: [{
        model: Survei,
        attributes: ['hadiah_poin']
      }],
      transaction
    });

    if (!draft) throw { status: 404, message: 'No draft found' };
    if (Object.keys(draft.respon).length === 0) {
      throw { status: 400, message: 'Respon survei cannot be empty' };
    }

    await draft.update({ 
      is_completed: true 
    }, { transaction });

    await Umum.increment('poin', {
      by: draft.Survei.hadiah_poin,
      where: { id: umumId },
      transaction
    });

    await transaction.commit();
    return draft;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

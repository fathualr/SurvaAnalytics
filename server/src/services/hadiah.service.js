import db from'../models/index.js';
const { Hadiah, sequelize } = db;

export const index = async () => {
  return await Hadiah.findAll({
  });
};

export const create = async (hadiahData) => {
  const transaction = await sequelize.transaction();

  try {
    const hadiah = await Hadiah.create(hadiahData, { transaction });
    await transaction.commit();
    return hadiah;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const show = async (hadiahId) => {
  const hadiah = await Hadiah.findByPk(hadiahId);
  if (!hadiah) throw new Error('Hadiah not found');
  return hadiah;
};

export const update = async (hadiahId, updateData) => {
  const transaction = await sequelize.transaction();

  try {
    const hadiah = await Hadiah.findByPk(hadiahId, { transaction });
    if (!hadiah) throw new Error('Hadiah not found');

    await hadiah.update(updateData, { transaction });
    await transaction.commit();
    return hadiah;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const destroy = async (hadiahId) => {
  const transaction = await sequelize.transaction();

  try {
    const hadiah = await Hadiah.findByPk(hadiahId, { transaction });
    if (!hadiah) throw new Error('Hadiah not found');

    await hadiah.destroy({ transaction });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
import db from '../models/index.js';
const { Pengguna, Admin, Umum, sequelize } = db;

export const index = async () => {
  return await Pengguna.findAll({
    include: [
      { model: Admin, required: false },
      { model: Umum, required: false }
    ]
  });
};

export const create = async (userData) => {
  const transaction = await sequelize.transaction();

  try {
    const user = await Pengguna.create(userData, { transaction });

    if (userData.role === 'admin') {
      await Admin.create({ 
        id_pengguna: user.id,
        nama_admin: userData.nama_admin,
        kontak_darurat: userData.kontak_darurat 
      }, { transaction });
    } else {
      await Umum.create({
        id_pengguna: user.id,
        nama: userData.nama,
        profil_responden: userData.profil_responden || {},
        profil_klien: userData.profil_klien || {}
      }, { transaction });
    }

    await transaction.commit();
    return user;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const show = async (userId) => {
  const user = await Pengguna.findByPk(userId, {
    include: [
      { model: Admin, required: false },
      { model: Umum, required: false }
    ]
  });
  if (!user) throw new Error('User not found');
  return user;
};

export const update = async (userId, updateData) => {
  const transaction = await sequelize.transaction();

  try {
    const user = await Pengguna.findByPk(userId, { transaction });
    if (!user) throw new Error('User not found');
    await user.update(updateData, { transaction });

    if (updateData.role) {
      if (user.role === 'admin') {
        await Admin.destroy({ where: { id_pengguna: userId }, transaction });
      } else {
        await Umum.destroy({ where: { id_pengguna: userId }, transaction });
      }

      if (updateData.role === 'admin') {
        await Admin.create({
          id_pengguna: userId,
          nama_admin: updateData.nama_admin,
          kontak_darurat: updateData.kontak_darurat
        }, { transaction });
      } else {
        await Umum.create({
          id_pengguna: userId,
          nama: updateData.nama,
          profil_responden: updateData.profil_responden || {},
          profil_klien: updateData.profil_klien || {}
        }, { transaction });
      }
    }

    await transaction.commit();
    return await Pengguna.findByPk(userId, { include: [Admin, Umum] });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const destroy = async (userId) => {
  const transaction = await sequelize.transaction();

  try {
    const user = await Pengguna.findByPk(userId, { transaction });
    if (!user) throw new Error('User not found');

    await user.destroy({ transaction });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

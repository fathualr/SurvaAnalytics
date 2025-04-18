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
    const user = await Pengguna.create({
      ...userData,
      email_confirmed: true,
    }, { transaction });

    if (userData.role === 'admin') {
      const adminData = userData.admin ?? {};
      await Admin.create({ 
        id_pengguna: user.id,
        nama_admin: adminData.nama_admin,
        kontak_darurat: adminData.kontak_darurat
      }, { transaction });
    } else {
      const umumData = userData.umum ?? {};
      await Umum.create({
        id_pengguna: user.id,
        nama: umumData.nama,
        profil_responden: umumData.profil_responden,
        profil_klien: umumData.profil_klien
      }, { transaction });
    }

    await transaction.commit();
    return await Pengguna.findByPk(user.id, { include: [Admin, Umum] });
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

    if (updateData.role && updateData.role !== user.role) {
      throw new Error('Role cannot be changed');
    }

    await user.update(updateData, { transaction });
    if (user.role === 'admin') {
      const admin = await Admin.findOne({ where: { id_pengguna: userId }, transaction });
      if (admin && updateData.admin) {
        await admin.update({
          nama_admin: updateData.admin.nama_admin,
          kontak_darurat: updateData.admin.kontak_darurat
        }, { transaction });
      }
    } else {
      const umum = await Umum.findOne({ where: { id_pengguna: userId }, transaction });
      if (umum && updateData.umum) {
        await umum.update({
          nama: updateData.umum.nama,
          profil_responden: updateData.umum.profil_responden,
          profil_klien: updateData.umum.profil_klien
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

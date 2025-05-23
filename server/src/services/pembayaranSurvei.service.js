import * as xenditService from './xendit.service.js';
import db from '../models/index.js';
const { PembayaranSurvei, Survei, Pengguna, Umum, sequelize } = db;
import { parseQuery, metaQueryFormat } from '../utils/queryParser.js';

export const index = async (queryParams) => {
  const { where, order, pagination } = parseQuery(queryParams, {
    allowedFilters: ['id_umum', 'status']
  });

  const { count, rows } = await PembayaranSurvei.findAndCountAll({
    where: {
      ...where,
    },
    include: [
      {
				model: Survei,
				attributes: ['id', 'judul']
			},
      {
        model: Umum,
        attributes: ['id', 'nama'],
        include: [
          {
            model: Pengguna,
            attributes: ['id', 'email']
          }
        ]
      }
    ],
    order,
    ...pagination,
    distinct: true
  });

  return {
    data: rows,
    ...metaQueryFormat({ count }, pagination)
  };
};

export const create = async (surveiId, umumId, pembayaranSurveiData) => {
  const transaction = await sequelize.transaction();

  try {
    const umum = await Umum.findByPk(umumId, {
      include: [{ model: Pengguna }]
    });

    const survei = await Survei.findByPk(surveiId);
    if (!survei) throw { status: 404, message: 'Survei not found'};

    if (survei.status !== 'payment_pending') {
      throw { status: 400, message: 'Survei status must be "payment_pending"' };
    }

    const existingPembayaran = await PembayaranSurvei.findOne({
      where: {
        id_survei: surveiId,
        status: 'paid'
      }
    });
    if (existingPembayaran) throw { status: 400, message: 'This survei has already been paid' };

    const pembayaranSurvei = await PembayaranSurvei.create({
      id_survei: surveiId,
      id_umum: umum.id,
      jumlah_tagihan: pembayaranSurveiData.jumlah_tagihan,
      metode_pembayaran: null,
      status: 'pending'
    }, { transaction });

    const { invoiceUrl } = await xenditService.createXenditInvoice({
      pembayaranSurveiId: pembayaranSurvei.id,
      jumlahTagihan: pembayaranSurveiData.jumlah_tagihan,
      penggunaEmail: umum.Pengguna.email,
      judulSurvei: survei.judul
    });

    await pembayaranSurvei.update({
      invoice_url: invoiceUrl
    }, { transaction });

    await transaction.commit();
    return PembayaranSurvei.findByPk(pembayaranSurvei.id);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const webhook = async (headers, payload) => {
  const { 
    pembayaranSurveiId, 
    status, 
    paidAmount, 
    paymentMethod 
  } = xenditService.validateWebhook(headers, payload);
  const transaction = await sequelize.transaction();

  try {
    const pembayaranSurvei = await PembayaranSurvei.findByPk(pembayaranSurveiId, { transaction });
    if (!pembayaranSurvei) throw { status: 404, message: 'Pembayaran survei data not found' };

    await pembayaranSurvei.update({
      status,
      ...(status === 'paid' && { jumlah_dibayar: paidAmount }),
      ...(paymentMethod && { metode_pembayaran: paymentMethod })
    }, { transaction });

    if (status === 'paid') {
      await Survei.update(
        { status: 'published' },
        { where: { id: pembayaranSurvei.id_survei }, transaction }
      );
    }

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const show = async (surveiId) => {
  const pembayaranSurvei = await PembayaranSurvei.findByPk(surveiId, {
    include: [
      {
				model: Survei,
				attributes: ['id', 'judul']
			},
      {
        model: Umum,
        attributes: ['id', 'nama'],
        include: [
          {
            model: Pengguna,
            attributes: ['id', 'email']
          }
        ]
      }
    ],
  });
  if (!pembayaranSurvei) throw { status: 404, message: 'Pembayaran survei not found' };
  return pembayaranSurvei;
};

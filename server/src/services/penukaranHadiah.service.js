import db from '../models/index.js';
const { PenukaranHadiah, Umum, Pengguna, Hadiah, sequelize } = db;
import { parseQuery, metaQueryFormat } from '../utils/queryParser.js';

export const index = async (queryParams) => {
  const { where, order, pagination } = parseQuery(queryParams, {
    allowedFilters: ['id_umum']
  });

  const { count, rows } = await PenukaranHadiah.findAndCountAll({
    where: {
      ...where,
    },
    include: [
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

export const create = async (penggunaId, penukaranHadiahData) => {
  const transaction = await sequelize.transaction();

  try {
    const pengguna = await Pengguna.findByPk(penggunaId, {
      include: ['Umum'],
      transaction,
    });
    if (!pengguna) throw { status: 404, message: 'Pengguna not found' };

    const hadiah = await Hadiah.findByPk(penukaranHadiahData.id_hadiah, { transaction });
    if (!hadiah) throw { status: 404, message: 'Hadiah not found' };

    const total_poin = hadiah.harga_poin;

    if (hadiah.stok <= 0) {
      throw { status: 400, message: 'Out of stock hadiah' };
    }

    if (pengguna.Umum.poin < total_poin) {
      throw { status: 400, message: 'Not enough poin' };
    }

    const keterangan = `Penukaran hadiah: ${hadiah.nama}`;
    
    const penukaranHadiah = await PenukaranHadiah.create(
      {
        ...penukaranHadiahData,
        id_umum: pengguna.Umum.id,
        total_poin: hadiah.harga_poin,
        keterangan,
      },
      { transaction }
    );

    await Promise.all([
      pengguna.Umum.decrement('poin', { by: hadiah.harga_poin, transaction }),
      hadiah.decrement('stok', { by: 1, transaction }),
    ]);

    await transaction.commit();
    return penukaranHadiah;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const show = async (penukaranHadiahId) => {
  const penukaranHadiah = await PenukaranHadiah.findByPk(penukaranHadiahId, {
    include: [
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
    ]
  });
  if (!penukaranHadiah) throw { status: 404, message: 'Penukaran hadiah not found' };
  return penukaranHadiah;
};

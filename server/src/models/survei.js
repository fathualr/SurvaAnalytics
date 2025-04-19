export default (sequelize, DataTypes) => {
  const Survei = sequelize.define('Survei', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    id_umum: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Umum',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    judul: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    deskripsi: {
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.STRING(255),
      defaultValue: 'draft',
      validate: {
        isIn: [['draft', 'under_review', 'payment_pending', 'published', 'closed', 'archived', 'rejected']]
      }
    },
    kriteria: {
      type: DataTypes.JSONB,
      defaultValue: {}
    },
    jumlah_responden: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    tanggal_mulai: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
        isValidTanggalMulai(value) {
          const today = new Date();
          const minDate = new Date(today);
          minDate.setDate(minDate.getDate() + 3);
    
          const inputDate = new Date(value);
    
          if (inputDate < minDate) {
            throw new Error('tanggal_mulai must be at least 3 days from today.');
          }
        }
      }
    },
    tanggal_berakhir: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
        isValidTanggalBerakhir() {
          if (this.tanggal_berakhir <= this.tanggal_mulai) {
            throw new Error('tanggal_berakhir must be later than tanggal_mulai.');
          }
        }
      }
    },
    hadiah_poin: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    umpan_balik: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'survei',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
    paranoid: false
  });

  Survei.associate = (models) => {
    Survei.belongsTo(models.Umum, { foreignKey: 'id_umum'});
  };

  return Survei;
}

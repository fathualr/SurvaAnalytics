export default (sequelize, DataTypes) => {
  const Umum = sequelize.define('Umum', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    id_pengguna: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Pengguna',
        key: 'id',
      },
    },
    nama: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    profil_responden: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
    profil_klien: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
    poin: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
  }, {
    tableName: 'umum',
    timestamps: false,
    underscored: true,
  });

  Umum.associate = (models) => {
    Umum.belongsTo(models.Pengguna, { foreignKey: 'id_pengguna' });
  };

  return Umum;
}
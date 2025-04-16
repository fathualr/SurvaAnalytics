export default (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
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
    nama_admin: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    kontak_darurat: {
      type: DataTypes.STRING(255),
    },
  }, {
    tableName: 'admin',
    timestamps: false,
    underscored: true,
  });

  Admin.associate = (models) => {
    Admin.belongsTo(models.Pengguna, { foreignKey: 'id_pengguna' });
  };

  return Admin;
}
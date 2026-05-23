const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {}

  Usuario.init(
    {
      nombre: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: { notEmpty: true },
      },
      email: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      activo: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      sequelize,
      modelName: "Usuario",
      tableName: "usuarios",
      timestamps: true,
    },
  );

  return Usuario;
};

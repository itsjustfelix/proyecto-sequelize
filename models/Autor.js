const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Autor extends Model {}

  Autor.init(
    {
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: { notEmpty: true },
      },
      apellido: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: { notEmpty: true },
      },
      nacionalidad: { type: DataTypes.STRING(100), allowNull: true },
    },
    { sequelize, modelName: "Autor", tableName: "autores", timestamps: true },
  );

  return Autor;
};

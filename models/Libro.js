const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Libro extends Model {}

  Libro.init(
    {
      titulo: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: { notEmpty: true },
      },
      isbn: { type: DataTypes.STRING(20), allowNull: false, unique: true },
      anio_publicacion: { type: DataTypes.INTEGER, allowNull: true },
      copias_disponibles: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: { min: 0 },
      },
      activo: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    { sequelize, modelName: "Libro", tableName: "libros", timestamps: true },
  );

  return Libro;
};

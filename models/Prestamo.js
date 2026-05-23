const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Prestamo extends Model {}

  Prestamo.init(
    {
      libro_id: { type: DataTypes.INTEGER, allowNull: false },
      usuario_id: { type: DataTypes.INTEGER, allowNull: false },
      fecha_prestamo: { type: DataTypes.DATEONLY, allowNull: false },
      fecha_devolucion_esp: { type: DataTypes.DATEONLY, allowNull: false },
      fecha_devolucion_real: { type: DataTypes.DATEONLY, allowNull: true },
    },
    {
      sequelize,
      modelName: "Prestamo",
      tableName: "prestamos",
      timestamps: true,
    },
  );

  return Prestamo;
};

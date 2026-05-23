"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("prestamos", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      libro_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "libros", key: "id" },
        onDelete: "CASCADE",
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "usuarios", key: "id" },
        onDelete: "CASCADE",
      },
      fecha_prestamo: { type: Sequelize.DATEONLY, allowNull: false },
      fecha_devolucion_esp: { type: Sequelize.DATEONLY, allowNull: false },
      fecha_devolucion_real: { type: Sequelize.DATEONLY, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("prestamos");
  },
};

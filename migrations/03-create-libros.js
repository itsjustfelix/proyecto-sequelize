"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("libros", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      titulo: { type: Sequelize.STRING(200), allowNull: false },
      isbn: { type: Sequelize.STRING(20), allowNull: false, unique: true },
      anio_publicacion: { type: Sequelize.INTEGER, allowNull: true },
      copias_disponibles: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      activo: { type: Sequelize.BOOLEAN, defaultValue: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("libros");
  },
};

"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("libro_autores", {
      libro_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "libros", key: "id" },
        onDelete: "CASCADE",
      },
      autor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "autores", key: "id" },
        onDelete: "CASCADE",
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("libro_autores");
  },
};

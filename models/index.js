const { Sequelize, DataTypes, Model } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
});

const Autor = require("./Autor")(sequelize, DataTypes);
const Libro = require("./Libro")(sequelize, DataTypes);
const Usuario = require("./Usuario")(sequelize, DataTypes);
const Prestamo = require("./Prestamo")(sequelize, DataTypes);

Libro.belongsToMany(Autor, {
  through: "libro_autores",
  foreignKey: "libro_id",
});
Autor.belongsToMany(Libro, {
  through: "libro_autores",
  foreignKey: "autor_id",
});

Prestamo.belongsTo(Libro, { foreignKey: "libro_id" });
Libro.hasMany(Prestamo, { foreignKey: "libro_id" });

Prestamo.belongsTo(Usuario, { foreignKey: "usuario_id" });
Usuario.hasMany(Prestamo, { foreignKey: "usuario_id" });

module.exports = { sequelize, Autor, Libro, Usuario, Prestamo };

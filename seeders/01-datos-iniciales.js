"use strict";

const {
  sequelize,
  Autor,
  Libro,
  Usuario,
  Prestamo,
} = require("../models/index");

async function seed() {
  await sequelize.authenticate();
  console.log("Conexión exitosa. Insertando datos...");

  const [gabriel, isabel, jorge] = await Autor.bulkCreate([
    {
      nombre: "Gabriel",
      apellido: "García Márquez",
      nacionalidad: "Colombiana",
    },
    { nombre: "Isabel", apellido: "Allende", nacionalidad: "Chilena" },
    { nombre: "Jorge", apellido: "Luis Borges", nacionalidad: "Argentina" },
  ]);

  const [cienAnios, amor, aleph, casa, ficciones] = await Libro.bulkCreate([
    {
      titulo: "Cien años de soledad",
      isbn: "978-0-06-088328-7",
      anio_publicacion: 1967,
      copias_disponibles: 3,
    },
    {
      titulo: "El amor en los tiempos del cólera",
      isbn: "978-0-307-38987-8",
      anio_publicacion: 1985,
      copias_disponibles: 2,
    },
    {
      titulo: "El Aleph",
      isbn: "978-950-731-046-8",
      anio_publicacion: 1949,
      copias_disponibles: 4,
    },
    {
      titulo: "La casa de los espíritus",
      isbn: "978-1-4767-5406-6",
      anio_publicacion: 1982,
      copias_disponibles: 2,
    },
    {
      titulo: "Ficciones",
      isbn: "978-0-8021-3030-0",
      anio_publicacion: 1944,
      copias_disponibles: 1,
    },
  ]);

  await cienAnios.setAutors([gabriel]);
  await amor.setAutors([gabriel]);
  await aleph.setAutors([jorge]);
  await casa.setAutors([isabel]);
  await ficciones.setAutors([jorge]);

  const [felix, sandra] = await Usuario.bulkCreate([
    { nombre: "Felix Díaz", email: "felix@biblioteca.com", activo: true },
    { nombre: "Sandra Gómez", email: "sandra@biblioteca.com", activo: true },
  ]);

  await Prestamo.bulkCreate([
    {
      libro_id: cienAnios.id,
      usuario_id: felix.id,
      fecha_prestamo: "2025-05-01",
      fecha_devolucion_esp: "2025-05-15",
      fecha_devolucion_real: null,
    },
    {
      libro_id: aleph.id,
      usuario_id: sandra.id,
      fecha_prestamo: "2025-05-10",
      fecha_devolucion_esp: "2025-05-24",
      fecha_devolucion_real: "2025-05-20",
    },
  ]);

  console.log("Seed completado con éxito.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Error en el seed:", err);
  process.exit(1);
});

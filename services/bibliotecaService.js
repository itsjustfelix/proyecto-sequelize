const { Autor, Libro, Usuario, Prestamo } = require("../models");
const sequelize = require("../database");

async function registrarLibro(datosLibro, autoresIds) {
  const libro = await Libro.create(datosLibro);
  await libro.setAutores(autoresIds);
  return libro;
}

async function listarLibrosActivos() {
  const libros = await Libro.findAll({
    where: { activo: true },
    include: [
      {
        model: Autor,
        through: { attributes: [] },
      },
    ],
  });
  return libros;
}

async function registrarPrestamo(libroId, usuarioId, fechaDevolucionEsp) {
  const resultado = await sequelize.transaction(async (t) => {
    const libro = await Libro.findByPk(libroId, { transaction: t });

    if (!libro || libro.copias_disponibles <= 0) {
      throw new Error("No hay copias disponibles para este libro.");
    }

    const prestamo = await Prestamo.create(
      {
        libro_id: libroId,
        usuario_id: usuarioId,
        fecha_prestamo: new Date(),
        fecha_devolucion_esp: fechaDevolucionEsp,
        fecha_devolucion_real: null,
      },
      { transaction: t },
    );

    await libro.update(
      { copias_disponibles: libro.copias_disponibles - 1 },
      { transaction: t },
    );

    return prestamo;
  });

  return resultado;
}

async function registrarDevolucion(prestamoId) {
  const resultado = await sequelize.transaction(async (t) => {
    const prestamo = await Prestamo.findByPk(prestamoId, { transaction: t });

    if (!prestamo) {
      throw new Error("Préstamo no encontrado.");
    }
    if (prestamo.fecha_devolucion_real) {
      throw new Error("Este préstamo ya fue devuelto.");
    }

    await prestamo.update(
      { fecha_devolucion_real: new Date() },
      { transaction: t },
    );

    const libro = await Libro.findByPk(prestamo.libro_id, { transaction: t });

    await libro.update(
      { copias_disponibles: libro.copias_disponibles + 1 },
      { transaction: t },
    );

    return prestamo;
  });

  return resultado;
}

async function listarPrestamosActivos() {
  const prestamos = await Prestamo.findAll({
    where: { fecha_devolucion_real: null },
    include: [
      { model: Libro, attributes: ["titulo", "isbn"] },
      { model: Usuario, attributes: ["nombre", "email"] },
    ],
  });
  return prestamos;
}

module.exports = {
  registrarLibro,
  listarLibrosActivos,
  registrarPrestamo,
  registrarDevolucion,
  listarPrestamosActivos,
};

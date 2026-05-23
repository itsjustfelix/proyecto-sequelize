TALLER DE ORM -- SISTEMA DE BIBLIOTECA DIGITAL

gestión de biblioteca usando Node.js + Sequelize ORM + SQLite.

REQUISITOS PARA QUE EL PROYECTO FUNCIONE

. Tener Node.js instalado
. Tener npm instalado

PARA EJECUTAR EL PROYECTO DEBE:

. Crear la base de datos y las tablas con las migraciones "npx sequelize-cli db:migrate"

. Insertar datos a la base de datos mediante la seed
"node seeders/01-datos-iniciales.js"

LAS OPRECAIONES QUE SE PUEDEN HACER ESTAN EN EL SERVICE:

. registrarLibro — Crea un libro y lo asocia a sus autores
. listarLibrosActivos — Lista libros activos con sus autores
. registrarPrestamo — Registra un préstamo y descuenta copias disponibles
. registrarDevolucion — Registra la devolución y restablece las copias
. listarPrestamosActivos — Lista préstamos sin fecha de devolución real

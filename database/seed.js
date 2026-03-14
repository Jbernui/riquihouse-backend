const db = require("../config/db");

async function seed() {

try {

console.log("Iniciando seed...");

/* limpiar tabla */
await db.query("SET FOREIGN_KEY_CHECKS = 0");
await db.query("TRUNCATE TABLE productos");
await db.query("SET FOREIGN_KEY_CHECKS = 1");

/* insertar productos */
await db.query(`
INSERT INTO productos (nombre, precio_venta, stock_actual)
VALUES
('Keke de Naranja', 18.50, 10),
('Keke de Chocolate', 20.00, 8),
('Pastel Básico', 32.00, 5),
('Cupcakes de Vainilla', 5.00, 20),
('Cupcakes de Chocolate', 5.50, 18),
('Torta Tres Leches', 35.00, 4),
('Torta Selva Negra', 40.00, 3),
('Brownie Artesanal', 6.00, 25),
('Galletas de Mantequilla', 3.50, 30),
('Cheesecake de Fresa', 28.00, 6)
`);

console.log("Seed ejecutado correctamente");

process.exit();

} catch (error) {

console.error("Error en seed:", error);
process.exit(1);

}

}

seed();

//USAR node database/seed.js PARA EJECUTAR LA SEED Y INSERTAR DATOS DE PRUEBAS
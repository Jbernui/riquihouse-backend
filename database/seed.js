const db = require("../config/db");

async function seed() {

try {

console.log("Iniciando seed...");

await db.query("SET FOREIGN_KEY_CHECKS = 0");
await db.query("TRUNCATE TABLE ventas_detalle");
await db.query("TRUNCATE TABLE ventas");
await db.query("TRUNCATE TABLE produccion");
await db.query("TRUNCATE TABLE mermas");
await db.query("TRUNCATE TABLE recetas_detalle");
await db.query("TRUNCATE TABLE productos");
await db.query("TRUNCATE TABLE insumos");
await db.query("TRUNCATE TABLE usuarios");
await db.query("SET FOREIGN_KEY_CHECKS = 1");
await db.query(`
INSERT INTO usuarios (nombre, usuario, password, rol)
VALUES
('Alexander', 'admin', '1234', 'administrador'),
('Pepe', 'cocina', '1234', 'cocinero'),
('Carlos', 'CarlosVV', '1234', 'vendedor')
`);

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

await db.query(`
INSERT INTO insumos (nombre, costo_unitario, stock_actual)
VALUES
('Harina', 3.50, 50),
('Azucar', 3.00, 40),
('Huevos', 0.50, 200),
('Mantequilla', 6.00, 25),
('Leche', 4.00, 30),
('Chocolate', 8.00, 20),
('Vainilla', 12.00, 10),
('Fresas', 7.00, 15),
('Polvo de Hornear', 5.00, 5),
('Leche Condensada', 4.50, 20)
`);

await db.query(`
INSERT INTO recetas_detalle (id_producto, id_insumo, cantidad_necesaria)
VALUES
(1,1,0.50),(1,2,0.30),(1,3,3),(1,5,0.25),(1,9,0.02),
(2,1,0.50),(2,2,0.30),(2,3,3),(2,6,0.40),(2,9,0.02),
(3,1,0.80),(3,2,0.40),(3,3,4),(3,4,0.20),(3,9,0.03),
(4,1,0.40),(4,2,0.20),(4,3,2),(4,7,0.05),(4,9,0.01),
(5,1,0.40),(5,2,0.20),(5,3,2),(5,6,0.30),(5,9,0.01),
(6,1,0.70),(6,2,0.35),(6,3,4),(6,5,0.50),(6,10,0.30),
(7,1,0.70),(7,2,0.35),(7,3,4),(7,6,0.50),(7,8,0.20),
(8,1,0.40),(8,2,0.25),(8,3,3),(8,6,0.60),(8,4,0.20),
(9,1,0.50),(9,2,0.30),(9,4,0.25),(9,3,2),
(10,1,0.30),(10,2,0.25),(10,3,3),(10,5,0.40),(10,8,0.30)
`);

console.log("Seed ejecutado correctamente");

process.exit();

} catch (error) {

console.error("Error en seed:", error);
process.exit(1);

}

}

seed();
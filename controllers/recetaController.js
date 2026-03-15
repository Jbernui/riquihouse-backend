const db = require('../config/db');

// Obtener todas las recetas (Añadimos los IDs para el formulario de edición)
const obtenerRecetas = async (req, res) => {
    try {
        const [recetas] = await db.query(`
            SELECT r.id_receta, p.id_producto, p.nombre AS producto, i.id_insumo, i.nombre AS insumo, r.cantidad_necesaria
            FROM recetas_detalle r
            JOIN productos p ON r.id_producto = p.id_producto
            JOIN insumos i ON r.id_insumo = i.id_insumo
        `);
        res.json(recetas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener recetas' });
    }
};

const crearReceta = async (req, res) => {
    try {
        const { id_producto, id_insumo, cantidad_necesaria } = req.body;
        await db.query(
            `INSERT INTO recetas_detalle (id_producto, id_insumo, cantidad_necesaria) VALUES (?, ?, ?)`,
            [id_producto, id_insumo, cantidad_necesaria]
        );
        res.status(201).json({ mensaje: "Ingrediente agregado a la receta" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear la receta' });
    }
};

const eliminarReceta = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query(`DELETE FROM recetas_detalle WHERE id_receta = ?`, [id]);
        res.json({ mensaje: "Ingrediente eliminado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al eliminar" });
    }
};

// ¡LO NUEVO! Actualizar cantidad o insumo
const actualizarReceta = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_insumo, cantidad_necesaria } = req.body;
        await db.query(
            `UPDATE recetas_detalle SET id_insumo = ?, cantidad_necesaria = ? WHERE id_receta = ?`,
            [id_insumo, cantidad_necesaria, id]
        );
        res.json({ mensaje: "Receta actualizada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al actualizar la receta" });
    }
};

module.exports = { obtenerRecetas, crearReceta, eliminarReceta, actualizarReceta };
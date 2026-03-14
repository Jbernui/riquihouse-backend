const db = require('../config/db');

const crearReceta = async (req, res) => {
    try {
        const { id_producto, id_insumo, cantidad_necesaria } = req.body;
        await db.query(
            'INSERT INTO recetas_detalle (id_producto, id_insumo, cantidad_necesaria) VALUES (?, ?, ?)',
            [id_producto, id_insumo, cantidad_necesaria]
        );
        res.status(201).json({ mensaje: 'Ingrediente agregado a la receta del producto' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al agregar a la receta' });
    }
};

const obtenerRecetas = async (req, res) => {
    try {
        const [recetas] = await db.query(`
            SELECT r.id_receta, p.nombre AS producto, i.nombre AS insumo, r.cantidad_necesaria 
            FROM recetas_detalle r
            INNER JOIN productos p ON r.id_producto = p.id_producto
            INNER JOIN insumos i ON r.id_insumo = i.id_insumo
        `);
        res.json(recetas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener recetas' });
    }
};

module.exports = { crearReceta, obtenerRecetas };
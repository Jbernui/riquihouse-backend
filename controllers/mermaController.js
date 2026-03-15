const db = require('../config/db');

const registrarMerma = async (req, res) => {
    try {
        const { id_insumo, cantidad_perdida, motivo } = req.body;
        
        // 1. Guardamos el reporte en el historial
        await db.query(
            `INSERT INTO mermas (id_insumo, cantidad_perdida, motivo) VALUES (?, ?, ?)`,
            [id_insumo, cantidad_perdida, motivo]
        );

        // 2. Descontamos el stock del almacén automáticamente
        await db.query(`UPDATE insumos SET stock_actual = stock_actual - ? WHERE id_insumo = ?`, [cantidad_perdida, id_insumo]);

        res.status(201).json({ mensaje: "Merma registrada y stock descontado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al registrar la merma" });
    }
};

const obtenerMermas = async (req, res) => {
    try {
        // Hacemos un JOIN para traer el nombre del insumo y que no salga solo un número
        const [mermas] = await db.query(`
            SELECT m.id_merma, i.nombre AS nombre_insumo, m.cantidad_perdida, m.motivo, m.fecha_hora 
            FROM mermas m
            JOIN insumos i ON m.id_insumo = i.id_insumo
            ORDER BY m.fecha_hora DESC
        `);
        res.json(mermas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener historial de mermas' });
    }
};

module.exports = { registrarMerma, obtenerMermas };
const db = require('../config/db');

const registrarMerma = async (req, res) => {
    const connection = await db.getConnection();
    try {
        const { id_insumo, cantidad_perdida, motivo } = req.body;
        
        await connection.beginTransaction(); // Empezamos transacción

        // 1. Guardar el registro del accidente
        await connection.query(
            'INSERT INTO mermas (id_insumo, cantidad_perdida, motivo) VALUES (?, ?, ?)',
            [id_insumo, cantidad_perdida, motivo]
        );

        // 2. Restar ese insumo del almacén
        await connection.query(
            'UPDATE insumos SET stock_actual = stock_actual - ? WHERE id_insumo = ?',
            [cantidad_perdida, id_insumo]
        );

        await connection.commit();
        res.status(201).json({ mensaje: 'Merma registrada y almacén descontado' });
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ mensaje: 'Error al registrar la merma' });
    } finally {
        connection.release();
    }
};

const obtenerMermas = async (req, res) => {
    try {
        const [mermas] = await db.query(`
            SELECT m.id_merma, i.nombre AS insumo, m.cantidad_perdida, m.motivo, m.fecha_hora 
            FROM mermas m 
            INNER JOIN insumos i ON m.id_insumo = i.id_insumo
            ORDER BY m.fecha_hora DESC
        `);
        res.json(mermas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener mermas' });
    }
};

module.exports = { registrarMerma, obtenerMermas };
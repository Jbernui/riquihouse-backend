const db = require('../config/db');

const obtenerInsumos = async (req, res) => {
    try {
        const [insumos] = await db.query('SELECT * FROM insumos');
        res.json(insumos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los insumos' });
    }
};

const crearInsumo = async (req, res) => {
    try {
        const { nombre, costo_unitario, stock_actual } = req.body;
        const [resultado] = await db.query(
            'INSERT INTO insumos (nombre, costo_unitario, stock_actual) VALUES (?, ?, ?)',
            [nombre, costo_unitario, stock_actual || 0]
        );
        res.status(201).json({ id_insumo: resultado.insertId, nombre, costo_unitario, stock_actual });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear el insumo' });
    }
};

const actualizarInsumo = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, costo_unitario, stock_actual } = req.body;
        await db.query(
            'UPDATE insumos SET nombre = ?, costo_unitario = ?, stock_actual = ? WHERE id_insumo = ?',
            [nombre, costo_unitario, stock_actual, id]
        );
        res.json({ mensaje: "Insumo actualizado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al actualizar insumo" });
    }
};

const eliminarInsumo = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM insumos WHERE id_insumo = ?', [id]);
        res.json({ mensaje: "Insumo eliminado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al eliminar insumo" });
    }
};

module.exports = { obtenerInsumos, crearInsumo, actualizarInsumo, eliminarInsumo };
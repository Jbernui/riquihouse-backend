const db = require('../config/db');

const obtenerProductos = async (req, res) => {
    try {

        const [productos] = await db.query(`
            SELECT id_producto, nombre, precio_venta, stock_actual
            FROM productos
        `);

        res.json(productos);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al obtener los productos'
        });

    }
};

const crearProducto = async (req, res) => {

    try {

        const { nombre, precio_venta, stock_actual } = req.body;

        const [resultado] = await db.query(
            `INSERT INTO productos (nombre, precio_venta, stock_actual)
             VALUES (?, ?, ?)`,
            [nombre, precio_venta, stock_actual || 0]
        );

        res.status(201).json({
            id_producto: resultado.insertId,
            nombre,
            precio_venta,
            stock_actual
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al crear el producto'
        });

    }
};

const actualizarProducto = async (req, res) => {

    try {

        const { id } = req.params;
        const { nombre, precio_venta, stock_actual } = req.body;

        await db.query(
            `UPDATE productos
             SET nombre = ?, precio_venta = ?, stock_actual = ?
             WHERE id_producto = ?`,
            [nombre, precio_venta, stock_actual, id]
        );

        res.json({
            mensaje: "Producto actualizado"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al actualizar producto"
        });

    }

};

const eliminarProducto = async (req, res) => {

    try {

        const { id } = req.params;

        await db.query(
            `DELETE FROM productos WHERE id_producto = ?`,
            [id]
        );

        res.json({
            mensaje: "Producto eliminado"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al eliminar producto"
        });

    }

};

module.exports = {
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};
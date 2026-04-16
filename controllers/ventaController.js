const db = require('../config/db');

const crearVenta = async (req, res) => {
    const connection = await db.getConnection(); 
    
    try {
        const { id_usuario, total_venta, detalles } = req.body;
        
        await connection.beginTransaction();

        const [resultadoVenta] = await connection.query(
            'INSERT INTO ventas (id_usuario, total_venta) VALUES (?, ?)',
            [id_usuario, total_venta]
        );
        const id_venta = resultadoVenta.insertId;

        for (let i = 0; i < detalles.length; i++) {
            const item = detalles[i];

            await connection.query(
                'INSERT INTO ventas_detalle (id_venta, id_producto, cantidad, subtotal) VALUES (?, ?, ?, ?)',
                [id_venta, item.id_producto, item.cantidad, item.subtotal]
            );

            await connection.query(
                'UPDATE productos SET stock_actual = stock_actual - ? WHERE id_producto = ?',
                [item.cantidad, item.id_producto]
            );
        }

        await connection.commit();
        
        res.status(201).json({ 
            mensaje: '¡Venta registrada con éxito y stock actualizado!',
            id_venta: id_venta
        });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ mensaje: 'Error crítico al registrar la venta' });
    } finally {
        connection.release();
    }
};

const obtenerVentas = async (req, res) => {
    try {
        const [ventas] = await db.query(`
            SELECT v.id_venta, v.fecha_hora, v.total_venta, u.nombre AS vendedor
            FROM ventas v
            INNER JOIN usuarios u ON v.id_usuario = u.id_usuario
            ORDER BY v.fecha_hora DESC
        `);
        res.json(ventas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener las ventas' });
    }
};

const obtenerVentasConDetalle = async (req, res) => {
    try {
        const [ventas] = await db.query(`
            SELECT 
                v.id_venta,
                v.fecha_hora,
                v.total_venta,
                v.id_usuario,
                u.nombre AS nombre_usuario
            FROM ventas v
            INNER JOIN usuarios u ON v.id_usuario = u.id_usuario
            ORDER BY v.fecha_hora DESC
        `);

        for (let i = 0; i < ventas.length; i++) {
            const [detalles] = await db.query(`
                SELECT 
                    vd.id_producto,
                    vd.cantidad,
                    vd.subtotal,
                    p.nombre AS nombre_producto
                FROM ventas_detalle vd
                INNER JOIN productos p ON vd.id_producto = p.id_producto
                WHERE vd.id_venta = ?
            `, [ventas[i].id_venta]);

            ventas[i].detalles = detalles;
        }

        res.json(ventas);

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener el detalle de ventas' });
    }
};
module.exports = { crearVenta, obtenerVentas, obtenerVentasConDetalle };
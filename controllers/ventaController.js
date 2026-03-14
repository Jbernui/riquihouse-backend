const db = require('../config/db');

// Registrar una nueva venta (El Jefe Final)
const crearVenta = async (req, res) => {
    // Tomamos una conexión exclusiva para esta transacción
    const connection = await db.getConnection(); 
    
    try {
        const { id_usuario, total_venta, detalles } = req.body;
        
        await connection.beginTransaction(); // ⏸️ INICIAMOS LA TRANSACCIÓN

        // 1. Insertamos el "Ticket" general en la tabla ventas
        const [resultadoVenta] = await connection.query(
            'INSERT INTO ventas (id_usuario, total_venta) VALUES (?, ?)',
            [id_usuario, total_venta]
        );
        const id_venta = resultadoVenta.insertId; // Rescatamos el ID de esta venta

        // 2. Recorremos cada producto que compró el cliente
        for (let i = 0; i < detalles.length; i++) {
            const item = detalles[i];

            // A. Insertamos el detalle (Qué producto es, cantidad y subtotal)
            await connection.query(
                'INSERT INTO ventas_detalle (id_venta, id_producto, cantidad, subtotal) VALUES (?, ?, ?, ?)',
                [id_venta, item.id_producto, item.cantidad, item.subtotal]
            );

            // B. ¡Descontamos el stock de la vitrina!
            await connection.query(
                'UPDATE productos SET stock_actual = stock_actual - ? WHERE id_producto = ?',
                [item.cantidad, item.id_producto]
            );
        }

        await connection.commit(); // ✅ TODO SALIÓ BIEN, GUARDAMOS DEFINITIVAMENTE
        
        res.status(201).json({ 
            mensaje: '¡Venta registrada con éxito y stock actualizado!',
            id_venta: id_venta
        });

    } catch (error) {
        await connection.rollback(); // ❌ ALGO FALLÓ, DESHACEMOS TODO PARA NO ARRUINAR EL STOCK
        console.error(error);
        res.status(500).json({ mensaje: 'Error crítico al registrar la venta' });
    } finally {
        connection.release(); // Soltamos la conexión para que otros la usen
    }
};

// Obtener el historial de ventas (Para el administrador)
const obtenerVentas = async (req, res) => {
    try {
        // Usamos INNER JOIN para traer el nombre del vendedor en lugar de solo su ID
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

module.exports = { crearVenta, obtenerVentas };
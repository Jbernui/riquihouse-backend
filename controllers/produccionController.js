const db = require('../config/db');

const registrarProduccion = async (req, res) => {
    const connection = await db.getConnection(); 
    
    try {
        const { id_usuario, id_producto, cantidad_producida } = req.body;
        
        await connection.beginTransaction(); // ⏸️ INICIAMOS TRANSACCIÓN

        // 1. Guardar el registro de producción
        await connection.query(
            'INSERT INTO produccion (id_usuario, id_producto, cantidad_producida) VALUES (?, ?, ?)',
            [id_usuario, id_producto, cantidad_producida]
        );

        // 2. ¡SUMAR el stock a la vitrina (Productos)!
        await connection.query(
            'UPDATE productos SET stock_actual = stock_actual + ? WHERE id_producto = ?',
            [cantidad_producida, id_producto]
        );

        // 3. La Magia: Buscar la receta y RESTAR los insumos del almacén
        const [receta] = await connection.query(
            'SELECT id_insumo, cantidad_necesaria FROM recetas_detalle WHERE id_producto = ?',
            [id_producto]
        );

        // Recorremos cada ingrediente de la receta
        for (let i = 0; i < receta.length; i++) {
            const ingrediente = receta[i];
            // Multiplicamos (Ej: 5 tortas x 0.5kg de harina = 2.5kg a descontar)
            const cantidad_a_descontar = ingrediente.cantidad_necesaria * cantidad_producida;

            await connection.query(
                'UPDATE insumos SET stock_actual = stock_actual - ? WHERE id_insumo = ?',
                [cantidad_a_descontar, ingrediente.id_insumo]
            );
        }

        await connection.commit(); // ✅ TODO PERFECTO, GUARDAMOS
        
        res.status(201).json({ 
            mensaje: '¡Producción horneada con éxito! Vitrina y almacén actualizados.' 
        });

    } catch (error) {
        await connection.rollback(); // ❌ ALGO FALLÓ, REVERTIMOS TODO
        console.error(error);
        res.status(500).json({ mensaje: 'Error crítico al registrar la producción' });
    } finally {
        connection.release();
    }
};

const obtenerProduccion = async (req, res) => {
    try {
        const [historial] = await db.query(`
            SELECT p.id_produccion, u.nombre AS cocinero, pr.nombre AS producto, 
                   p.cantidad_producida, p.fecha_hora
            FROM produccion p
            INNER JOIN usuarios u ON p.id_usuario = u.id_usuario
            INNER JOIN productos pr ON p.id_producto = pr.id_producto
            ORDER BY p.fecha_hora DESC
        `);
        res.json(historial);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener el historial de producción' });
    }
};

module.exports = { registrarProduccion, obtenerProduccion };
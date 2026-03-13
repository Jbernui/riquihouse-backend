const db = require('../config/db'); // Importamos tu conexión a MySQL

// Función para obtener todos los productos
const obtenerProductos = async (req, res) => {
    try {
        // Hacemos la consulta SQL literal
        const [productos] = await db.query('SELECT * FROM productos');
        
        // Devolvemos la respuesta al Frontend en formato JSON
        res.json(productos); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los productos' });
    }
};

const crearProducto = async (req, res) => {
    try {
        // Extraemos los datos que nos enviará el Frontend (Postman por ahora)
        const { nombre, precio_venta, stock_actual } = req.body;

        // Insertamos en MySQL usando "?" por seguridad (evita hackeos de Inyección SQL)
        const [resultado] = await db.query(
            'INSERT INTO productos (nombre, precio_venta, stock_actual) VALUES (?, ?, ?)',
            [nombre, precio_venta, stock_actual || 0]
        );
        
        // Respondemos que todo salió bien y devolvemos el ID del nuevo producto
        res.status(201).json({ 
            id: resultado.insertId, 
            mensaje: '¡Producto creado con éxito en Riqui House!' 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear el producto' });
    }
};

module.exports = { obtenerProductos, crearProducto };
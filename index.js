const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const productoRoutes = require('./routes/productoRoutes');

// Inicializar la aplicación
const app = express();

// Middlewares (Configuraciones de seguridad y formato)
app.use(cors()); // Permite que React se conecte sin bloqueos
app.use(express.json()); // Permite que tu servidor entienda datos en formato JSON

// Probar conexión a la base de datos
db.getConnection()
    .then(connection => {
        console.log('¡Conexión exitosa a la Base de Datos riquihouse_db! 🥞');
        connection.release(); // Soltamos la conexión para que no consuma memoria
    })
    .catch(error => {
        console.error('Error al conectar a la base de datos:', error.message);
    });

// Usar rutas
app.use('/api/productos', productoRoutes);

// Ruta de prueba (Para ver que el servidor está vivo)
app.get('/', (req, res) => {
    res.send('¡Servidor de Riqui House funcionando al 100%!');
});

// Definir el puerto (Usará el puerto que le dé la nube, o el 3000 en tu PC)
const PORT = process.env.PORT || 3000;

// Arrancar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
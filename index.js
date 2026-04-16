const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const productoRoutes = require('./routes/productoRoutes');
const insumoRoutes = require('./routes/insumoRoutes');
const ventaRoutes = require('./routes/ventaRoutes');
const produccionRoutes = require('./routes/produccionRoutes');
const mermaRoutes = require('./routes/mermaRoutes');
const recetaRoutes = require('./routes/recetaRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();

app.use(cors());
app.use(express.json());

db.getConnection()
    .then(connection => {
        console.log('Conexión exitosa a la Base de Datos riquihouse_db');
        connection.release();
    })
    .catch(error => {
        console.error('Error al conectar a la base de datos:', error.message);
    });

app.use('/api/productos', productoRoutes);
app.use('/api/insumos', insumoRoutes);
app.use('/api/ventas', ventaRoutes);
app.use('/api/produccion', produccionRoutes);
app.use('/api/mermas', mermaRoutes);
app.use('/api/recetas', recetaRoutes);
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
    res.send('¡Servidor de Riqui House funcionando al 100%!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;
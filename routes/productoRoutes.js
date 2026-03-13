const express = require('express');
const router = express.Router();
const { obtenerProductos, crearProducto } = require('../controllers/productoController');

// Cuando alguien haga un GET a esta ruta, se ejecuta la función obtenerProductos
router.get('/', obtenerProductos);
router.post('/', crearProducto);

module.exports = router;
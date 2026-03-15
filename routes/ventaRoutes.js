const express = require('express');
const router = express.Router();
const { crearVenta, obtenerVentas, obtenerVentasConDetalle } = require('../controllers/ventaController');

router.get('/',        obtenerVentas);           // GET  /api/ventas
router.get('/detalle', obtenerVentasConDetalle); // GET  /api/ventas/detalle  ← NUEVO
router.post('/',       crearVenta);              // POST /api/ventas

module.exports = router;
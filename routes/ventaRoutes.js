const express = require('express');
const router = express.Router();
const { crearVenta, obtenerVentas, obtenerVentasConDetalle } = require('../controllers/ventaController');

router.get('/',        obtenerVentas);
router.get('/detalle', obtenerVentasConDetalle);
router.post('/',       crearVenta);

module.exports = router;
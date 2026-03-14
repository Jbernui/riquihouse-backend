const express = require('express');
const router = express.Router();
const { crearVenta, obtenerVentas } = require('../controllers/ventaController');

router.get('/', obtenerVentas);
router.post('/', crearVenta);

module.exports = router;
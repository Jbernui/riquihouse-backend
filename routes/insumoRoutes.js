const express = require('express');
const router = express.Router();
const { obtenerInsumos, crearInsumo, actualizarInsumo, eliminarInsumo } = require('../controllers/insumoController');

router.get('/', obtenerInsumos);
router.post('/', crearInsumo);
router.put('/:id', actualizarInsumo);
router.delete('/:id', eliminarInsumo);

module.exports = router;
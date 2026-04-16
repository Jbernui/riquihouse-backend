const express = require('express');
const router = express.Router();
const { crearReceta, obtenerRecetas, eliminarReceta, actualizarReceta } = require('../controllers/recetaController');

router.get('/', obtenerRecetas);
router.post('/', crearReceta);
router.delete('/:id', eliminarReceta);
router.put('/:id', actualizarReceta);

module.exports = router;
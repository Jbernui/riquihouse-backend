const express = require('express');
const router = express.Router();
const { crearReceta, obtenerRecetas } = require('../controllers/recetaController');

router.get('/', obtenerRecetas);
router.post('/', crearReceta);

module.exports = router;
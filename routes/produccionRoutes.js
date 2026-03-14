const express = require('express');
const router = express.Router();
const { registrarProduccion, obtenerProduccion } = require('../controllers/produccionController');

router.get('/', obtenerProduccion);
router.post('/', registrarProduccion);

module.exports = router;
const express = require('express');
const router = express.Router();
const { registrarMerma, obtenerMermas } = require('../controllers/mermaController');

router.get('/', obtenerMermas);
router.post('/', registrarMerma);

module.exports = router;
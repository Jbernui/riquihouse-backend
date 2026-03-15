const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

// Cuando el frontend mande un POST a /api/auth/login, ejecutará la función
router.post('/login', login);

module.exports = router;
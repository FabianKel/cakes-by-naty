const express = require('express');
const router = express.Router();
const { getUserById } = require('../controllers/usersController');

// Ruta para obtener un usuario por ID
router.get('/:u_id', getUserById);

module.exports = router;

const express = require('express');
const router = express.Router();
const { getUserById, register, login, getAllUsers, editUser } = require('../controllers/usersController');

router.get('/:u_id', getUserById);
router.post('/all', getAllUsers);
router.post('/register', register);
router.post('/login', login);
router.put('/edit/:u_id', editUser)

module.exports = router;

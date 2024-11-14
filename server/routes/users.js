const express = require('express');
const router = express.Router();
const { getUserById, register, login, getAllUsers, editUser, editPassword } = require('../controllers/usersController');

router.get('/:u_id', getUserById);
router.post('/all', getAllUsers);
router.post('/register', register);
router.post('/login', login);
router.put('/edit/:u_id', editUser)
router.put('/password/:u_id', editPassword)

module.exports = router;

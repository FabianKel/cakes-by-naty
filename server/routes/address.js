const express = require('express');
const router = express.Router();
const { addAddress, deleteAddress, editAddress } = require('../controllers/addressController');

router.post('/add/:num', addAddress);
router.delete('/delete/:a_id/', deleteAddress);
router.put('/edit/:a_id', editAddress)

module.exports = router;
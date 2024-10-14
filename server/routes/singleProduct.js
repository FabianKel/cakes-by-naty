const express = require('express');
const router = express.Router();
const { getProductById, createProduct, editProduct } = require('../controllers/SingleProductController');

router.get('/:id', getProductById);
router.post('/new', createProduct);
router.put('/:producto_id', editProduct);

module.exports = router;

const express = require('express');
const router = express.Router();
const { getProductById, deleteProductById, createProduct, editProduct } = require('../controllers/SingleProductController');

router.get('/:id', getProductById);
router.delete('/:producto_id', deleteProductById);
router.post('/new', createProduct);
router.put('/:producto_id', editProduct);

module.exports = router;

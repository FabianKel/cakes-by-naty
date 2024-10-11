const express = require('express');
const { getProducts, getProductById, putProduct, deleteProduct } = require('../controllers/productsController');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', putProduct);
router.delete('/:id', deleteProduct);

module.exports = router;

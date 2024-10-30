const express = require('express');
const router = express.Router();
const { getCartByUserId, addProductToCart, deleteProductFromCart } = require('../controllers/cartsController');

router.get('/:user_id', getCartByUserId);
router.post('/add', addProductToCart);
router.delete('/:user_id/producto/:producto_id', deleteProductFromCart);


module.exports = router;
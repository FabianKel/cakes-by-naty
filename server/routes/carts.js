const express = require('express');
const router = express.Router();
const { getCartByUserId, addProductToCart, deleteProductFromCart } = require('../controllers/cartsController');

router.get('/:user_id', getCartByUserId);
router.post('/add', addProductToCart);
router.delete('/carrito/:carritoId/producto/:productoId', deleteProductFromCart);


module.exports = router;
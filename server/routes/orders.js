const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  getByStatus,
  deleteOrderById,
  getOrderProducts,
} = require('../controllers/ordersController');

router.get('/', getAllOrders);
router.get('/:pedido_id', getOrderProducts);
router.get('/estado/:estado', getByStatus);
router.delete('/:id', deleteOrderById);

module.exports = router;

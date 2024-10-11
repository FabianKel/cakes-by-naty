const express = require('express');
const router = express.Router();
const { getProducts, getProductsByCategory, getProductsByOccasion } = require('../controllers/productsController');

router.get('/:limit?', getProducts);
router.get('/categoria/:categoria_id/:limit?', getProductsByCategory);
router.get('/ocasion/:ocasion_id/:limit?', getProductsByOccasion);

module.exports = router;
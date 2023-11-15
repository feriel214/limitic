const express = require('express');
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder 
} = require('../controllers/orderController');



// Create a new order
router.post('/', createOrder);

// Get all orders
router.get('/', getAllOrders);

// Get an order by ID
router.get('/:id', getOrderById);

router.put('/update',updateOrderStatus);

router.delete('/delete/:id',deleteOrder );

module.exports = router;

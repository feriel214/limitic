const Order = require('../models/orderModel');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const {
      products,
      total,
      status,
      shipmentDetails,
      commandDetails,
      firstName,
      lastName,
      country,
      address,
      apartment,
      city,
      countryState,
      postalCode,
      phone,
      email,
      createAccount,
      accountPassword,
      noteAboutOrder,
      paymentMethod,
    } = req.body;
    const userId = req.body._id; // Assuming you have authentication middleware

    const newOrder = await Order.create({
      user: userId,
      products,
      total,
      status: status || 'Not Processed',
      shipmentDetails,
      commandDetails,
      firstName,
      lastName,
      country,
      address,
      apartment,
      city,
      countryState,
      postalCode,
      phone,
      email,
      createAccount,
      accountPassword,
      noteAboutOrder,
      paymentMethod,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create order', details: error.message });
  }
};

// Update the status of an order
// Update the status of an order
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId, orderStatus } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus }, // Just pass the variable as the value for the orderStatus field
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update order status', details: error.message });
  }
};

// Get a list of all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('products.product').populate('user');

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Unable to get orders', details: error.message });
  }
};

// Get an order by ID
exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id; // Assuming the order ID is passed as a route parameter

    const order = await Order.findById(orderId).populate('products.product').populate('user');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Unable to get order by ID', details: error.message });
  }
};

// Delete an order by ID
exports.deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id; // Assuming the order ID is passed as a route parameter

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Optionally, you can add authentication logic here to check if the user has permission to delete the order.

    // Delete the order
    await order.remove();

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete order', details: error.message });
  }
};

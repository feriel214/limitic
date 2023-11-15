const Cart = require('../models/cartModel');

// Add a product to the cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.body.user._id; // Assuming you have authentication middleware

    // Check if the cart already exists for the user; if not, create a new cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId });
    }

    // Check if the product is already in the cart; if yes, update the quantity
    const existingItemIndex = cart.items.findIndex((item) =>
      item.product.equals(productId)
    );

    if (existingItemIndex !== -1) {
      // Check if the item has a quantity property before updating it
      if (cart.items[existingItemIndex].quantity !== undefined) {
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        // Handle the case where quantity is undefined
        throw new Error("Quantity is undefined for the cart item.");
      }
    } else {
      // Add the product to the cart with the provided quantity
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Unable to add to cart', details: error.message });
  }
};

// Delete an item from the cart
exports.deleteCartItem = async (req, res) => {
    try {
      const itemId  = req.params.itemId;
      const userId = req.params.idUser; // Assuming you have authentication middleware
      const cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      const item = cart.items.id(itemId);
  
      if (!item) {
        return res.status(404).json({ message: 'Item not found in cart' });
      }
  
      item.remove(); // Remove the item from the cart
  
      await cart.save();
  
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: 'Unable to delete cart item', details: error.message });
    }
  };
  

// Get the user's cart and calculate the total
exports.getCart = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming you have authentication middleware

    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Calculate the total by iterating through cart items
    let total = 0;
    for (const item of cart.items) {
      total += item.product.price * item.quantity;
    }

    // Add the total to the response
    const cartWithTotal = { ...cart.toObject(), total };

    res.status(200).json(cartWithTotal);
  } catch (error) {
    res.status(500).json({ error: 'Unable to get cart', details: error.message });
  }
};


// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    const userId = req.params.idUser;  // Assuming you have authentication middleware

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.id(itemId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.quantity = quantity;

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update cart item', details: error.message });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const userId = req.params.idUser; // Assuming you have authentication middleware
    const cart = await Cart.findOneAndRemove({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json({ message: 'Cart deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete cart', details: error.message });
  }
};

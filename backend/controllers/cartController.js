import asyncHandler from '../utils/asyncHandler.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

export const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  if (cart) {
    res.json(cart);
  } else {
    res.json({ items: [] });
  }
});

export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  let cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, price: product.price });
    }
  } else {
    cart = new Cart({
      user: req.user._id,
      items: [{ product: productId, quantity, price: product.price }],
    });
  }

  await cart.save();
  await cart.populate('items.product');
  res.status(201).json(cart);
});

export const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    const item = cart.items.find((item) => item.product.toString() === req.params.itemId);
    if (item) {
      item.quantity = quantity;
      await cart.save();
      await cart.populate('items.product');
      res.json(cart);
    } else {
      res.status(404);
      throw new Error('Item not found');
    }
  } else {
    res.status(404);
    throw new Error('Cart not found');
  }
});

export const removeFromCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    cart.items = cart.items.filter((item) => item.product.toString() !== req.params.itemId);
    await cart.save();
    await cart.populate('items.product');
    res.json(cart);
  } else {
    res.status(404);
    throw new Error('Cart not found');
  }
});
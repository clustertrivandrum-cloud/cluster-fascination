const Order = require('../models/order')
const User = require('../models/user');
const Product = require('../models/product');
const Address = require('../models/address');
const crypto = require('crypto');
const Razorpay = require('razorpay');
require("dotenv").config();

// Initialize Razorpay instance with validation
let razorpay = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET && 
    process.env.RAZORPAY_KEY_ID !== 'rzp_test_xxxxxxxxxxxx' && 
    process.env.RAZORPAY_KEY_SECRET !== 'your_secret_key_here') {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
  console.log('✅ Razorpay initialized successfully');
} else {
  console.warn('⚠️  Razorpay credentials not configured. Online payments will not work.');
  console.warn('   Please add valid RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env file');
  console.warn('   Get your keys from: https://dashboard.razorpay.com/app/keys');
}

let orderDetails = {}


const getOrders = async (req, res) => {
  try {
    const data = await Order.find()
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
};
const getAdminOrders = async (req, res) => {
  try {
    const data = await Order.find().sort({ createdAt: -1 })
      .populate('userId', 'username email')
      .populate('address', 'firstname lastname address_line_1 address_line_2 zip mobile city state')
      .populate('products.item.product_id', 'name category price image');

    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error?.message ?? 'Something went wrong' });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const { _id } = req?.decoded
    const data = await Order.find({ userId: _id }).populate('products.item.product_id')
      .populate('address')
      .sort({ createdAt: -1 });
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
};

const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    console.log(orderId);
    const data = await Order.findById(orderId)
      .populate('products.item.product_id')
      .populate('address');
    // console.log(data);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error?.message ?? 'Something went wrong' });
  }
};


const createOrder = async (req, res) => {
  const { _id } = req?.decoded

  const { payment_mode, amount, address, products } = req?.body
  try {
    const data = await Order.create({ userId: _id, payment_mode, amount, address, products })
    console.log('prod qty findings ', products.item)

    const user = await User.findById(_id);
    user.cart.item = []; // Clear the cart items
    user.cart.totalPrice = 0; // Reset total price to zero
    await user.save(); // Save the user with cleared cart

    for (const item of products.item) {
      const product = await Product.findById(item.product_id);

      if (product) {
        // Reduce the product stock by the ordered quantity
        product.stock -= item.qty;
        await product.save();
      }
    }

    res.status(201).json({ data, message: 'Order placed successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
}

const updateOrder = async (req, res) => {
  const { _id, status } = req?.body
  try {
    const data = await Order.updateOne({ _id },
      { $set: { status } })
    res.status(201).json({ data, message: 'Order updated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
}
const getReviewOrders = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    // console.log(' userId, productId', userId, productId);

    const orders = await Order.find({ userId, 'products.item.product_id': productId });

    res.status(200).json({ canWriteReview: orders.length > 0 });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  const { orderId, newStatus } = req.body;
  console.log(orderId, newStatus);

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = newStatus;
    await order.save();

    res.status(200).json({ message: 'Order status updated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error?.message ?? 'Something went wrong' });
  }
};


// Create Razorpay Order
const createRazorpayOrder = async (req, res) => {
  try {
    // Check if Razorpay is initialized
    if (!razorpay) {
      return res.status(503).json({
        success: false,
        message: 'Razorpay payment gateway is not configured. Please contact administrator.'
      });
    }

    console.log('Creating Razorpay order:', req.body);
    const { _id } = req?.decoded;
    const { orderData } = req?.body;
    
    // Store order details temporarily for verification
    orderDetails = { ...orderData, _id };
    
    // Razorpay expects amount in paise (smallest currency unit)
    const options = {
      amount: orderData.amount * 100, // amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId: _id,
        addressId: orderData.address,
        payment_mode: orderData.payment_mode
      }
    };

    const order = await razorpay.orders.create(options);
    console.log('Razorpay order created:', order);
    
    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create Razorpay order'
    });
  }
}
// Verify Razorpay Payment
const verifyRazorpayPayment = async (req, res) => {
  try {
    console.log('Verifying Razorpay payment:', req.body);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderData } = req.body;
    const { _id } = req?.decoded;

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Payment is verified, create order
      const { payment_mode, amount, address, products } = orderData;
      
      try {
        const data = await Order.create({ 
          userId: _id, 
          payment_mode, 
          amount, 
          address, 
          products,
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature
        });
        
        // Clear user cart
        const user = await User.findById(_id);
        user.cart.item = [];
        user.cart.totalPrice = 0;
        await user.save();
        
        // Update product stock
        for (const item of products.item) {
          const product = await Product.findById(item.product_id);
          if (product) {
            product.stock -= item.qty;
            await product.save();
          }
        }
        
        res.status(200).json({
          success: true,
          message: 'Payment verified and order created successfully',
          orderId: data._id
        });
      } catch (err) {
        console.log('Order creation error:', err);
        return res.status(500).json({ 
          success: false,
          message: err?.message ?? 'Something went wrong while creating order' 
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid payment signature'
      });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Payment verification failed'
    });
  }
}
module.exports = {
  getOrders,
  getUserOrders,
  createOrder,
  updateOrder,
  getOrderById,
  getReviewOrders,
  getAdminOrders,
  updateOrderStatus,
  createRazorpayOrder,
  verifyRazorpayPayment
}
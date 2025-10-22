const Order = require('../models/order')
const User = require('../models/user');
const Product = require('../models/product');
const Address = require('../models/address');
const crypto = require('crypto');
const axios = require('axios');
require("dotenv").config();


let salt_key = process.env.SALT_KEY
let merchant_id = process.env.MERCHANT_ID
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


const phonepeIntagretion = async (req, res) => {

  try {
    console.log(req.body)
    const { _id } = req?.decoded
    const { data, orderData } = req?.body
    orderDetails = { ...orderData, _id }
    const merchantTransactionId = data?.transactionId;
    const details = {
      merchantId: merchant_id,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: data?.MUID,
      name: data?.name,
      amount: data?.amount * 100,
      redirectUrl: `${process.env.SERVER_PORT_LOCAL}/api/v1/orders/status/?id=${merchantTransactionId}`,
      redirectMode: 'POST',
      mobileNumber: data?.number,
      paymentInstrument: {
        type: 'PAY_PAGE'
      }
    };
    const payload = JSON.stringify(details);
    const payloadMain = Buffer.from(payload).toString('base64');
    const keyIndex = 1;
    const string = payloadMain + '/pg/v1/pay' + salt_key;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + '###' + keyIndex;

    const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay"
    // const prod_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"

    const options = {   
      method: 'POST',
      url: prod_URL,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': checksum
      },
      data: {    
        request: payloadMain
      }
    };

    axios.request(options).then(function (response) {
      console.log('response12', response.data)

      return res.json(response.data)
    })
      .catch(function (error) {
        console.error(error);
      });

  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false
    })
  }
}
const phonepeStatus = async (req, res) => {   

  console.log('phonepeStatus');
  const merchantTransactionId = req.query.id
  const merchantId = merchant_id

  const keyIndex = 1;
  const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt_key;
  const sha256 = crypto.createHash('sha256').update(string).digest('hex');
  const checksum = sha256 + "###" + keyIndex;

  const options = {
    method: 'GET',
    // url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
    url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${merchantTransactionId}`,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'X-VERIFY': checksum,
      'X-MERCHANT-ID': `${merchantId}`
    }
  };

  // CHECK PAYMENT STATUS
  axios.request(options).then(async (response) => {
    if (response.data.success === true) {
      const { payment_mode, amount, address, products, _id } = orderDetails
      try {
        const data = await Order.create({ userId: _id, payment_mode, amount, address, products })
        const user = await User.findById(_id);
        user.cart.item = [];
        user.cart.totalPrice = 0;
        await user.save();
        for (const item of products.item) {
          const product = await Product.findById(item.product_id);
          if (product) {
            product.stock -= item.qty;
            await product.save();
          }
        }
        return res.redirect(process.env.CLIENT_PORT_LOCAL)
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
      }
    } else {
      return res.redirect(process.env.CLIENT_PORT_LOCAL)
    }
  })
    .catch((error) => {
      console.error(error);
    });
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
  phonepeIntagretion,
  phonepeStatus
}
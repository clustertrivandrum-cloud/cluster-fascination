const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    payment_mode: {
        type: String,
        required: true  
    },
    // Pricing breakdown
    subtotal: {
        type: Number,
        default: 0,
        required: true
    },
    delivery_fee: {
        type: Number,
        default: 0,
        required: true
    },
    tax_amount: {
        type: Number,
        default: 0
    },
    discount_amount: {
        type: Number,
        default: 0
    },
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: mongoose.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    products: {
        item: [{
            product_id: {
                type: mongoose.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            qty: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
            }
        }],
        totalPrice: {
            type: Number,
            default: 0
        }
    },
    status: {
        type: String,
        enum: ["Pending", "Placed", "Shipped", "Out_of_delivery", "Delivered", "Delayed", "Canceled"],
        default: "Placed"
    },
    offer: {
        type: String,
        default: "None"
    },
    coupon_code: {
        type: String,
        default: null
    },
    // Delivery information
    tracking_number: {
        type: String,
        default: null
    },
    expected_delivery_date: {
        type: Date,
        default: null
    },
    // Order management
    invoice_number: {
        type: String,
        default: null
    },
    order_notes: {
        type: String,
        default: null
    },
    cancellation_reason: {
        type: String,
        default: null
    },
    // Refund information - DISABLED: No refunds or returns allowed
    // Policy: All sales are final - No COD, No Returns, No Refunds
    refund_amount: {
        type: Number,
        default: 0
    },
    refund_status: {
        type: String,
        enum: ["None"], // Only "None" allowed - refunds disabled
        default: "None"
    },
    // Razorpay transaction details
    razorpay_order_id: {
        type: String,
        default: null
    },
    razorpay_payment_id: {
        type: String,
        default: null
    },
    razorpay_signature: {
        type: String,
        default: null
    }
},
    {
        timestamps: true
    })

orderSchema.methods.addToOrders = function (product) {
    const products = this.products
    const isExisting = products.item.findIndex(objInItems => {
        return new String(objInItems.productId).trim() == new String(product._id).trim()
    })
    if (isExisting >= 0) {
        cart.products[isExisting].qty += 1
    } else {
        cart.products.push({
            productId: product._id,
            qty: 1
        })
    }
    cart.totalPrice += product.price
    console.log("User in schema:", this);
    return this.save()
}


module.exports = mongoose.model('Orders', orderSchema)
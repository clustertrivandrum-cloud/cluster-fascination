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
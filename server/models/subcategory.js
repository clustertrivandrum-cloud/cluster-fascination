const mongoose = require('mongoose')

const subcategorySchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   desc: {
      type: String,
   },
   image: {
      type: String,
   },
   category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
   },
   products: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
   }],
   isAvailable: {
      type: Boolean,
      default: true
   },
},
   {
      timestamps: true
   })

module.exports = mongoose.model('Subcategory', subcategorySchema)

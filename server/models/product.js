const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subheading: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    tags: {
      type: String,
      enum: ["featured", "popular", "limited_time_deal", "most_loved"],
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    sale_rate: {
      type: Number,
      required: true,
    },
    image: {
      type: Array,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: Array,
    },
  },
  {
    timestamps: true,
  },
);

// Pre-save middleware to automatically set isAvailable based on stock
productSchema.pre('save', function (next) {
  // If stock is less than 2, mark as unavailable
  if (this.stock < 2) {
    this.isAvailable = false;
  } else {
    this.isAvailable = true;
  }
  next();
});

// Pre-update middleware to handle updates
productSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (update.stock !== undefined) {
    if (update.stock < 2) {
      update.isAvailable = false;
    } else {
      update.isAvailable = true;
    }
  }
  next();
});

module.exports = mongoose.model("Product", productSchema);

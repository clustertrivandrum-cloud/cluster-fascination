const Product = require("../models/product");
const Category = require("../models/category");
const Subcategory = require("../models/subcategory");
const fs = require("fs");

const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 6,
      sortField,
      sortOrder,
      search,
      category,
      subcategory,
      priceGreaterThan,
      priceLessThan,
      priceMin,
      priceMax,
      sortDiscount,
      sortDiscountGreaterThan,
    } = req.query;

    // Convert page and limit to integers
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    // console.log('lim',limit)
    console.log("lim n", limitNumber);

    // Construct the base query
    const query = {};

    // Search functionality
    if (search) {
      const searchRegex = new RegExp(search, "i");
      query.$or = [
        { name: searchRegex },
        { brand: searchRegex },
        // Add additional fields for search as needed
      ];
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Subcategory filter
    if (subcategory) {
      query.subcategory = subcategory;
    }

    // Sorting
    const sortOptions = {};
    if (sortField && sortOrder) {
      sortOptions[sortField] = sortOrder === "asc" ? 1 : -1;
    }

    // Price greater than functionality
    if (priceGreaterThan) {
      query.sale_rate = { $gt: parseInt(priceGreaterThan) };
    }

    // Price less than functionality
    if (priceLessThan) {
      query.sale_rate = { $lt: parseInt(priceLessThan) };
    }

    // Price range functionality
    if (priceMin && priceMax) {
      query.sale_rate = { $gte: parseInt(priceMin), $lte: parseInt(priceMax) };
    }

    if (sortDiscount) {
      query.discount = parseInt(sortDiscount);
    }

    // Sort by discount greater than functionality
    if (sortDiscountGreaterThan) {
      query.discount = { $gt: parseInt(sortDiscountGreaterThan) };
    }

    // Find products based on the constructed query
    const totalProducts = await Product.countDocuments(query);
    console.log("tpro", totalProducts);
    const products = await Product.find(query)
      .populate("category", "name")
      .populate("subcategory", "name")
      .collation({ locale: "en" }) // Enable case-insensitive search
      .sort(sortOptions);
    // .skip((pageNumber - 1) * limitNumber)
    // .limit(limitNumber);
    //const data = await Product.find()
    res.status(200).json({ data: products });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: error?.message ?? "Something went wrong !" });
  }
};

const getProductsHome = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 6,
      sortField,
      sortOrder,
      search,
      category,
      subcategory,
      tags,
      priceGreaterThan,
      priceLessThan,
      priceMin,
      priceMax,
      sortDiscount,
      sortDiscountGreaterThan,
    } = req.query;

    // Convert page and limit to integers
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    // console.log('lim',limit)
    console.log("lim n", limitNumber);

    // Construct the base query
    const query = {};

    // Search functionality
    if (search) {
      const searchRegex = new RegExp(search, "i");
      query.$or = [
        { name: searchRegex },
        { brand: searchRegex },
        // Add additional fields for search as needed
      ];
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Subcategory filter
    if (subcategory) {
      query.subcategory = subcategory;
    }

    if (tags) {
      query.tags = tags;
    }

    // Sorting
    const sortOptions = {};
    if (sortField && sortOrder) {
      sortOptions[sortField] = sortOrder === "asc" ? 1 : -1;
    }

    // Price greater than functionality
    if (priceGreaterThan) {
      query.sale_rate = { $gt: parseInt(priceGreaterThan) };
    }

    // Price less than functionality
    if (priceLessThan) {
      query.sale_rate = { $lt: parseInt(priceLessThan) };
    }

    // Price range functionality
    if (priceMin && priceMax) {
      query.sale_rate = { $gte: parseInt(priceMin), $lte: parseInt(priceMax) };
    }

    if (sortDiscount) {
      query.discount = parseInt(sortDiscount);
    }

    // Sort by discount greater than functionality
    if (sortDiscountGreaterThan) {
      query.discount = { $gt: parseInt(sortDiscountGreaterThan) };
    }

    if (req.query.random) {
      const products = await Product.aggregate([
        { $match: query },
        { $sample: { size: limitNumber } },
      ]);
      await Product.populate(products, { path: "category", select: "name" });
      await Product.populate(products, { path: "subcategory", select: "name" });
      return res.status(200).json({ data: products });
    }

    // Find products based on the constructed query
    const totalProducts = await Product.countDocuments(query);
    console.log("tpro", totalProducts);
    const products = await Product.find(query)
      .populate("category", "name")
      .populate("subcategory", "name")
      .collation({ locale: "en" }) // Enable case-insensitive search
      .sort(sortOptions);
    // .skip((pageNumber - 1) * limitNumber)
    // .limit(limitNumber);
    //const data = await Product.find()
    res.status(200).json({ data: products });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: error?.message ?? "Something went wrong !" });
  }
};

const getProductById = async (req, res) => {
  try {
    const data = await Product.findOne({ _id: req.params.id })
      .populate("category", "name")
      .populate("subcategory", "name");
    res.status(200).json({ data, message: "product found successfully" });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ message: error?.message ?? "Something went wrong !" });
  }
};

const addProduct = async (req, res) => {
  try {
    console.log(req.files);
    const {
      name,
      subheading,
      category,
      subcategory,
      brand,
      price,
      stock,
      discount,
      sale_rate,
      description,
    } = req?.body;
    if (req.files.length != 0) {
      const product = new Product({
        name,
        subheading,
        category,
        subcategory,
        brand,
        price,
        stock,
        discount,
        sale_rate,
        description,
        image: req.files.map((x) => x.filename),
      });
      console.log(product);
      await product.save();
      if (product) {
        await Category.updateOne(
          { _id: category },
          { $push: { products: product._id } },
        );

        // If subcategory is provided, update subcategory's products array
        if (subcategory) {
          await Subcategory.updateOne(
            { _id: subcategory },
            { $push: { products: product._id } },
          );
        }

        res.status(200).json({ message: "Product added successfully !" });
      } else {
        res.status(400).json({ message: "Something went wrong !" });
      }
    } else {
      res
        .status(400)
        .json({
          message: "failed only jpg ,jpeg, webp & png file supported !",
        });
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ message: error?.message ?? "Something went wrong !" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      _id,
      name,
      subheading,
      category,
      subcategory,
      brand,
      price,
      stock,
      discount,
      sale_rate,
      description,
      image,
      isAvailable,
    } = req?.body;
    console.log("isAvailable", isAvailable);
    const images = JSON.parse(image) ?? [];
    if (req?.files?.length != 0) {
      req?.files?.map((x) => images.push(x.filename));
    }
    // Get the old product data to check if category/subcategory changed
    const oldProduct = await Product.findById(_id);

    const updateData = {
      name,
      subheading,
      brand,
      price,
      stock,
      discount,
      sale_rate,
      description,
      isAvailable,
      image: images,
    };

    // Add category and subcategory to update data if provided
    if (category) updateData.category = category;
    if (subcategory !== undefined) updateData.subcategory = subcategory; // Allow null/empty subcategory

    await Product.updateOne({ _id }, { $set: updateData });

    // Handle category change
    if (category && oldProduct.category.toString() !== category) {
      // Remove from old category
      await Category.updateOne(
        { _id: oldProduct.category },
        { $pull: { products: _id } },
      );
      // Add to new category
      await Category.updateOne({ _id: category }, { $push: { products: _id } });
    }

    // Handle subcategory change
    if (subcategory !== undefined) {
      // Remove from old subcategory if it exists
      if (oldProduct.subcategory) {
        await Subcategory.updateOne(
          { _id: oldProduct.subcategory },
          { $pull: { products: _id } },
        );
      }
      // Add to new subcategory if provided
      if (subcategory) {
        await Subcategory.updateOne(
          { _id: subcategory },
          { $push: { products: _id } },
        );
      }
    }
    res.status(200).json({ message: "Product updated successfully !" });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ message: error?.message ?? "Something went wrong !" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const data = await Product.findById(id);
    if (!data) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Remove product from category's products array
    if (data.category) {
      await Category.updateOne(
        { _id: data.category },
        { $pull: { products: id } },
      );
    }

    // Remove product from subcategory's products array if it exists
    if (data.subcategory) {
      await Subcategory.updateOne(
        { _id: data.subcategory },
        { $pull: { products: id } },
      );
    }

    // Delete the product
    await Product.findByIdAndDelete(id);

    // Delete associated images
    if (data.image && Array.isArray(data.image)) {
      data.image.forEach((imageName) => {
        fs.unlink(`public/uploads/${imageName}`, (err) => {
          if (err) {
            console.error("Error deleting image:", err);
          } else {
            console.log("Image deleted successfully:", imageName);
          }
        });
      });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error?.message ?? "Something went wrong" });
  }
};
module.exports = {
  getProducts,
  getProductsHome,
  getProductById,
  updateProduct,
  addProduct,
  deleteProduct,
};

const Subcategory = require('../models/subcategory');
const Category = require('../models/category');
const fs = require('fs');

const getSubcategories = async (req, res) => {
  try {
    const { categoryId } = req.query;
    let filter = {};

    if (categoryId) {
      filter.category = categoryId;
    }

    const data = await Subcategory.find(filter).populate('category', 'name');
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error?.message ?? 'Something went wrong' });
  }
};

const getSubcategoryById = async (req, res) => {
  try {
    const data = await Subcategory.findOne({ _id: req.params.id }).populate('category', 'name');
    if (!data) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }
    res.status(200).json({ data, message: 'Subcategory found successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error?.message ?? "Something went wrong!" });
  }
};

const addSubcategory = async (req, res) => {
  console.log('reached subcategory');

  const { name, desc, category } = req?.body;
  const image = req?.file?.filename;

  console.log('name, desc, category:', name, desc, category, image);

  try {
    // Check if category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: 'Category not found' });
    }

    // Check if subcategory already exists in this category
    let arr = [];
    const subcategoryData = await Subcategory.find({ category });
    subcategoryData.map(x => {
      arr.push(x?.name?.toUpperCase());
    });

    const subcategoryName = name.toUpperCase();
    const isExisting = arr.findIndex(x => x == subcategoryName);

    if (isExisting === -1) {
      console.log('reached subcategory1');
      const subcat = new Subcategory({
        name: name.toUpperCase(),
        desc,
        image,
        category
      });
      await subcat.save();

      // Add subcategory to category's subcategories array
      await Category.findByIdAndUpdate(category, {
        $push: { subcategories: subcat._id }
      });

      return res.status(200).json({ data: subcat, message: 'Subcategory created successfully' });
    } else {
      return res.status(400).json({ message: 'Subcategory already exists in this category' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error?.message ?? 'Something went wrong' });
  }
};

const updateSubcategory = async (req, res) => {
  const { _id, name, desc, isAvailable, category } = req?.body;
  const image = req?.file?.filename;

  try {
    const data = await Subcategory.findById(_id);
    if (!data) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    // If category is being changed, check if new category exists
    if (category && category !== data.category.toString()) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).json({ message: 'New category not found' });
      }

      // Remove from old category
      await Category.findByIdAndUpdate(data.category, {
        $pull: { subcategories: _id }
      });

      // Add to new category
      await Category.findByIdAndUpdate(category, {
        $push: { subcategories: _id }
      });
    }

    // Delete old image if new image is uploaded
    if (image && data.image) {
      fs.unlink(`public/uploads/${data?.image}`, (err) => {
        if (err) {
          console.error('Error deleting image:', err);
          return;
        }
        console.log('Image deleted successfully.');
      });
    }

    const updateData = { name, desc, isAvailable };
    if (category) updateData.category = category;
    if (image) updateData.image = image;

    const updatedSubcategory = await Subcategory.findByIdAndUpdate(_id,
      { $set: updateData },
      { new: true }
    ).populate('category', 'name');

    res.status(200).json({ data: updatedSubcategory, message: 'Subcategory updated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error?.message ?? 'Something went wrong' });
  }
};

const deleteSubcategory = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Subcategory.findById(id);
    if (!data) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    // Remove subcategory from category's subcategories array
    await Category.findByIdAndUpdate(data.category, {
      $pull: { subcategories: id }
    });

    // Delete the subcategory
    await Subcategory.findByIdAndDelete(id);

    // Delete image file if exists
    if (data.image) {
      fs.unlink(`public/uploads/${data?.image}`, (err) => {
        if (err) {
          console.error('Error deleting image:', err);
          return;
        }
        console.log('Image deleted successfully.');
      });
    }

    res.status(200).json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error?.message ?? 'Something went wrong' });
  }
};

const getSubcategoriesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const subcategories = await Subcategory.find({ category: categoryId })
      .populate('category', 'name')
      .select('_id name desc image isAvailable');

    res.status(200).json({ data: subcategories });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error?.message ?? 'Something went wrong' });
  }
};

module.exports = {
  getSubcategories,
  addSubcategory,
  deleteSubcategory,
  updateSubcategory,
  getSubcategoryById,
  getSubcategoriesByCategory
};

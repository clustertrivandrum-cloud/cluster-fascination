const { Router } = require('express');
const router = Router();
const authorization = require("../middlewares/authorization");
const {
  getSubcategories,
  addSubcategory,
  deleteSubcategory,
  updateSubcategory,
  getSubcategoryById,
  getSubcategoriesByCategory
} = require('../controllers/subcategoryController');
const { upload } = require('../middlewares/multer');

// Get all subcategories (with optional category filter via query)
router.get('/', getSubcategories);

// Get subcategory by ID
router.get('/:id', getSubcategoryById);

// Get subcategories by category ID
router.get('/category/:categoryId', getSubcategoriesByCategory);

// Create new subcategory
router.post("/", upload.single('image'), addSubcategory);
// router.post("/", authorization, upload.single('image'), addSubcategory);

// Update subcategory
router.patch("/", upload.single('image'), updateSubcategory);
// router.patch("/", authorization, upload.single('image'), updateSubcategory);

// Delete subcategory
router.delete("/:id", deleteSubcategory);
// router.delete("/:id", authorization, deleteSubcategory);

module.exports = router;

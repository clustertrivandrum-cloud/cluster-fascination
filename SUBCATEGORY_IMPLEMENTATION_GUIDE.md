# Subcategory Implementation Guide

## Overview
This document outlines the complete implementation of the subcategory system for the 40xleaves e-commerce platform. The implementation includes backend API, database models, and frontend admin interface for managing subcategories.

---

## Table of Contents
1. [Database Schema](#database-schema)
2. [Backend Implementation](#backend-implementation)
3. [Frontend Implementation](#frontend-implementation)
4. [API Endpoints](#api-endpoints)
5. [Usage Guide](#usage-guide)
6. [Troubleshooting](#troubleshooting)

---

## Database Schema

### Subcategory Model
**File**: `server/models/subcategory.js`

```javascript
{
  name: String (required),
  desc: String,
  image: String,
  category: ObjectId (ref: 'Category', required),
  products: [ObjectId] (ref: 'Product'),
  isAvailable: Boolean (default: true),
  timestamps: true
}
```

### Updated Category Model
**File**: `server/models/category.js`

**Added Field**:
- `subcategories`: Array of ObjectIds referencing Subcategory model

### Updated Product Model
**File**: `server/models/product.js`

**Added Field**:
- `subcategory`: ObjectId (ref: 'Subcategory', optional)

---

## Backend Implementation

### 1. Subcategory Routes
**File**: `server/routes/subcategoryRoutes.js`

**Endpoints**:
- `GET /api/v1/subcategory` - Get all subcategories (with optional category filter)
- `GET /api/v1/subcategory/:id` - Get subcategory by ID
- `GET /api/v1/subcategory/category/:categoryId` - Get subcategories by category
- `POST /api/v1/subcategory` - Create new subcategory
- `PATCH /api/v1/subcategory` - Update subcategory
- `DELETE /api/v1/subcategory/:id` - Delete subcategory

### 2. Subcategory Controller
**File**: `server/controllers/subcategoryController.js`

**Key Features**:
- Validates parent category exists before creating subcategory
- Prevents duplicate subcategories within same category
- Automatically updates category's subcategories array
- Handles image upload/deletion
- Manages product arrays when subcategory is updated/deleted

### 3. Updated Product Controller
**File**: `server/controllers/productController.js`

**Key Updates**:
- Added `subcategory` filter in product queries
- Populates subcategory data in product responses
- Updates subcategory product arrays on product CRUD operations
- Handles subcategory changes when products are updated

---

## Frontend Implementation

### 1. API Integration

#### Product URLs
**File**: `admin/src/queries/productUrls.js`

**New Functions**:
```javascript
- addSubcategory(data)
- editSubcategory(data)
- deleteSubcategory(data)
- getSubcategoryById(data)
- getSubcategories(data)
- getSubcategoriesByCategory(data)
```

#### Product Query Hooks
**File**: `admin/src/queries/ProductQuery.jsx`

**New Hooks**:
```javascript
- useGetSubcategories(data)
- useGetSubcategoryById(data)
- useGetSubcategoriesByCategory(data)
- useAddSubcategory()
- useEditSubcategory()
- useDeleteSubcategory()
```

### 2. Subcategory Management Pages

#### List Page
**File**: `admin/src/pages/Subcategory/index.js`
- Displays all subcategories
- Links to add/edit pages
- Shows parent category information

#### Add Page
**File**: `admin/src/pages/Subcategory/AddSubcategory.jsx`
- Form to create new subcategories
- Parent category dropdown (loads all categories)
- Image upload functionality
- Validation for required fields
- Debug section for troubleshooting

#### Edit Page
**File**: `admin/src/pages/Subcategory/EditSubcategory.jsx`
- Form to edit existing subcategories
- Can change parent category
- Update image or keep existing
- Toggle availability status
- Delete functionality

#### Table Component
**File**: `admin/src/pages/Subcategory/tableData.js`
- Displays subcategories in table format
- Shows subcategory image, name, description
- Displays parent category name
- Shows availability status
- Edit/Delete actions

### 3. Updated Product Forms

#### Add Product
**File**: `admin/src/pages/Products/AddProduct.jsx`

**Changes**:
- Added subcategory Autocomplete dropdown
- Dynamically loads subcategories based on selected category
- Resets subcategory when category changes
- Subcategory is optional

#### Edit Product
**File**: `admin/src/pages/Products/EditProduct.jsx`

**Changes**:
- Changed category from disabled input to editable Autocomplete
- Added subcategory Autocomplete dropdown
- Loads existing category and subcategory on mount
- Allows changing both category and subcategory
- Properly handles updates in backend

### 4. Navigation

#### Routes
**File**: `admin/src/routes.js`

**Added**:
```javascript
{
  type: "route",
  name: "Subcategories",
  key: "subcategory",
  route: "/subcategory",
  icon: <Box component="i" color="info" fontSize="14px" className="ni ni-collection" />,
  component: <Subcategory />,
}
```

#### App Routes
**File**: `admin/src/App.js`

**Added Routes**:
- `/subcategory/addSubcategory` → AddSubcategory component
- `/subcategory/editSubcategory/:id` → EditSubcategory component

---

## API Endpoints

### Subcategory Endpoints

#### Get All Subcategories
```
GET /api/v1/subcategory
Query Params:
  - categoryId (optional): Filter by category
  - page (optional): Page number
  - perpageitems (optional): Items per page
```

#### Get Subcategory by ID
```
GET /api/v1/subcategory/:id
Response: { data: subcategory, message: string }
```

#### Get Subcategories by Category
```
GET /api/v1/subcategory/category/:categoryId
Response: { data: [subcategories] }
```

#### Create Subcategory
```
POST /api/v1/subcategory
Body (FormData):
  - name: string (required)
  - desc: string (required)
  - category: ObjectId (required)
  - image: File (required)
Response: { data: subcategory, message: string }
```

#### Update Subcategory
```
PATCH /api/v1/subcategory
Body (FormData):
  - _id: ObjectId (required)
  - name: string
  - desc: string
  - category: ObjectId
  - isAvailable: boolean
  - image: File (optional)
Response: { data: subcategory, message: string }
```

#### Delete Subcategory
```
DELETE /api/v1/subcategory/:id
Response: { message: string }
```

### Updated Product Endpoints

#### Get Products with Subcategory Filter
```
GET /api/v1/products
Query Params:
  - category (optional): Filter by category
  - subcategory (optional): Filter by subcategory
  - search, price filters, etc.
```

---

## Usage Guide

### Creating a Subcategory

1. Navigate to **Subcategories** in the admin menu
2. Click **Add Subcategory** button
3. Fill in the form:
   - **Subcategory Name**: Enter the name (e.g., "Men's T-Shirts")
   - **Parent Category**: Select from dropdown (e.g., "Clothing")
   - **Description**: Add a short description (10-20 words)
   - **Image**: Upload a thumbnail (1280x720, <2MB, JPG/PNG)
4. Click **Add Subcategory**
5. Subcategory is automatically added to the parent category

### Editing a Subcategory

1. Navigate to **Subcategories** page
2. Click **Edit** button on the desired subcategory
3. Modify any fields:
   - Change name, description, or parent category
   - Update image (optional)
   - Toggle availability status
4. Click **Update Subcategory**

### Deleting a Subcategory

1. Navigate to **Subcategories** page
2. Click **Delete** button on the desired subcategory
3. Confirm deletion
4. Subcategory is removed from:
   - Database
   - Parent category's subcategories array
   - All associated products

### Adding Products with Subcategories

1. Navigate to **Products** → **Add Product**
2. Fill in product details
3. Select **Category** from dropdown
4. Select **Subcategory** from dropdown (optional, appears after category selection)
5. Complete other fields and submit

### Editing Product Categories

1. Navigate to **Products** → Edit specific product
2. Change **Category** using Autocomplete dropdown
3. Change **Subcategory** using Autocomplete dropdown
4. Subcategories automatically filter based on selected category
5. Save changes

---

## Troubleshooting

### Categories Not Showing in Dropdown

**Symptoms**: 
- Parent Category dropdown is empty
- No options appear when clicking dropdown

**Debug Steps**:

1. **Check Debug Section** (visible at top of Add/Edit Subcategory pages):
   - Look for "Debug Information" box
   - Check "Categories Count" - should show number of categories
   - Review "Raw Data" to see API response

2. **Check Browser Console**:
   - Open Developer Tools (F12)
   - Look for console logs: "Categories Loading", "Categories Data"
   - Check for any errors

3. **Check Network Tab**:
   - Open Developer Tools → Network tab
   - Look for request to `/api/v1/category`
   - Verify response status is 200
   - Check response data structure

4. **Common Issues**:

   **Issue**: `REACT_APP_API_URL` not set
   ```
   Solution: Create .env file in admin directory:
   REACT_APP_API_URL=http://localhost:5000
   ```

   **Issue**: No categories in database
   ```
   Solution: Create categories first via Categories page
   ```

   **Issue**: CORS error
   ```
   Solution: Check server CORS configuration
   ```

   **Issue**: Token expired
   ```
   Solution: Log out and log back in
   ```

5. **Remove Debug Section**:
   Once fixed, remove the debug box from AddSubcategory.jsx:
   ```javascript
   // Delete the entire <Box> component with comment:
   // {/* Debug Section - Remove after fixing */}
   ```

### Subcategories Not Loading in Product Form

**Check**:
1. Category is selected first (required)
2. Selected category has subcategories
3. Check console for API errors
4. Verify subcategory API endpoint is working

### Product Update Not Saving Category/Subcategory

**Check**:
1. Both category and subcategory are ObjectIds (not objects)
2. FormData is properly constructed
3. Backend is receiving the correct IDs
4. Check server logs for errors

### Image Upload Issues

**Common Problems**:
- File size > 2MB
- Wrong file format (use JPG, PNG, JPEG)
- File path permissions on server

**Solutions**:
1. Ensure `multer` is configured correctly
2. Check `public/uploads` directory exists and has write permissions
3. Verify file size and format before upload

---

## Data Relationships

```
Category (Parent)
├── Subcategory 1
│   ├── Product 1
│   ├── Product 2
│   └── Product 3
├── Subcategory 2
│   ├── Product 4
│   └── Product 5
└── Subcategory 3
    └── Product 6
```

### Database References

1. **Category → Subcategory**: One-to-Many
   - Category contains array of subcategory IDs
   
2. **Subcategory → Category**: Many-to-One
   - Subcategory has single category ID

3. **Product → Category**: Many-to-One (Required)
   - Product has single category ID

4. **Product → Subcategory**: Many-to-One (Optional)
   - Product can have single subcategory ID

5. **Subcategory → Products**: One-to-Many
   - Subcategory contains array of product IDs

---

## Features

### ✅ Implemented Features

- [x] Subcategory CRUD operations
- [x] Category-Subcategory relationships
- [x] Product-Subcategory relationships
- [x] Image upload for subcategories
- [x] Dynamic subcategory loading based on category
- [x] Validation and error handling
- [x] Admin interface for management
- [x] Filtering products by subcategory
- [x] Cascading updates (when category/subcategory changes)
- [x] Delete protection (updates all relations)
- [x] Status management (Available/Unavailable)
- [x] Debug tools for troubleshooting

### 🎯 Best Practices

1. **Always select category before subcategory**
2. **Use descriptive names** for subcategories
3. **Keep descriptions short** (10-20 words)
4. **Use consistent image dimensions** (16:9 ratio)
5. **Test thoroughly** before production deployment
6. **Backup database** before making bulk changes
7. **Monitor server logs** for errors

---

## File Structure

```
40xleaves/
├── server/
│   ├── models/
│   │   ├── category.js (updated)
│   │   ├── subcategory.js (new)
│   │   └── product.js (updated)
│   ├── controllers/
│   │   ├── categoryController.js (updated)
│   │   ├── subcategoryController.js (new)
│   │   └── productController.js (updated)
│   └── routes/
│       ├── index.js (updated)
│       ├── subcategoryRoutes.js (new)
│       └── productRoutes.js (updated)
└── admin/
    └── src/
        ├── pages/
        │   ├── Subcategory/
        │   │   ├── index.js (new)
        │   │   ├── AddSubcategory.jsx (new)
        │   │   ├── EditSubcategory.jsx (new)
        │   │   └── tableData.js (new)
        │   └── Products/
        │       ├── AddProduct.jsx (updated)
        │       └── EditProduct.jsx (updated)
        ├── queries/
        │   ├── ProductQuery.jsx (updated)
        │   └── productUrls.js (updated)
        ├── App.js (updated)
        └── routes.js (updated)
```

---

## Testing Checklist

### Backend Testing
- [ ] Create subcategory via API
- [ ] Get all subcategories
- [ ] Get subcategory by ID
- [ ] Get subcategories by category
- [ ] Update subcategory
- [ ] Delete subcategory
- [ ] Verify category's subcategories array updates
- [ ] Verify product assignments work correctly

### Frontend Testing
- [ ] View subcategories list
- [ ] Add new subcategory
- [ ] Edit existing subcategory
- [ ] Delete subcategory
- [ ] Category dropdown loads correctly
- [ ] Image upload works
- [ ] Validation messages appear
- [ ] Add product with subcategory
- [ ] Edit product category and subcategory
- [ ] Subcategories filter by category

---

## Version History

**v1.0.0** - Initial Implementation
- Created subcategory model, controller, and routes
- Updated category and product models
- Implemented admin interface
- Added dynamic category-subcategory loading
- Created comprehensive documentation

---

## Support

For issues or questions:
1. Check this documentation first
2. Review console logs and network requests
3. Check server logs for backend errors
4. Verify environment variables are set correctly

---

## Notes

- Subcategories are optional for products
- A category can have multiple subcategories
- A subcategory belongs to only one category
- Deleting a category should be handled carefully (may need to delete subcategories)
- Images are stored in `public/uploads/` directory
- Authorization middleware is commented out for development

---

**Last Updated**: December 2024
**Maintained By**: Development Team
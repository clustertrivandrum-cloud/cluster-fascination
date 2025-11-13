import {
  Autocomplete,
  Button,
  Grid,
  TextField,
  Paper,
  LinearProgress,
  Chip,
  Alert,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  ToggleButton,
} from "@mui/material";
import Input from "components/Input";
import PageLayout from "layouts/PageLayout";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useGetProductById,
  useGetCategory,
  useGetSubcategoriesByCategory,
  useUpdateProduct,
  useDeleteProduct,
} from "queries/ProductQuery";
import { useNavigate, useParams } from "react-router-dom";
import ImageList from "./ImageList";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WarningIcon from "@mui/icons-material/Warning";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState({});
  const [errors, setErrors] = useState({});
  const [category, setCategory] = useState(null);
  const [subcategory, setSubcategory] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { data, isLoading } = useGetProductById({ id });
  const { data: categories, isLoading: categoriesLoading } = useGetCategory({
    pageNo: 1,
    pageCount: 100,
  });
  const { data: subcategories, isLoading: subcategoriesLoading } = useGetSubcategoriesByCategory({
    categoryId: category?._id,
  });
  const { mutateAsync: updateProduct, isLoading: updating } = useUpdateProduct();
  const { mutateAsync: deleteProduct, isLoading: deleting } = useDeleteProduct();

  useEffect(() => {
    if (data?.data) {
      setDetails(data.data);
      // Set initial category and subcategory
      if (data.data.category) {
        setCategory(typeof data.data.category === "object" ? data.data.category : null);
      }
      if (data.data.subcategory) {
        setSubcategory(typeof data.data.subcategory === "object" ? data.data.subcategory : null);
      }
    }
  }, [data]);

  useEffect(() => {
    // Reset subcategory when category changes
    if (category && details?.category?._id !== category._id) {
      setSubcategory(null);
    }
  }, [category, details?.category?._id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedDetails = { ...details, [name]: value };

    // Auto-calculate sale rate or discount based on inputs
    if (name === "price" || name === "discount") {
      const price = parseFloat(name === "price" ? value : details.price) || 0;
      const discount = parseFloat(name === "discount" ? value : details.discount) || 0;

      if (price > 0 && discount > 0 && discount <= 100) {
        const calculatedSaleRate = price - (price * discount) / 100;
        updatedDetails.sale_rate = calculatedSaleRate.toFixed(2);
      } else if (price > 0 && discount === 0) {
        updatedDetails.sale_rate = price;
      }
    } else if (name === "sale_rate") {
      const price = parseFloat(details.price) || 0;
      const saleRate = parseFloat(value) || 0;

      if (price > 0 && saleRate > 0 && saleRate <= price) {
        const calculatedDiscount = ((price - saleRate) / price) * 100;
        updatedDetails.discount = calculatedDiscount.toFixed(2);
      } else if (saleRate === 0 || saleRate >= price) {
        updatedDetails.discount = 0;
      }
    }

    setDetails(updatedDetails);

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!details?.name || details?.name.trim() === "") {
      newErrors.name = "Product name is required";
    }

    if (!details?.subheading || details?.subheading.trim() === "") {
      newErrors.subheading = "Subheading is required";
    }

    if (!category) {
      newErrors.category = "Category is required";
    }

    if (!details?.stock || details?.stock < 0) {
      newErrors.stock = "Valid stock quantity is required";
    }

    if (!details?.price || details?.price <= 0) {
      newErrors.price = "Valid price is required";
    }

    if (!details?.sale_rate || details?.sale_rate <= 0) {
      newErrors.sale_rate = "Valid sale rate is required";
    }

    if (!details?.description || details?.description.trim() === "") {
      newErrors.description = "Product description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    try {
      const formData = new FormData();

      const image = details?.image?.filter((image) => typeof image === "string");
      formData.append("image", JSON.stringify(image));

      details?.image?.forEach((image) => {
        if (typeof image == "object") {
          formData.append("images", image, image.name);
        }
      });

      for (const key in details) {
        if (
          details.hasOwnProperty(key) &&
          key !== "image" &&
          key !== "category" &&
          key !== "subcategory"
        ) {
          formData.append(key, details[key]);
        }
      }

      // Add category and subcategory
      if (category?._id) {
        formData.append("category", category._id);
      }
      if (subcategory?._id) {
        formData.append("subcategory", subcategory._id);
      }

      updateProduct(formData)
        .then((res) => {
          if (res) {
            toast.success(res?.message ?? "Product updated successfully");
            navigate("/products");
          }
        })
        .catch((err) => {
          toast.error(err?.message ?? "Something went wrong");
        });
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteProduct(details)
      .then((res) => {
        if (res) {
          toast.success(res?.message ?? "Product deleted successfully");
          navigate("/products");
        }
      })
      .catch((err) => {
        toast.error(err?.message ?? "Something went wrong");
      })
      .finally(() => {
        setDeleteDialogOpen(false);
      });
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleCancel = () => {
    navigate("/products");
  };

  if (isLoading) {
    return (
      <PageLayout title="Edit Product">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Box textAlign="center">
            <LinearProgress sx={{ width: 200, mb: 2 }} />
            <Typography variant="body2" color="secondary">
              Loading product details...
            </Typography>
          </Box>
        </Box>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Edit Product"
      action={
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleCancel}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Back to Products
        </Button>
      }
    >
      <Box sx={{ width: "100%", maxWidth: 1400, mx: "auto", py: 3 }}>
        {/* Progress Indicator */}
        {(updating || deleting) && <LinearProgress sx={{ mb: 3, borderRadius: 2 }} />}

        {/* Form Card */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            border: "1px solid #f0f0f0",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <Grid container spacing={4}>
            {/* Header Info */}
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Box display="flex" alignItems="center">
                  <InfoIcon sx={{ color: "#1976d2", mr: 1 }} />
                  <Typography variant="body2" color="secondary">
                    Update product information below
                  </Typography>
                </Box>
                <Chip
                  label={`ID: ${id?.slice(-8)}`}
                  size="small"
                  variant="outlined"
                  sx={{ fontFamily: "monospace" }}
                />
              </Box>
            </Grid>

            {/* Left Column - Product Details */}
            <Grid item xs={12} lg={7}>
              <Grid container spacing={3}>
                {/* Product Name */}
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="caption"
                    fontWeight="600"
                    sx={{ mb: 1, display: "block", color: "#666" }}
                  >
                    Product Name *
                  </Typography>
                  <Input
                    required
                    placeholder="e.g., Organic Face Cream"
                    id="name"
                    name="name"
                    value={details?.name || ""}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                  />
                  {details?.name && !errors.name && (
                    <Box display="flex" alignItems="center" mt={0.5}>
                      <CheckCircleIcon sx={{ fontSize: 16, color: "#2e7d32", mr: 0.5 }} />
                      <Typography variant="caption" color="#2e7d32">
                        Looks good!
                      </Typography>
                    </Box>
                  )}
                </Grid>

                {/* Brand Name */}
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="caption"
                    fontWeight="600"
                    sx={{ mb: 1, display: "block", color: "#666" }}
                  >
                    Brand Name
                  </Typography>
                  <Input
                    placeholder="e.g., 40xLeaves"
                    name="brand"
                    value={details?.brand || ""}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                {/* Subheading */}
                <Grid item xs={12}>
                  <Typography
                    variant="caption"
                    fontWeight="600"
                    sx={{ mb: 1, display: "block", color: "#666" }}
                  >
                    Product Subheading *
                  </Typography>
                  <Input
                    required
                    placeholder="Short description or tagline"
                    id="subheading"
                    name="subheading"
                    value={details?.subheading || ""}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(errors.subheading)}
                    helperText={errors.subheading}
                  />
                </Grid>

                {/* Category */}
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="caption"
                    fontWeight="600"
                    sx={{ mb: 1, display: "block", color: "#666" }}
                  >
                    Category *
                  </Typography>
                  <Autocomplete
                    id="category-select"
                    options={categories?.data || []}
                    value={category}
                    onChange={(event, newValue) => {
                      setCategory(newValue);
                      if (errors.category) {
                        setErrors((prev) => ({ ...prev, category: null }));
                      }
                    }}
                    disabled={categoriesLoading}
                    autoHighlight
                    getOptionLabel={(option) => option.name || ""}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    renderOption={(props, option) => (
                      <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
                        <img
                          loading="lazy"
                          width="20"
                          src={`${process.env.REACT_APP_API_URL}/uploads/${option?.image}`}
                          alt={option?.name}
                        />
                        <Typography color="inherit" variant="caption">
                          {option?.name}
                        </Typography>
                        <Typography
                          sx={{ ml: "auto" }}
                          color={option?.isAvailable ? "success" : "error"}
                          variant="caption"
                        >
                          {option?.isAvailable ? "available" : "NA"}
                        </Typography>
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Choose a category"
                        error={Boolean(errors.category)}
                        helperText={errors.category}
                        inputProps={{
                          ...params.inputProps,
                        }}
                      />
                    )}
                  />
                </Grid>

                {/* Subcategory */}
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="caption"
                    fontWeight="600"
                    sx={{ mb: 1, display: "block", color: "#666" }}
                  >
                    Subcategory (Optional)
                  </Typography>
                  <Autocomplete
                    id="subcategory-select"
                    options={subcategories?.data || []}
                    value={subcategory}
                    onChange={(event, newValue) => {
                      setSubcategory(newValue);
                    }}
                    disabled={!category || subcategoriesLoading}
                    autoHighlight
                    getOptionLabel={(option) => option.name || ""}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    renderOption={(props, option) => (
                      <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
                        <img
                          loading="lazy"
                          width="20"
                          src={`${process.env.REACT_APP_API_URL}/uploads/${option?.image}`}
                          alt={option?.name}
                        />
                        <Typography color="inherit" variant="caption">
                          {option?.name}
                        </Typography>
                        <Typography
                          sx={{ ml: "auto" }}
                          color={option?.isAvailable ? "success" : "error"}
                          variant="caption"
                        >
                          {option?.isAvailable ? "available" : "NA"}
                        </Typography>
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder={
                          category ? "Choose a subcategory (optional)" : "Select category first"
                        }
                        inputProps={{
                          ...params.inputProps,
                        }}
                      />
                    )}
                  />
                </Grid>

                {/* Stock Quantity */}
                <Grid item xs={12} sm={6} md={3}>
                  <Typography
                    variant="caption"
                    fontWeight="600"
                    sx={{ mb: 1, display: "block", color: "#666" }}
                  >
                    Stock Quantity *
                  </Typography>
                  <Input
                    placeholder="0"
                    name="stock"
                    type="number"
                    value={details?.stock || ""}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(errors.stock)}
                    helperText={errors.stock}
                  />
                </Grid>

                {/* MRP */}
                <Grid item xs={12} sm={6} md={3}>
                  <Typography
                    variant="caption"
                    fontWeight="600"
                    sx={{ mb: 1, display: "block", color: "#666" }}
                  >
                    MRP (₹) *
                  </Typography>
                  <Input
                    placeholder="0.00"
                    name="price"
                    type="number"
                    value={details?.price || ""}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(errors.price)}
                    helperText={errors.price}
                  />
                </Grid>

                {/* Discount */}
                <Grid item xs={12} sm={6} md={3}>
                  <Typography
                    variant="caption"
                    fontWeight="600"
                    sx={{ mb: 1, display: "block", color: "#666" }}
                  >
                    Discount (%)
                  </Typography>
                  <Input
                    placeholder="0"
                    name="discount"
                    type="number"
                    value={details?.discount || ""}
                    onChange={handleChange}
                    fullWidth
                    helperText="Auto-calculates sale rate"
                  />
                  {details?.discount > 0 && (
                    <Box display="flex" alignItems="center" mt={0.5}>
                      <CheckCircleIcon sx={{ fontSize: 16, color: "#2e7d32", mr: 0.5 }} />
                      <Typography variant="caption" color="#2e7d32">
                        {details?.discount}% off
                      </Typography>
                    </Box>
                  )}
                </Grid>

                {/* Sale Rate */}
                <Grid item xs={12} sm={6} md={3}>
                  <Typography
                    variant="caption"
                    fontWeight="600"
                    sx={{ mb: 1, display: "block", color: "#666" }}
                  >
                    Sale Rate (₹) *
                  </Typography>
                  <Input
                    placeholder="0.00"
                    name="sale_rate"
                    type="number"
                    value={details?.sale_rate || ""}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(errors.sale_rate)}
                    helperText={errors.sale_rate || "Auto-calculates discount"}
                  />
                  {details?.sale_rate > 0 &&
                    details?.price > 0 &&
                    details?.sale_rate < details?.price && (
                      <Box display="flex" alignItems="center" mt={0.5}>
                        <CheckCircleIcon sx={{ fontSize: 16, color: "#2e7d32", mr: 0.5 }} />
                        <Typography variant="caption" color="#2e7d32">
                          Saving ₹{(details.price - details.sale_rate).toFixed(2)}
                        </Typography>
                      </Box>
                    )}
                </Grid>

                {/* Product Status */}
                <Grid item xs={12}>
                  <Typography
                    variant="caption"
                    fontWeight="600"
                    sx={{ mb: 1, display: "block", color: "#666" }}
                  >
                    Product Status
                  </Typography>
                  <Box sx={{ pt: 1 }}>
                    <ToggleButton
                      value={details?.isAvailable}
                      selected={details?.isAvailable}
                      onChange={() => {
                        setDetails((prev) => ({ ...prev, isAvailable: !details?.isAvailable }));
                      }}
                      sx={{
                        borderRadius: 2,
                        px: 3,
                        py: 1.5,
                        fontWeight: 600,
                        border: "2px solid",
                        borderColor: details?.isAvailable ? "#2e7d32" : "#d32f2f",
                        color: details?.isAvailable ? "#2e7d32" : "#d32f2f",
                        backgroundColor: details?.isAvailable ? "#e8f5e9" : "#ffebee",
                        "&.Mui-selected": {
                          backgroundColor: details?.isAvailable ? "#e8f5e9" : "#ffebee",
                          color: details?.isAvailable ? "#2e7d32" : "#d32f2f",
                          "&:hover": {
                            backgroundColor: details?.isAvailable ? "#c8e6c9" : "#ffcdd2",
                          },
                        },
                        "&:hover": {
                          backgroundColor: details?.isAvailable ? "#c8e6c9" : "#ffcdd2",
                        },
                      }}
                    >
                      {details?.isAvailable ? (
                        <>
                          <CheckCircleIcon sx={{ mr: 1, fontSize: 20 }} />
                          Active
                        </>
                      ) : (
                        <>
                          <ErrorIcon sx={{ mr: 1, fontSize: 20 }} />
                          Inactive
                        </>
                      )}
                    </ToggleButton>
                  </Box>
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <Typography
                    variant="caption"
                    fontWeight="600"
                    sx={{ mb: 1, display: "block", color: "#666" }}
                  >
                    Product Description *
                  </Typography>
                  <Input
                    id="description"
                    placeholder="Detailed product description..."
                    name="description"
                    value={details?.description || ""}
                    onChange={handleChange}
                    multiline
                    rows={5}
                    fullWidth
                    error={Boolean(errors.description)}
                    helperText={errors.description}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Right Column - Images */}
            <Grid item xs={12} lg={5}>
              <Typography
                variant="caption"
                fontWeight="600"
                sx={{ mb: 1, display: "block", color: "#666" }}
              >
                Product Images
              </Typography>
              <Box sx={{ height: "100%", minHeight: 400 }}>
                <ImageList data={details?.image} dispatch={setDetails} />
              </Box>
              {details?.image && details.image.length > 0 && (
                <Box display="flex" alignItems="center" mt={1}>
                  <CheckCircleIcon sx={{ fontSize: 16, color: "#2e7d32", mr: 0.5 }} />
                  <Typography variant="caption" color="#2e7d32">
                    {details.image.length} image{details.image.length > 1 ? "s" : ""}
                  </Typography>
                </Box>
              )}
            </Grid>

            {/* Guidelines Alert */}
            <Grid item xs={12}>
              <Alert
                severity="info"
                icon={<InfoIcon />}
                sx={{
                  borderRadius: 2,
                  "& .MuiAlert-message": {
                    width: "100%",
                  },
                }}
              >
                <Typography variant="caption" fontWeight="600" sx={{ mb: 1, display: "block" }}>
                  Product Guidelines:
                </Typography>
                <Box component="ul" sx={{ margin: 0, paddingLeft: 2.5 }}>
                  <li>
                    <Typography variant="caption">
                      Use high-quality, clear images that showcase the product
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="caption">
                      Sale rate should be less than or equal to MRP
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="caption">
                      Discount percentage is automatically calculated based on MRP and sale rate
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="caption">
                      Provide accurate stock quantity to avoid order issues
                    </Typography>
                  </li>
                </Box>
              </Alert>
            </Grid>

            {/* Action Buttons */}
            <Grid item xs={12}>
              <Box display="flex" gap={2} justifyContent="space-between" mt={2}>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={handleDeleteClick}
                  disabled={updating || deleting}
                  sx={{
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: 600,
                    borderWidth: 2,
                    "&:hover": {
                      borderWidth: 2,
                    },
                  }}
                >
                  Delete
                </Button>
                <Box display="flex" gap={2}>
                  <Button
                    variant="outlined"
                    onClick={handleCancel}
                    disabled={updating || deleting}
                    sx={{
                      borderRadius: 2,
                      px: 4,
                      py: 1.5,
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSubmit}
                    disabled={updating || deleting}
                    sx={{
                      borderRadius: 2,
                      px: 4,
                      py: 1.5,
                      textTransform: "none",
                      fontWeight: 600,
                      boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
                      "&:hover": {
                        boxShadow: "0 6px 16px rgba(25, 118, 210, 0.4)",
                      },
                    }}
                  >
                    {updating ? "Updating..." : "Update Product"}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        PaperProps={{
          sx: {
            borderRadius: 3,
            minWidth: 400,
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box display="flex" alignItems="center">
            <WarningIcon sx={{ color: "#ed6c02", mr: 1, fontSize: 28 }} />
            <Typography variant="h6" fontWeight="600">
              Delete Product?
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the product <strong>&quot;{details?.name}&quot;</strong>
            ? This action cannot be undone and will permanently remove this product from your
            inventory.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 1 }}>
          <Button
            onClick={handleDeleteCancel}
            disabled={deleting}
            sx={{
              borderRadius: 2,
              px: 3,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={deleting}
            autoFocus
            sx={{
              borderRadius: 2,
              px: 3,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            {deleting ? "Deleting..." : "Delete Product"}
          </Button>
        </DialogActions>
      </Dialog>
    </PageLayout>
  );
};

export default EditProduct;

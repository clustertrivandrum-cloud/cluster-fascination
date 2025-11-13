import {
  Alert,
  Box,
  Button,
  Grid,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
  LinearProgress,
  Chip,
} from "@mui/material";
import React, { useState } from "react";
import PageLayout from "layouts/PageLayout";
import { useAddSubcategory, useGetCategory } from "queries/ProductQuery";
import toast from "react-hot-toast";
import Input from "components/Input";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

const AddSubcategory = () => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const fileInputRef = React.useRef(null);

  const { data: categories, isLoading: categoriesLoading } = useGetCategory({
    pageNo: 1,
    pageCount: 100,
  });

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Check file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: "Image size must be less than 2MB" }));
        toast.error("Image size must be less than 2MB");
        return;
      }

      // Check file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        setErrors((prev) => ({ ...prev, image: "Only JPG, JPEG, and PNG files are allowed" }));
        toast.error("Only JPG, JPEG, and PNG files are allowed");
        return;
      }

      setErrors((prev) => ({ ...prev, image: null }));
      setData((prev) => ({ ...prev, image: file }));
      toast.success("Image uploaded successfully");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleCategoryChange = (e) => {
    setData((prev) => ({ ...prev, category: e.target.value }));
    if (errors.category) {
      setErrors((prev) => ({ ...prev, category: null }));
    }
  };

  const { mutateAsync: addSubcategory, isLoading } = useAddSubcategory();

  const validateForm = () => {
    const newErrors = {};

    if (!data?.name || data?.name.trim() === "") {
      newErrors.name = "Subcategory name is required";
    }

    if (!data?.desc || data?.desc.trim() === "") {
      newErrors.desc = "Description is required";
    } else if (data?.desc.split(" ").length < 5) {
      newErrors.desc = "Description should be at least 5 words";
    }

    if (!data?.category) {
      newErrors.category = "Parent category is required";
    }

    if (!data?.image) {
      newErrors.image = "Subcategory image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    try {
      if (!validateForm()) {
        toast.error("Please fill all required fields correctly");
        return;
      }

      const formData = new FormData();
      for (const key in data) {
        if (data.hasOwnProperty(key) && key !== "image") {
          formData.append(key, data[key]);
        }
      }
      typeof data.image == "object" && formData.append("image", data.image, data?.image?.name);

      addSubcategory(formData)
        .then((res) => {
          toast.success(res?.message ?? "Subcategory added successfully");
          navigate("/subcategory");
        })
        .catch((err) => {
          toast.error(err?.message ?? "Something went wrong");
        });
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  const handleCancel = () => {
    navigate("/subcategory");
  };

  return (
    <PageLayout title={"Add New Subcategory"}>
      <Box sx={{ flexGrow: 1 }} display={"flex"} justifyContent={"center"}>
        <Box sx={{ width: "100%", maxWidth: 800, py: 4 }}>
          {/* Progress Indicator */}
          {isLoading && <LinearProgress sx={{ mb: 3, borderRadius: 2 }} />}

          {/* Warning if no categories */}
          {!categoriesLoading && (!categories?.data || categories.data.length === 0) && (
            <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>
              <Typography variant="body2" fontWeight="600" sx={{ mb: 0.5 }}>
                No Categories Available
              </Typography>
              <Typography variant="caption">
                You need to create at least one category before adding subcategories.
              </Typography>
            </Alert>
          )}

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
            <Grid container spacing={3}>
              {/* Header Info */}
              <Grid item xs={12}>
                <Box display="flex" alignItems="center" mb={2}>
                  <InfoIcon sx={{ color: "#1976d2", mr: 1 }} />
                  <Typography variant="body2" color="secondary">
                    Fill in the details below to create a new subcategory
                  </Typography>
                </Box>
              </Grid>

              {/* Subcategory Name */}
              <Grid item xs={12} md={6}>
                <Typography
                  variant="caption"
                  fontWeight="600"
                  sx={{ mb: 1, display: "block", color: "#666" }}
                >
                  Subcategory Name *
                </Typography>
                <Input
                  required
                  placeholder="e.g., Face Creams"
                  id="name"
                  name="name"
                  value={data?.name || ""}
                  onChange={handleChange}
                  fullWidth
                  autoComplete="name"
                  variant="outlined"
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
                {data?.name && !errors.name && (
                  <Box display="flex" alignItems="center" mt={0.5}>
                    <CheckCircleIcon sx={{ fontSize: 16, color: "#2e7d32", mr: 0.5 }} />
                    <Typography variant="caption" color="#2e7d32">
                      Looks good!
                    </Typography>
                  </Box>
                )}
              </Grid>

              {/* Parent Category */}
              <Grid item xs={12} md={6}>
                <Typography
                  variant="caption"
                  fontWeight="600"
                  sx={{ mb: 1, display: "block", color: "#666" }}
                >
                  Parent Category *
                </Typography>
                <FormControl
                  fullWidth
                  variant="outlined"
                  required
                  error={Boolean(errors.category)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                >
                  <Select
                    value={data?.category || ""}
                    onChange={handleCategoryChange}
                    displayEmpty
                    disabled={
                      categoriesLoading || !categories?.data || categories.data.length === 0
                    }
                  >
                    <MenuItem value="" disabled>
                      {categoriesLoading ? "Loading categories..." : "Select a category"}
                    </MenuItem>
                    {!categoriesLoading &&
                      categories?.data &&
                      Array.isArray(categories.data) &&
                      categories.data.map((category) => (
                        <MenuItem key={category._id} value={category._id}>
                          {category.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                {errors.category && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, display: "block" }}>
                    {errors.category}
                  </Typography>
                )}
                {!categoriesLoading && categories?.data && categories.data.length > 0 && (
                  <Box display="flex" alignItems="center" mt={0.5}>
                    <CheckCircleIcon sx={{ fontSize: 16, color: "#2e7d32", mr: 0.5 }} />
                    <Typography variant="caption" color="#2e7d32">
                      {categories.data.length}{" "}
                      {categories.data.length === 1 ? "category" : "categories"} available
                    </Typography>
                  </Box>
                )}
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <Typography
                  variant="caption"
                  fontWeight="600"
                  sx={{ mb: 1, display: "block", color: "#666" }}
                >
                  Subcategory Description *
                </Typography>
                <Input
                  id="description"
                  name="desc"
                  placeholder="Write a short description (10-20 words)"
                  value={data?.desc || ""}
                  onChange={handleChange}
                  fullWidth
                  autoComplete="Description"
                  multiline
                  rows={4}
                  error={Boolean(errors.desc)}
                  helperText={
                    errors.desc || `${data?.desc ? data.desc.split(" ").length : 0} words`
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
                {data?.desc && !errors.desc && (
                  <Box display="flex" alignItems="center" mt={0.5}>
                    <CheckCircleIcon sx={{ fontSize: 16, color: "#2e7d32", mr: 0.5 }} />
                    <Typography variant="caption" color="#2e7d32">
                      Perfect length!
                    </Typography>
                  </Box>
                )}
              </Grid>

              {/* Status Chip */}
              <Grid item xs={12}>
                <Typography
                  variant="caption"
                  fontWeight="600"
                  sx={{ mb: 1, display: "block", color: "#666" }}
                >
                  Default Status
                </Typography>
                <Box sx={{ pt: 1 }}>
                  <Chip
                    label="Available by default"
                    color="success"
                    icon={<CheckCircleIcon />}
                    sx={{ fontWeight: 600 }}
                  />
                </Box>
              </Grid>

              {/* Image Upload */}
              <Grid item xs={12}>
                <Typography
                  variant="caption"
                  fontWeight="600"
                  sx={{ mb: 1, display: "block", color: "#666" }}
                >
                  Subcategory Image *
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: 400,
                    height: 220,
                    cursor: "pointer",
                    backgroundColor: data?.image ? "#fafafa" : "#f5f5f5",
                    border: errors.image ? "2px dashed #d32f2f" : "2px dashed #e0e0e0",
                    borderRadius: 3,
                    "&:hover": {
                      backgroundColor: "#eeeeee",
                      borderColor: data?.image ? "#1976d2" : "#bdbdbd",
                    },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    transition: "all 0.3s ease",
                    overflow: "hidden",
                    position: "relative",
                  }}
                  onClick={handleFileSelect}
                >
                  {data?.image ? (
                    <>
                      <img
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        src={
                          typeof data?.image == "object"
                            ? URL.createObjectURL(data.image)
                            : `${process.env.REACT_APP_BASE_URL}/${data.image}`
                        }
                        alt="Subcategory preview"
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          bgcolor: "rgba(0,0,0,0.7)",
                          color: "white",
                          p: 1.5,
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="caption" fontWeight="600">
                          Click to change image
                        </Typography>
                      </Box>
                    </>
                  ) : (
                    <React.Fragment>
                      <CloudUploadIcon sx={{ fontSize: 48, color: "#bdbdbd", mb: 2 }} />
                      <Typography variant="body2" fontWeight="600" sx={{ mb: 0.5 }}>
                        Upload Subcategory Image
                      </Typography>
                      <Typography variant="caption" color="secondary">
                        Click to browse or drag and drop
                      </Typography>
                    </React.Fragment>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </Box>

                {errors.image && (
                  <Box display="flex" alignItems="center" mt={1}>
                    <ErrorIcon sx={{ fontSize: 16, color: "#d32f2f", mr: 0.5 }} />
                    <Typography variant="caption" color="error">
                      {errors.image}
                    </Typography>
                  </Box>
                )}

                {data?.image && !errors.image && (
                  <Box display="flex" alignItems="center" mt={1}>
                    <CheckCircleIcon sx={{ fontSize: 16, color: "#2e7d32", mr: 0.5 }} />
                    <Typography variant="caption" color="#2e7d32">
                      Image uploaded: {data?.image?.name}
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
                    Image Guidelines:
                  </Typography>
                  <Box component="ul" sx={{ margin: 0, paddingLeft: 2.5 }}>
                    <li>
                      <Typography variant="caption">
                        Recommended: 1280 x 720 pixels (16:9 ratio)
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="caption">Maximum file size: 2MB</Typography>
                    </li>
                    <li>
                      <Typography variant="caption">Accepted formats: JPG, PNG, JPEG</Typography>
                    </li>
                    <li>
                      <Typography variant="caption">
                        Use high-quality, clear images for best results
                      </Typography>
                    </li>
                  </Box>
                </Alert>
              </Grid>

              {/* Action Buttons */}
              <Grid item xs={12}>
                <Box display="flex" gap={2} justifyContent="flex-end" mt={2}>
                  <Button
                    variant="outlined"
                    onClick={handleCancel}
                    disabled={isLoading}
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
                    onClick={handleSubmit}
                    disabled={isLoading || !categories?.data || categories.data.length === 0}
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
                    {isLoading ? "Adding Subcategory..." : "Add Subcategory"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </PageLayout>
  );
};

export default AddSubcategory;

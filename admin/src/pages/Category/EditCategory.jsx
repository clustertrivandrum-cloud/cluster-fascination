import {
  Alert,
  Box,
  Button,
  Grid,
  ToggleButton,
  Typography,
  Paper,
  LinearProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PageLayout from "layouts/PageLayout";
import toast from "react-hot-toast";
import Input from "components/Input";
import { useNavigate, useParams } from "react-router-dom";
import { useEditCategorys, useGetCategorysById, useDeleteCategorys } from "queries/ProductQuery";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WarningIcon from "@mui/icons-material/Warning";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: res, isLoading } = useGetCategorysById({ id });
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    setData(res?.data);
  }, [res]);

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

  const { mutateAsync: editCategory, isLoading: updating } = useEditCategorys();
  const { mutateAsync: deleteCategory, isLoading: deleting } = useDeleteCategorys();

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteCategory(data)
      .then((res) => {
        if (res) {
          toast.success(res?.message ?? "Category deleted successfully");
          navigate("/category");
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

  const validateForm = () => {
    const newErrors = {};

    if (!data?.name || data?.name.trim() === "") {
      newErrors.name = "Category name is required";
    }

    if (!data?.desc || data?.desc.trim() === "") {
      newErrors.desc = "Description is required";
    } else if (data?.desc.split(" ").length < 5) {
      newErrors.desc = "Description should be at least 5 words";
    }

    if (!data?.image) {
      newErrors.image = "Category image is required";
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

      editCategory(formData)
        .then((res) => {
          if (res) {
            toast.success(res?.message ?? "Category updated successfully");
            navigate("/category");
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

  const handleCancel = () => {
    navigate("/category");
  };

  if (isLoading) {
    return (
      <PageLayout title="Edit Category">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Box textAlign="center">
            <LinearProgress sx={{ width: 200, mb: 2 }} />
            <Typography variant="body2" color="secondary">
              Loading category details...
            </Typography>
          </Box>
        </Box>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Edit Category"
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
          Back to Categories
        </Button>
      }
    >
      <Box sx={{ flexGrow: 1 }} display={"flex"} justifyContent={"center"}>
        <Box sx={{ width: "100%", maxWidth: 800, py: 4 }}>
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
            <Grid container spacing={3}>
              {/* Header Info */}
              <Grid item xs={12}>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                  <Box display="flex" alignItems="center">
                    <InfoIcon sx={{ color: "#1976d2", mr: 1 }} />
                    <Typography variant="body2" color="secondary">
                      Update category information below
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

              {/* Category Name */}
              <Grid item xs={12} md={6}>
                <Typography
                  variant="caption"
                  fontWeight="600"
                  sx={{ mb: 1, display: "block", color: "#666" }}
                >
                  Category Name *
                </Typography>
                <Input
                  required
                  placeholder="Category Name"
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

              {/* Category Status Toggle */}
              <Grid item xs={12} md={6}>
                <Typography
                  variant="caption"
                  fontWeight="600"
                  sx={{ mb: 1, display: "block", color: "#666" }}
                >
                  Category Status
                </Typography>
                <Box sx={{ pt: 1 }}>
                  <ToggleButton
                    value={data?.isAvailable}
                    selected={data?.isAvailable}
                    onChange={() => {
                      setData((prev) => ({ ...prev, isAvailable: !data?.isAvailable }));
                    }}
                    sx={{
                      borderRadius: 2,
                      px: 3,
                      py: 1.5,
                      fontWeight: 600,
                      border: "2px solid",
                      borderColor: data?.isAvailable ? "#2e7d32" : "#d32f2f",
                      color: data?.isAvailable ? "#2e7d32" : "#d32f2f",
                      backgroundColor: data?.isAvailable ? "#e8f5e9" : "#ffebee",
                      "&.Mui-selected": {
                        backgroundColor: data?.isAvailable ? "#e8f5e9" : "#ffebee",
                        color: data?.isAvailable ? "#2e7d32" : "#d32f2f",
                        "&:hover": {
                          backgroundColor: data?.isAvailable ? "#c8e6c9" : "#ffcdd2",
                        },
                      },
                      "&:hover": {
                        backgroundColor: data?.isAvailable ? "#c8e6c9" : "#ffcdd2",
                      },
                    }}
                  >
                    {data?.isAvailable ? (
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
                  Category Description *
                </Typography>
                <Input
                  id="description"
                  name="desc"
                  placeholder="Category Description"
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

              {/* Image Upload */}
              <Grid item xs={12}>
                <Typography
                  variant="caption"
                  fontWeight="600"
                  sx={{ mb: 1, display: "block", color: "#666" }}
                >
                  Category Image *
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
                            : `${process.env.REACT_APP_API_URL}/uploads/${data.image}`
                        }
                        alt="Category preview"
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
                        Upload Category Image
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

                {data?.image && !errors.image && typeof data?.image === "object" && (
                  <Box display="flex" alignItems="center" mt={1}>
                    <CheckCircleIcon sx={{ fontSize: 16, color: "#2e7d32", mr: 0.5 }} />
                    <Typography variant="caption" color="#2e7d32">
                      New image selected: {data?.image?.name}
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
                      {updating ? "Updating..." : "Update Category"}
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
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
              Delete Category?
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the category <strong>&quot;{data?.name}&quot;</strong>?
            This action cannot be undone and may affect products associated with this category.
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
            {deleting ? "Deleting..." : "Delete Category"}
          </Button>
        </DialogActions>
      </Dialog>
    </PageLayout>
  );
};

export default EditCategory;

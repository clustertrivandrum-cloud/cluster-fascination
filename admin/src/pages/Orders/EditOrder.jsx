import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Grid,
  Typography,
  Paper,
  Box,
  Chip,
  Divider,
  Card,
  IconButton,
} from "@mui/material";
import PageLayout from "layouts/PageLayout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DownloadIcon from "@mui/icons-material/Download";

const EditOrder = () => {
  const { state } = useLocation();
  const { item } = state || {};
  const navigate = useNavigate();
  const [details, setDetails] = useState(item);

  useEffect(() => {
    setDetails(item);
  }, [item]);

  const handleBack = () => {
    navigate("/orders");
  };

  const downloadImages = (images) => {
    if (!images || images.length === 0) return;
    images.forEach((image) => {
      const link = document.createElement("a");
      link.href = `${process.env.REACT_APP_API_URL}/uploads/${image}`;
      link.setAttribute("download", image);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: "warning",
      Placed: "info",
      Shipped: "primary",
      Out_of_delivery: "secondary",
      Delivered: "success",
      Delayed: "error",
      Canceled: "error",
    };
    return colors[status] || "default";
  };

  if (!details) {
    return (
      <PageLayout title="Order Details">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Typography fontSize={14} color="secondary">
            Loading order details...
          </Typography>
        </Box>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Order Details"
      action={
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Back to Orders
        </Button>
      }
    >
      <Box sx={{ width: "100%", maxWidth: 1400, mx: "auto", py: 3 }}>
        {/* Order Header */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            border: "1px solid #f0f0f0",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <ShoppingBagIcon sx={{ fontSize: 32, color: "#1976d2" }} />
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    Order #{details?._id?.slice(-8).toUpperCase()}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                    <CalendarTodayIcon sx={{ fontSize: 14, color: "#666" }} />
                    <Typography variant="caption" color="secondary">
                      Placed on{" "}
                      {new Date(details?.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                display="flex"
                flexDirection="column"
                gap={1}
                alignItems={{ xs: "flex-start", md: "flex-end" }}
              >
                <Chip
                  label={details?.status?.replace("_", " ")}
                  color={getStatusColor(details?.status)}
                  sx={{ fontWeight: 600, fontSize: "0.875rem" }}
                />
                <Chip
                  label={details?.payment_mode || "N/A"}
                  variant="outlined"
                  color={details?.payment_mode === "COD" ? "warning" : "success"}
                  icon={<PaymentIcon />}
                  sx={{ fontWeight: 600 }}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={3}>
          {/* Left Column - Products */}
          <Grid item xs={12} lg={8}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid #f0f0f0",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <Box display="flex" alignItems="center" gap={1} mb={3}>
                <ShoppingBagIcon sx={{ color: "#1976d2" }} />
                <Typography variant="h6" fontWeight="bold">
                  Order Items ({details?.products?.item?.length || 0})
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {details?.products?.item?.map((product, index) => (
                  <Card
                    key={product?.product_id?._id || index}
                    elevation={0}
                    sx={{
                      border: "1px solid #e0e0e0",
                      borderRadius: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <Box sx={{ p: 2 }}>
                      <Grid container spacing={2}>
                        {/* Product Image */}
                        <Grid item xs={12} sm={3}>
                          <Box
                            sx={{
                              width: "100%",
                              height: 120,
                              borderRadius: 2,
                              overflow: "hidden",
                              border: "1px solid #e0e0e0",
                            }}
                          >
                            <img
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                              src={`${process.env.REACT_APP_API_URL}/uploads/${product?.product_id?.image?.[0]}`}
                              alt={product?.product_id?.name}
                            />
                          </Box>
                        </Grid>

                        {/* Product Details */}
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body1" fontWeight="600" sx={{ mb: 0.5 }}>
                            {product?.product_id?.name}
                          </Typography>
                          {product?.product_id?.brand && (
                            <Typography
                              variant="caption"
                              color="secondary"
                              display="block"
                              sx={{ mb: 1 }}
                            >
                              Brand: {product?.product_id?.brand}
                            </Typography>
                          )}
                          <Box display="flex" flexDirection="column" gap={0.5} mt={1}>
                            <Typography variant="body2" color="text">
                              <strong>Price:</strong> ₹{product?.price}
                            </Typography>
                            <Typography variant="body2" color="text">
                              <strong>Quantity:</strong> {product?.qty}
                            </Typography>
                            <Typography variant="body2" color="primary" fontWeight="600">
                              <strong>Subtotal:</strong> ₹
                              {(product?.price * product?.qty).toFixed(2)}
                            </Typography>
                          </Box>
                        </Grid>

                        {/* Product Images Gallery */}
                        <Grid item xs={12} sm={3}>
                          <Typography
                            variant="caption"
                            color="secondary"
                            fontWeight="600"
                            display="block"
                            sx={{ mb: 1 }}
                          >
                            Images ({product?.product_id?.image?.length || 0})
                          </Typography>
                          <Box display="flex" flexWrap="wrap" gap={1}>
                            {product?.product_id?.image?.slice(0, 4).map((image, idx) => (
                              <Avatar
                                key={idx}
                                component="a"
                                target="_blank"
                                href={`${process.env.REACT_APP_API_URL}/uploads/${image}`}
                                variant="rounded"
                                src={`${process.env.REACT_APP_API_URL}/uploads/${image}`}
                                sx={{
                                  width: 40,
                                  height: 40,
                                  cursor: "pointer",
                                  border: "2px solid #e0e0e0",
                                  transition: "all 0.2s ease",
                                  "&:hover": {
                                    transform: "scale(1.1)",
                                    borderColor: "#1976d2",
                                  },
                                }}
                              />
                            ))}
                          </Box>
                          {product?.product_id?.image?.length > 0 && (
                            <Button
                              size="small"
                              startIcon={<DownloadIcon />}
                              onClick={() => downloadImages(product?.product_id?.image)}
                              sx={{
                                mt: 1,
                                fontSize: "0.7rem",
                                textTransform: "none",
                              }}
                            >
                              Download All
                            </Button>
                          )}
                        </Grid>
                      </Grid>
                    </Box>
                  </Card>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Right Column - Order Summary & Shipping */}
          <Grid item xs={12} lg={4}>
            {/* Customer Information */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 3,
                border: "1px solid #f0f0f0",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <PersonIcon sx={{ color: "#1976d2" }} />
                <Typography variant="h6" fontWeight="bold">
                  Customer Details
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box>
                <Typography variant="body2" fontWeight="600" sx={{ mb: 0.5 }}>
                  {details?.userId?.username || "N/A"}
                </Typography>
                <Typography variant="caption" color="secondary" display="block">
                  {details?.userId?.email || "No email"}
                </Typography>
              </Box>
            </Paper>

            {/* Shipping Address */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 3,
                border: "1px solid #f0f0f0",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <LocationOnIcon sx={{ color: "#1976d2" }} />
                <Typography variant="h6" fontWeight="bold">
                  Shipping Address
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box>
                <Typography variant="body2" fontWeight="600" sx={{ mb: 0.5 }}>
                  {details?.address?.firstname?.toUpperCase()}{" "}
                  {details?.address?.lastname?.toUpperCase()}
                </Typography>
                <Typography variant="body2" color="secondary" sx={{ lineHeight: 1.7 }}>
                  {details?.address?.address_line_1}
                  {details?.address?.address_line_2 && <>, {details?.address?.address_line_2}</>}
                  <br />
                  {details?.address?.city}, {details?.address?.state}
                  <br />
                  {details?.address?.country} - {details?.address?.zip}
                </Typography>
                <Divider sx={{ my: 1.5 }} />
                <Typography variant="body2" color="text">
                  <strong>Phone:</strong> {details?.address?.mobile}
                </Typography>
                {details?.userId?.email && (
                  <Typography variant="body2" color="text">
                    <strong>Email:</strong> {details?.userId?.email}
                  </Typography>
                )}
              </Box>
            </Paper>

            {/* Order Summary */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid #f0f0f0",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <PaymentIcon sx={{ color: "#1976d2" }} />
                <Typography variant="h6" fontWeight="bold">
                  Payment Summary
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="secondary">
                    Subtotal
                  </Typography>
                  <Typography variant="body2" fontWeight="600">
                    ₹{details?.amount}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="secondary">
                    Shipping
                  </Typography>
                  <Chip
                    label="FREE"
                    size="small"
                    color="success"
                    sx={{ height: 20, fontSize: "0.7rem" }}
                  />
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="secondary">
                    Tax
                  </Typography>
                  <Typography variant="body2">N/A</Typography>
                </Box>
                <Divider />
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1" fontWeight="bold">
                    Total
                  </Typography>
                  <Typography variant="body1" fontWeight="bold" color="primary">
                    ₹{details?.amount}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </PageLayout>
  );
};

export default EditOrder;

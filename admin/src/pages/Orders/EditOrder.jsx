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
  Stack,
  LinearProgress,
  Tooltip,
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
import ReceiptIcon from "@mui/icons-material/Receipt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DiscountIcon from "@mui/icons-material/Discount";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";

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

  const getStatusProgress = (status) => {
    const progress = {
      Pending: 10,
      Placed: 25,
      Shipped: 50,
      Out_of_delivery: 75,
      Delivered: 100,
      Delayed: 50,
      Canceled: 0,
    };
    return progress[status] || 0;
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    const receiptContent = generateReceiptHTML();
    printWindow.document.write(receiptContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  const generateReceiptHTML = () => {
    const orderDate = new Date(details?.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Order Receipt - ${details?._id?.slice(-8).toUpperCase()}</title>
          <style>
            @media print {
              @page {
                size: A5;
                margin: 10mm;
              }
            }
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: Arial, sans-serif;
              font-size: 11px;
              line-height: 1.4;
              color: #000;
              padding: 15px;
              max-width: 148mm;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #000;
              padding-bottom: 10px;
              margin-bottom: 15px;
            }
            .header h1 {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 5px;
            }
            .header p {
              font-size: 10px;
              color: #666;
            }
            .section {
              margin-bottom: 12px;
              padding-bottom: 10px;
              border-bottom: 1px dashed #ccc;
            }
            .section:last-child {
              border-bottom: none;
            }
            .section-title {
              font-weight: bold;
              font-size: 12px;
              margin-bottom: 6px;
              text-transform: uppercase;
            }
            .row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 4px;
            }
            .label {
              font-weight: 600;
            }
            .value {
              text-align: right;
            }
            .items {
              margin-top: 8px;
            }
            .item {
              margin-bottom: 8px;
              padding-bottom: 8px;
              border-bottom: 1px dotted #ddd;
            }
            .item:last-child {
              border-bottom: none;
            }
            .item-name {
              font-weight: 600;
              margin-bottom: 3px;
            }
            .item-details {
              font-size: 10px;
              color: #666;
              display: flex;
              justify-content: space-between;
            }
            .total-section {
              margin-top: 12px;
              padding-top: 10px;
              border-top: 2px solid #000;
            }
            .total-row {
              display: flex;
              justify-content: space-between;
              font-weight: bold;
              font-size: 13px;
              margin-top: 5px;
            }
            .footer {
              text-align: center;
              margin-top: 15px;
              padding-top: 10px;
              border-top: 1px dashed #ccc;
              font-size: 9px;
              color: #666;
            }
            .address-box {
              background: #f5f5f5;
              padding: 8px;
              border-radius: 4px;
              margin-top: 5px;
              font-size: 10px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>ORDER RECEIPT</h1>
            <p>Order #${details?._id?.slice(-8).toUpperCase()}</p>
            <p>Date: ${orderDate}</p>
          </div>

          <div class="section">
            <div class="section-title">Customer Details</div>
            <div class="row">
              <span class="label">Name:</span>
              <span class="value">${details?.userId?.username || "N/A"}</span>
            </div>
            <div class="row">
              <span class="label">Email:</span>
              <span class="value">${details?.userId?.email || "N/A"}</span>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Shipping Address</div>
            <div class="address-box">
              <strong>${details?.address?.firstname?.toUpperCase() || ""} ${details?.address?.lastname?.toUpperCase() || ""}</strong><br>
              ${details?.address?.address_line_1 || ""}${details?.address?.address_line_2 ? `, ${details.address.address_line_2}` : ""}<br>
              ${details?.address?.city || ""}, ${details?.address?.state || ""}<br>
              ${details?.address?.country || ""} - ${details?.address?.zip || ""}<br>
              <strong>Phone:</strong> ${details?.address?.mobile || "N/A"}
            </div>
          </div>

          <div class="section">
            <div class="section-title">Order Items</div>
            <div class="items">
              ${details?.products?.item
                ?.map(
                  (item) => `
                <div class="item">
                  <div class="item-name">${item?.product_id?.name || "Product"}</div>
                  <div class="item-details">
                    <span>Qty: ${item?.qty || 0} × ₹${item?.price?.toFixed(2) || "0.00"}</span>
                    <span><strong>₹${((item?.price || 0) * (item?.qty || 0)).toFixed(2)}</strong></span>
                  </div>
                </div>
              `
                )
                .join("") || "No items"}
            </div>
          </div>

          <div class="total-section">
            <div class="row">
              <span>Subtotal:</span>
              <span>₹${details?.subtotal?.toFixed(2) || details?.products?.totalPrice?.toFixed(2) || "0.00"}</span>
            </div>
            <div class="row">
              <span>Shipping:</span>
              <span>${details?.delivery_fee === 0 || !details?.delivery_fee ? "FREE" : `₹${details.delivery_fee.toFixed(2)}`}</span>
            </div>
            ${details?.tax_amount > 0 ? `<div class="row"><span>Tax:</span><span>₹${details.tax_amount.toFixed(2)}</span></div>` : ""}
            ${details?.discount_amount > 0 ? `<div class="row"><span>Discount:</span><span>-₹${details.discount_amount.toFixed(2)}</span></div>` : ""}
            <div class="total-row">
              <span>TOTAL:</span>
              <span>₹${details?.amount?.toFixed(2) || "0.00"}</span>
            </div>
            <div class="row" style="margin-top: 8px;">
              <span>Payment Mode:</span>
              <span><strong>${details?.payment_mode?.toUpperCase() || "N/A"}</strong></span>
            </div>
          </div>

          ${details?.tracking_number ? `
          <div class="section">
            <div class="section-title">Tracking Information</div>
            <div class="row">
              <span class="label">Tracking #:</span>
              <span class="value"><strong>${details.tracking_number}</strong></span>
            </div>
          </div>
          ` : ""}

          <div class="footer">
            <p>Thank you for your order!</p>
            <p>For any queries, please contact customer support.</p>
          </div>
        </body>
      </html>
    `;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Order #${details?._id?.slice(-8).toUpperCase()}`,
        text: `Order details for ${details?.userId?.username}`,
      });
    }
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

  const totalItems = details?.products?.item?.reduce((sum, item) => sum + (item?.qty || 0), 0) || 0;

  return (
    <PageLayout
      title="Order Details"
      action={
        <Stack direction="row" spacing={1}>
          <Tooltip title="Share Order">
            <IconButton onClick={handleShare} sx={{ border: "1px solid #e0e0e0" }}>
              <ShareIcon />
            </IconButton>
          </Tooltip>
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
        </Stack>
      }
    >
      <Box sx={{ width: "100%", maxWidth: 1600, mx: "auto", py: 3 }}>
        {/* Professional Order Header */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 3,
            borderRadius: 3,
            backgroundColor: "#ffffff",
            border: "1px solid #e0e0e0",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 2,
                    backgroundColor: "#e3f2fd",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ShoppingBagIcon sx={{ fontSize: 32, color: "#1976d2" }} />
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5, color: "#1976d2" }}>
                    Order #{details?._id?.slice(-8).toUpperCase()}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <CalendarTodayIcon sx={{ fontSize: 16, color: "#666" }} />
                      <Typography variant="body2" color="text.secondary">
                        {new Date(details?.createdAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <InventoryIcon sx={{ fontSize: 16, color: "#666" }} />
                      <Typography variant="body2" color="text.secondary">
                        {totalItems} {totalItems === 1 ? "item" : "items"}
                      </Typography>
                    </Box>
                    {details?.invoice_number && (
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <ReceiptIcon sx={{ fontSize: 16, color: "#666" }} />
                        <Typography variant="body2" color="text.secondary">
                          Invoice: {details.invoice_number}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                display="flex"
                flexDirection="column"
                gap={1.5}
                alignItems={{ xs: "flex-start", md: "flex-end" }}
              >
                <Chip
                  label={details?.status?.replace("_", " ")}
                  color={getStatusColor(details?.status)}
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    height: 32,
                  }}
                />
                <Chip
                  label={details?.payment_mode || "N/A"}
                  variant="outlined"
                  color={details?.payment_mode === "COD" ? "warning" : "success"}
                  sx={{
                    fontWeight: 600,
                  }}
                  icon={<PaymentIcon />}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Order Status Progress */}
          <Box sx={{ mt: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                Order Progress
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {getStatusProgress(details?.status)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={getStatusProgress(details?.status)}
              color={getStatusColor(details?.status)}
              sx={{
                height: 8,
                borderRadius: 4,
              }}
            />
          </Box>
          
          {/* Print Receipt Button */}
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              startIcon={<PrintIcon />}
              onClick={handlePrint}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 2,
              }}
            >
              Print Receipt for Parcel
            </Button>
          </Box>
        </Paper>

        <Grid container spacing={3}>
          {/* Left Column - Products */}
          <Grid item xs={12} lg={8}>
            {/* Products Section */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid #f0f0f0",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                mb: 3,
              }}
            >
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                <Box display="flex" alignItems="center" gap={1}>
                  <ShoppingBagIcon sx={{ color: "#1976d2", fontSize: 28 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Order Items
                  </Typography>
                  <Chip
                    label={details?.products?.item?.length || 0}
                    size="small"
                    color="primary"
                    sx={{ fontWeight: 600 }}
                  />
                </Box>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                {details?.products?.item?.map((product, index) => (
                  <Card
                    key={product?.product_id?._id || index}
                    elevation={0}
                    sx={{
                      border: "1px solid #e0e0e0",
                      borderRadius: 3,
                      transition: "all 0.3s ease",
                      overflow: "hidden",
                      "&:hover": {
                        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                        transform: "translateY(-4px)",
                        borderColor: "#1976d2",
                      },
                    }}
                  >
                    <Box sx={{ p: 2.5 }}>
                      <Grid container spacing={3} alignItems="center">
                        {/* Product Image */}
                        <Grid item xs={12} sm={3}>
                          <Box
                            sx={{
                              width: "100%",
                              aspectRatio: "1",
                              borderRadius: 2,
                              overflow: "hidden",
                              border: "2px solid #f0f0f0",
                              backgroundColor: "#fafafa",
                              position: "relative",
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
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                            {product?.product_id?.image?.length > 1 && (
                              <Chip
                                label={`+${product.product_id.image.length - 1}`}
                                size="small"
                                sx={{
                                  position: "absolute",
                                  bottom: 8,
                                  right: 8,
                                  backgroundColor: "rgba(0,0,0,0.7)",
                                  color: "white",
                                  fontWeight: 600,
                                }}
                              />
                            )}
                          </Box>
                        </Grid>

                        {/* Product Details */}
                        <Grid item xs={12} sm={6}>
                          <Typography
                            variant="h6"
                            fontWeight="600"
                            sx={{ mb: 0.5, fontSize: "1.1rem" }}
                          >
                            {product?.product_id?.name}
                          </Typography>
                          {product?.product_id?.brand && (
                            <Chip
                              label={product.product_id.brand}
                              size="small"
                              sx={{
                                mb: 1,
                                height: 24,
                                fontSize: "0.75rem",
                              }}
                            />
                          )}
                          <Stack spacing={1} mt={1.5}>
                            <Box display="flex" alignItems="center" gap={1}>
                              <AttachMoneyIcon sx={{ fontSize: 16, color: "#666" }} />
                              <Typography variant="body2" color="text.secondary">
                                Unit Price:{" "}
                                <strong style={{ color: "#1976d2" }}>
                                  ₹{product?.price?.toFixed(2)}
                                </strong>
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                              <InventoryIcon sx={{ fontSize: 16, color: "#666" }} />
                              <Typography variant="body2" color="text.secondary">
                                Quantity: <strong>{product?.qty}</strong>
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                mt: 1,
                                p: 1.5,
                                borderRadius: 2,
                                backgroundColor: "#f5f5f5",
                                display: "inline-block",
                              }}
                            >
                              <Typography variant="body2" color="primary" fontWeight="700">
                                Subtotal: ₹{(product?.price * product?.qty).toFixed(2)}
                              </Typography>
                            </Box>
                          </Stack>
                        </Grid>

                        {/* Product Images Gallery */}
                        <Grid item xs={12} sm={3}>
                          {product?.product_id?.image && product.product_id.image.length > 0 && (
                            <>
                              <Typography
                                variant="caption"
                                color="secondary"
                                fontWeight="600"
                                display="block"
                                sx={{ mb: 1.5 }}
                              >
                                Product Images ({product.product_id.image.length})
                              </Typography>
                              <Box display="flex" flexWrap="wrap" gap={1} mb={1.5}>
                                {product.product_id.image.slice(0, 4).map((image, idx) => (
                                  <Tooltip key={idx} title="Click to view full size">
                                    <Avatar
                                      component="a"
                                      target="_blank"
                                      href={`${process.env.REACT_APP_API_URL}/uploads/${image}`}
                                      variant="rounded"
                                      src={`${process.env.REACT_APP_API_URL}/uploads/${image}`}
                                      sx={{
                                        width: 56,
                                        height: 56,
                                        cursor: "pointer",
                                        border: "2px solid #e0e0e0",
                                        transition: "all 0.2s ease",
                                        "&:hover": {
                                          transform: "scale(1.15)",
                                          borderColor: "#1976d2",
                                          boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
                                        },
                                      }}
                                    />
                                  </Tooltip>
                                ))}
                              </Box>
                              <Button
                                size="small"
                                variant="outlined"
                                startIcon={<DownloadIcon />}
                                onClick={() => downloadImages(product?.product_id?.image)}
                                fullWidth
                                sx={{
                                  textTransform: "none",
                                  fontSize: "0.75rem",
                                }}
                              >
                                Download All
                              </Button>
                            </>
                          )}
                        </Grid>
                      </Grid>
                    </Box>
                  </Card>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Right Column - Order Summary & Details */}
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
              <Box display="flex" alignItems="center" gap={1.5} mb={2.5}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    backgroundColor: "#e3f2fd",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PersonIcon sx={{ color: "#1976d2" }} />
                </Box>
                <Typography variant="h6" fontWeight="bold">
                  Customer Details
                </Typography>
              </Box>
              <Divider sx={{ mb: 2.5 }} />
              <Stack spacing={1.5}>
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Customer Name
                  </Typography>
                  <Typography variant="body1" fontWeight="600">
                    {details?.userId?.username || "N/A"}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <EmailIcon sx={{ fontSize: 18, color: "#666" }} />
                  <Typography variant="body2" color="text.secondary">
                    {details?.userId?.email || "No email"}
                  </Typography>
                </Box>
              </Stack>
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
              <Box display="flex" alignItems="center" gap={1.5} mb={2.5}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    backgroundColor: "#e8f5e9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LocationOnIcon sx={{ color: "#2e7d32" }} />
                </Box>
                <Typography variant="h6" fontWeight="bold">
                  Shipping Address
                </Typography>
              </Box>
              <Divider sx={{ mb: 2.5 }} />
              <Stack spacing={1.5}>
                <Box>
                  <Typography variant="body2" fontWeight="600" sx={{ mb: 0.5 }}>
                    {details?.address?.firstname?.toUpperCase()}{" "}
                    {details?.address?.lastname?.toUpperCase()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    {details?.address?.address_line_1}
                    {details?.address?.address_line_2 && (
                      <>, {details?.address?.address_line_2}</>
                    )}
                    <br />
                    {details?.address?.city}, {details?.address?.state}
                    <br />
                    {details?.address?.country} - {details?.address?.zip}
                  </Typography>
                </Box>
                <Divider />
                <Box display="flex" alignItems="center" gap={1}>
                  <PhoneIcon sx={{ fontSize: 18, color: "#666" }} />
                  <Typography variant="body2" color="text.secondary">
                    {details?.address?.mobile}
                  </Typography>
                </Box>
              </Stack>
            </Paper>

            {/* Tracking Information */}
            {details?.tracking_number && (
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  mb: 3,
                  borderRadius: 3,
                  border: "1px solid #f0f0f0",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                }}
              >
                <Box display="flex" alignItems="center" gap={1.5} mb={2}>
                  <LocalPostOfficeIcon sx={{ color: "#1976d2", fontSize: 28 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Tracking Information
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Tracking Number
                  </Typography>
                  <Chip
                    label={details.tracking_number}
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      height: 32,
                      backgroundColor: "white",
                    }}
                  />
                </Box>
                {details?.expected_delivery_date && (
                  <Box mt={2}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      Expected Delivery
                    </Typography>
                    <Typography variant="body1" fontWeight="600">
                      {new Date(details.expected_delivery_date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </Typography>
                  </Box>
                )}
              </Paper>
            )}

            {/* Payment Summary */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid #f0f0f0",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <Box display="flex" alignItems="center" gap={1.5} mb={2.5}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    backgroundColor: "#fff3e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PaymentIcon sx={{ color: "#ed6c02" }} />
                </Box>
                <Typography variant="h6" fontWeight="bold">
                  Payment Summary
                </Typography>
              </Box>
              <Divider sx={{ mb: 2.5 }} />
              <Stack spacing={2}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Subtotal
                  </Typography>
                  <Typography variant="body1" fontWeight="600">
                    ₹
                    {details?.subtotal?.toFixed(2) ||
                      details?.products?.totalPrice?.toFixed(2) ||
                      "0.00"}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Shipping
                  </Typography>
                  {details?.delivery_fee === 0 ||
                  details?.delivery_fee === null ||
                  details?.delivery_fee === undefined ? (
                    <Chip
                      label="FREE"
                      size="small"
                      color="success"
                      sx={{ height: 24, fontSize: "0.75rem", fontWeight: 600 }}
                    />
                  ) : (
                    <Typography variant="body1" fontWeight="600">
                      ₹{details?.delivery_fee?.toFixed(2) || "0.00"}
                    </Typography>
                  )}
                </Box>
                {details?.tax_amount > 0 && (
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      Tax
                    </Typography>
                    <Typography variant="body1" fontWeight="600">
                      ₹{details?.tax_amount?.toFixed(2) || "0.00"}
                    </Typography>
                  </Box>
                )}
                {details?.discount_amount > 0 && (
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <DiscountIcon sx={{ fontSize: 16, color: "#2e7d32" }} />
                      <Typography variant="body2" color="text.secondary">
                        Discount
                      </Typography>
                    </Box>
                    <Typography variant="body1" fontWeight="600" color="success.main">
                      -₹{details?.discount_amount?.toFixed(2) || "0.00"}
                    </Typography>
                  </Box>
                )}
                {details?.coupon_code && (
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      backgroundColor: "#f5f5f5",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <LocalOfferIcon sx={{ fontSize: 18, color: "#1976d2" }} />
                    <Typography variant="caption" color="text.secondary">
                      Coupon Applied:
                    </Typography>
                    <Typography variant="caption" fontWeight="600" color="primary">
                      {details.coupon_code}
                    </Typography>
                  </Box>
                )}
                <Divider sx={{ my: 1 }} />
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: "#f5f5f5",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    Total Amount
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" color="primary">
                    ₹{details?.amount?.toFixed(2) || "0.00"}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </PageLayout>
  );
};

export default EditOrder;

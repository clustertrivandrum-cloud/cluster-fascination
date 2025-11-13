import Button from "components/Button";
import PageLayout from "layouts/PageLayout";
import { useGetOrders } from "queries/OrderQuery";
import TableData from "./tableData";
import { Box, Grid, Card, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CancelIcon from "@mui/icons-material/Cancel";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PropTypes from "prop-types";

function Orders() {
  const { data, isLoading } = useGetOrders({ pageNo: 1, pageCount: 100 });

  // Calculate statistics
  const totalOrders = data?.data?.length || 0;
  const pendingOrders = data?.data?.filter((order) => order.status === "Pending")?.length || 0;
  const deliveredOrders = data?.data?.filter((order) => order.status === "Delivered")?.length || 0;
  const shippedOrders =
    data?.data?.filter((order) => order.status === "Shipped" || order.status === "Out_of_delivery")
      ?.length || 0;
  const canceledOrders = data?.data?.filter((order) => order.status === "Canceled")?.length || 0;
  const recentOrders =
    data?.data?.filter((order) => {
      const orderDate = new Date(order.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return orderDate >= weekAgo;
    })?.length || 0;

  // Calculate total revenue
  const totalRevenue =
    data?.data?.reduce((sum, order) => {
      if (order.status !== "Canceled") {
        return sum + (order?.amount || 0);
      }
      return sum;
    }, 0) || 0;

  const StatCard = ({ icon, title, value, subtitle, color, bgColor }) => {
    return (
      <Card
        sx={{
          padding: "24px",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          transition: "all 0.3s ease",
          border: "1px solid #f0f0f0",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          },
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography
              variant="caption"
              color="secondary"
              fontWeight="medium"
              sx={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.5px" }}
            >
              {title}
            </Typography>
            <Typography variant="h3" fontWeight="bold" sx={{ mt: 1, mb: 0.5, color: color }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="secondary" fontSize="0.7rem">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "12px",
              backgroundColor: bgColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
        </Box>
      </Card>
    );
  };

  // Add propTypes for validation
  StatCard.propTypes = {
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    subtitle: PropTypes.string,
    color: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
  };

  return (
    <PageLayout title={"Order Management"}>
      {/* Statistics Overview */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              icon={<ShoppingCartIcon sx={{ fontSize: 28, color: "#1976d2" }} />}
              title="Total Orders"
              value={totalOrders}
              color="#1976d2"
              bgColor="#e3f2fd"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              icon={<HourglassEmptyIcon sx={{ fontSize: 28, color: "#ed6c02" }} />}
              title="Pending Orders"
              value={pendingOrders}
              color="#ed6c02"
              bgColor="#fff3e0"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              icon={<LocalShippingIcon sx={{ fontSize: 28, color: "#1976d2" }} />}
              title="In Transit"
              value={shippedOrders}
              subtitle="Shipped & Out for delivery"
              color="#1976d2"
              bgColor="#e3f2fd"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              icon={<CheckCircleIcon sx={{ fontSize: 28, color: "#2e7d32" }} />}
              title="Delivered"
              value={deliveredOrders}
              color="#2e7d32"
              bgColor="#e8f5e9"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              icon={<CancelIcon sx={{ fontSize: 28, color: "#d32f2f" }} />}
              title="Canceled"
              value={canceledOrders}
              color="#d32f2f"
              bgColor="#ffebee"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              icon={<AttachMoneyIcon sx={{ fontSize: 28, color: "#0288d1" }} />}
              title="Total Revenue"
              value={`₹${totalRevenue.toLocaleString()}`}
              subtitle="Excluding canceled orders"
              color="#0288d1"
              bgColor="#e1f5fe"
            />
          </Grid>
        </Grid>
      </Box>

      {/* Alert Banner for Pending Orders */}
      {pendingOrders > 0 && (
        <Box
          sx={{
            mb: 3,
            p: 2.5,
            borderRadius: 2,
            backgroundColor: "#fff3e0",
            border: "1px solid #ffe0b2",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <HourglassEmptyIcon sx={{ color: "#ed6c02", fontSize: 32 }} />
          <Box flex={1}>
            <Typography variant="body2" color="#e65100" fontWeight="600" sx={{ mb: 0.5 }}>
              Pending Orders Alert
            </Typography>
            <Typography variant="caption" color="#ef6c00">
              You have {pendingOrders} pending {pendingOrders === 1 ? "order" : "orders"} waiting to
              be processed. Please review and update their status.
            </Typography>
          </Box>
        </Box>
      )}

      {/* Recent Orders Info */}
      {recentOrders > 0 && (
        <Box
          sx={{
            mb: 3,
            p: 2,
            borderRadius: 2,
            backgroundColor: "#e3f2fd",
            border: "1px solid #90caf9",
          }}
        >
          <Typography variant="caption" sx={{ color: "#1976d2", fontWeight: 600 }}>
            📦 {recentOrders} new {recentOrders === 1 ? "order" : "orders"} received this week
          </Typography>
        </Box>
      )}

      {/* Orders Table */}
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <TableData />
      </Box>
    </PageLayout>
  );
}

export default Orders;

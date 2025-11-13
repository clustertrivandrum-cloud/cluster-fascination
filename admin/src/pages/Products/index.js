import Button from "components/Button";
import { Link } from "react-router-dom";
import PageLayout from "layouts/PageLayout";
import { useGetProducts } from "queries/ProductQuery";
import TableData from "./tableData";
import { Box, Grid, Card, Typography } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";
import WarningIcon from "@mui/icons-material/Warning";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PropTypes from "prop-types";

function Products() {
  const { data, isLoading } = useGetProducts({ pageNo: 1, pageCount: 100 });

  // Calculate statistics
  const totalProducts = data?.data?.length || 0;
  const availableProducts = data?.data?.filter((prod) => prod.isAvailable)?.length || 0;
  const unavailableProducts = totalProducts - availableProducts;
  const lowStockProducts =
    data?.data?.filter((prod) => prod?.stock > 0 && prod?.stock <= 10)?.length || 0;
  const outOfStockProducts = data?.data?.filter((prod) => prod?.stock === 0)?.length || 0;
  const recentProducts =
    data?.data?.filter((prod) => {
      const productDate = new Date(prod.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return productDate >= weekAgo;
    })?.length || 0;

  // Calculate total inventory value
  const totalInventoryValue =
    data?.data?.reduce((sum, prod) => sum + (prod?.sale_rate || 0) * (prod?.stock || 0), 0) || 0;

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
    <PageLayout
      title={"Product Management"}
      action={
        <Button
          component={Link}
          to={`/products/addProducts`}
          sx={{
            borderRadius: "8px",
            padding: "10px 24px",
            fontSize: "0.875rem",
            fontWeight: "600",
            textTransform: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            "&:hover": {
              boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
            },
          }}
        >
          + Add New Product
        </Button>
      }
    >
      {/* Statistics Overview */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              icon={<InventoryIcon sx={{ fontSize: 28, color: "#1976d2" }} />}
              title="Total Products"
              value={totalProducts}
              color="#1976d2"
              bgColor="#e3f2fd"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              icon={<CheckCircleIcon sx={{ fontSize: 28, color: "#2e7d32" }} />}
              title="Available"
              value={availableProducts}
              color="#2e7d32"
              bgColor="#e8f5e9"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              icon={<BlockIcon sx={{ fontSize: 28, color: "#d32f2f" }} />}
              title="Unavailable"
              value={unavailableProducts}
              color="#d32f2f"
              bgColor="#ffebee"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              icon={<WarningIcon sx={{ fontSize: 28, color: "#ed6c02" }} />}
              title="Low Stock"
              value={lowStockProducts}
              subtitle={`${outOfStockProducts} out of stock`}
              color="#ed6c02"
              bgColor="#fff3e0"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              icon={<TrendingUpIcon sx={{ fontSize: 28, color: "#9c27b0" }} />}
              title="Added This Week"
              value={recentProducts}
              color="#9c27b0"
              bgColor="#f3e5f5"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              icon={<AttachMoneyIcon sx={{ fontSize: 28, color: "#0288d1" }} />}
              title="Inventory Value"
              value={`₹${totalInventoryValue.toLocaleString()}`}
              color="#0288d1"
              bgColor="#e1f5fe"
            />
          </Grid>
        </Grid>
      </Box>

      {/* Quick Stats Banner */}
      {(lowStockProducts > 0 || outOfStockProducts > 0) && (
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
          <WarningIcon sx={{ color: "#ed6c02", fontSize: 32 }} />
          <Box flex={1}>
            <Typography variant="body2" color="#e65100" fontWeight="600" sx={{ mb: 0.5 }}>
              Inventory Alert
            </Typography>
            <Typography variant="caption" color="#ef6c00">
              {lowStockProducts > 0 && `${lowStockProducts} products are running low on stock. `}
              {outOfStockProducts > 0 && `${outOfStockProducts} products are out of stock. `}
              Please restock soon to avoid order delays.
            </Typography>
          </Box>
        </Box>
      )}

      {/* Products Table */}
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

export default Products;

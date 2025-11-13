import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "components/Box";
import Typography from "components/Typography";
import Button from "components/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import DetailedStatisticsCard from "examples/Cards/StatisticsCards/DetailedStatisticsCard";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import PieChart from "examples/Charts/PieChart";
import { getDashboardStats } from "queries/dashboardUrls";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await getDashboardStats();
      if (response?.success) {
        setStats(response.data);
      } else {
        setError("Failed to load dashboard data");
      }
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
      setError(err?.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
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

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box py={3}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" color="primary" onClick={fetchDashboardStats}>
          Retry
        </Button>
      </Box>
    );
  }

  if (!stats) {
    return null;
  }

  const { overview, orderStatus, revenueByDay, ordersByDay, revenueByMonth, topProducts, paymentModeBreakdown, recentOrders, lowStockProducts, productsByCategory } = stats;

  // Prepare chart data
  const revenueChartData = {
    labels: revenueByDay.map((item) => {
      const date = new Date(item.date);
      return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
    }),
    datasets: [
      {
        label: "Revenue",
        data: revenueByDay.map((item) => item.revenue),
        color: "info",
      },
    ],
  };

  const ordersChartData = {
    labels: ordersByDay.map((item) => {
      const date = new Date(item.date);
      return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
    }),
    datasets: [
      {
        label: "Orders",
        data: ordersByDay.map((item) => item.orders),
        color: "success",
      },
    ],
  };

  const monthlyRevenueChartData = {
    labels: revenueByMonth.map((item) => item.month),
    datasets: [
      {
        label: "Monthly Revenue",
        data: revenueByMonth.map((item) => item.revenue),
        color: "primary",
      },
    ],
  };

  const orderStatusChartData = {
    labels: Object.keys(orderStatus),
    datasets: [
      {
        label: "Orders",
        data: Object.values(orderStatus),
        color: "info",
      },
    ],
  };

  const paymentModeChartData = {
    labels: paymentModeBreakdown.map((item) => item._id),
    datasets: [
      {
        label: "Orders",
        data: paymentModeBreakdown.map((item) => item.count),
        color: "success",
      },
    ],
  };

  const productsByCategoryChartData = {
    labels: productsByCategory.map((item) => item.categoryName),
    datasets: [
      {
        label: "Products",
        data: productsByCategory.map((item) => item.count),
        color: "warning",
      },
    ],
  };

  return (
    <Box py={3}>
      {/* Overview Statistics Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6} lg={3}>
          <DetailedStatisticsCard
            title="Total Revenue"
            count={formatCurrency(overview.totalRevenue)}
            icon={{ color: "success", component: <i className="ni ni-money-coins" /> }}
            percentage={{
              color: overview.revenueGrowth >= 0 ? "success" : "error",
              count: `${overview.revenueGrowth >= 0 ? "+" : ""}${overview.revenueGrowth}%`,
              text: "vs last month",
            }}
            bgColor="success"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <DetailedStatisticsCard
            title="Total Orders"
            count={overview.totalOrders}
            icon={{ color: "info", component: <i className="ni ni-cart" /> }}
            percentage={{
              color: overview.ordersGrowth >= 0 ? "success" : "error",
              count: `${overview.ordersGrowth >= 0 ? "+" : ""}${overview.ordersGrowth}%`,
              text: "vs last month",
            }}
            bgColor="info"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <DetailedStatisticsCard
            title="Total Users"
            count={overview.totalUsers}
            icon={{ color: "warning", component: <i className="ni ni-world" /> }}
            percentage={{
              color: "success",
              count: `${overview.todayOrders}`,
              text: "orders today",
            }}
            bgColor="warning"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <DetailedStatisticsCard
            title="Total Products"
            count={overview.totalProducts}
            icon={{ color: "error", component: <i className="ni ni-box-2" /> }}
            percentage={{
              color: "info",
              count: `${overview.totalCategories}`,
              text: "categories",
            }}
            bgColor="error"
          />
        </Grid>
      </Grid>

      {/* Today's Performance */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <Box p={2}>
              <Typography variant="button" color="text" fontWeight="medium" textTransform="uppercase">
                Today&apos;s Revenue
              </Typography>
              <Typography variant="h5" fontWeight="bold" color="success" mt={1}>
                {formatCurrency(overview.todayRevenue)}
              </Typography>
              <Typography variant="caption" color="text" mt={0.5}>
                {overview.todayOrders} orders today
              </Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <Box p={2}>
              <Typography variant="button" color="text" fontWeight="medium" textTransform="uppercase">
                This Month Revenue
              </Typography>
              <Typography variant="h5" fontWeight="bold" color="info" mt={1}>
                {formatCurrency(overview.thisMonthRevenue)}
              </Typography>
              <Typography variant="caption" color="text" mt={0.5}>
                {overview.thisMonthOrders} orders this month
              </Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <Box p={2}>
              <Typography variant="button" color="text" fontWeight="medium" textTransform="uppercase">
                Categories
              </Typography>
              <Typography variant="h5" fontWeight="bold" color="warning" mt={1}>
                {overview.totalCategories}
              </Typography>
              <Typography variant="caption" color="text" mt={0.5}>
                {overview.totalSubcategories} subcategories
              </Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <Box p={2}>
              <Typography variant="button" color="text" fontWeight="medium" textTransform="uppercase">
                Low Stock Alert
              </Typography>
              <Typography variant="h5" fontWeight="bold" color="error" mt={1}>
                {lowStockProducts.length}
              </Typography>
              <Typography variant="caption" color="text" mt={0.5}>
                Products need restocking
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row 1 */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} lg={8}>
          <DefaultLineChart
            title="Revenue Trend (Last 7 Days)"
            description="Daily revenue performance"
            height={isMobile ? "250px" : "300px"}
            chart={revenueChartData}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <PieChart
            title="Order Status Distribution"
            description="Current order status breakdown"
            height={isMobile ? "250px" : "300px"}
            chart={orderStatusChartData}
          />
        </Grid>
      </Grid>

      {/* Charts Row 2 */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} lg={6}>
          <DefaultLineChart
            title="Orders Trend (Last 7 Days)"
            description="Daily orders count"
            height={isMobile ? "250px" : "300px"}
            chart={ordersChartData}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <VerticalBarChart
            title="Monthly Revenue (Last 12 Months)"
            description="Revenue by month"
            height={isMobile ? "250px" : "300px"}
            chart={monthlyRevenueChartData}
          />
        </Grid>
      </Grid>

      {/* Charts Row 3 */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} lg={6}>
          <PieChart
            title="Payment Mode Distribution"
            description="Orders by payment method"
            height={isMobile ? "250px" : "300px"}
            chart={paymentModeChartData}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <VerticalBarChart
            title="Products by Category"
            description="Product distribution across categories"
            height={isMobile ? "250px" : "300px"}
            chart={productsByCategoryChartData}
          />
        </Grid>
      </Grid>

      {/* Top Products and Recent Orders */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} lg={8} order={isMobile ? 2 : 1}>
          <Card>
            <Box p={3}>
              <Box 
                display="flex" 
                justifyContent="space-between" 
                alignItems="center" 
                mb={3}
                flexDirection={isMobile ? "column" : "row"}
                gap={isMobile ? 2 : 0}
              >
                <Typography variant="h6" fontWeight="bold">
                  Top Selling Products
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => navigate("/products")}
                  fullWidth={isMobile}
                >
                  View All
                </Button>
              </Box>
              <TableContainer
                sx={{
                  overflowX: "auto",
                  "&::-webkit-scrollbar": {
                    height: "8px",
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "#f1f1f1",
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#888",
                    borderRadius: "4px",
                    "&:hover": {
                      backgroundColor: "#555",
                    },
                  },
                }}
              >
                <Table sx={{ minWidth: isMobile ? 500 : "auto" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell align="right">Quantity Sold</TableCell>
                      <TableCell align="right">Revenue</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topProducts.length > 0 ? (
                      topProducts.map((product, index) => (
                        <TableRow key={product.productId || index}>
                          <TableCell>
                            <Box display="flex" alignItems="center" gap={2}>
                              <Avatar
                                src={
                                  product.image
                                    ? `${process.env.REACT_APP_API_URL}/uploads/${product.image}`
                                    : ""
                                }
                                alt={product.productName}
                                variant="rounded"
                                sx={{ width: 40, height: 40 }}
                              />
                              <Typography variant="body2" fontWeight="medium">
                                {product.productName}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2">{product.totalQuantity}</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" fontWeight="bold" color="success">
                              {formatCurrency(product.totalRevenue)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} align="center">
                          <Typography variant="body2" color="text">
                            No products sold yet
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4} order={isMobile ? 1 : 2}>
          <Card>
            <Box p={3}>
              <Box 
                display="flex" 
                justifyContent="space-between" 
                alignItems="center" 
                mb={3}
                flexDirection={isMobile ? "column" : "row"}
                gap={isMobile ? 2 : 0}
              >
                <Typography variant="h6" fontWeight="bold">
                  Low Stock Products
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => navigate("/products")}
                  fullWidth={isMobile}
                >
                  View All
                </Button>
              </Box>
              <Box>
                {lowStockProducts.length > 0 ? (
                  lowStockProducts.slice(0, 5).map((product, index) => (
                    <Box
                      key={product._id || index}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      py={1.5}
                      borderBottom="1px solid"
                      borderColor="divider"
                    >
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Avatar
                          src={
                            product.image?.[0]
                              ? `${process.env.REACT_APP_API_URL}/uploads/${product.image[0]}`
                              : ""
                          }
                          alt={product.name}
                          variant="rounded"
                          sx={{ width: 32, height: 32 }}
                        />
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {product.name}
                          </Typography>
                          <Typography variant="caption" color="text">
                            {formatCurrency(product.price)}
        </Typography>
      </Box>
                      </Box>
                      <Chip
                        label={`${product.stock} left`}
                        color={product.stock <= 5 ? "error" : "warning"}
                        size="small"
                      />
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" color="text" textAlign="center" py={2}>
                    All products are well stocked
                  </Typography>
                )}
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Orders */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <Box p={3}>
              <Box 
                display="flex" 
                justifyContent="space-between" 
                alignItems="center" 
                mb={3}
                flexDirection={isMobile ? "column" : "row"}
                gap={isMobile ? 2 : 0}
              >
                <Typography variant="h6" fontWeight="bold">
                  Recent Orders
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => navigate("/orders")}
                  fullWidth={isMobile}
                >
                  View All Orders
                </Button>
              </Box>
              <TableContainer
                sx={{
                  overflowX: "auto",
                  "&::-webkit-scrollbar": {
                    height: "8px",
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "#f1f1f1",
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#888",
                    borderRadius: "4px",
                    "&:hover": {
                      backgroundColor: "#555",
                    },
                  },
                }}
              >
                <Table sx={{ minWidth: isMobile ? 700 : "auto" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ minWidth: isMobile ? 100 : "auto" }}>Order ID</TableCell>
                      <TableCell sx={{ minWidth: isMobile ? 150 : "auto" }}>Customer</TableCell>
                      <TableCell sx={{ minWidth: isMobile ? 100 : "auto" }}>Amount</TableCell>
                      <TableCell sx={{ minWidth: isMobile ? 100 : "auto" }}>Payment</TableCell>
                      <TableCell sx={{ minWidth: isMobile ? 100 : "auto" }}>Status</TableCell>
                      <TableCell sx={{ minWidth: isMobile ? 100 : "auto" }}>Date</TableCell>
                      <TableCell align="right" sx={{ minWidth: isMobile ? 80 : "auto" }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentOrders.length > 0 ? (
                      recentOrders.map((order) => (
                        <TableRow key={order._id}>
                          <TableCell>
                            <Typography variant="body2" fontWeight="medium">
                              #{order._id.slice(-6).toUpperCase()}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {order.userId?.username || "N/A"}
                            </Typography>
                            <Typography variant="caption" color="text">
                              {order.userId?.email || ""}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" fontWeight="bold">
                              {formatCurrency(order.amount)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={order.payment_mode || "N/A"}
                              size="small"
                              color="info"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={order.status}
                              size="small"
                              color={getStatusColor(order.status)}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {formatDate(order.createdAt)}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              variant="text"
                              size="small"
                              onClick={() => navigate(`/orders/editOrder/${order._id}`)}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          <Typography variant="body2" color="text">
                            No recent orders
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;

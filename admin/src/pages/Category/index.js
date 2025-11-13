import Button from "components/Button";
import { Link } from "react-router-dom";
import PageLayout from "layouts/PageLayout";
import { useGetCategory } from "queries/ProductQuery";
import TableData from "./tableData";
import { Box, Grid, Card, Typography } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PropTypes from "prop-types";

function Category() {
  const { data, isLoading } = useGetCategory({ pageNo: 1, pageCount: 100 });

  // Calculate statistics
  const totalCategories = data?.data?.length || 0;
  const availableCategories = data?.data?.filter((cat) => cat.isAvailable)?.length || 0;
  const unavailableCategories = totalCategories - availableCategories;
  const recentCategories =
    data?.data?.filter((cat) => {
      const categoryDate = new Date(cat.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return categoryDate >= weekAgo;
    })?.length || 0;

  const StatCard = ({ icon, title, value, color, bgColor }) => {
    // Prop validation is handled by Material-UI components
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
    value: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
  };

  return (
    <PageLayout
      title={"Category Management"}
      action={
        <Button
          component={Link}
          to={`/category/addCategory`}
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
          + Add New Category
        </Button>
      }
    >
      {/* Statistics Overview */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={<CategoryIcon sx={{ fontSize: 28, color: "#1976d2" }} />}
              title="Total Categories"
              value={totalCategories}
              color="#1976d2"
              bgColor="#e3f2fd"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={<CheckCircleIcon sx={{ fontSize: 28, color: "#2e7d32" }} />}
              title="Available"
              value={availableCategories}
              color="#2e7d32"
              bgColor="#e8f5e9"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={<BlockIcon sx={{ fontSize: 28, color: "#d32f2f" }} />}
              title="Unavailable"
              value={unavailableCategories}
              color="#d32f2f"
              bgColor="#ffebee"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={<TrendingUpIcon sx={{ fontSize: 28, color: "#ed6c02" }} />}
              title="Added This Week"
              value={recentCategories}
              color="#ed6c02"
              bgColor="#fff3e0"
            />
          </Grid>
        </Grid>
      </Box>

      {/* Categories Table */}
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

export default Category;

/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import Box from "components/Box";
import Typography from "components/Typography";
import Avatar from "components/Avatar";
import Badge from "components/Badge";
import { useGetProducts } from "queries/ProductQuery";
import Table from "examples/Tables/Table";
import { IconButton, TextField, InputAdornment, Chip, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import EditIcon from "@mui/icons-material/Edit";

function ProductItem({ image, name, desc }) {
  return (
    <Box display="flex" alignItems="center" px={1} py={0.5}>
      <Box mr={2}>
        <Avatar
          src={image}
          alt={name}
          size="md"
          variant="rounded"
          sx={{
            border: "2px solid #f0f0f0",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        />
      </Box>
      <Box display="flex" flexDirection="column">
        <Typography variant="button" fontWeight="medium" sx={{ fontSize: "0.875rem" }}>
          {name}
        </Typography>
        <Typography
          variant="caption"
          color="secondary"
          sx={{
            maxWidth: "250px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {desc || "No subheading"}
        </Typography>
      </Box>
    </Box>
  );
}

const TableData = () => {
  const { data, isLoading } = useGetProducts({ pageNo: 1, pageCount: 100 });
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

  // Filter and search logic
  const filteredData = useMemo(() => {
    if (!data?.data) return [];

    let filtered = [...data.data];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item?.subheading?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item?.brand?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((item) =>
        statusFilter === "available" ? item?.isAvailable : !item?.isAvailable
      );
    }

    // Apply stock filter
    if (stockFilter === "low") {
      filtered = filtered.filter((item) => item?.stock > 0 && item?.stock <= 10);
    } else if (stockFilter === "out") {
      filtered = filtered.filter((item) => item?.stock === 0);
    } else if (stockFilter === "in") {
      filtered = filtered.filter((item) => item?.stock > 10);
    }

    return filtered;
  }, [data?.data, searchQuery, statusFilter, stockFilter]);

  const columns = [
    { name: "product", align: "left" },
    { name: "price", align: "center" },
    { name: "stock", align: "center" },
    { name: "sale rate", align: "center" },
    { name: "discount", align: "center" },
    { name: "status", align: "center" },
    { name: "actions", align: "center" },
  ];

  const rows = filteredData?.map((item) => ({
    product: (
      <ProductItem
        image={`${process.env.REACT_APP_API_URL}/uploads/${item?.image?.[0]}`}
        name={item?.name}
        desc={item?.subheading}
      />
    ),
    price: (
      <Box>
        <Typography variant="caption" fontWeight="bold" color="text" display="block">
          ₹{item?.price}
        </Typography>
        {item?.discount > 0 && (
          <Typography variant="caption" color="success" fontSize="0.7rem">
            {item?.discount}% off
          </Typography>
        )}
      </Box>
    ),
    stock: (
      <Chip
        label={item?.stock || 0}
        size="small"
        color={item?.stock === 0 ? "error" : item?.stock <= 10 ? "warning" : "success"}
        sx={{ fontWeight: 600, minWidth: 60 }}
      />
    ),
    "sale rate": (
      <Typography variant="caption" fontWeight="medium" color="text">
        ₹{item?.sale_rate || 0}
      </Typography>
    ),
    discount: (
      <Chip
        label={`${item?.discount || 0}%`}
        size="small"
        variant="outlined"
        color={item?.discount > 0 ? "info" : "default"}
        sx={{ fontWeight: 600, minWidth: 60 }}
      />
    ),
    status: (
      <Badge
        variant="gradient"
        badgeContent={item?.isAvailable ? "Available" : "Unavailable"}
        color={item?.isAvailable ? "success" : "error"}
        size="sm"
        container
        sx={{
          padding: "6px 12px",
          fontSize: "0.75rem",
        }}
      />
    ),
    actions: (
      <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
        <Tooltip title="Edit Product" placement="top">
          <Link to={`/products/editProduct/${item?._id}`}>
            <IconButton
              size="small"
              sx={{
                color: "#1976d2",
                "&:hover": {
                  backgroundColor: "#e3f2fd",
                },
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Link>
        </Tooltip>
      </Box>
    ),
  }));

  return (
    <Box>
      {/* Search and Filter Section */}
      <Box display="flex" gap={2} mb={3} flexWrap="wrap" alignItems="center">
        <TextField
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          sx={{
            minWidth: 300,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />

        <Box display="flex" gap={1} alignItems="center" flexWrap="wrap">
          <FilterListIcon fontSize="small" sx={{ color: "#666" }} />
          <Typography variant="caption" sx={{ fontWeight: 600, color: "#666", mr: 0.5 }}>
            Status:
          </Typography>
          <Chip
            label="All"
            onClick={() => setStatusFilter("all")}
            color={statusFilter === "all" ? "primary" : "default"}
            size="small"
            sx={{ cursor: "pointer" }}
          />
          <Chip
            label="Available"
            onClick={() => setStatusFilter("available")}
            color={statusFilter === "available" ? "success" : "default"}
            size="small"
            sx={{ cursor: "pointer" }}
          />
          <Chip
            label="Unavailable"
            onClick={() => setStatusFilter("unavailable")}
            color={statusFilter === "unavailable" ? "error" : "default"}
            size="small"
            sx={{ cursor: "pointer" }}
          />
        </Box>

        <Box display="flex" gap={1} alignItems="center" flexWrap="wrap">
          <Typography variant="caption" sx={{ fontWeight: 600, color: "#666", mr: 0.5 }}>
            Stock:
          </Typography>
          <Chip
            label="All"
            onClick={() => setStockFilter("all")}
            color={stockFilter === "all" ? "primary" : "default"}
            size="small"
            sx={{ cursor: "pointer" }}
          />
          <Chip
            label="In Stock"
            onClick={() => setStockFilter("in")}
            color={stockFilter === "in" ? "success" : "default"}
            size="small"
            sx={{ cursor: "pointer" }}
          />
          <Chip
            label="Low Stock"
            onClick={() => setStockFilter("low")}
            color={stockFilter === "low" ? "warning" : "default"}
            size="small"
            sx={{ cursor: "pointer" }}
          />
          <Chip
            label="Out of Stock"
            onClick={() => setStockFilter("out")}
            color={stockFilter === "out" ? "error" : "default"}
            size="small"
            sx={{ cursor: "pointer" }}
          />
        </Box>

        {(searchQuery || statusFilter !== "all" || stockFilter !== "all") && (
          <Typography variant="caption" color="secondary">
            Showing {filteredData?.length} of {data?.data?.length || 0} products
          </Typography>
        )}
      </Box>

      {/* Loading State */}
      {isLoading && (
        <Box display="flex" justifyContent="center" p={5}>
          <Typography fontSize={14} color="secondary">
            Loading products...
          </Typography>
        </Box>
      )}

      {/* Table */}
      {!isLoading && filteredData?.length > 0 && <Table columns={columns} rows={rows || []} />}

      {/* Empty State */}
      {!isLoading && filteredData?.length === 0 && (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="300px"
          sx={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "40px",
          }}
        >
          <SearchIcon sx={{ fontSize: 60, color: "#e0e0e0", mb: 2 }} />
          <Typography variant="h6" color="secondary" mb={1}>
            No products found
          </Typography>
          <Typography variant="caption" color="text">
            {searchQuery
              ? "Try adjusting your search or filters"
              : "Start by adding your first product"}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default TableData;

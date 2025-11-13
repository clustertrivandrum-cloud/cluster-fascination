/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import Box from "components/Box";
import Typography from "components/Typography";
import Avatar from "components/Avatar";
import Badge from "components/Badge";
import { useGetSubcategories } from "queries/ProductQuery";
import Table from "examples/Tables/Table";
import { IconButton, TextField, InputAdornment, Chip, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import EditIcon from "@mui/icons-material/Edit";

function SubcategoryItem({ image, name, desc }) {
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
            maxWidth: "300px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {desc || "No description"}
        </Typography>
      </Box>
    </Box>
  );
}

const TableData = () => {
  const { data, isLoading } = useGetSubcategories({ pageNo: 1, pageCount: 100 });
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Get unique categories for filtering
  const uniqueCategories = useMemo(() => {
    if (!data?.data) return [];
    const categories = data.data.map((item) => item.category).filter((cat) => cat && cat._id);
    const unique = [];
    const ids = new Set();
    categories.forEach((cat) => {
      if (!ids.has(cat._id)) {
        ids.add(cat._id);
        unique.push(cat);
      }
    });
    return unique;
  }, [data?.data]);

  // Filter and search logic
  const filteredData = useMemo(() => {
    if (!data?.data) return [];

    let filtered = [...data.data];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item?.desc?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item?.category?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((item) =>
        statusFilter === "available" ? item?.isAvailable : !item?.isAvailable
      );
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((item) => item?.category?._id === categoryFilter);
    }

    return filtered;
  }, [data?.data, searchQuery, statusFilter, categoryFilter]);

  const columns = [
    { name: "subcategory", align: "left" },
    { name: "parent category", align: "left" },
    { name: "status", align: "center" },
    { name: "created on", align: "center" },
    { name: "last updated", align: "center" },
    { name: "actions", align: "center" },
  ];

  const rows = filteredData?.map((item) => ({
    subcategory: (
      <SubcategoryItem
        image={`${process.env.REACT_APP_API_URL}/uploads/${item?.image}`}
        name={item?.name}
        desc={item?.desc}
      />
    ),
    "parent category": (
      <Box>
        <Chip
          label={item?.category?.name || "N/A"}
          size="small"
          variant="outlined"
          sx={{
            fontWeight: 600,
            borderColor: "#1976d2",
            color: "#1976d2",
          }}
        />
      </Box>
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
    "created on": (
      <Box>
        <Typography variant="caption" color="secondary" fontWeight="medium" display="block">
          {new Date(item?.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </Typography>
        <Typography variant="caption" color="text" fontSize="0.7rem">
          {new Date(item?.createdAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
      </Box>
    ),
    "last updated": (
      <Box>
        <Typography variant="caption" color="secondary" fontWeight="medium" display="block">
          {new Date(item?.updatedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </Typography>
        <Typography variant="caption" color="text" fontSize="0.7rem">
          {new Date(item?.updatedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
      </Box>
    ),
    actions: (
      <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
        <Tooltip title="Edit Subcategory" placement="top">
          <Link to={`/subcategory/editSubcategory/${item?._id}`}>
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
          placeholder="Search subcategories..."
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

        {uniqueCategories.length > 0 && (
          <Box display="flex" gap={1} alignItems="center" flexWrap="wrap">
            <Typography variant="caption" sx={{ fontWeight: 600, color: "#666", mr: 0.5 }}>
              Category:
            </Typography>
            <Chip
              label="All"
              onClick={() => setCategoryFilter("all")}
              color={categoryFilter === "all" ? "primary" : "default"}
              size="small"
              sx={{ cursor: "pointer" }}
            />
            {uniqueCategories.slice(0, 3).map((category) => (
              <Chip
                key={category._id}
                label={category.name}
                onClick={() => setCategoryFilter(category._id)}
                color={categoryFilter === category._id ? "info" : "default"}
                size="small"
                sx={{ cursor: "pointer" }}
              />
            ))}
            {uniqueCategories.length > 3 && (
              <Typography variant="caption" color="secondary">
                +{uniqueCategories.length - 3} more
              </Typography>
            )}
          </Box>
        )}

        {(searchQuery || statusFilter !== "all" || categoryFilter !== "all") && (
          <Typography variant="caption" color="secondary">
            Showing {filteredData?.length} of {data?.data?.length || 0} subcategories
          </Typography>
        )}
      </Box>

      {/* Loading State */}
      {isLoading && (
        <Box display="flex" justifyContent="center" p={5}>
          <Typography fontSize={14} color="secondary">
            Loading subcategories...
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
            No subcategories found
          </Typography>
          <Typography variant="caption" color="text">
            {searchQuery
              ? "Try adjusting your search or filters"
              : "Start by adding your first subcategory"}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default TableData;

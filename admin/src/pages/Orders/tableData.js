/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import Box from "components/Box";
import Typography from "components/Typography";
import Badge from "components/Badge";
import { useGetOrders, useUpdateOrderStatus } from "queries/OrderQuery";
import Table from "examples/Tables/Table";
import {
  IconButton,
  TextField,
  InputAdornment,
  Chip,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

function OrderUser({ username, email }) {
  return (
    <Box display="flex" alignItems="center" px={1} py={0.5}>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          backgroundColor: "#e3f2fd",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mr: 2,
        }}
      >
        <PersonIcon sx={{ color: "#1976d2", fontSize: 20 }} />
      </Box>
      <Box display="flex" flexDirection="column">
        <Typography variant="button" fontWeight="medium" sx={{ fontSize: "0.875rem" }}>
          {username || "N/A"}
        </Typography>
        <Typography
          variant="caption"
          color="secondary"
          sx={{
            maxWidth: "200px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {email || "No email"}
        </Typography>
      </Box>
    </Box>
  );
}

const TableData = () => {
  const { data, isLoading } = useGetOrders({ pageNo: 1, pageCount: 100 });
  const { mutate: updateOrderStatus } = useUpdateOrderStatus();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus({ orderId, newStatus });
  };

  // Get unique payment modes
  const paymentModes = useMemo(() => {
    if (!data?.data) return [];
    const modes = [...new Set(data.data.map((item) => item.payment_mode))];
    return modes.filter(Boolean);
  }, [data?.data]);

  // Filter and search logic
  const filteredData = useMemo(() => {
    if (!data?.data) return [];

    let filtered = [...data.data];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item?.userId?.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item?.userId?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item?.address?.firstname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item?.address?.lastname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item?._id?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((item) => item?.status === statusFilter);
    }

    // Apply payment filter
    if (paymentFilter !== "all") {
      filtered = filtered.filter((item) => item?.payment_mode === paymentFilter);
    }

    return filtered;
  }, [data?.data, searchQuery, statusFilter, paymentFilter]);

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

  const columns = [
    { name: "user", align: "left" },
    { name: "order person", align: "left" },
    { name: "payment", align: "center" },
    { name: "amount", align: "center" },
    { name: "status", align: "center" },
    { name: "ordered on", align: "center" },
    { name: "actions", align: "center" },
  ];

  const rows = filteredData?.map((item) => ({
    user: <OrderUser username={item?.userId?.username} email={item?.userId?.email} />,
    "order person": (
      <Box>
        <Typography variant="caption" fontWeight="medium" color="text" display="block">
          {item?.address?.firstname} {item?.address?.lastname}
        </Typography>
        <Typography variant="caption" color="secondary" fontSize="0.7rem">
          {item?.address?.mobile}
        </Typography>
      </Box>
    ),
    payment: (
      <Chip
        label={item?.payment_mode || "N/A"}
        size="small"
        variant="outlined"
        color={item?.payment_mode === "COD" ? "warning" : "success"}
        sx={{ fontWeight: 600 }}
      />
    ),
    amount: (
      <Box>
        <Typography variant="caption" fontWeight="bold" color="text" display="block">
          ₹{item?.amount || 0}
        </Typography>
      </Box>
    ),
    status: (
      <FormControl size="small" sx={{ minWidth: 140 }}>
        <Select
          value={item?.status || "Pending"}
          onChange={(e) => handleStatusChange(item._id, e.target.value)}
          sx={{
            fontSize: "0.75rem",
            fontWeight: 600,
            borderRadius: 2,
            "& .MuiSelect-select": {
              padding: "6px 12px",
            },
          }}
        >
          {[
            "Pending",
            "Placed",
            "Shipped",
            "Out_of_delivery",
            "Delivered",
            "Delayed",
            "Canceled",
          ].map((status) => (
            <MenuItem key={status} value={status}>
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor:
                      status === "Delivered"
                        ? "#2e7d32"
                        : status === "Canceled" || status === "Delayed"
                        ? "#d32f2f"
                        : status === "Shipped"
                        ? "#1976d2"
                        : "#ed6c02",
                  }}
                />
                {status.replace("_", " ")}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    ),
    "ordered on": (
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
    actions: (
      <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
        <Tooltip title="View Details" placement="top">
          <Link to={`/orders/editOrder/${item?._id}`} state={{ item }}>
            <IconButton
              size="small"
              sx={{
                color: "#1976d2",
                "&:hover": {
                  backgroundColor: "#e3f2fd",
                },
              }}
            >
              <VisibilityIcon fontSize="small" />
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
          placeholder="Search orders..."
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
            label="Pending"
            onClick={() => setStatusFilter("Pending")}
            color={statusFilter === "Pending" ? "warning" : "default"}
            size="small"
            sx={{ cursor: "pointer" }}
          />
          <Chip
            label="Delivered"
            onClick={() => setStatusFilter("Delivered")}
            color={statusFilter === "Delivered" ? "success" : "default"}
            size="small"
            sx={{ cursor: "pointer" }}
          />
          <Chip
            label="Canceled"
            onClick={() => setStatusFilter("Canceled")}
            color={statusFilter === "Canceled" ? "error" : "default"}
            size="small"
            sx={{ cursor: "pointer" }}
          />
        </Box>

        {paymentModes.length > 0 && (
          <Box display="flex" gap={1} alignItems="center" flexWrap="wrap">
            <Typography variant="caption" sx={{ fontWeight: 600, color: "#666", mr: 0.5 }}>
              Payment:
            </Typography>
            <Chip
              label="All"
              onClick={() => setPaymentFilter("all")}
              color={paymentFilter === "all" ? "primary" : "default"}
              size="small"
              sx={{ cursor: "pointer" }}
            />
            {paymentModes.map((mode) => (
              <Chip
                key={mode}
                label={mode}
                onClick={() => setPaymentFilter(mode)}
                color={paymentFilter === mode ? "info" : "default"}
                size="small"
                sx={{ cursor: "pointer" }}
              />
            ))}
          </Box>
        )}

        {(searchQuery || statusFilter !== "all" || paymentFilter !== "all") && (
          <Typography variant="caption" color="secondary">
            Showing {filteredData?.length} of {data?.data?.length || 0} orders
          </Typography>
        )}
      </Box>

      {/* Loading State */}
      {isLoading && (
        <Box display="flex" justifyContent="center" p={5}>
          <Typography fontSize={14} color="secondary">
            Loading orders...
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
          <LocalShippingIcon sx={{ fontSize: 60, color: "#e0e0e0", mb: 2 }} />
          <Typography variant="h6" color="secondary" mb={1}>
            No orders found
          </Typography>
          <Typography variant="caption" color="text">
            {searchQuery
              ? "Try adjusting your search or filters"
              : "No orders have been placed yet"}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default TableData;

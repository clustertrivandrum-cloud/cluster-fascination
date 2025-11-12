import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@mui/material";
import Typography from "components/Typography";
import Button from "components/Button";
import Avatar from "components/Avatar";
import Badge from "components/Badge";
import { useGetSubcategories, useDeleteSubcategory } from "queries/ProductQuery";
import Table from "examples/Tables/Table";
import toast from "react-hot-toast";

function TableData() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetSubcategories({ pageNo: 1, pageCount: 100 });
  const { mutateAsync: deleteSubcategory, isLoading: deleteLoading } = useDeleteSubcategory();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      try {
        await deleteSubcategory({ _id: id });
        toast.success("Subcategory deleted successfully");
      } catch (error) {
        toast.error(error?.message || "Failed to delete subcategory");
      }
    }
  };

  const columns = [
    { name: "subcategory", align: "left" },
    { name: "category", align: "left" },
    { name: "status", align: "center" },
    { name: "action", align: "center" },
  ];

  let rows = [];

  if (data?.data && Array.isArray(data.data)) {
    rows = data.data.map((item, index) => {
      const subcategory = (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={item?.image ? `${process.env.REACT_APP_BASE_URL}/${item.image}` : null}
            name={item?.name}
            size="sm"
          />
          <div style={{ marginLeft: 12 }}>
            <Typography variant="caption" fontWeight="medium" color="text">
              {item?.name}
            </Typography>
            {item?.desc && (
              <Typography variant="caption" color="secondary">
                {item?.desc}
              </Typography>
            )}
          </div>
        </div>
      );

      const category = (
        <Typography variant="caption" fontWeight="medium" color="text">
          {item?.category?.name || "N/A"}
        </Typography>
      );

      const status = (
        <Badge
          variant="gradient"
          badgeContent={item?.isAvailable ? "Active" : "Inactive"}
          color={item?.isAvailable ? "success" : "secondary"}
          size="xs"
        />
      );

      const action = (
        <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
          <Button
            component={Link}
            to={`/subcategory/editSubcategory/${item._id}`}
            variant="text"
            color="secondary"
            size="small"
          >
            <Icon>edit</Icon>&nbsp;Edit
          </Button>
          <Button
            variant="text"
            color="error"
            size="small"
            onClick={() => handleDelete(item._id)}
            disabled={deleteLoading}
          >
            <Icon>delete</Icon>&nbsp;Delete
          </Button>
        </div>
      );

      return {
        subcategory,
        category,
        status,
        action,
      };
    });
  }

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <Typography variant="h6">Loading subcategories...</Typography>
      </div>
    );
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <Typography variant="h6">No subcategories found</Typography>
        <Typography variant="body2" color="text">
          Create your first subcategory to get started
        </Typography>
      </div>
    );
  }

  return <Table columns={columns} rows={rows} />;
}

export default TableData;

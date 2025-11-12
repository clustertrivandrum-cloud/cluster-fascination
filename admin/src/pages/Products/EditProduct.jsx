import { Button, Grid, ToggleButton, Autocomplete, TextField } from "@mui/material";
import Box from "components/Box";
import Input from "components/Input";
import PageLayout from "layouts/PageLayout";
import React, { useEffect, useState } from "react";
import Typography from "components/Typography";
import toast from "react-hot-toast";
import {
  useGetProductById,
  useGetCategory,
  useGetSubcategoriesByCategory,
} from "queries/ProductQuery";
import { useNavigate, useParams } from "react-router-dom";
import ImageList from "./ImageList";
import { useUpdateProduct, useDeleteProduct } from "queries/ProductQuery";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState({});
  const [category, setCategory] = useState(null);
  const [subcategory, setSubcategory] = useState(null);

  const { data, isLoading } = useGetProductById({ id });
  const { data: categories, isLoading: categoriesLoading } = useGetCategory({
    pageNo: 1,
    pageCount: 100,
  });
  const { data: subcategories, isLoading: subcategoriesLoading } = useGetSubcategoriesByCategory({
    categoryId: category?._id,
  });

  useEffect(() => {
    if (data?.data) {
      setDetails(data.data);
      // Set initial category and subcategory
      if (data.data.category) {
        setCategory(typeof data.data.category === "object" ? data.data.category : null);
      }
      if (data.data.subcategory) {
        setSubcategory(typeof data.data.subcategory === "object" ? data.data.subcategory : null);
      }
    }
  }, [data]);

  useEffect(() => {
    // Reset subcategory when category changes
    if (category && details?.category?._id !== category._id) {
      setSubcategory(null);
    }
  }, [category]);

  const { mutateAsync: updateProduct, isLoading: loading } = useUpdateProduct();
  const { mutateAsync: deleteProduct, isLoading: deleting } = useDeleteProduct();
  const handleChange = (e) => {
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    console.log(details);
  }, [details]);
  const handleSubmit = () => {
    try {
      // if (!details?.name) {
      //   return toast.error("name is required")
      // }
      // if (!details?.desc) {
      //   return toast.error("description is required")
      // }
      // if (!details?.image) {
      //   return toast.error("image is required")
      // }
      const formData = new FormData();

      const image = details?.image?.filter((image) => typeof image === "string");
      console.log(image);
      formData.append("image", JSON.stringify(image));
      details?.image?.forEach((image) => {
        if (typeof image == "object") {
          formData.append("images", image, image.name);
          console.log(image);
        }
      });
      for (const key in details) {
        if (
          details.hasOwnProperty(key) &&
          key !== "image" &&
          key !== "category" &&
          key !== "subcategory"
        ) {
          formData.append(key, details[key]);
        }
      }

      // Add category and subcategory
      if (category?._id) {
        formData.append("category", category._id);
      }
      if (subcategory?._id) {
        formData.append("subcategory", subcategory._id);
      }

      updateProduct(formData)
        .then((res) => {
          if (res) {
            toast.success(res?.message ?? "product updated successfully");
            navigate("/products");
          }
        })
        .catch((err) => {
          toast.error(err?.message ?? "Something went wrong");
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = () => {
    deleteProduct(details)
      .then((res) => {
        if (res) {
          toast.success(res?.message ?? "products deleted Successfully");
          navigate("/products");
        }
      })
      .catch((err) => {
        toast.error(err?.message ?? "Something went wrong");
      });
  };
  return (
    <PageLayout title={"Edit Product"}>
      {isLoading ? (
        <Typography fontSize={14} sx={{ paddingX: 5 }}>
          loading...
        </Typography>
      ) : (
        <Grid container spacing={5} display={"flex"} direction={"row"} p={8}>
          <Grid item container spacing={2} xs={12} sm={12} md={6} py={5}>
            <Grid item xs={12} sm={12} md={6}>
              <Input
                required
                placeholder="Item name"
                id="name"
                name="name"
                value={details?.name || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                placeholder="Brand name"
                name="brand"
                value={details?.brand || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                required
                placeholder="Item subheading"
                id="subheading"
                name="subheading"
                value={details?.subheading || ""}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={8}>
              <Autocomplete
                id="category-select"
                options={categories?.data || []}
                value={category}
                onChange={(event, newValue) => {
                  setCategory(newValue);
                }}
                disabled={categoriesLoading}
                autoHighlight
                getOptionLabel={(option) => option.name || ""}
                isOptionEqualToValue={(option, value) => option._id === value._id}
                renderOption={(props, option) => (
                  <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
                    <img
                      loading="lazy"
                      width="20"
                      src={`${process.env.REACT_APP_API_URL}/uploads/${option?.image}`}
                      alt=""
                    />
                    <Typography color="inherit" variant="caption">
                      {option?.name} <br />
                      {option?.desc}
                    </Typography>
                    <Typography
                      sx={{ ml: "auto" }}
                      color={option?.isAvailable ? "success" : "error"}
                      variant="caption"
                    >
                      {option?.isAvailable ? "available" : "NA"}
                    </Typography>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Choose a category"
                    inputProps={{
                      ...params.inputProps,
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={8}>
              <Autocomplete
                id="subcategory-select"
                options={subcategories?.data || []}
                value={subcategory}
                onChange={(event, newValue) => {
                  setSubcategory(newValue);
                }}
                disabled={!category || subcategoriesLoading}
                autoHighlight
                getOptionLabel={(option) => option.name || ""}
                isOptionEqualToValue={(option, value) => option._id === value._id}
                renderOption={(props, option) => (
                  <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
                    <img
                      loading="lazy"
                      width="20"
                      src={`${process.env.REACT_APP_API_URL}/uploads/${option?.image}`}
                      alt=""
                    />
                    <Typography color="inherit" variant="caption">
                      {option?.name} <br />
                      {option?.desc}
                    </Typography>
                    <Typography
                      sx={{ ml: "auto" }}
                      color={option?.isAvailable ? "success" : "error"}
                      variant="caption"
                    >
                      {option?.isAvailable ? "available" : "NA"}
                    </Typography>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={
                      category ? "Choose a subcategory (optional)" : "Select category first"
                    }
                    inputProps={{
                      ...params.inputProps,
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Input
                placeholder="Enter Quantity"
                name="stock"
                value={details?.stock || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Input
                placeholder="MRP (Maximum Retail Price)"
                name="price"
                value={details?.price || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Input
                placeholder="Discount (%)"
                name="discount"
                value={details?.discount || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Input
                placeholder="Enter Sale Rate"
                name="sale_rate"
                value={details?.sale_rate || ""}
                onChange={handleChange}
              />
            </Grid>
            {/* <Grid xs={12} pl={3} pt={2}>
                     <Typography variant="body2">variations</Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                     <Input
                        placeholder="4 piece"
                        name="type1"
                        value={details?.type1 || ''}
                        onChange={handleChange}
                     />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                     <Input
                        placeholder="6 piece"
                        name="type2"
                        value={details?.type2 || ''}
                        onChange={handleChange}
                     />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                     <Input
                        placeholder="9 piece"
                        name="type3"
                        value={details?.type3 || ''}
                        onChange={handleChange}
                     />
                  </Grid> */}
            <Grid item xs={12} sm={6}>
              <Typography variant="caption">Product status &nbsp;</Typography>
              <ToggleButton
                value={details?.isAvailable}
                selected={details?.isAvailable}
                onChange={() => {
                  setDetails((prev) => ({ ...prev, isAvailable: !details?.isAvailable }));
                }}
                // onChange={handleChange}
              >
                {details?.isAvailable ? "Active" : "Blocked"}
              </ToggleButton>
            </Grid>
            <Grid item xs={12}>
              <Input
                id="description"
                placeholder="Product Description"
                name="description"
                value={details?.description || ""}
                onChange={handleChange}
                multiline
                rows={5}
              />
            </Grid>
            <Grid item xs={12} sm={12} mt={"auto"}>
              <Grid item xs={12}>
                <Button onClick={handleSubmit}>UPDATE PRODUCT</Button>
                <Button color="secondary" onClick={handleDelete}>
                  Delete PRODUCT
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container spacing={2} xs={12} sm={12} md={6}>
            <Grid sx={{ width: "100%" }}>
              <ImageList data={details?.image} dispatch={setDetails} />
            </Grid>
          </Grid>
        </Grid>
      )}
    </PageLayout>
  );
};

export default EditProduct;

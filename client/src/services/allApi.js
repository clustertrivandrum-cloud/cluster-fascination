import { ServerURL } from "./baseUrl";
import { commonApi } from "./commonapi";

export const getallproductsapi = async () => {
  return await commonApi("GET", `${ServerURL}/api/v1/products`);
};

// Subcategory API functions
export const getallsubcategoriesapi = async () => {
  return await commonApi("GET", `${ServerURL}/api/v1/subcategory`);
};

export const getsubcategoriesbycategoryapi = async (categoryId) => {
  return await commonApi(
    "GET",
    `${ServerURL}/api/v1/subcategory/category/${categoryId}`,
  );
};

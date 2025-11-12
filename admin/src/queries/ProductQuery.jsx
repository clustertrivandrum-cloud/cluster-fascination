import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addCategory,
  getCategoryById,
  editCategory,
  deleteCategory,
  addProduct,
  deleteProduct,
  getCategory,
  getProductById,
  getProducts,
  updateProduct,
  addSubcategory,
  editSubcategory,
  deleteSubcategory,
  getSubcategoryById,
  getSubcategories,
  getSubcategoriesByCategory,
} from "./productUrls";

const useGetCategory = (data) => {
  return useQuery(["get_category", data], () => getCategory(data), {
    staleTime: 3000,
    keepPreviousData: true,
    // refetchOnWindowFocus: false,
  });
};

const useGetCategorysById = (data) => {
  return useQuery(["get_category", data], () => getCategoryById(data), {
    staleTime: 3000,
    keepPreviousData: true,
    // refetchOnWindowFocus: false,
  });
};

const useEditCategorys = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => editCategory(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("get_category");
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};

const useDeleteCategorys = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => deleteCategory(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("get_category");
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};

const useGetProducts = (data) => {
  return useQuery(["get_products", data], () => getProducts(data), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

const useGetProductById = (data) => {
  return useQuery(["get_products", data], () => getProductById(data), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

const useAddCategory = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => addCategory(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("get_category");
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};

const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => addProduct(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("get_products");
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};
const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => updateProduct(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("get_products");
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};
const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => deleteProduct(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("get_products");
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};

// Subcategory hooks
const useGetSubcategories = (data) => {
  return useQuery(["get_subcategories", data], () => getSubcategories(data), {
    staleTime: 3000,
    keepPreviousData: true,
    // refetchOnWindowFocus: false,
  });
};

const useGetSubcategoryById = (data) => {
  return useQuery(["get_subcategory", data], () => getSubcategoryById(data), {
    staleTime: 3000,
    keepPreviousData: true,
    // refetchOnWindowFocus: false,
  });
};

const useGetSubcategoriesByCategory = (data) => {
  return useQuery(["get_subcategories_by_category", data], () => getSubcategoriesByCategory(data), {
    staleTime: 3000,
    keepPreviousData: true,
    enabled: !!data?.categoryId,
  });
};

const useAddSubcategory = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => addSubcategory(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("get_subcategories");
      queryClient.invalidateQueries("get_subcategories_by_category");
      queryClient.invalidateQueries("get_category");
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};

const useEditSubcategory = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => editSubcategory(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("get_subcategories");
      queryClient.invalidateQueries("get_subcategories_by_category");
      queryClient.invalidateQueries("get_category");
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};

const useDeleteSubcategory = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => deleteSubcategory(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("get_subcategories");
      queryClient.invalidateQueries("get_subcategories_by_category");
      queryClient.invalidateQueries("get_category");
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};

export {
  useGetCategory,
  useEditCategorys,
  useGetCategorysById,
  useDeleteCategorys,
  useGetProducts,
  useGetProductById,
  useAddCategory,
  useAddProduct,
  useUpdateProduct,
  useDeleteProduct,
  useGetSubcategories,
  useGetSubcategoryById,
  useGetSubcategoriesByCategory,
  useAddSubcategory,
  useEditSubcategory,
  useDeleteSubcategory,
};

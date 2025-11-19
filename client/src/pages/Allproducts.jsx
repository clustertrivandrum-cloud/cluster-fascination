import React, { useEffect, useState, useRef, useCallback } from "react";
import axiosInstance from "../axios";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import TopNav from "../components/TopNav";
import MiddleNav from "../components/MiddleNav";
import MainNav from "../components/MainNav";
import Footer from "../components/Footer";
import FreeDeliveryBanner from "../components/FreeDeliveryBanner";
import { ServerURL } from "../services/baseUrl";

const Allproducts = () => {
  // State Management
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSubcategory, setFilterSubcategory] = useState("");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const limit = 12;
  const hasFetchedProducts = useRef(false);
  const [category, setCategory] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [notif, setNotif] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Redux & Router
  const userDetails = useSelector((state) => state.userDetails);
  const navigate = useNavigate();
  const location = useLocation();

  // Build Query URL Helper
  const buildQueryUrl = useCallback(
    (pageNum, search, category, subcategory) => {
      let url = `/api/v1/products?page=${pageNum}&limit=${limit}`;
      if (search) url += `&search=${search}`;
      if (category) url += `&category=${category}`;
      if (subcategory) url += `&subcategory=${subcategory}`;
      return url;
    },
    [limit],
  );

  // Fetch Products
  const fetchProducts = async (urlQ, isLoadMore = false) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await axiosInstance.get(urlQ);
      const newProducts = Array.isArray(response?.data?.data)
        ? response.data.data
        : [];

      if (isLoadMore) {
        // For load more, append new products and avoid duplicates
        setProducts((prevProducts) => {
          const existingIds = new Set(prevProducts.map((p) => p._id));
          const uniqueNewProducts = newProducts.filter(
            (p) => !existingIds.has(p._id),
          );
          return [...prevProducts, ...uniqueNewProducts];
        });
      } else {
        // For fresh search/filter, replace products
        setProducts(newProducts);
      }

      // Check if there are more products to load
      setHasMoreProducts(newProducts.length === limit);

      // Fetch wishlist and cart data
      await Promise.allSettled([fetchWishlist(), fetchCart()]);
    } catch (error) {
      console.error("Error fetching products:", error);
      setHasMoreProducts(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Categories
  const fetchCategory = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/category`);
      setCategory(Array.isArray(response.data?.data) ? response.data.data : []);
    } catch (error) {
      setCategory([]);
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch Subcategories by Category
  const fetchSubcategoriesByCategory = async (categoryId) => {
    if (!categoryId) {
      setSubcategories([]);
      return;
    }
    try {
      const response = await axiosInstance.get(
        `/api/v1/subcategory/category/${categoryId}`,
      );
      setSubcategories(
        Array.isArray(response.data?.data) ? response.data.data : [],
      );
    } catch (error) {
      setSubcategories([]);
      console.error("Error fetching subcategories:", error);
    }
  };

  // Fetch Cart
  const fetchCart = async () => {
    try {
      const cartResponse = await axiosInstance.get("/api/v1/user/getcarts");
      setCartItems(cartResponse.data?.data?.item ?? []);
    } catch (error) {
      setCartItems([]);
    }
  };

  // Fetch Wishlist
  const fetchWishlist = async () => {
    try {
      const wishlistResponse = await axiosInstance.get(
        "/api/v1/user/getwishlist",
      );
      setWishlistItems(wishlistResponse.data?.data ?? []);
    } catch (error) {
      setWishlistItems([]);
    }
  };

  // Initial Load
  useEffect(() => {
    if (!hasFetchedProducts.current) {
      const searchParams = new URLSearchParams(location.search);
      const initialCategory = searchParams.get("category") || "";
      const initialSubcategory = searchParams.get("subcategory") || "";

      setFilterCategory(initialCategory);
      setFilterSubcategory(initialSubcategory);

      const query = buildQueryUrl(1, "", initialCategory, initialSubcategory);
      fetchProducts(query, false);
      fetchCategory();

      if (initialCategory) {
        fetchSubcategoriesByCategory(initialCategory);
      }

      hasFetchedProducts.current = true;
    }
  }, [location.search, buildQueryUrl]);

  // Handle Search Input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Execute Search
  const onSearch = () => {
    setPage(1);
    const urlQ = buildQueryUrl(
      1,
      searchTerm,
      filterCategory,
      filterSubcategory,
    );
    fetchProducts(urlQ, false);
  };

  // Load More Products
  const onLoad = () => {
    if (!hasMoreProducts || isLoading) return;

    const nextPage = page + 1;
    setPage(nextPage);
    const urlQ = buildQueryUrl(
      nextPage,
      searchTerm,
      filterCategory,
      filterSubcategory,
    );
    fetchProducts(urlQ, true);
  };

  // Handle Category Filter
  const handleFilterCategory = (e) => {
    const categoryId = e.target.value;
    setFilterCategory(categoryId);
    setFilterSubcategory("");
    setPage(1);

    if (categoryId) {
      fetchSubcategoriesByCategory(categoryId);
    } else {
      setSubcategories([]);
    }

    const urlQ = buildQueryUrl(1, searchTerm, categoryId, "");
    fetchProducts(urlQ, false);
  };

  // Handle Subcategory Filter
  const handleFilterSubcategory = (e) => {
    const subcategoryId = e.target.value;
    setFilterSubcategory(subcategoryId);
    setPage(1);

    const urlQ = buildQueryUrl(1, searchTerm, filterCategory, subcategoryId);
    fetchProducts(urlQ, false);
  };

  // Clear All Filters
  const clearAllFilters = () => {
    setSearchTerm("");
    setFilterCategory("");
    setFilterSubcategory("");
    setSubcategories([]);
    setPage(1);

    const urlQ = buildQueryUrl(1, "", "", "");
    fetchProducts(urlQ, false);
  };

  // Wishlist Actions
  const addWishlist = async (proId) => {
    if (!userDetails) {
      navigate("/login");
      return;
    }
    try {
      await axiosInstance.patch(`/api/v1/user/addToWishlist/${proId}`);
      await fetchWishlist();
      setNotif((prev) => !prev);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const removeWishlist = async (proId) => {
    if (!userDetails) {
      navigate("/login");
      return;
    }
    try {
      await axiosInstance.patch(`/api/v1/user/removeFromWishlist/${proId}`);
      await fetchWishlist();
      setNotif((prev) => !prev);
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  // Cart Actions
  const addCart = async (proId) => {
    if (!userDetails) {
      navigate("/login");
      return;
    }
    try {
      await axiosInstance.patch(`/api/v1/user/addToCart/${proId}`);
      await fetchCart();
      setNotif((prev) => !prev);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeCart = async (proId) => {
    if (!userDetails) {
      navigate("/login");
      return;
    }
    try {
      const found = cartItems.find((item) => item.productId?._id === proId);
      if (!found) return;

      const itemId = found._id;
      await axiosInstance.patch(`/api/v1/user/removeFromCart/${itemId}`);
      await fetchCart();
      setNotif((prev) => !prev);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  // Check if product is in wishlist/cart
  const isInWishlist = (productId) => {
    return (
      Array.isArray(wishlistItems) &&
      wishlistItems.some((item) => item._id === productId)
    );
  };

  const isInCart = (productId) => {
    return (
      Array.isArray(cartItems) &&
      cartItems.some((item) => item.productId?._id === productId)
    );
  };

  return (
    <>
      <TopNav />
      <MiddleNav notification={notif} />
      <MainNav />
      
      {/* Free Delivery Banner */}
      <FreeDeliveryBanner />

      <div className="container py-5" style={{ position: "relative" }}>
        {/* Decorative watercolor spots */}
        <div
          className="watercolor-spot spot-mint"
          style={{
            width: "250px",
            height: "250px",
            top: "50px",
            right: "5%",
            opacity: "0.12",
          }}
        ></div>
        <div
          className="watercolor-spot spot-pink"
          style={{
            width: "220px",
            height: "220px",
            bottom: "100px",
            left: "3%",
            opacity: "0.1",
          }}
        ></div>

        {/* Page Header */}
        <div className="text-center mb-5">
          <h1
            className="elegant-script"
            style={{
              fontSize: "3.5rem",
              color: "var(--text-dark)",
              marginBottom: "15px",
            }}
          >
            Our Collection
          </h1>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.2rem",
              color: "var(--text-muted)",
              fontStyle: "italic",
            }}
          >
            <span className="flower-accent">✿</span> Discover Curated Wellness
            Products <span className="flower-accent">✿</span>
          </p>
          <div className="section-divider"></div>
          <div className="mt-4">
            <span
              className="badge-cluster"
              style={{ fontSize: "1rem", padding: "8px 16px" }}
            >
              {products.length} {products.length === 1 ? "Product" : "Products"}{" "}
              Found
            </span>
          </div>
        </div>

        <div className="row">
          {/* Sidebar Filters */}
          <div className="col-lg-3 mb-4">
            <div
              className="card-cluster p-4 sticky-top"
              style={{ top: "100px" }}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5
                  className="elegant-script mb-0"
                  style={{ fontSize: "1.8rem", color: "var(--text-dark)" }}
                >
                  Filters
                </h5>
                {(filterCategory || filterSubcategory || searchTerm) && (
                  <button
                    className="btn btn-sm btn-outline-cluster"
                    onClick={clearAllFilters}
                    style={{ fontSize: "0.75rem", padding: "4px 10px" }}
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="mb-4">
                <label
                  className="form-label"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                  }}
                >
                  <i
                    className="fas fa-search me-2"
                    style={{ color: "var(--primary-mint)" }}
                  ></i>
                  Search
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearch}
                    onKeyPress={(e) => e.key === "Enter" && onSearch()}
                    style={{
                      border: "2px solid var(--soft-mint)",
                      borderRadius: "12px",
                      padding: "10px 15px",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.9rem",
                    }}
                  />
                </div>
                <button
                  className="btn btn-cluster w-100 mt-2"
                  onClick={onSearch}
                  disabled={isLoading}
                  style={{ fontSize: "0.9rem", padding: "8px" }}
                >
                  {isLoading ? "Searching..." : "Search"}
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-4">
                <label
                  className="form-label"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                  }}
                >
                  <i
                    className="fas fa-folder me-2"
                    style={{ color: "var(--primary-mint)" }}
                  ></i>
                  Category
                </label>
                <select
                  className="form-select"
                  value={filterCategory}
                  onChange={handleFilterCategory}
                  disabled={!category?.length || isLoading}
                  style={{
                    border: "2px solid var(--soft-mint)",
                    borderRadius: "12px",
                    padding: "10px 15px",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.9rem",
                  }}
                >
                  <option value="">All Categories</option>
                  {category &&
                  Array.isArray(category) &&
                  category.length > 0 ? (
                    category.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No categories
                    </option>
                  )}
                </select>
              </div>

              {/* Subcategory Filter */}
              {filterCategory && subcategories.length > 0 && (
                <div className="mb-4">
                  <label
                    className="form-label"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: "600",
                      fontSize: "0.9rem",
                    }}
                  >
                    <i
                      className="fas fa-list me-2"
                      style={{ color: "var(--primary-mint)" }}
                    ></i>
                    Subcategory
                  </label>
                  <select
                    className="form-select"
                    value={filterSubcategory}
                    onChange={handleFilterSubcategory}
                    disabled={isLoading}
                    style={{
                      border: "2px solid var(--soft-mint)",
                      borderRadius: "12px",
                      padding: "10px 15px",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.9rem",
                    }}
                  >
                    <option value="">All Subcategories</option>
                    {subcategories.map((subcat) => (
                      <option key={subcat._id} value={subcat._id}>
                        {subcat.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Active Filters */}
              {(filterCategory || filterSubcategory) && (
                <div
                  className="mt-4 pt-3"
                  style={{ borderTop: "2px solid var(--light-mint)" }}
                >
                  <h6
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      marginBottom: "12px",
                    }}
                  >
                    Active Filters:
                  </h6>
                  <div className="d-flex flex-wrap gap-2">
                    {filterCategory && (
                      <span
                        className="badge-cluster"
                        style={{ fontSize: "0.75rem", padding: "5px 10px" }}
                      >
                        Category
                      </span>
                    )}
                    {filterSubcategory && (
                      <span
                        className="badge-cluster"
                        style={{
                          fontSize: "0.75rem",
                          padding: "5px 10px",
                          background: "var(--accent-pink)",
                        }}
                      >
                        Subcategory
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="col-lg-9">
            {isLoading && products.length === 0 ? (
              <div className="text-center my-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading products...</p>
              </div>
            ) : (
              <>
                <div className="row g-4">
                  {Array.isArray(products) && products.length > 0 ? (
                    products.map((item) => (
                      <div key={item._id} className="col-12 col-md-6 col-xl-4">
                        <div
                          className="card-cluster h-100"
                          style={{
                            transition: "all 0.3s ease",
                            overflow: "hidden",
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.transform =
                              "translateY(-5px)";
                            e.currentTarget.style.boxShadow =
                              "0 15px 35px rgba(185, 234, 216, 0.3)";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow =
                              "0 5px 20px rgba(185, 234, 216, 0.15)";
                          }}
                        >
                          <Link
                            to={`/product/${item._id}/${item.category}`}
                            style={{ textDecoration: "none" }}
                          >
                            <div
                              style={{ height: "280px", overflow: "hidden" }}
                            >
                              <img
                                src={
                                  Array.isArray(item.image) &&
                                  item.image.length > 0
                                    ? `${ServerURL}/uploads/${item.image[0]}`
                                    : "https://via.placeholder.com/350x350?text=No+Image"
                                }
                                className="w-100 h-100"
                                style={{
                                  objectFit: "cover",
                                  transition: "transform 0.3s ease",
                                }}
                                alt={item.name || "Product Image"}
                                onMouseOver={(e) =>
                                  (e.target.style.transform = "scale(1.05)")
                                }
                                onMouseOut={(e) =>
                                  (e.target.style.transform = "scale(1)")
                                }
                              />
                            </div>
                          </Link>
                          <div className="p-4">
                            <h5
                              style={{
                                fontFamily: "var(--font-serif)",
                                fontWeight: "600",
                                color: "var(--text-dark)",
                                marginBottom: "15px",
                                lineHeight: "1.4",
                              }}
                            >
                              {item.name || "Unnamed Product"}
                            </h5>

                            <div className="mb-3">
                              <div className="d-flex align-items-center justify-content-between mb-2">
                                <span
                                  style={{
                                    fontFamily: "var(--font-sans)",
                                    fontWeight: "700",
                                    fontSize: "1.3rem",
                                    color: "var(--success-green)",
                                  }}
                                >
                                  ₹
                                  {typeof item.sale_rate === "number"
                                    ? item.sale_rate
                                    : "-"}
                                </span>
                                {item.quantity !== undefined && (
                                  <span
                                    style={{
                                      fontFamily: "var(--font-sans)",
                                      fontSize: "0.85rem",
                                      color: "var(--text-muted)",
                                      background: "var(--light-mint)",
                                      padding: "4px 8px",
                                      borderRadius: "10px",
                                    }}
                                  >
                                    {item.quantity} available
                                  </span>
                                )}
                              </div>

                              <div className="d-flex align-items-center gap-2">
                                <span
                                  style={{
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "0.9rem",
                                    color: "var(--text-muted)",
                                    textDecoration: "line-through",
                                  }}
                                >
                                  ₹
                                  {typeof item.price === "number"
                                    ? item.price
                                    : "-"}
                                </span>
                                <span
                                  className="badge-cluster"
                                  style={{
                                    background: "var(--accent-pink)",
                                    fontSize: "0.8rem",
                                  }}
                                >
                                  {typeof item.discount === "number"
                                    ? item.discount
                                    : 0}
                                  % off
                                </span>
                              </div>
                            </div>

                            <div className="d-flex justify-content-between align-items-center gap-2">
                              {!isInWishlist(item._id) ? (
                                <button
                                  className="btn btn-outline-cluster"
                                  onClick={() => addWishlist(item._id)}
                                  style={{
                                    width: "45px",
                                    height: "45px",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderColor: "var(--accent-pink)",
                                    color: "var(--text-dark)",
                                  }}
                                  onMouseOver={(e) => {
                                    e.currentTarget.style.background =
                                      "var(--accent-pink)";
                                    e.currentTarget.style.color = "white";
                                  }}
                                  onMouseOut={(e) => {
                                    e.currentTarget.style.background =
                                      "transparent";
                                    e.currentTarget.style.color =
                                      "var(--text-dark)";
                                  }}
                                >
                                  <i
                                    className="fas fa-heart"
                                    style={{ fontSize: "0.9rem" }}
                                  ></i>
                                </button>
                              ) : (
                                <button
                                  className="btn btn-cluster"
                                  onClick={() => removeWishlist(item._id)}
                                  style={{
                                    width: "45px",
                                    height: "45px",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: "var(--accent-pink)",
                                    border: "none",
                                  }}
                                >
                                  <i
                                    className="fas fa-heart"
                                    style={{ fontSize: "0.9rem" }}
                                  ></i>
                                </button>
                              )}

                              {!isInCart(item._id) ? (
                                <button
                                  className="btn btn-cluster flex-grow-1"
                                  onClick={() => addCart(item._id)}
                                  style={{
                                    fontFamily: "var(--font-sans)",
                                    fontWeight: "500",
                                    fontSize: "0.9rem",
                                    padding: "10px 15px",
                                  }}
                                >
                                  <i className="fas fa-shopping-cart me-2"></i>
                                  Add to Cart
                                </button>
                              ) : (
                                <button
                                  className="btn btn-outline-cluster flex-grow-1"
                                  onClick={() => removeCart(item._id)}
                                  style={{
                                    fontFamily: "var(--font-sans)",
                                    fontWeight: "500",
                                    fontSize: "0.9rem",
                                    padding: "10px 15px",
                                    borderColor: "var(--accent-pink)",
                                    color: "var(--text-dark)",
                                  }}
                                  onMouseOver={(e) => {
                                    e.currentTarget.style.background =
                                      "var(--accent-pink)";
                                    e.currentTarget.style.color = "white";
                                  }}
                                  onMouseOut={(e) => {
                                    e.currentTarget.style.background =
                                      "transparent";
                                    e.currentTarget.style.color =
                                      "var(--text-dark)";
                                  }}
                                >
                                  <i className="fas fa-trash me-2"></i>Remove
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center my-5">
                      <div className="card-cluster p-5">
                        <i
                          className="fas fa-leaf mb-3"
                          style={{
                            fontSize: "4rem",
                            color: "var(--primary-mint)",
                            opacity: "0.5",
                          }}
                        ></i>
                        <h3
                          className="mb-3"
                          style={{
                            fontFamily: "var(--font-elegant-script)",
                            fontSize: "2rem",
                            color: "var(--text-dark)",
                          }}
                        >
                          No products found
                        </h3>
                        <p
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "1.1rem",
                            color: "var(--text-muted)",
                          }}
                        >
                          Try adjusting your search or browse our categories
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Load More Button */}
                {products.length > 0 && hasMoreProducts && (
                  <div className="text-center mt-5">
                    <button
                      className="btn btn-cluster"
                      onClick={onLoad}
                      disabled={isLoading || !hasMoreProducts}
                      style={{
                        padding: "12px 30px",
                        fontSize: "1rem",
                        fontWeight: "600",
                      }}
                    >
                      {isLoading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Loading...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-plus me-2"></i>Load More Products
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* No More Products Message */}
                {products.length > 0 && !hasMoreProducts && (
                  <div className="text-center mt-5">
                    <p
                      style={{
                        color: "var(--text-muted)",
                        fontStyle: "italic",
                      }}
                    >
                      You've reached the end of our collection
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Allproducts;

import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../axios";

import "./Component.css";

function MainNav() {
  const userDetails = useSelector((state) => state.userDetails);
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState(null);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/category");
      const categoriesData = Array.isArray(response.data?.data)
        ? response.data.data
        : [];

      // Fetch subcategories for each category
      const categoriesWithSubs = await Promise.all(
        categoriesData.map(async (category) => {
          try {
            const subResponse = await axiosInstance.get(
              `/api/v1/subcategory/category/${category._id}`,
            );
            return {
              ...category,
              subcategories: Array.isArray(subResponse.data?.data)
                ? subResponse.data.data
                : [],
            };
          } catch (error) {
            console.error(
              `Error fetching subcategories for ${category.name}:`,
              error,
            );
            return { ...category, subcategories: [] };
          }
        }),
      );

      setCategories(categoriesWithSubs);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setShowDropdown(false);
    setHoveredCategory(null);
    setIsNavCollapsed(true);
    navigate(`/allproducts?category=${categoryId}`);
  };

  const handleSubcategoryClick = (categoryId, subcategoryId) => {
    setShowDropdown(false);
    setHoveredCategory(null);
    setIsNavCollapsed(true);
    setExpandedMobileCategory(null);
    navigate(
      `/allproducts?category=${categoryId}&subcategory=${subcategoryId}`,
    );
  };

  const handleNavLinkClick = () => {
    setIsNavCollapsed(true);
  };

  const toggleMobileCategory = (categoryId) => {
    setExpandedMobileCategory(
      expandedMobileCategory === categoryId ? null : categoryId,
    );
  };

  return (
    <div style={{ position: "relative" }}>
      <Navbar
        expand="lg"
        expanded={!isNavCollapsed}
        className="nav-bar"
        style={{
          padding: "0",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          background: "white",
        }}
      >
        <Container>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setIsNavCollapsed(!isNavCollapsed)}
            style={{
              border: "2px solid var(--text-dark)",
              borderRadius: "8px",
              padding: "8px 12px",
            }}
          />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-center"
          >
            <Nav
              style={{
                gap: "0",
                alignItems: "stretch",
                minHeight: "56px",
              }}
            >
              <Link
                to={"/"}
                onClick={handleNavLinkClick}
                style={{
                  color: "var(--text-dark)",
                  fontFamily: "var(--font-sans)",
                  fontWeight: "500",
                  fontSize: "14px",
                  padding: "0 20px",
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  borderBottom: "2px solid transparent",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (window.innerWidth >= 992) {
                    e.target.style.borderBottomColor = "var(--primary-mint)";
                    e.target.style.color = "var(--primary-mint)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (window.innerWidth >= 992) {
                    e.target.style.borderBottomColor = "transparent";
                    e.target.style.color = "var(--text-dark)";
                  }
                }}
              >
                Home
              </Link>

              {/* Desktop: Mega Menu | Mobile: Accordion */}
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  width: window.innerWidth < 992 ? "100%" : "auto",
                }}
                onMouseEnter={() => {
                  if (window.innerWidth >= 992) {
                    setShowDropdown(true);
                  }
                }}
                onMouseLeave={() => {
                  if (window.innerWidth >= 992) {
                    setShowDropdown(false);
                    setHoveredCategory(null);
                  }
                }}
              >
                <span
                  onClick={() => {
                    if (window.innerWidth < 992) {
                      setShowDropdown(!showDropdown);
                    }
                  }}
                  style={{
                    color: "var(--text-dark)",
                    fontFamily: "var(--font-sans)",
                    fontWeight: "500",
                    fontSize: "14px",
                    cursor: "pointer",
                    padding: "0 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    minHeight: "56px",
                    borderBottom:
                      window.innerWidth >= 992 && showDropdown
                        ? "2px solid var(--primary-mint)"
                        : "2px solid transparent",
                    color:
                      window.innerWidth >= 992 && showDropdown
                        ? "var(--primary-mint)"
                        : "var(--text-dark)",
                    transition: "all 0.2s ease",
                    width: window.innerWidth < 992 ? "100%" : "auto",
                  }}
                >
                  <span>Categories</span>
                  <i
                    className="fas fa-chevron-down ms-2"
                    style={{
                      fontSize: "10px",
                      transition: "transform 0.2s ease",
                      transform: showDropdown ? "rotate(180deg)" : "rotate(0)",
                    }}
                  ></i>
                </span>

                {/* Desktop Mega Menu */}
                {showDropdown && window.innerWidth >= 992 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "white",
                      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
                      minWidth: "800px",
                      maxWidth: "1000px",
                      zIndex: 1000,
                      display: "flex",
                      marginTop: "0",
                      borderTop: "2px solid var(--primary-mint)",
                    }}
                  >
                    {/* Left Side - Categories List */}
                    <div
                      style={{
                        width: "260px",
                        borderRight: "1px solid #f0f0f0",
                        background: "#fafafa",
                        padding: "20px 0",
                        maxHeight: "500px",
                        overflowY: "auto",
                      }}
                    >
                      {/* All Products */}
                      <div
                        onClick={() => {
                          setShowDropdown(false);
                          navigate("/allproducts");
                        }}
                        style={{
                          padding: "12px 20px",
                          cursor: "pointer",
                          fontFamily: "var(--font-sans)",
                          fontSize: "13px",
                          fontWeight: "600",
                          color: "var(--primary-mint)",
                          transition: "all 0.2s ease",
                          background:
                            hoveredCategory === "all" ? "white" : "transparent",
                        }}
                        onMouseEnter={() => setHoveredCategory("all")}
                      >
                        <i className="fas fa-th-large me-2"></i>
                        All Products
                      </div>

                      {/* Categories */}
                      {categories.map((category) => (
                        <div
                          key={category._id}
                          onMouseEnter={() => setHoveredCategory(category._id)}
                          onClick={() => handleCategoryClick(category._id)}
                          style={{
                            padding: "12px 20px",
                            cursor: "pointer",
                            fontFamily: "var(--font-sans)",
                            fontSize: "13px",
                            fontWeight: "500",
                            color:
                              hoveredCategory === category._id
                                ? "var(--primary-mint)"
                                : "var(--text-dark)",
                            background:
                              hoveredCategory === category._id
                                ? "white"
                                : "transparent",
                            borderLeft:
                              hoveredCategory === category._id
                                ? "3px solid var(--primary-mint)"
                                : "3px solid transparent",
                            transition: "all 0.2s ease",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <span>{category.name}</span>
                          {category.subcategories &&
                            category.subcategories.length > 0 && (
                              <i
                                className="fas fa-chevron-right"
                                style={{
                                  fontSize: "10px",
                                  color:
                                    hoveredCategory === category._id
                                      ? "var(--primary-mint)"
                                      : "#999",
                                }}
                              ></i>
                            )}
                        </div>
                      ))}

                      {categories.length === 0 && (
                        <div
                          style={{
                            padding: "20px",
                            textAlign: "center",
                            color: "#999",
                            fontSize: "12px",
                          }}
                        >
                          No categories
                        </div>
                      )}
                    </div>

                    {/* Right Side - Subcategories Display */}
                    <div
                      style={{
                        flex: 1,
                        padding: "20px 25px",
                        background: "white",
                        maxHeight: "500px",
                        overflowY: "auto",
                      }}
                    >
                      {hoveredCategory === "all" && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            color: "#999",
                            fontFamily: "var(--font-sans)",
                            fontSize: "13px",
                          }}
                        >
                          <div style={{ textAlign: "center" }}>
                            <i
                              className="fas fa-shopping-bag"
                              style={{ fontSize: "48px", marginBottom: "15px" }}
                            ></i>
                            <div>Browse all available products</div>
                          </div>
                        </div>
                      )}

                      {hoveredCategory &&
                        hoveredCategory !== "all" &&
                        (() => {
                          const category = categories.find(
                            (cat) => cat._id === hoveredCategory,
                          );
                          if (
                            !category ||
                            !category.subcategories ||
                            category.subcategories.length === 0
                          ) {
                            return (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  height: "100%",
                                  color: "#999",
                                  fontSize: "12px",
                                }}
                              >
                                No subcategories available
                              </div>
                            );
                          }

                          return (
                            <div>
                              <div
                                style={{
                                  fontFamily: "var(--font-sans)",
                                  fontSize: "12px",
                                  fontWeight: "600",
                                  color: "#666",
                                  marginBottom: "15px",
                                  textTransform: "uppercase",
                                  letterSpacing: "0.5px",
                                }}
                              >
                                {category.name}
                              </div>
                              <div
                                style={{
                                  display: "grid",
                                  gridTemplateColumns:
                                    "repeat(auto-fill, minmax(180px, 1fr))",
                                  gap: "10px",
                                }}
                              >
                                {category.subcategories.map((subcategory) => (
                                  <div
                                    key={subcategory._id}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSubcategoryClick(
                                        category._id,
                                        subcategory._id,
                                      );
                                    }}
                                    style={{
                                      padding: "10px 12px",
                                      cursor: "pointer",
                                      fontFamily: "var(--font-sans)",
                                      fontSize: "13px",
                                      color: "var(--text-dark)",
                                      borderRadius: "6px",
                                      transition: "all 0.2s ease",
                                      background: "transparent",
                                    }}
                                    onMouseEnter={(e) => {
                                      e.target.style.background =
                                        "var(--light-mint)";
                                      e.target.style.color =
                                        "var(--primary-mint)";
                                      e.target.style.transform =
                                        "translateX(4px)";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.target.style.background = "transparent";
                                      e.target.style.color = "var(--text-dark)";
                                      e.target.style.transform =
                                        "translateX(0)";
                                    }}
                                  >
                                    {subcategory.name}
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })()}

                      {!hoveredCategory && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            color: "#999",
                            fontFamily: "var(--font-sans)",
                            fontSize: "13px",
                          }}
                        >
                          Hover over a category to see subcategories
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Mobile Accordion Menu */}
                {showDropdown && window.innerWidth < 992 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: "0",
                      right: "0",
                      background: "white",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      zIndex: 1000,
                      maxHeight: "400px",
                      overflowY: "auto",
                      borderTop: "2px solid var(--primary-mint)",
                    }}
                  >
                    {/* All Products */}
                    <div
                      onClick={() => {
                        setShowDropdown(false);
                        setIsNavCollapsed(true);
                        navigate("/allproducts");
                      }}
                      style={{
                        padding: "15px 20px",
                        borderBottom: "1px solid #f0f0f0",
                        cursor: "pointer",
                        fontFamily: "var(--font-sans)",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "var(--primary-mint)",
                        background: "#fafafa",
                      }}
                    >
                      <i className="fas fa-th-large me-2"></i>
                      All Products
                    </div>

                    {/* Categories with Accordion */}
                    {categories.map((category) => (
                      <div
                        key={category._id}
                        style={{
                          borderBottom: "1px solid #f0f0f0",
                        }}
                      >
                        <div
                          onClick={() => {
                            if (
                              category.subcategories &&
                              category.subcategories.length > 0
                            ) {
                              toggleMobileCategory(category._id);
                            } else {
                              handleCategoryClick(category._id);
                            }
                          }}
                          style={{
                            padding: "15px 20px",
                            cursor: "pointer",
                            fontFamily: "var(--font-sans)",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "var(--text-dark)",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            background:
                              expandedMobileCategory === category._id
                                ? "#fafafa"
                                : "white",
                          }}
                        >
                          <span>{category.name}</span>
                          {category.subcategories &&
                            category.subcategories.length > 0 && (
                              <i
                                className={`fas fa-chevron-${
                                  expandedMobileCategory === category._id
                                    ? "up"
                                    : "down"
                                }`}
                                style={{
                                  fontSize: "10px",
                                  color: "var(--primary-mint)",
                                }}
                              ></i>
                            )}
                        </div>

                        {/* Subcategories */}
                        {expandedMobileCategory === category._id &&
                          category.subcategories &&
                          category.subcategories.length > 0 && (
                            <div
                              style={{
                                background: "#f9f9f9",
                                borderTop: "1px solid #f0f0f0",
                              }}
                            >
                              {category.subcategories.map((subcategory) => (
                                <div
                                  key={subcategory._id}
                                  onClick={() =>
                                    handleSubcategoryClick(
                                      category._id,
                                      subcategory._id,
                                    )
                                  }
                                  style={{
                                    padding: "12px 20px 12px 40px",
                                    cursor: "pointer",
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "13px",
                                    color: "var(--text-muted)",
                                    borderBottom: "1px solid #f0f0f0",
                                  }}
                                >
                                  <i
                                    className="fas fa-circle"
                                    style={{
                                      fontSize: "6px",
                                      marginRight: "10px",
                                      color: "var(--accent-pink)",
                                    }}
                                  ></i>
                                  {subcategory.name}
                                </div>
                              ))}
                            </div>
                          )}
                      </div>
                    ))}

                    {categories.length === 0 && (
                      <div
                        style={{
                          padding: "30px 20px",
                          textAlign: "center",
                          color: "#999",
                          fontSize: "13px",
                        }}
                      >
                        No categories available
                      </div>
                    )}
                  </div>
                )}
              </div>

              <Link
                to={userDetails ? "/profile" : "/login"}
                onClick={handleNavLinkClick}
                style={{
                  color: "var(--text-dark)",
                  fontFamily: "var(--font-sans)",
                  fontWeight: "500",
                  fontSize: "14px",
                  padding: "0 20px",
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  borderBottom: "2px solid transparent",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (window.innerWidth >= 992) {
                    e.target.style.borderBottomColor = "var(--primary-mint)";
                    e.target.style.color = "var(--primary-mint)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (window.innerWidth >= 992) {
                    e.target.style.borderBottomColor = "transparent";
                    e.target.style.color = "var(--text-dark)";
                  }
                }}
              >
                Profile
              </Link>

              <Link
                to={"/contactus"}
                onClick={handleNavLinkClick}
                style={{
                  color: "var(--text-dark)",
                  fontFamily: "var(--font-sans)",
                  fontWeight: "500",
                  fontSize: "14px",
                  padding: "0 20px",
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  borderBottom: "2px solid transparent",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (window.innerWidth >= 992) {
                    e.target.style.borderBottomColor = "var(--primary-mint)";
                    e.target.style.color = "var(--primary-mint)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (window.innerWidth >= 992) {
                    e.target.style.borderBottomColor = "transparent";
                    e.target.style.color = "var(--text-dark)";
                  }
                }}
              >
                Contact
              </Link>

              <Link
                to={"/blogs"}
                onClick={handleNavLinkClick}
                style={{
                  color: "var(--text-dark)",
                  fontFamily: "var(--font-sans)",
                  fontWeight: "500",
                  fontSize: "14px",
                  padding: "0 20px",
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  borderBottom: "2px solid transparent",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (window.innerWidth >= 992) {
                    e.target.style.borderBottomColor = "var(--primary-mint)";
                    e.target.style.color = "var(--primary-mint)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (window.innerWidth >= 992) {
                    e.target.style.borderBottomColor = "transparent";
                    e.target.style.color = "var(--text-dark)";
                  }
                }}
              >
                Style Guide
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Add responsive styles */}
      <style>
        {`
          @media (max-width: 991px) {
            .navbar-collapse {
              background: white;
              padding: 10px 0;
              margin-top: 10px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
              border-radius: 8px;
            }

            .navbar-collapse .nav {
              flex-direction: column;
              width: 100%;
              gap: 0 !important;
            }

            .navbar-collapse .nav a,
            .navbar-collapse .nav > div {
              width: 100%;
              padding: 15px 20px !important;
              border-bottom: 1px solid #f0f0f0 !important;
              justify-content: flex-start;
              min-height: auto !important;
            }

            .navbar-collapse .nav a:hover,
            .navbar-collapse .nav > div > span:hover {
              background: var(--light-mint) !important;
              color: var(--primary-mint) !important;
            }
          }

          @media (max-width: 768px) {
            .navbar-brand {
              font-size: 18px;
            }

            .navbar-toggler {
              padding: 6px 10px;
            }
          }
        `}
      </style>
    </div>
  );
}

export default MainNav;

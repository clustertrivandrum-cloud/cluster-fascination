import React, { useState, useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import "./Category.css";
import { ServerURL } from "../services/baseUrl";
import { SectionDivider } from "./DecorativeElements";

function Category() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/api/v1/category");
        setCategories(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories. Please try again later.");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const fetchSubcategories = async (categoryId) => {
    if (subcategories[categoryId]) {
      // Already fetched, just toggle
      setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
      return;
    }

    try {
      const response = await axiosInstance.get(
        `/api/v1/subcategory/category/${categoryId}`,
      );
      setSubcategories((prev) => ({
        ...prev,
        [categoryId]: response.data.data || [],
      }));
      setExpandedCategory(categoryId);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setSubcategories((prev) => ({
        ...prev,
        [categoryId]: [],
      }));
    }
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/allproducts?category=${categoryId}`);
  };

  const handleSubcategoryClick = (e, subcategoryId) => {
    e.stopPropagation();
    navigate(`/allproducts?subcategory=${subcategoryId}`);
  };

  const handleCategoryHover = (categoryId) => {
    if (!subcategories[categoryId]) {
      fetchSubcategories(categoryId);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "200px" }}
      >
        <Spinner
          animation="border"
          role="status"
          style={{ color: "var(--primary-mint)" }}
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <section className="categories-section py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title elegant-script">Shop by Category</h2>
          <p className="section-subtitle">
            Discover our curated jewellery collections 
          </p>
          <div className="d-flex justify-content-center">
            <SectionDivider width={200} />
          </div>
        </div>

        <Row className="g-4 justify-content-center">
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <Col key={category._id} xs={6} sm={6} md={4} lg={3}>
                <div
                  className="category-card-enhanced"
                  onMouseEnter={() => handleCategoryHover(category._id)}
                  role="button"
                >
                  {/* Main Category Card */}
                  <div
                    className="category-main-card"
                    onClick={() => handleCategoryClick(category._id)}
                  >
                    <div className="category-image-wrapper">
                      <img
                        src={`${ServerURL}/uploads/${category.image}`}
                        alt={category.name}
                        className="category-image"
                      />
                      <div className="category-overlay">
                        <span className="category-explore-text">Explore</span>
                      </div>
                    </div>
                    <div className="category-content">
                      <h5 className="category-title">{category.name}</h5>
                      {subcategories[category._id] &&
                        subcategories[category._id].length > 0 && (
                          <button
                            className="subcategory-toggle"
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedCategory(
                                expandedCategory === category._id
                                  ? null
                                  : category._id,
                              );
                            }}
                          >
                            <i
                              className={`fas fa-chevron-${expandedCategory === category._id ? "up" : "down"}`}
                            ></i>
                            <span className="ms-2">
                              {subcategories[category._id].length} types
                            </span>
                          </button>
                        )}
                    </div>
                  </div>

                  {/* Subcategories Dropdown */}
                  {expandedCategory === category._id &&
                    subcategories[category._id] &&
                    subcategories[category._id].length > 0 && (
                      <div className="subcategories-dropdown">
                        <div className="subcategories-list">
                          {subcategories[category._id].map((subcat) => (
                            <div
                              key={subcat._id}
                              className="subcategory-item"
                              onClick={(e) =>
                                handleSubcategoryClick(e, subcat._id)
                              }
                            >
                              <i className="fas fa-angle-right me-2"></i>
                              <span>{subcat.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </Col>
            ))
          ) : (
            <div className="text-center p-5">
              <div className="empty-state">
                <i
                  className="fas fa-leaf mb-3"
                  style={{
                    fontSize: "3rem",
                    color: "var(--primary-mint)",
                    opacity: "0.5",
                  }}
                ></i>
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "var(--text-muted)",
                  }}
                >
                  No categories available at the moment
                </p>
              </div>
            </div>
          )}
        </Row>

        {/* View All Categories Button */}
        {categories && categories.length > 4 && (
          <div className="text-center mt-5">
            <button
              className="btn btn-cluster px-5 py-3"
              onClick={() => navigate("/allproducts")}
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                boxShadow: "0 5px 20px rgba(185, 234, 216, 0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow =
                  "0 8px 30px rgba(185, 234, 216, 0.4)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow =
                  "0 5px 20px rgba(185, 234, 216, 0.3)";
              }}
            >
              <i className="fas fa-th me-2"></i>
              View All Categories
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}

export default Category;

import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';
import './Category.css';
import { ServerURL } from '../services/baseUrl';
import { SectionDivider } from './DecorativeElements';

function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/api/v1/category');
        setCategories(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories. Please try again later.');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/allproducts?category=${categoryId}`);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
        <Spinner animation="border" role="status" style={{color: 'var(--primary-mint)'}}>
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
        <h2 className="section-title elegant-script">Featured Categories</h2>
        <p className="section-subtitle">Explore our curated collection</p>
        <div className="d-flex justify-content-center mb-5">
          <SectionDivider width={200} />
        </div>
        <Row className="g-4 justify-content-center">
          {categories && categories.length > 0 ? categories.slice(0, 4).map((category) => (
            <Col key={category._id} xs={6} sm={6} md={4} lg={3}>
              <div
                className="category-card"
                onClick={() => handleCategoryClick(category._id)}
                role="button"
              >
                <div className="category-image-wrapper">
                  <img
                    src={`${ServerURL}/uploads/${category.image}`}
                    alt={category.name}
                    className="category-image"
                  />
                </div>
                <div className="category-content">
                  <h5 className="category-title">{category.name}</h5>
                </div>
              </div>
            </Col>
          )) : (
            <div className="text-center p-5">
              <p>No categories available</p>
            </div>
          )}
        </Row>
      </Container>
    </section>
  );
}

export default Category;
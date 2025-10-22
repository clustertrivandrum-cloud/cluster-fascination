import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Products.css';
import { ServerURL } from '../services/baseUrl';
import { SectionDivider, FlowerAccent } from './DecorativeElements';

function Products({ setNotification }) {
  const [products, setProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const userDetails = useSelector(state => state.userDetails);
  let urlQuery = '';

  useEffect(() => {
    urlQuery = `/api/v1/products/productshome?page=1&limit=8&sortField=createdAt&sortOrder=desc`;

    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(urlQuery);
        setProducts(response.data.data);
        const wishlistResponse = await axiosInstance.get('/api/v1/user/getwishlist');
        setWishlistItems(wishlistResponse.data.data || []);
        const cartResponse = await axiosInstance.get('/api/v1/user/getcarts');
        setCartItems(cartResponse.data.data.item || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const fetchCart = async () => {
    try {
      const cartResponse = await axiosInstance.get('/api/v1/user/getcarts');
      setCartItems(cartResponse.data.data.item || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWishlist = async () => {
    try {
      const wishlistResponse = await axiosInstance.get('/api/v1/user/getwishlist');
      setWishlistItems(wishlistResponse.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const addWishlist = async (proId) => {
    if (!userDetails) {
      navigate('/login');
    } else {
      try {
        urlQuery = `/api/v1/user/addToWishlist/${proId}`;
        const response = await axiosInstance.patch(urlQuery);
        await fetchWishlist();
        setNotification(prev => !prev);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeWishlist = async (proId) => {
    if (!userDetails) {
      navigate('/login');
    } else {
      try {
        urlQuery = `/api/v1/user/removeFromWishlist/${proId}`;
        const response = await axiosInstance.patch(urlQuery);
        await fetchWishlist();
        setNotification(prev => !prev);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addCart = async (proId) => {
    if (!userDetails) {
      navigate('/login');
    } else {
      try {
        urlQuery = `/api/v1/user/addToCart/${proId}`;
        const response = await axiosInstance.patch(urlQuery);
        await fetchCart();
        setNotification(prev => !prev);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeCart = async (proId) => {
    if (!userDetails) {
      navigate('/login');
    } else {
      try {
        const ItemId = cartItems.filter((item) => item.productId._id === proId);
        if (ItemId.length > 0) {
          urlQuery = `/api/v1/user/removeFromCart/${ItemId[0]._id}`;
        } else {
          return;
        }
        const response = await axiosInstance.patch(urlQuery);
        await fetchCart();
        setNotification(prev => !prev);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems && wishlistItems.some((item) => item._id === productId);
  };

  const isInCart = (productId) => {
    return cartItems && cartItems.some((item) => item.productId._id === productId);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        }
      }
    ]
  };

  return (
    <section className="products-section watercolor-bg py-5" style={{ position: 'relative', overflowX: 'hidden' }}>
      {/* Watercolor decorative spots */}
      <div className="watercolor-spot spot-mint" 
           style={{width: '300px', height: '300px', top: '10%', right: '5%'}}></div>
      <div className="watercolor-spot spot-pink" 
           style={{width: '250px', height: '250px', bottom: '15%', left: '8%'}}></div>
      
      <Container className="position-relative">
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2 className="elegant-script mb-3" style={{fontSize: '2.5rem', color: 'var(--text-dark)'}}>
            <FlowerAccent size={30} color="var(--accent-pink)" />
            Boutique Collection
            <FlowerAccent size={30} color="var(--accent-pink)" />
          </h2>
          <div className="d-flex justify-content-center mb-4">
            <SectionDivider width={200} />
          </div>
          <p className="text-muted" style={{fontSize: '1.1rem'}}>
            Discover our curated selection of premium products
          </p>
        </div>

        {/* Products Slider */}
        <Row>
          <Col xs={12}>
            <div className="products-slider-container">
              <Slider {...settings}>
                {products && products.length > 0 ? products.map(item => (
                  <div key={item._id} className="slider-item">
                    <div className="product-card card-cluster">
                      <div className="product-image-container">
                        <Link to={`/product/${item._id}/${item.category}`}>
                          <img 
                            src={`${ServerURL}/uploads/${item.image[0]}`} 
                            alt={item.name} 
                            className="product-image" 
                          />
                        </Link>
                        <div className="product-badge">
                          <span className="badge-cluster">{item.discount}% off</span>
                        </div>
                      </div>
                      
                      <div className="product-info">
                        <Link to={`/product/${item._id}/${item.category}`} className="product-link">
                          <h5 className="product-title">{item.name}</h5>
                        </Link>
                        
                        <div className="product-pricing">
                          <p className="product-price">₹{item.sale_rate}</p>
                          <div className="price-details">
                            <span className="original-price">₹{item.price}</span>
                            <span className="discount-badge">{item.discount}% off</span>
                          </div>
                          <p className="product-weight">500 gm</p>
                        </div>
                        
                        <div className="product-actions">
                          {!isInWishlist(item._id) ? (
                            <Button 
                              className="btn-wishlist" 
                              onClick={() => addWishlist(item._id)}
                              title="Add to Wishlist"
                            >
                              <i className="fa-regular fa-heart"></i>
                            </Button>
                          ) : (
                            <Button 
                              className="btn-wishlist active" 
                              onClick={() => removeWishlist(item._id)}
                              title="Remove from Wishlist"
                            >
                              <i className="fa-solid fa-heart"></i>
                            </Button>
                          )}
                          
                          {!isInCart(item._id) ? (
                            <Button 
                              className="btn-add-cart" 
                              onClick={() => addCart(item._id)}
                            >
                              <i className="fas fa-shopping-cart me-2"></i>
                              Add to Cart
                            </Button>
                          ) : (
                            <Button 
                              className="btn-add-cart active" 
                              onClick={() => removeCart(item._id)}
                            >
                              <i className="fas fa-shopping-cart me-2"></i>
                              In Cart
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="text-center p-5">
                    <div className="empty-state">
                      <i className="fa-solid fa-box-open mb-3" style={{fontSize: '3rem', color: 'var(--text-muted)'}}></i>
                      <p className="text-muted">No products available at the moment</p>
                    </div>
                  </div>
                )}
              </Slider>
            </div>
            
            {/* Explore Collection Button */}
            <div className="text-center mt-5">
              <Link to="/allproducts">
                <Button className="btn btn-cluster px-5 py-3">
                  <i className="fa-solid fa-arrow-right me-2"></i>
                  Explore Full Collection
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Products;

import React, { useEffect, useState, useRef } from 'react';
import axiosInstance from '../axios';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import TopNav from '../components/TopNav';
import MiddleNav from '../components/MiddleNav';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';
import { ServerURL } from '../services/baseUrl';

const Allproducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const hasFetchedProducts = useRef(false);
  const [category, setCategory] = useState([]);
  const userDetails = useSelector(state => state.userDetails);
  const navigate = useNavigate();
  const location = useLocation();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [notif, setNotif] = useState(true);

  let urlQuery = `/api/v1/products?page=${page}&limit=${limit}&sortField=createdAt&sortOrder=desc`;

  const fetchProducts = async (urlQ) => {
    try {
      const response = await axiosInstance.get(urlQ);
      setProducts((prevProducts) => [
        ...prevProducts,
        ...(Array.isArray(response?.data?.data) ? response.data.data : [])
      ]);
      try {
        const wishlistResponse = await axiosInstance.get('/api/v1/user/getwishlist');
        setWishlistItems(wishlistResponse.data?.data ?? []);
      } catch {
        setWishlistItems([]);
      }
      try {
        const cartResponse = await axiosInstance.get('/api/v1/user/getcarts');
        setCartItems(cartResponse.data?.data?.item ?? []);
      } catch {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategory = async (urlC) => {
    try {
      const response = await axiosInstance.get(urlC);
      setCategory(Array.isArray(response.data?.data) ? response.data.data : []);
    } catch (error) {
      setCategory([]); // fallback to empty array
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    if (!hasFetchedProducts.current) {
      const searchParams = new URLSearchParams(location.search);
      const initialCategory = searchParams.get('category') || '';
      setFilterCategory(initialCategory);
      fetchProducts(`${urlQuery}&category=${initialCategory}`);
      fetchCategory(`/api/v1/category`);
      hasFetchedProducts.current = true;
    }
  }, [location.search]);

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const onLoad = async () => {
    setPage((prev) => prev + 1);
    let nextPage = page + 1;
    let urlQ = `/api/v1/products?page=${nextPage}&limit=${limit}&sortField=createdAt&sortOrder=desc`;
    if (searchTerm !== '') urlQ += `&search=${searchTerm}`;
    if (filterCategory !== '') urlQ += `&category=${filterCategory}`;
    await fetchProducts(urlQ);
  };

  const onSearch = async () => {
    setProducts([]);
    setPage(1);
    let urlQ = `/api/v1/products?page=1&limit=${limit}&sortField=createdAt&sortOrder=desc`;
    if (searchTerm !== '') urlQ += `&search=${searchTerm}`;
    if (filterCategory !== '') urlQ += `&category=${filterCategory}`;
    fetchProducts(urlQ);
  };

  const handleFilterCategory = (e) => {
    setProducts([]);
    setFilterCategory(e.target.value);
    setPage(1);
    let urlQ = `/api/v1/products?page=1&limit=${limit}&sortField=createdAt&sortOrder=desc`;
    if (e.target.value !== '') urlQ += `&category=${e.target.value}`;
    if (searchTerm !== '') urlQ += `&search=${searchTerm}`;
    fetchProducts(urlQ);
  };

  const fetchCart = async () => {
    try {
      const cartResponse = await axiosInstance.get('/api/v1/user/getcarts');
      setCartItems(cartResponse.data?.data?.item ?? []);
    } catch (error) {
      setCartItems([]);
      console.error('Error fetching cart:', error);
    }
  };
  
  const fetchWishlist = async () => {
    try {
      const wishlistResponse = await axiosInstance.get('/api/v1/user/getwishlist');
      setWishlistItems(wishlistResponse.data?.data ?? []);
    } catch (error) {
      setWishlistItems([]);
      console.error('Error fetching wishlist:', error);
    }
  };

  const addWishlist = async (proId) => {
    if (!userDetails) {
      navigate('/login');
    } else {
      try {
        await axiosInstance.patch(`/api/v1/user/addToWishlist/${proId}`);
        await fetchWishlist();
        setNotif(prev => !prev);
      } catch (error) {
        console.error('Error adding to wishlist:', error);
      }
    }
  };

  const removeWishlist = async (proId) => {
    if (!userDetails) {
      navigate('/login');
    } else {
      try {
        await axiosInstance.patch(`/api/v1/user/removeFromWishlist/${proId}`);
        await fetchWishlist();
        setNotif(prev => !prev);
      } catch (error) {
        console.error('Error removing from wishlist:', error);
      }
    }
  };

  const addCart = async (proId) => {
    if (!userDetails) {
      navigate('/login');
    } else {
      try {
        await axiosInstance.patch(`/api/v1/user/addToCart/${proId}`);
        await fetchCart();
        setNotif(prev => !prev);
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    }
  };

  const removeCart = async (proId) => {
    if (!userDetails) {
      navigate('/login');
    } else {
      try {
        const found = cartItems.find(item => item.productId?._id === proId);
        if (!found) return;
        const itemId = found._id;
        await axiosInstance.patch(`/api/v1/user/removeFromCart/${itemId}`);
        await fetchCart();
        setNotif(prev => !prev);
      } catch (error) {
        console.error('Error removing from cart:', error);
      }
    }
  };

  const isInWishlist = (productId) => {
    return Array.isArray(wishlistItems) && wishlistItems.some((item) => item._id === productId);
  };

  const isInCart = (productId) => {
    return Array.isArray(cartItems) && cartItems.some((item) => item.productId?._id === productId);
  };

  // Empty state elements
  const emptyProductsMessage = (
    <div className="col-12 text-center my-5">
      <p className="h5 text-muted">No products found.</p>
    </div>
  );

  return (
    <>
      <TopNav />
      <MiddleNav notification={notif} />
      <MainNav />
      <div className="container py-5" style={{position: 'relative'}}>
        {/* Decorative watercolor spots */}
        <div className="watercolor-spot spot-mint" style={{width: '250px', height: '250px', top: '50px', right: '5%', opacity: '0.12'}}></div>
        <div className="watercolor-spot spot-pink" style={{width: '220px', height: '220px', bottom: '100px', left: '3%', opacity: '0.1'}}></div>
        
        {/* Page Header */}
        <div className="text-center mb-5">
          <h1 className="elegant-script" style={{fontSize: '3rem', color: 'var(--text-dark)'}}>
            Boutique Collection     
          </h1>
          <p style={{fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--text-muted)', fontStyle: 'italic'}}>
            <span className='flower-accent'>✿</span> Curated Wellness Products <span className='flower-accent'>✿</span>
          </p>
          <div className="section-divider"></div>
        </div>
        
        <div className="row">
          <div className="col-lg-12">
            {/* Search and Filter Section */}
            <div className="card-cluster p-4 mb-5">
              <div className="row align-items-center">
                <div className="col-md-8 mb-3 mb-md-0">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search for wellness products..."
                      value={searchTerm}
                      onChange={handleSearch}
                      style={{
                        border: '2px solid var(--soft-mint)',
                        borderRadius: '15px 0 0 15px',
                        padding: '12px 20px',
                        fontFamily: 'var(--font-sans)'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--primary-mint)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--soft-mint)'}
                    />
                    <button 
                      className="btn btn-cluster" 
                      type="button" 
                      onClick={onSearch}
                      style={{
                        borderRadius: '0 15px 15px 0',
                        padding: '12px 20px'
                      }}
                    >
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </div>
                <div className="col-md-4">
                  <select
                    className="form-select"
                    value={filterCategory}
                    onChange={handleFilterCategory}
                    disabled={!category?.length}
                    style={{
                      border: '2px solid var(--soft-mint)',
                      borderRadius: '15px',
                      padding: '12px 20px',
                      fontFamily: 'var(--font-sans)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary-mint)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--soft-mint)'}
                  >
                    <option value="">All Categories</option>
                    {(category && Array.isArray(category) && category.length > 0) ? (
                      category.map((cat) => (
                        <option key={cat._id || cat.id || Math.random()} value={cat._id}>{cat.name}</option>
                      ))
                    ) : (
                      <option value="" disabled>
                        {category.length === 0 ? 'No categories found' : 'Loading...'}
                      </option>
                    )}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="row">
              {Array.isArray(products) && products.length > 0 ? (
                products.map((item) => (
                  <div key={item._id} className="col-xs-12 col-sm-6 col-md-4 mb-4">
                    <div className="card-cluster h-100" style={{
                      transition: 'all 0.3s ease',
                      overflow: 'hidden'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 15px 35px rgba(185, 234, 216, 0.3)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 5px 20px rgba(185, 234, 216, 0.15)';
                    }}
                    >
                      <Link to={`/product/${item._id}/${item.category}`} style={{textDecoration: 'none'}}>
                        <div style={{height: '280px', overflow: 'hidden'}}>
                          <img
                            src={
                              Array.isArray(item.image) && item.image.length > 0
                                ? `${ServerURL}/uploads/${item.image[0]}`
                                : 'https://via.placeholder.com/350x350?text=No+Image'
                            }
                            className="w-100 h-100"
                            style={{ 
                              objectFit: 'cover',
                              transition: 'transform 0.3s ease'
                            }}
                            alt={item.name || 'Product Image'}
                            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                          />
                        </div>
                      </Link>
                      <div className="p-4">
                        <h5 style={{
                          fontFamily: 'var(--font-serif)',
                          fontWeight: '600',
                          color: 'var(--text-dark)',
                          marginBottom: '15px',
                          lineHeight: '1.4'
                        }}>
                          {item.name || "Unnamed Product"}
                        </h5>
                        
                        <div className="mb-3">
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <span style={{
                              fontFamily: 'var(--font-sans)',
                              fontWeight: '700',
                              fontSize: '1.3rem',
                              color: 'var(--success-green)'
                            }}>
                              ₹{typeof item.sale_rate === 'number' ? item.sale_rate : '-'}
                            </span>
                            {item.quantity !== undefined && (
                              <span style={{
                                fontFamily: 'var(--font-sans)',
                                fontSize: '0.85rem',
                                color: 'var(--text-muted)',
                                background: 'var(--light-mint)',
                                padding: '4px 8px',
                                borderRadius: '10px'
                              }}>
                                {item.quantity} available
                              </span>
                            )}
                          </div>
                          
                          <div className="d-flex align-items-center gap-2">
                            <span style={{
                              fontFamily: 'var(--font-sans)',
                              fontSize: '0.9rem',
                              color: 'var(--text-muted)',
                              textDecoration: 'line-through'
                            }}>
                              ₹{typeof item.price === 'number' ? item.price : '-'}
                            </span>
                            <span className="badge-cluster" style={{
                              background: 'var(--accent-pink)',
                              fontSize: '0.8rem'
                            }}>
                              {typeof item.discount === 'number' ? item.discount : 0}% off
                            </span>
                          </div>
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center gap-2">
                          {!isInWishlist(item._id) ? (
                            <button
                              className="btn btn-outline-cluster"
                              onClick={() => addWishlist(item._id)}
                              style={{
                                width: '45px',
                                height: '45px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderColor: 'var(--accent-pink)',
                                color: 'var(--text-dark)'
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.background = 'var(--accent-pink)';
                                e.currentTarget.style.color = 'white';
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = 'var(--text-dark)';
                              }}
                            >
                              <i className="fas fa-heart" style={{fontSize: '0.9rem'}}></i>
                            </button>
                          ) : (
                            <button
                              className="btn btn-cluster"
                              onClick={() => removeWishlist(item._id)}
                              style={{
                                width: '45px',
                                height: '45px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'var(--accent-pink)',
                                border: 'none'
                              }}
                            >
                              <i className="fas fa-heart" style={{fontSize: '0.9rem'}}></i>
                            </button>
                          )}
                          
                          {!isInCart(item._id) ? (
                            <button
                              className="btn btn-cluster flex-grow-1"
                              onClick={() => addCart(item._id)}
                              style={{
                                fontFamily: 'var(--font-sans)',
                                fontWeight: '500',
                                fontSize: '0.9rem',
                                padding: '10px 15px'
                              }}
                            >
                              <i className="fas fa-shopping-cart me-2"></i>Add to Cart
                            </button>
                          ) : (
                            <button
                              className="btn btn-outline-cluster flex-grow-1"
                              onClick={() => removeCart(item._id)}
                              style={{
                                fontFamily: 'var(--font-sans)',
                                fontWeight: '500',
                                fontSize: '0.9rem',
                                padding: '10px 15px',
                                borderColor: 'var(--accent-pink)',
                                color: 'var(--text-dark)'
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.background = 'var(--accent-pink)';
                                e.currentTarget.style.color = 'white';
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = 'var(--text-dark)';
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
                    <i className="fas fa-leaf mb-3" style={{fontSize: '4rem', color: 'var(--primary-mint)', opacity: '0.5'}}></i>
                    <h3 className="mb-3" style={{
                      fontFamily: 'var(--font-elegant-script)',
                      fontSize: '2rem',
                      color: 'var(--text-dark)'
                    }}>No products found</h3>
                    <p style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.1rem',
                      color: 'var(--text-muted)'
                    }}>
                      Try adjusting your search or browse our categories
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Load More Button */}
            {products.length > 0 && (
              <div className='text-center mt-5'>
                <button 
                  className='btn btn-cluster' 
                  onClick={onLoad} 
                  disabled={products.length === 0}
                  style={{
                    padding: '12px 30px',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}
                >
                  <i className="fas fa-plus me-2"></i>Load More Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Allproducts;

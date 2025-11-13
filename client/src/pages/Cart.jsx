import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { Link } from 'react-router-dom';
import TopNav from '../components/TopNav';
import MiddleNav from '../components/MiddleNav';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';
import { ServerURL } from '../services/baseUrl';

function Cart() {
  const [cartData, setCartData] = useState({ item: [] });
  const [salePriceTotal, setSalePriceTotal] = useState(0);
  const [proPriceTotal, setProPriceTotal] = useState(0);
  const [discountTotal, setDiscountTotal] = useState(0);
  const [notif, setNotif] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const calculateTotalSalePrice = (items) => {
    let totalSalePrice = 0;
    items.forEach((item) => {
      totalSalePrice += item.productId.sale_rate * item.qty;
    });
    return totalSalePrice;
  };

  const calculateTotalProPrice = (items) => {
    let totalPrice = 0;
    items.forEach((item) => {
      const originalPrice = item.productId.price || 0;
      const quantity = item.qty || 0;
      totalPrice += originalPrice * quantity;
    });
    return totalPrice;
  };

  const calculateTotalDiscountPrice = (items) => {
    let totalDiscount = 0;
    items.forEach((item) => {
      const originalPrice = item.productId.price || 0;
      const salePrice = item.productId.sale_rate || 0;
      const quantity = item.qty || 0;
      const discountAmount = (originalPrice - salePrice) * quantity;
      totalDiscount += discountAmount;
    });
    return totalDiscount;
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`/api/v1/user/getcarts`);
      const cartResponse = response.data.data || { item: [] };
      setCartData(cartResponse);
      
      const items = cartResponse.item || [];

      const totalSalePrice = calculateTotalSalePrice(items);
      setSalePriceTotal(totalSalePrice || 0);

      const totalProPrice = calculateTotalProPrice(items);
      setProPriceTotal(totalProPrice || 0);

      const totalDiscount = calculateTotalDiscountPrice(items);
      setDiscountTotal(totalDiscount || 0);
    } catch (error) {
      console.error('Error fetching cart data:', error);
      // Set safe defaults on error
      setCartData({ item: [] });
      setSalePriceTotal(0);
      setProPriceTotal(0);
      setDiscountTotal(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleQuantityChange = async (item, operation, index) => {
    let QtyApi = item.qty;
    if (operation === 'increment') {
      QtyApi += 1;
    } else if (operation === 'decrement') {
      QtyApi -= 1;
    }
    
    // Validate quantity
    if (QtyApi < 1) return;
    if (operation === 'increment' && QtyApi > item.productId.stock) return;
    
    try {
      setIsLoading(true);
      await axiosInstance.patch(`/api/v1/user/updateQty`, {
        qty: QtyApi,
        productId: item.productId._id,
      });
      // Re-fetch data to get updated values
      await fetchData();
    } catch (error) {
      console.error('Error updating quantity:', error);
      // Re-fetch data on error to ensure state is correct
      await fetchData();
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      setIsLoading(true);
      await axiosInstance.patch(`/api/v1/user/removeFromCart/${itemId}`);
      
      // Re-fetch data to ensure consistency
      await fetchData();
      
      setNotif((prev) => !prev);
    } catch (error) {
      console.error('Error removing item from cart:', error);
      // Re-fetch on error to ensure state is correct
      await fetchData();
    }
  };

  return (
    <>
      <TopNav />
      <MiddleNav notification={notif} />
      <MainNav />
      <div className="container my-5" style={{ position: 'relative' }}>
        {/* Decorative watercolor spots */}
        <div
          className="watercolor-spot spot-mint"
          style={{
            width: '200px',
            height: '200px',
            top: '50px',
            right: '5%',
            opacity: '0.12',
          }}
        ></div>
        <div
          className="watercolor-spot spot-pink"
          style={{
            width: '180px',
            height: '180px',
            bottom: '100px',
            left: '3%',
            opacity: '0.1',
          }}
        ></div>

        {/* Page Header */}
        <div className="text-center mb-5">
          <h1
            className="elegant-script mb-3"
            style={{
              fontSize: '3rem',
              color: 'var(--text-dark)',
              fontWeight: '600',
            }}
          >
            <i className="fas fa-shopping-bag me-3" style={{ color: 'var(--primary-mint)' }}></i>
            Shopping Cart
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              color: 'var(--text-muted)',
              fontStyle: 'italic',
              fontSize: '1.1rem',
            }}
          >
            Review your selected items
          </p>
          <div className="section-divider"></div>
        </div>

        {isLoading ? (
          <div className="text-center p-5">
            <div
              style={{
                fontSize: '3rem',
                color: 'var(--primary-mint)',
                marginBottom: '20px',
              }}
            >
              <i className="fas fa-spinner fa-spin"></i>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                color: 'var(--text-muted)',
              }}
            >
              Updating cart...
            </p>
          </div>
        ) : cartData?.item?.length === 0 ? (
          <div className="text-center p-5">
            <div
              style={{
                fontSize: '4rem',
                color: 'var(--primary-mint)',
                marginBottom: '20px',
              }}
            >
              <i className="fas fa-shopping-cart"></i>
            </div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                color: 'var(--text-dark)',
                marginBottom: '15px',
              }}
            >
              Your cart is empty
            </h4>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                color: 'var(--text-muted)',
                marginBottom: '30px',
              }}
            >
              Start adding items to your cart to continue shopping
            </p>
            <Link to={'/allproducts'}>
              <button
                className="btn btn-cluster"
                style={{
                  padding: '12px 40px',
                  fontSize: '1rem',
                  fontWeight: '600',
                }}
              >
                <i className="fas fa-arrow-right me-2"></i>Explore Products
              </button>
            </Link>
          </div>
        ) : (
          <div className="row">
            {/* Cart Items Section */}
            <div className="col-lg-8 mb-4">
              <div
                className="card-cluster p-4"
                style={{
                  borderRadius: '20px',
                  border: '2px solid var(--primary-mint)',
                }}
              >
                <div
                  className="d-flex align-items-center mb-4"
                  style={{
                    borderBottom: '2px solid var(--light-mint)',
                    paddingBottom: '15px',
                  }}
                >
                  <i
                    className="fas fa-shopping-bag me-2"
                    style={{ color: 'var(--primary-mint)', fontSize: '1.5rem' }}
                  ></i>
                  <h4
                    className="mb-0"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      color: 'var(--text-dark)',
                      fontWeight: '600',
                    }}
                  >
                    Your Items ({cartData?.item?.length || 0})
                  </h4>
                </div>

                {cartData?.item?.map((item, index) => (
                  <div
                    key={item._id}
                    className="card-cluster mb-3 p-3"
                    style={{
                      border: '1px solid var(--light-mint)',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--primary-mint)';
                      e.currentTarget.style.boxShadow =
                        '0 8px 25px rgba(185, 234, 216, 0.25)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--light-mint)';
                      e.currentTarget.style.boxShadow = '0 5px 20px rgba(185, 234, 216, 0.15)';
                    }}
                  >
                    <div className="row g-3 align-items-center">
                      {/* Product Image */}
                      <div className="col-md-3 col-5">
                        <div
                          style={{
                            position: 'relative',
                            borderRadius: '15px',
                            overflow: 'hidden',
                            border: '2px solid var(--light-mint)',
                          }}
                        >
                          <img
                            src={`${ServerURL}/uploads/${item.productId.image[0]}`}
                            className="img-fluid"
                            alt={item.productId.name}
                            style={{
                              width: '100%',
                              height: '150px',
                              objectFit: 'cover',
                            }}
                          />
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="col-md-6 col-7">
                        <h5
                          className="mb-2"
                          style={{
                            fontFamily: 'var(--font-serif)',
                            color: 'var(--text-dark)',
                            fontWeight: '600',
                            fontSize: '1.1rem',
                          }}
                        >
                          {item.productId.name}
                        </h5>
                        {item.productId.brand && (
                          <p
                            className="mb-2"
                            style={{
                              fontFamily: 'var(--font-sans)',
                              fontSize: '0.9rem',
                              color: 'var(--text-muted)',
                            }}
                          >
                            <i className="fas fa-tag me-1" style={{ fontSize: '0.8rem' }}></i>
                            {item.productId.brand}
                          </p>
                        )}

                        {/* Price Section */}
                        <div className="d-flex align-items-center gap-2 flex-wrap mb-3">
                          <span
                            className="fw-bold"
                            style={{
                              color: 'var(--success-green)',
                              fontSize: '1.3rem',
                            }}
                          >
                            ₹{item.productId.sale_rate}
                          </span>
                          <span
                            className="text-muted text-decoration-line-through"
                            style={{ fontSize: '0.95rem' }}
                          >
                            ₹{item.productId.price}
                          </span>
                          <span
                            className="badge-cluster"
                            style={{
                              background: 'var(--accent-pink)',
                              fontSize: '0.85rem',
                              padding: '4px 12px',
                            }}
                          >
                            <i className="fas fa-percent me-1" style={{ fontSize: '0.7rem' }}></i>
                            {item.productId.discount}% off
                          </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="d-flex align-items-center gap-3">
                          <div
                            className="d-flex align-items-center"
                            style={{
                              border: '2px solid var(--primary-mint)',
                              borderRadius: '25px',
                              overflow: 'hidden',
                              width: 'fit-content',
                            }}
                          >
                            <button
                              className="btn"
                              onClick={() => handleQuantityChange(item, 'decrement', index)}
                              disabled={item.qty === 1}
                              style={{
                                border: 'none',
                                backgroundColor: 'var(--light-mint)',
                                color: 'var(--text-dark)',
                                padding: '8px 15px',
                                transition: 'all 0.3s ease',
                              }}
                              onMouseEnter={(e) => {
                                if (!e.currentTarget.disabled) {
                                  e.currentTarget.style.backgroundColor = 'var(--primary-mint)';
                                }
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--light-mint)';
                              }}
                            >
                              <i className="fas fa-minus"></i>
                            </button>
                            <span
                              className="px-3 fw-bold"
                              style={{
                                fontFamily: 'var(--font-sans)',
                                minWidth: '40px',
                                textAlign: 'center',
                                color: 'var(--text-dark)',
                              }}
                            >
                              {item.qty}
                            </span>
                            <button
                              className="btn"
                              onClick={() => handleQuantityChange(item, 'increment', index)}
                              disabled={item.qty >= item.productId.stock}
                              style={{
                                border: 'none',
                                backgroundColor: 'var(--light-mint)',
                                color: 'var(--text-dark)',
                                padding: '8px 15px',
                                transition: 'all 0.3s ease',
                              }}
                              onMouseEnter={(e) => {
                                if (!e.currentTarget.disabled) {
                                  e.currentTarget.style.backgroundColor = 'var(--primary-mint)';
                                }
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--light-mint)';
                              }}
                            >
                              <i className="fas fa-plus"></i>
                            </button>
                          </div>

                          <button
                            className="btn"
                            onClick={() => handleRemoveItem(item._id)}
                            style={{
                              border: 'none',
                              color: '#dc3545',
                              padding: '8px 12px',
                              transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#ffebee';
                              e.currentTarget.style.borderRadius = '50%';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="col-md-3 text-md-end">
                        <p
                          className="mb-1"
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.85rem',
                            color: 'var(--text-muted)',
                          }}
                        >
                          Subtotal
                        </p>
                        <p
                          className="fw-bold mb-0"
                          style={{
                            color: 'var(--success-green)',
                            fontSize: '1.2rem',
                          }}
                        >
                          ₹{(item.productId.sale_rate * item.qty).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="col-lg-4">
              <div
                className="card-cluster p-4"
                style={{
                  background: 'linear-gradient(135deg, var(--light-mint) 0%, var(--cream-white) 100%)',
                  border: '2px solid var(--primary-mint)',
                  position: 'sticky',
                  top: '20px',
                }}
              >
                <div
                  className="d-flex align-items-center mb-4"
                  style={{
                    borderBottom: '2px solid var(--primary-mint)',
                    paddingBottom: '15px',
                  }}
                >
                  <i
                    className="fas fa-receipt me-2"
                    style={{ color: 'var(--primary-mint)', fontSize: '1.5rem' }}
                  ></i>
                  <h4
                    className="mb-0 elegant-script"
                    style={{
                      color: 'var(--text-dark)',
                      fontSize: '1.8rem',
                    }}
                  >
                    Order Summary
                  </h4>
                </div>

                {/* Savings Banner */}
                {discountTotal > 0 && (
                  <div
                    className="mb-4 p-3"
                    style={{
                      background: 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)',
                      border: '2px solid var(--success-green)',
                      borderRadius: '15px',
                      textAlign: 'center',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.9rem',
                        color: '#155724',
                        marginBottom: '5px',
                        fontWeight: '600',
                      }}
                    >
                      <i className="fas fa-tag me-1"></i>You're Saving
                    </div>
            <div
              style={{
                fontSize: '1.8rem',
                fontWeight: '700',
                color: '#155724',
              }}
            >
              ₹{((discountTotal || 0)).toFixed(2)}
            </div>
                  </div>
                )}

                {/* Price Breakdown */}
                <div style={{ fontFamily: 'var(--font-sans)' }}>
                  <div className="d-flex justify-content-between mb-3">
                    <span style={{ color: 'var(--text-dark)', fontWeight: '500' }}>
                      Original Price:
                    </span>
                    <span
                      style={{
                        color: 'var(--text-muted)',
                        textDecoration: (proPriceTotal || 0) > (salePriceTotal || 0) ? 'line-through' : 'none',
                      }}
                    >
                      ₹{((proPriceTotal || 0)).toFixed(2)}
                    </span>
                  </div>

                  {discountTotal > 0 && (
                    <div className="d-flex justify-content-between mb-3">
                      <span style={{ color: 'var(--text-dark)', fontWeight: '500' }}>
                        <i className="fas fa-tag me-1" style={{ color: 'var(--success-green)' }}></i>
                        Discount:
                      </span>
                      <span
                        style={{
                          color: 'var(--success-green)',
                          fontWeight: '600',
                        }}
                      >
                        -₹{(discountTotal || 0).toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="d-flex justify-content-between mb-3">
                    <span style={{ color: 'var(--text-dark)', fontWeight: '500' }}>
                      Subtotal:
                    </span>
                    <span
                      style={{
                        color: 'var(--text-dark)',
                        fontWeight: '600',
                      }}
                    >
                      ₹{((salePriceTotal || 0)).toFixed(2)}
                    </span>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <span style={{ color: 'var(--text-dark)', fontWeight: '500' }}>
                      <i className="fas fa-truck me-1" style={{ color: 'var(--primary-mint)' }}></i>
                      Delivery:
                    </span>
                    <span
                      style={{
                        color: 'var(--text-muted)',
                        fontStyle: 'italic',
                        fontSize: '0.9rem',
                      }}
                    >
                      Calculated at checkout
                    </span>
                  </div>

                  <hr
                    style={{
                      borderColor: 'var(--primary-mint)',
                      borderWidth: '2px',
                      margin: '20px 0',
                    }}
                  />

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <div
                        style={{
                          fontWeight: '700',
                          color: 'var(--text-dark)',
                          fontSize: '1.2rem',
                        }}
                      >
                        Total Amount:
                      </div>
                      {discountTotal > 0 && (
                        <div
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--success-green)',
                          marginTop: '2px',
                        }}
                      >
                        You saved ₹{((discountTotal || 0)).toFixed(2)}!
                      </div>
                      )}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      {(proPriceTotal || 0) > (salePriceTotal || 0) && (
                        <div
                          style={{
                            fontSize: '0.85rem',
                            color: 'var(--text-muted)',
                            textDecoration: 'line-through',
                          }}
                        >
                          ₹{((proPriceTotal || 0)).toFixed(2)}
                        </div>
                      )}
                      <div
                        style={{
                          fontWeight: '700',
                          color: 'var(--success-green)',
                          fontSize: '1.5rem',
                        }}
                      >
                        ₹{((salePriceTotal || 0)).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <Link to={'/checkout'} style={{ textDecoration: 'none' }}>
                    <button
                      className="btn btn-cluster w-100"
                      style={{
                        padding: '14px 30px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        marginTop: '10px',
                      }}
                    >
                      <i className="fas fa-arrow-right me-2"></i>Proceed to Checkout
                    </button>
                  </Link>

                  <Link to={'/allproducts'} style={{ textDecoration: 'none' }}>
                    <button
                      className="btn btn-outline-cluster w-100 mt-2"
                      style={{
                        padding: '12px 30px',
                        fontSize: '0.95rem',
                        fontWeight: '500',
                      }}
                    >
                      <i className="fas fa-shopping-bag me-2"></i>Continue Shopping
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;

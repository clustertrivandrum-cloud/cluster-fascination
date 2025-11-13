import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { ServerURL } from '../../services/baseUrl';

const CartItemsList = ({
  cartItems,
  onQuantityChange,
  onRemoveItem,
  onBack,
  onContinue
}) => {
  return (
    <div 
      className="card mb-4" 
      style={{ 
        borderRadius: '20px',
        border: '2px solid var(--primary-mint)',
        boxShadow: '0 5px 20px rgba(185, 234, 216, 0.15)'
      }}
    >
      <div 
        className="card-header text-white" 
        style={{ 
          background: 'linear-gradient(135deg, var(--primary-mint) 0%, var(--dark-mint) 100%)',
          borderRadius: '18px 18px 0 0'
        }}
      >
        <h5 className="mb-0" style={{ fontWeight: '600' }}>
          <i className="fas fa-shopping-cart me-2"></i>Step 2: Review Items
        </h5>
      </div>
      <div className="card-body" style={{ padding: '25px' }}>
        {cartItems && cartItems.length > 0 ? (
          <>
            {cartItems.map((product) => (
              <div
                key={product._id}
                className="row mb-4 align-items-center pb-3"
                style={{ 
                  borderBottom: '1px solid var(--light-mint)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div className="col-md-3 mb-3 mb-md-0">
                  <div style={{ position: 'relative' }}>
                    <img
                      src={`${ServerURL}/uploads/${product.productId.image[0]}`}
                      alt={product.productId.name}
                      className="img-fluid"
                      style={{ 
                        borderRadius: '15px',
                        border: '2px solid var(--primary-mint)',
                        boxShadow: '0 3px 15px rgba(185, 234, 216, 0.2)',
                        width: '100%',
                        height: '150px',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3 mb-md-0">
                  <h5 
                    className="fw-bold mb-2" 
                    style={{ 
                      color: 'var(--text-dark)',
                      fontFamily: 'var(--font-serif)'
                    }}
                  >
                    {product.productId.name}
                  </h5>
                  {product.productId.brand && (
                    <p 
                      className="text-muted mb-2" 
                      style={{ fontSize: '0.9rem' }}
                    >
                      <i className="fas fa-tag me-1" style={{ fontSize: '0.8rem' }}></i>
                      {product.productId.brand}
                    </p>
                  )}
                  <div className="d-flex align-items-center gap-2 flex-wrap mb-3">
                    <p 
                      className="fw-bold mb-0" 
                      style={{ 
                        color: 'var(--success-green)',
                        fontSize: '1.2rem'
                      }}
                    >
                      ₹{product.productId.sale_rate}
                    </p>
                    <span 
                      className="text-muted text-decoration-line-through" 
                      style={{ fontSize: '0.9rem' }}
                    >
                      ₹{product.productId.price}
                    </span>
                    <span 
                      className="fw-bold" 
                      style={{ 
                        backgroundColor: 'var(--light-mint)',
                        color: 'var(--success-green)',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.85rem'
                      }}
                    >
                      <i className="fas fa-percent me-1" style={{ fontSize: '0.7rem' }}></i>
                      {product.productId.discount}% off
                    </span>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="d-flex align-items-center gap-2 flex-column flex-md-row">
                    <div 
                      className="d-flex align-items-center" 
                      style={{ 
                        border: '2px solid var(--primary-mint)',
                        borderRadius: '25px',
                        overflow: 'hidden',
                        width: 'fit-content'
                      }}
                    >
                      <button
                        className="btn"
                        type="button"
                        onClick={() => onQuantityChange(product, "decrement")}
                        disabled={product.qty === 1}
                        style={{
                          border: 'none',
                          backgroundColor: 'var(--light-mint)',
                          color: 'var(--text-dark)',
                          fontWeight: '600',
                          padding: '8px 15px',
                          transition: 'all 0.3s ease'
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
                      <input
                        type="text"
                        className="form-control text-center"
                        value={product.qty}
                        readOnly
                        style={{
                          border: 'none',
                          fontWeight: '600',
                          color: 'var(--text-dark)',
                          width: '50px',
                          padding: '8px 5px'
                        }}
                      />
                      <button
                        className="btn"
                        type="button"
                        onClick={() => onQuantityChange(product, "increment")}
                        style={{
                          border: 'none',
                          backgroundColor: 'var(--light-mint)',
                          color: 'var(--text-dark)',
                          fontWeight: '600',
                          padding: '8px 15px',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--primary-mint)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--light-mint)';
                        }}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                    <button
                      className="btn btn-link"
                      onClick={() => onRemoveItem(product._id)}
                      style={{
                        color: '#dc3545',
                        fontSize: '1.2rem',
                        padding: '8px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#ffebee';
                        e.currentTarget.style.borderRadius = '50%';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="text-center py-5">
            <div style={{ fontSize: '3rem', marginBottom: '15px', color: 'var(--primary-mint)' }}>
              <i className="fas fa-shopping-cart"></i>
            </div>
            <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-serif)' }}>
              Your cart is empty
            </p>
          </div>
        )}
        
        <div className="d-flex justify-content-between mt-4 gap-3">
          <button
            className="btn flex-fill"
            onClick={onBack}
            style={{
              background: 'white',
              color: 'var(--text-dark)',
              border: '2px solid var(--primary-mint)',
              borderRadius: '20px',
              padding: '12px 30px',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = 'var(--light-mint)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'white';
            }}
          >
            <i className="fas fa-arrow-left me-2"></i>Back
          </button>
          <button
            className="btn flex-fill"
            onClick={onContinue}
            style={{
              background: 'linear-gradient(135deg, var(--success-green) 0%, var(--dark-mint) 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '20px',
              padding: '12px 30px',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(123, 200, 164, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Continue <i className="fas fa-arrow-right ms-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemsList;

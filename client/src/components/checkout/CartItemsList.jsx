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
        <h5 className="mb-0" style={{ fontWeight: '600' }}>Step 2: Review Items 🛒</h5>
      </div>
      <div className="card-body" style={{ padding: '25px' }}>
        {cartItems && cartItems.length > 0 ? (
          <>
            {cartItems.map((product) => (
              <div
                key={product._id}
                className="row mb-4 align-items-center pb-3"
                style={{ 
                  borderBottom: '1px solid var(--primary-mint)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div className="col-md-3 mb-3 mb-md-0">
                  <img
                    src={`${ServerURL}/uploads/${product.productId.image[0]}`}
                    alt={product.productId.name}
                    className="img-fluid"
                    style={{ 
                      borderRadius: '15px',
                      border: '2px solid var(--primary-mint)',
                      boxShadow: '0 3px 15px rgba(185, 234, 216, 0.2)'
                    }}
                  />
                </div>
                <div className="col-md-6 mb-3 mb-md-0">
                  <h5 
                    className="fw-bold" 
                    style={{ 
                      color: 'var(--text-dark)',
                      marginBottom: '8px'
                    }}
                  >
                    {product.productId.name}
                  </h5>
                  <p 
                    className="text-muted mb-2" 
                    style={{ fontSize: '0.9rem' }}
                  >
                    Fashion Jewellery
                  </p>
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <p 
                      className="fw-bold mb-0" 
                      style={{ 
                        color: 'var(--success-green)',
                        fontSize: '1.1rem'
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
                      {product.productId.discount}% off
                    </span>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="d-flex align-items-center gap-2">
                    <div 
                      className="input-group" 
                      style={{ 
                        maxWidth: '140px',
                        border: '2px solid var(--primary-mint)',
                        borderRadius: '15px',
                        overflow: 'hidden'
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
                          transition: 'all 0.3s ease'
                        }}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="form-control text-center"
                        value={product.qty}
                        readOnly
                        style={{
                          border: 'none',
                          fontWeight: '600',
                          color: 'var(--text-dark)'
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
                          transition: 'all 0.3s ease'
                        }}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn btn-link"
                      onClick={() => onRemoveItem(product._id)}
                      style={{
                        color: '#dc3545',
                        fontSize: '1.2rem',
                        padding: '8px'
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
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🛒</div>
            <p style={{ color: 'var(--text-muted)' }}>Your cart is empty</p>
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
            Back
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
            Continue ✨
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemsList;

import React from 'react';

const PaymentOptions = ({
  paymentOption,
  onPaymentChange,
  onBack,
  onPlaceOrder
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
        <h5 className="mb-0" style={{ fontWeight: '600' }}>Step 3: Payment Options 💳</h5>
      </div>
      <div className="card-body" style={{ padding: '25px' }}>
        <div 
          className="form-check mb-4 p-3" 
          style={{ 
            borderRadius: '15px',
            border: paymentOption === 'razorpay' ? '2px solid var(--primary-mint)' : '2px solid #e0e0e0',
            backgroundColor: paymentOption === 'razorpay' ? 'var(--light-mint)' : 'white',
            transition: 'all 0.3s ease'
          }}
        >
          <input
            className="form-check-input"
            type="radio"
            name="paymentOption"
            id="razorpayOption"
            value="razorpay"
            checked={paymentOption === "razorpay"}
            onChange={() => onPaymentChange("razorpay")}
            style={{ cursor: 'pointer' }}
          />
          <label
            className="form-check-label fw-bold ms-2"
            htmlFor="razorpayOption"
            style={{ cursor: 'pointer', color: 'var(--text-dark)' }}
          >
            Online Payment (Razorpay)
            <span 
              className="badge bg-warning text-dark ms-2" 
              style={{ fontSize: '0.7em', borderRadius: '10px' }}
            >
              Setup Required
            </span>
          </label>
          <p className="text-muted mt-2 mb-0" style={{ fontSize: '0.9rem' }}>
            Pay securely using Credit Card, Debit Card, UPI, Net Banking, or Wallets.
            <br />
            <small className="text-warning">⚠️ Currently unavailable - Please use Cash on Delivery</small>
          </p>
        </div>
        
        <div 
          className="form-check mb-4 p-3" 
          style={{ 
            borderRadius: '15px',
            border: paymentOption === 'cod' ? '2px solid var(--primary-mint)' : '2px solid #e0e0e0',
            backgroundColor: paymentOption === 'cod' ? 'var(--light-mint)' : 'white',
            transition: 'all 0.3s ease'
          }}
        >
          <input
            className="form-check-input"
            type="radio"
            name="paymentOption"
            id="codOption"
            value="cod"
            checked={paymentOption === "cod"}
            onChange={() => onPaymentChange("cod")}
            style={{ cursor: 'pointer' }}
          />
          <label
            className="form-check-label fw-bold ms-2"
            htmlFor="codOption"
            style={{ cursor: 'pointer', color: 'var(--text-dark)' }}
          >
            Cash on Delivery / Pay on Delivery ✨
          </label>
          <p className="text-muted mt-2 mb-0" style={{ fontSize: '0.9rem' }}>
            Pay with cash when your order is delivered to your doorstep.
          </p>
        </div>
        
        <div className="d-flex justify-content-between gap-3 mt-4">
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
            onClick={onPlaceOrder}
            style={{
              background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '20px',
              padding: '12px 30px',
              fontWeight: '600',
              fontSize: '1rem',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(220, 53, 69, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Place Your Order 🎉
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;

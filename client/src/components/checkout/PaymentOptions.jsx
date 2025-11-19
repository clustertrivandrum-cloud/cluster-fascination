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
        <h5 className="mb-0" style={{ fontWeight: '600' }}>
          <i className="fas fa-credit-card me-2"></i>Step 3: Payment Options
        </h5>
      </div>
      <div className="card-body" style={{ padding: '25px' }}>
        <div 
          className="form-check mb-4 p-3" 
          style={{ 
            borderRadius: '15px',
            border: paymentOption === 'razorpay' ? '2px solid var(--primary-mint)' : '2px solid #e0e0e0',
            backgroundColor: paymentOption === 'razorpay' ? 'var(--light-mint)' : 'white',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onClick={() => onPaymentChange("razorpay")}
        >
          <div className="d-flex align-items-start">
            <input
              className="form-check-input mt-1"
              type="radio"
              name="paymentOption"
              id="razorpayOption"
              value="razorpay"
              checked={paymentOption === "razorpay"}
              onChange={() => onPaymentChange("razorpay")}
              style={{ cursor: 'pointer' }}
            />
            <div className="ms-3 flex-grow-1">
              <label
                className="form-check-label fw-bold d-flex align-items-center"
                htmlFor="razorpayOption"
                style={{ cursor: 'pointer', color: 'var(--text-dark)' }}
              >
                <i className="fas fa-credit-card me-2" style={{ color: 'var(--primary-mint)' }}></i>
                Online Payment (Razorpay)
                <span 
                  className="badge bg-warning text-dark ms-2" 
                  style={{ fontSize: '0.7em', borderRadius: '10px' }}
                >
                  <i className="fas fa-exclamation-triangle me-1"></i>Setup Required
                </span>
              </label>
              <p className="text-muted mt-2 mb-0" style={{ fontSize: '0.9rem' }}>
                Pay securely using Credit Card, Debit Card, UPI, Net Banking, or Wallets.
              </p>
            </div>
          </div>
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
            <i className="fas fa-arrow-left me-2"></i>Back
          </button>
          <button 
            className="btn flex-fill" 
            onClick={onPlaceOrder}
            style={{
              background: 'linear-gradient(135deg, var(--success-green) 0%, var(--dark-mint) 100%)',
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
              e.target.style.boxShadow = '0 8px 25px rgba(123, 200, 164, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <i className="fas fa-check-circle me-2"></i>Place Your Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;

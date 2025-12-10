import React from 'react';

const PaymentOptions = ({
  paymentOption,
  onPaymentChange,
  onBack,
  onPlaceOrder
}) => {
  return (
    <div className="card-cluster mb-4 position-relative overflow-hidden">
      {/* Decorative background element */}
      <div
        style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '100px',
          height: '100px',
          background: 'radial-gradient(circle, var(--primary-mint) 0%, transparent 70%)',
          opacity: 0.2,
          borderRadius: '50%'
        }}
      />

      <div
        className="card-header bg-white border-0 pt-4 px-4"
      >
        <h5 className="mb-0 d-flex align-items-center" style={{ fontFamily: 'var(--font-sans)', fontWeight: '600', color: 'var(--text-dark)' }}>
          <span
            className="d-flex align-items-center justify-content-center me-3"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--light-mint)',
              color: 'var(--dark-mint)'
            }}
          >
            <i className="fas fa-credit-card"></i>
          </span>
          Step 3: Payment Options
        </h5>
      </div>

      <div className="card-body p-4">
        {/* Razorpay Option */}
        <div
          className="mb-4"
          onClick={() => onPaymentChange("razorpay")}
          style={{
            borderRadius: '15px',
            border: paymentOption === 'razorpay' ? '2px solid var(--primary-mint)' : '1px solid #eee',
            background: paymentOption === 'razorpay' ? 'linear-gradient(135deg, white 0%, var(--light-mint) 100%)' : 'white',
            padding: '20px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {paymentOption === 'razorpay' && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                background: 'var(--primary-mint)',
                padding: '5px 15px',
                borderBottomLeftRadius: '15px',
                color: 'var(--text-dark)',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}
            >
              Recommended
            </div>
          )}

          <div className="d-flex align-items-center">
            <div className="form-check m-0">
              <input
                className="form-check-input"
                type="radio"
                name="paymentOption"
                id="razorpayOption"
                value="razorpay"
                checked={paymentOption === "razorpay"}
                onChange={() => onPaymentChange("razorpay")}
                style={{
                  cursor: 'pointer',
                  width: '20px',
                  height: '20px',
                  borderColor: 'var(--dark-mint)',
                  backgroundColor: paymentOption === 'razorpay' ? 'var(--primary-mint)' : 'white',
                  marginTop: 0
                }}
              />
            </div>

            <div className="ms-3 flex-grow-1">
              <label
                className="form-check-label fw-bold d-grid"
                htmlFor="razorpayOption"
                style={{ cursor: 'pointer', color: 'var(--text-dark)', fontSize: '1.05rem' }}
              >
                Online Payment
                <span style={{ fontSize: '0.85rem', fontWeight: '400', color: 'var(--text-muted)' }}>
                  (Razorpay)
                </span>
              </label>
            </div>

            <div className="d-none d-md-flex gap-2">
              <i className="fab fa-cc-visa fa-lg text-muted"></i>
              <i className="fab fa-cc-mastercard fa-lg text-muted"></i>
              <i className="fab fa-google-pay fa-lg text-muted"></i>
            </div>
          </div>

          <div className="mt-3 ps-4 ms-2 border-start border-2" style={{ borderColor: 'var(--soft-mint)' }}>
            <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
              Pay securely using Credit Card, Debit Card, UPI, Net Banking, or Wallets.
              <span className="d-block mt-1 text-success" style={{ fontSize: '0.8rem' }}>
                <i className="fas fa-lock me-1"></i> 100% Secure Transaction
              </span>
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="d-flex justify-content-between align-items-center mt-5 gap-3">
          <button
            className="btn-outline-cluster"
            onClick={onBack}
            style={{
              minWidth: '120px'
            }}
          >
            <i className="fas fa-arrow-left me-2"></i>
            Back
          </button>

          <button
            className="btn-cluster flex-grow-1"
            onClick={onPlaceOrder}
            style={{
              maxWidth: '300px',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            Place Your Order
            <i className="fas fa-chevron-right ms-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;

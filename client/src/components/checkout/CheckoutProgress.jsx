import React from 'react';

const CheckoutProgress = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Address', icon: 'fa-map-marker-alt' },
    { number: 2, label: 'Review', icon: 'fa-shopping-cart' },
    { number: 3, label: 'Payment', icon: 'fa-credit-card' },
  ];

  return (
    <div
      className="card-cluster mb-4"
      style={{
        borderRadius: '20px',
        border: '2px solid var(--primary-mint)',
        padding: '20px',
      }}
    >
      <div className="d-flex justify-content-between align-items-center">
        {steps.map((step, index) => {
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={step.number}>
              <div className="d-flex flex-column align-items-center" style={{ flex: 1 }}>
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: isCompleted
                      ? 'var(--success-green)'
                      : isActive
                      ? 'var(--primary-mint)'
                      : 'var(--light-mint)',
                    color: isCompleted || isActive ? 'white' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    border: `3px solid ${
                      isCompleted
                        ? 'var(--success-green)'
                        : isActive
                        ? 'var(--primary-mint)'
                        : 'var(--light-mint)'
                    }`,
                    transition: 'all 0.3s ease',
                    boxShadow:
                      isActive || isCompleted
                        ? '0 4px 15px rgba(185, 234, 216, 0.4)'
                        : 'none',
                  }}
                >
                  {isCompleted ? (
                    <i className="fas fa-check" style={{ fontSize: '1.2rem' }}></i>
                  ) : (
                    <i className={`fas ${step.icon}`} style={{ fontSize: '1rem' }}></i>
                  )}
                </div>
                <div
                  style={{
                    marginTop: '10px',
                    fontSize: '0.85rem',
                    fontWeight: isActive ? '700' : '500',
                    color: isActive ? 'var(--text-dark)' : 'var(--text-muted)',
                    textAlign: 'center',
                  }}
                >
                  {step.label}
                </div>
              </div>
              {!isLast && (
                <div
                  style={{
                    flex: 1,
                    height: '3px',
                    backgroundColor: isCompleted
                      ? 'var(--success-green)'
                      : 'var(--light-mint)',
                    margin: '0 10px',
                    marginTop: '-35px',
                    borderRadius: '2px',
                    transition: 'all 0.3s ease',
                  }}
                ></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default CheckoutProgress;



import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const CheckoutHeader = () => {
  return (
    <div 
      style={{ 
        background: 'linear-gradient(135deg, var(--cream-white) 0%, var(--light-mint) 100%)',
        borderBottom: '2px solid var(--primary-mint)'
      }}
    >
      <div className="container p-3">
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/">
            <div>
              <img src={logo} className="img-fluid" width={150} alt="Cluster Fascination Logo" />
            </div>
          </Link>
          <div>
            <p 
              className="d-none d-md-block fw-bold mb-0 elegant-script" 
              style={{ 
                color: 'var(--text-dark)',
                fontSize: '1.2rem'
              }}
            >
              <i className="fas fa-gem me-2" style={{ color: 'var(--accent-pink)' }}></i>
              Curating fashion jewellery & accessories experiences
            </p>
          </div>
          <div style={{ width: '150px' }}></div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutHeader;

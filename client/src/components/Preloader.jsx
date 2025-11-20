import React from 'react';
import './Preloader.css';

const Preloader = ({ fullPage = false, message = "Loading..." }) => {
  if (fullPage) {
    return (
      <div className="preloader-fullpage">
        <div className="preloader-container">
          <div className="preloader-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
          </div>
          <div className="preloader-text">
            <p className="preloader-message">{message}</p>
            <div className="preloader-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="preloader-inline">
      <div className="preloader-spinner-small">
        <div className="spinner-ring-small"></div>
        <div className="spinner-ring-small"></div>
        <div className="spinner-ring-small"></div>
        <div className="spinner-ring-small"></div>
      </div>
      {message && <p className="preloader-message-small">{message}</p>}
    </div>
  );
};

export default Preloader;


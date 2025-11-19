import React from 'react';
import { Container } from 'react-bootstrap';

const FreeDeliveryBanner = () => {
  return (
    <div
      className="free-delivery-banner"
      style={{
        background: "linear-gradient(135deg, var(--primary-mint) 0%, var(--success-green) 100%)",
        padding: "14px 0",
        textAlign: "center",
        color: "white",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <Container>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
            flexWrap: "wrap",
            position: "relative",
            zIndex: 1,
          }}
        >
          <i
            className="fas fa-truck"
            style={{
              fontSize: "20px",
              color: "white",
              opacity: 0.95,
            }}
          ></i>
          
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "15px",
              fontWeight: "600",
              letterSpacing: "0.3px",
              lineHeight: "1.5",
            }}
          >
            <strong style={{ 
              fontSize: "16px", 
              fontWeight: "700",
              letterSpacing: "0.5px"
            }}>FREE DELIVERY</strong> available on orders above{" "}
            <strong style={{ 
              fontSize: "17px", 
              fontWeight: "700",
            }}>₹799</strong>
          </span>
        </div>
      </Container>

      <style>
        {`
          .free-delivery-banner {
            transition: box-shadow 0.3s ease;
          }
          
          .free-delivery-banner:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12) !important;
          }
        `}
      </style>
    </div>
  );
};

export default FreeDeliveryBanner;


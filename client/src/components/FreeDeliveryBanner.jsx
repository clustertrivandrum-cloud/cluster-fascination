import React from 'react';
import { Container } from 'react-bootstrap';

// A simple array to simulate endless/ticker scrolling text repeat
const message = (
  <>
    <i
      className="fas fa-truck"
      style={{
        fontSize: "16px",
        color: "white",
        opacity: 0.95,
        marginRight: "7px",
        verticalAlign: "middle",
      }}
    ></i>
    <span
      className="free-delivery-banner-text"
      style={{
        fontFamily: "var(--font-sans, 'Arial', 'Helvetica Neue', Arial, sans-serif)",
        fontSize: "12px",
        fontWeight: "700",
        letterSpacing: "1px",
        lineHeight: "1.2",
        textTransform: "uppercase",
        display: "inline-block",
        verticalAlign: "middle"
      }}
    >
      Free Delivery on orders above&nbsp;
      <strong className="free-delivery-banner-amount" style={{ fontWeight: 800, fontSize: "13px" }}>₹799</strong>
    </span>
  </>
);

const FreeDeliveryBanner = () => {
  return (
    <div
      className="free-delivery-banner"
      style={{
        background: "linear-gradient(135deg, var(--text-dark) 0%, #193624 100%)",
        padding: "0", // padding handled inside container for vertical alignment
        color: "white",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.18)",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid rgba(255, 255, 255, 0.10)",
        minHeight: "38px"
      }}
    >
      <Container fluid style={{padding: 0}}>
        <div className="free-delivery-banner-marquee-wrapper" style={{
          width: "100%",
          overflow: "hidden",
          whiteSpace: "nowrap",
          position: "relative"
        }}>
          <div
            className="free-delivery-banner-marquee"
            style={{
              display: "inline-block",
              whiteSpace: "nowrap",
              animation: "scroll-left 15s linear infinite",
              willChange: "transform"
            }}
            aria-label="Free Delivery on orders above ₹799"
          >
            {/* Repeat the message several times to allow seamless scrolling */}
            <span style={{ marginRight: 45 }}>{message}</span>
            <span style={{ marginRight: 45 }}>{message}</span>
            <span style={{ marginRight: 45 }}>{message}</span>
            <span style={{ marginRight: 45 }}>{message}</span>
            <span style={{ marginRight: 45 }}>{message}</span>
            <span style={{ marginRight: 45 }}>{message}</span>
          </div>
        </div>
      </Container>
      <style>
        {`
          .free-delivery-banner {
            transition: box-shadow 0.3s ease;
            user-select: none;
          }

          .free-delivery-banner:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18) !important;
          }

          @keyframes scroll-left {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          @media (max-width: 600px) {
            .free-delivery-banner {
              background: linear-gradient(90deg, #24a197 0%, #20936d 100%) !important;
              min-height:28px !important;
            }
            .free-delivery-banner-text {
              font-size: 10.5px !important;
              letter-spacing: 1.2px !important;
              line-height: 1.15 !important;
            }
            .free-delivery-banner-amount {
              font-size: 11.5px !important;
            }
            .free-delivery-banner-marquee {
              animation-duration: 10s !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default FreeDeliveryBanner;

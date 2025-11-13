const OrderSummary = ({ salePriceTotal, deliveryCharges = null, discountTotal = 0, proPriceTotal = 0 }) => {
  const isFreeDelivery = salePriceTotal >= 799;
  const showDeliveryCharge = deliveryCharges !== null;
  const deliverySavings = (showDeliveryCharge && isFreeDelivery && deliveryCharges) ? deliveryCharges : 0;
  const totalSavings = discountTotal + deliverySavings;
  const amountNeededForFreeDelivery = salePriceTotal < 799 ? (799 - salePriceTotal) : 0;
  const originalTotal = proPriceTotal || salePriceTotal;

  const displayDeliveryCharge = () => {
    if (!showDeliveryCharge) {
      return (
        <span style={{ color: "var(--text-muted)", fontStyle: "italic" }}>
          Select address first
        </span>
      );
    }

    if (isFreeDelivery || deliveryCharges === 0) {
      return (
        <span
          style={{
            color: "var(--success-green)",
            fontWeight: "700",
            fontSize: "1.1rem",
          }}
        >
          FREE
        </span>
      );
    }

    return (
      <span style={{ color: "var(--text-dark)", fontWeight: "600" }}>
        ₹{deliveryCharges}
      </span>
    );
  };

  return (
    <div
      className="card mb-4"
      style={{
        borderRadius: "20px",
        border: "2px solid var(--primary-mint)",
        boxShadow: "0 5px 20px rgba(185, 234, 216, 0.15)",
      }}
    >
      <div
        className="card-header text-white"
        style={{
          background:
            "linear-gradient(135deg, var(--primary-mint) 0%, var(--dark-mint) 100%)",
          borderRadius: "18px 18px 0 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <h5 className="mb-0" style={{ fontWeight: "600" }}>
          <i className="fas fa-shopping-bag me-2"></i>Order Summary
        </h5>
        {isFreeDelivery && showDeliveryCharge && (
          <div
            style={{
              position: "absolute",
              top: "5px",
              right: "15px",
              background: "rgba(255, 255, 255, 0.25)",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "0.75rem",
              fontWeight: "700",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <i className="fas fa-truck"></i>FREE DELIVERY
          </div>
        )}
      </div>
      <div className="card-body" style={{ padding: "25px" }}>
        {/* Savings Banner - Prominent Display */}
        {totalSavings > 0 && (
          <div
            style={{
              background: "linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)",
              border: "2px solid var(--success-green)",
              borderRadius: "15px",
              padding: "15px",
              marginBottom: "20px",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(40, 167, 69, 0.2)",
            }}
          >
            <div style={{ fontSize: "0.9rem", color: "#155724", marginBottom: "5px", fontWeight: "600" }}>
              <i className="fas fa-tag me-1"></i>You're Saving!
            </div>
            <div
              style={{
                fontSize: "1.8rem",
                fontWeight: "700",
                color: "#155724",
                lineHeight: "1.2",
              }}
            >
              ₹{totalSavings.toFixed(2)}
            </div>
            <div style={{ fontSize: "0.75rem", color: "#155724", marginTop: "5px" }}>
              {discountTotal > 0 && `₹${discountTotal.toFixed(2)} on products`}
              {discountTotal > 0 && isFreeDelivery && showDeliveryCharge && " + "}
              {isFreeDelivery && showDeliveryCharge && `₹${deliveryCharges} free delivery`}
            </div>
          </div>
        )}

        {/* Free Delivery Promotion Banner */}
        {showDeliveryCharge && salePriceTotal >= 799 && (
          <div
            style={{
              background: "linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%)",
              border: "2px solid #ffc107",
              borderRadius: "15px",
              padding: "12px 15px",
              marginBottom: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              boxShadow: "0 4px 12px rgba(255, 193, 7, 0.3)",
            }}
          >
            <i className="fas fa-check-circle" style={{ fontSize: "1.5rem", color: "#856404" }}></i>
            <div>
              <div style={{ fontWeight: "700", color: "#856404", fontSize: "0.95rem" }}>
                FREE DELIVERY UNLOCKED!
              </div>
              <div style={{ fontSize: "0.8rem", color: "#856404" }}>
                You saved ₹{deliveryCharges || 0} on shipping
              </div>
            </div>
          </div>
        )}

        {/* Urgency Message for Free Delivery */}
        {showDeliveryCharge && salePriceTotal < 799 && salePriceTotal > 0 && (
          <div
            style={{
              background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
              border: "2px solid #2196f3",
              borderRadius: "15px",
              padding: "12px 15px",
              marginBottom: "15px",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(33, 150, 243, 0.2)",
            }}
          >
            <div style={{ fontWeight: "700", color: "#1565c0", fontSize: "0.95rem", marginBottom: "5px" }}>
              <i className="fas fa-truck me-2"></i>Almost There for FREE Delivery!
            </div>
            <div style={{ fontSize: "0.85rem", color: "#1565c0" }}>
              Add just <strong style={{ fontSize: "1.1rem" }}>₹{amountNeededForFreeDelivery.toFixed(2)}</strong> more to unlock <strong>FREE delivery</strong> and save ₹{deliveryCharges || 0}!
            </div>
          </div>
        )}

        {/* Price Breakdown */}
        {originalTotal > salePriceTotal && (
          <div className="d-flex justify-content-between mb-2" style={{ paddingBottom: "8px", borderBottom: "1px dashed #e0e0e0" }}>
            <span style={{ fontWeight: "500", color: "var(--text-dark)" }}>
              Original Price:
            </span>
            <span style={{ color: "var(--text-muted)", textDecoration: "line-through" }}>
              ₹{originalTotal.toFixed(2)}
            </span>
          </div>
        )}

        {discountTotal > 0 && (
          <div className="d-flex justify-content-between mb-2">
            <span style={{ fontWeight: "500", color: "var(--text-dark)" }}>
              Discount:
            </span>
            <span style={{ color: "var(--success-green)", fontWeight: "600" }}>
              -₹{discountTotal.toFixed(2)}
            </span>
          </div>
        )}

        <div className="d-flex justify-content-between mb-2">
          <span style={{ fontWeight: "500", color: "var(--text-dark)" }}>
            Subtotal:
          </span>
          <span style={{ color: "var(--text-dark)", fontWeight: "600" }}>₹{salePriceTotal.toFixed(2)}</span>
        </div>

        <div className="d-flex justify-content-between mb-2">
          <span style={{ fontWeight: "500", color: "var(--text-dark)" }}>
            Delivery Fee:
          </span>
          {displayDeliveryCharge()}
        </div>

        <div className="d-flex justify-content-between mb-2">
          <span style={{ fontWeight: "500", color: "var(--text-dark)" }}>
            Tax:
          </span>
          <span style={{ color: "var(--text-muted)" }}>₹0</span>
        </div>

        <hr style={{ borderColor: "var(--primary-mint)", margin: "15px 0", borderWidth: "2px" }} />

        {/* Total with Savings Highlight */}
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <div
              style={{
                fontWeight: "700",
                color: "var(--text-dark)",
                fontSize: "1.2rem",
              }}
            >
              Total Amount:
            </div>
            {totalSavings > 0 && (
              <div style={{ fontSize: "0.75rem", color: "var(--success-green)", marginTop: "2px" }}>
                <i className="fas fa-check-circle me-1"></i>You saved ₹{totalSavings.toFixed(2)}!
              </div>
            )}
          </div>
          <div style={{ textAlign: "right" }}>
            {originalTotal > salePriceTotal && (
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", textDecoration: "line-through" }}>
                ₹{originalTotal.toFixed(2)}
              </div>
            )}
            <span
              style={{
                fontWeight: "700",
                color: "var(--success-green)",
                fontSize: "1.4rem",
              }}
            >
              ₹{(salePriceTotal + (deliveryCharges || 0)).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

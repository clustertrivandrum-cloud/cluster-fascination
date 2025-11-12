const OrderSummary = ({ salePriceTotal, deliveryCharges = null }) => {
  const isFreeDelivery = salePriceTotal >= 799;
  const showDeliveryCharge = deliveryCharges !== null;

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
            fontWeight: "600",
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
        }}
      >
        <h5 className="mb-0" style={{ fontWeight: "600" }}>
          Order Summary 🛍️
        </h5>
      </div>
      <div className="card-body" style={{ padding: "25px" }}>
        <div className="d-flex justify-content-between mb-2">
          <span style={{ fontWeight: "500", color: "var(--text-dark)" }}>
            Subtotal:
          </span>
          <span style={{ color: "var(--text-muted)" }}>₹{salePriceTotal}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span style={{ fontWeight: "500", color: "var(--text-dark)" }}>
            Delivery Fee:
          </span>
          {displayDeliveryCharge()}
        </div>
        {showDeliveryCharge && salePriceTotal >= 799 && (
          <div
            className="alert alert-success"
            style={{
              fontSize: "0.85rem",
              padding: "8px",
              marginBottom: "10px",
            }}
          >
            🎉 You qualified for FREE delivery!
          </div>
        )}
        {showDeliveryCharge && salePriceTotal < 799 && salePriceTotal > 0 && (
          <div
            className="alert alert-info"
            style={{
              fontSize: "0.85rem",
              padding: "8px",
              marginBottom: "10px",
            }}
          >
            Add ₹{(799 - salePriceTotal).toFixed(2)} more for FREE delivery!
          </div>
        )}
        <div className="d-flex justify-content-between mb-2">
          <span style={{ fontWeight: "500", color: "var(--text-dark)" }}>
            Tax:
          </span>
          <span style={{ color: "var(--text-muted)" }}>₹0</span>
        </div>
        <hr style={{ borderColor: "var(--primary-mint)", margin: "15px 0" }} />
        <div className="d-flex justify-content-between">
          <span
            style={{
              fontWeight: "700",
              color: "var(--text-dark)",
              fontSize: "1.1rem",
            }}
          >
            Total:
          </span>
          <span
            style={{
              fontWeight: "700",
              color: "var(--success-green)",
              fontSize: "1.1rem",
            }}
          >
            ₹{(salePriceTotal + (deliveryCharges || 0)).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

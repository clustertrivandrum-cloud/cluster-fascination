import { Form, Button } from "react-bootstrap";

const AddressSection = ({
  orderAddress,
  addressDatas,
  selectedAddress,
  onRadioChange,
  onChangeAddress,
  onNext,
  onAddNewAddress,
}) => {
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
          <i className="fas fa-map-marker-alt me-2"></i>Step 1: Shipping Address
        </h5>
      </div>
      <div className="card-body" style={{ padding: "25px" }}>
        {orderAddress?.address_line_1 ? (
          <div className="row">
            <div className="col-md-6 mb-3">
              <div
                className="border p-3"
                style={{
                  borderRadius: "15px",
                  backgroundColor: "var(--light-mint)",
                  border: "2px solid var(--primary-mint)",
                  height: "100%",
                }}
              >
                <div className="d-flex align-items-center mb-3">
                  <i
                    className="fas fa-check-circle me-2"
                    style={{ color: "var(--success-green)", fontSize: "1.2rem" }}
                  ></i>
                  <h6
                    className="elegant-script mb-0"
                    style={{
                      color: "var(--text-dark)",
                      fontSize: "1.3rem",
                    }}
                  >
                    Selected Address
                  </h6>
                </div>
                <div style={{ color: "var(--text-dark)", lineHeight: "1.8" }}>
                  <p className="mb-2 fw-bold">
                    {orderAddress?.firstname} {orderAddress?.lastname}
                  </p>
                  <p className="mb-1">
                    <i className="fas fa-home me-2" style={{ color: "var(--primary-mint)" }}></i>
                    {orderAddress?.address_line_1}
                    {orderAddress?.address_line_2 && `, ${orderAddress.address_line_2}`}
                  </p>
                  <p className="mb-1">
                    <i className="fas fa-map-marker-alt me-2" style={{ color: "var(--primary-mint)" }}></i>
                    {orderAddress?.city}, {orderAddress?.state}
                  </p>
                  <p className="mb-1">
                    <i className="fas fa-globe me-2" style={{ color: "var(--primary-mint)" }}></i>
                    {orderAddress?.country} - {orderAddress?.zip}
                  </p>
                  <p className="mb-0">
                    <i className="fas fa-phone me-2" style={{ color: "var(--primary-mint)" }}></i>
                    {orderAddress?.mobile}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div
                className="border p-3 d-flex flex-column"
                style={{
                  borderRadius: "15px",
                  backgroundColor: "var(--cream-white)",
                  border: "2px solid var(--accent-beige)",
                  height: "100%",
                }}
              >
                <div className="d-flex align-items-center mb-3">
                  <i
                    className="fas fa-list me-2"
                    style={{ color: "var(--accent-beige)", fontSize: "1.2rem" }}
                  ></i>
                  <h6
                    className="elegant-script mb-0"
                    style={{
                      color: "var(--text-dark)",
                      fontSize: "1.3rem",
                    }}
                  >
                    Other Addresses
                  </h6>
                </div>
                <Form style={{ flex: 1 }}>
                  {addressDatas.map((addr) => (
                    <div key={addr._id} className="mb-2">
                      <Form.Check
                        type="radio"
                        label={
                          <span>
                            <i className="fas fa-map-pin me-1" style={{ fontSize: "0.8rem" }}></i>
                            {addr.address_line_1}
                          </span>
                        }
                        name="group1"
                        id={addr._id}
                        onChange={() => onRadioChange(addr)}
                        checked={selectedAddress?._id === addr._id}
                        style={{ color: "var(--text-dark)" }}
                      />
                    </div>
                  ))}
                </Form>
                <Button
                  className="mt-3 w-100"
                  onClick={onChangeAddress}
                  style={{
                    background:
                      "linear-gradient(135deg, var(--primary-mint) 0%, var(--dark-mint) 100%)",
                    border: "none",
                    borderRadius: "20px",
                    padding: "10px 25px",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                    boxShadow: "0 3px 15px rgba(185, 234, 216, 0.3)",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 8px 25px rgba(185, 234, 216, 0.4)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow =
                      "0 3px 15px rgba(185, 234, 216, 0.3)";
                  }}
                >
                  <i className="fas fa-sync-alt me-2"></i>Change Address
                </Button>
                <Button
                  className="mt-2 w-100"
                  onClick={onAddNewAddress}
                  style={{
                    background:
                      "linear-gradient(135deg, var(--soft-pink) 0%, var(--accent-beige) 100%)",
                    border: "none",
                    borderRadius: "20px",
                    padding: "10px 25px",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                    boxShadow: "0 3px 15px rgba(249, 223, 210, 0.3)",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 8px 25px rgba(249, 223, 210, 0.4)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow =
                      "0 3px 15px rgba(249, 223, 210, 0.3)";
                  }}
                >
                  <i className="fas fa-plus me-2"></i>Add New Address
                </Button>
              </div>
            </div>
            <div className="col-12">
              <button
                className="btn w-100"
                onClick={onNext}
                style={{
                  background:
                    "linear-gradient(135deg, var(--success-green) 0%, var(--dark-mint) 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "20px",
                  padding: "12px 30px",
                  fontWeight: "600",
                  fontSize: "1rem",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow =
                    "0 8px 25px rgba(123, 200, 164, 0.4)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                Next <i className="fas fa-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-5">
            <div style={{ fontSize: "3rem", marginBottom: "15px", color: "var(--primary-mint)" }}>
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h5
              style={{
                color: "var(--text-dark)",
                fontFamily: "var(--font-serif)",
                marginBottom: "10px",
              }}
            >
              No Address Added
            </h5>
            <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>
              You haven&apos;t added any addresses yet. Please add an address to continue.
            </p>
            <Button
              onClick={onAddNewAddress}
              style={{
                background:
                  "linear-gradient(135deg, var(--primary-mint) 0%, var(--dark-mint) 100%)",
                border: "none",
                borderRadius: "20px",
                padding: "12px 30px",
                fontWeight: "600",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow =
                  "0 8px 25px rgba(185, 234, 216, 0.4)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              <i className="fas fa-plus me-2"></i>Add New Address
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressSection;

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
          Step 1: Shipping Address 📍
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
                }}
              >
                <h6
                  className="elegant-script mb-3"
                  style={{
                    color: "var(--text-dark)",
                    fontSize: "1.3rem",
                  }}
                >
                  Selected Address
                </h6>
                <p
                  className="card-text"
                  style={{ color: "var(--text-dark)", lineHeight: "1.8" }}
                >
                  {`${orderAddress?.address_line_1}.`} <br />
                  {`${orderAddress?.city},`} <br />
                  {`${orderAddress?.state},`} <br />
                  {`${orderAddress?.country},`} <br />
                  {`${orderAddress?.zip}.`}
                </p>
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
                <h6
                  className="elegant-script mb-3"
                  style={{
                    color: "var(--text-dark)",
                    fontSize: "1.3rem",
                  }}
                >
                  Other Addresses
                </h6>
                <Form style={{ flex: 1 }}>
                  {addressDatas.map((addr) => (
                    <div key={addr._id} className="mb-2">
                      <Form.Check
                        type="radio"
                        label={addr.address_line_1}
                        name="group1"
                        id={addr._id}
                        onChange={() => onRadioChange(addr)}
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
                  Change Address
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
                  + Add New Address
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
                Next ✨
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-5">
            <div style={{ fontSize: "3rem", marginBottom: "15px" }}>📍</div>
            <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>
              You haven&apos;t added any addresses yet.
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
              Add New Address
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressSection;

import { Form, Button, Modal } from "react-bootstrap";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

const AddressModal = ({ show, onHide, formData, onChange, onSubmit, isEditMode = false }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header
        closeButton
        style={{
          background:
            "linear-gradient(135deg, var(--light-mint) 0%, var(--soft-pink) 100%)",
          border: "none",
        }}
      >
        <Modal.Title
          className="elegant-script"
          style={{
            color: "var(--text-dark)",
            fontSize: "1.8rem",
          }}
        >
          {isEditMode ? "Edit Address ✏️" : "Add New Address 🏠"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "25px" }}>
        <Form onSubmit={onSubmit}>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label
                  style={{ fontWeight: "600", color: "var(--text-dark)" }}
                >
                  First Name
                </Form.Label>
                <Form.Control
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={onChange}
                  required
                  style={{
                    borderRadius: "15px",
                    border: "2px solid var(--primary-mint)",
                    padding: "10px 15px",
                  }}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label
                  style={{ fontWeight: "600", color: "var(--text-dark)" }}
                >
                  Last Name
                </Form.Label>
                <Form.Control
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={onChange}
                  required
                  style={{
                    borderRadius: "15px",
                    border: "2px solid var(--primary-mint)",
                    padding: "10px 15px",
                  }}
                />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label
              style={{ fontWeight: "600", color: "var(--text-dark)" }}
            >
              Address Line 1
            </Form.Label>
            <Form.Control
              type="text"
              name="address_line_1"
              value={formData.address_line_1}
              onChange={onChange}
              required
              style={{
                borderRadius: "15px",
                border: "2px solid var(--primary-mint)",
                padding: "10px 15px",
              }}
            />
          </Form.Group>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label
                  style={{ fontWeight: "600", color: "var(--text-dark)" }}
                >
                  City
                </Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={onChange}
                  required
                  style={{
                    borderRadius: "15px",
                    border: "2px solid var(--primary-mint)",
                    padding: "10px 15px",
                  }}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label
                  style={{ fontWeight: "600", color: "var(--text-dark)" }}
                >
                  State
                </Form.Label>
                <Form.Select
                  name="state"
                  value={formData.state}
                  onChange={onChange}
                  required
                  style={{
                    borderRadius: "15px",
                    border: "2px solid var(--primary-mint)",
                    padding: "10px 15px",
                  }}
                >
                  <option value="">Select State</option>
                  {INDIAN_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label
                  style={{ fontWeight: "600", color: "var(--text-dark)" }}
                >
                  ZIP Code
                </Form.Label>
                <Form.Control
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={onChange}
                  required
                  style={{
                    borderRadius: "15px",
                    border: "2px solid var(--primary-mint)",
                    padding: "10px 15px",
                  }}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label
                  style={{ fontWeight: "600", color: "var(--text-dark)" }}
                >
                  Mobile
                </Form.Label>
                <Form.Control
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={onChange}
                  required
                  style={{
                    borderRadius: "15px",
                    border: "2px solid var(--primary-mint)",
                    padding: "10px 15px",
                  }}
                />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-4">
            <Form.Label
              style={{ fontWeight: "600", color: "var(--text-dark)" }}
            >
              Country
            </Form.Label>
            <Form.Control
              type="text"
              name="country"
              value={formData.country}
              onChange={onChange}
              required
              style={{
                borderRadius: "15px",
                border: "2px solid var(--primary-mint)",
                padding: "10px 15px",
              }}
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100"
            style={{
              background:
                "linear-gradient(135deg, var(--primary-mint) 0%, var(--dark-mint) 100%)",
              border: "none",
              borderRadius: "20px",
              padding: "12px",
              fontWeight: "600",
              fontSize: "1rem",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 25px rgba(185, 234, 216, 0.4)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          >
            {isEditMode ? "Update Address ✨" : "Add Address ✨"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddressModal;

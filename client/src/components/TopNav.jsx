import "../App.css";

function TopNav() {
  const whatsappNumber = "919072415009"; // Replace with your WhatsApp business number
  const whatsappMessage = "Hello! I have an enquiry about your products.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="top-nav-cluster">
      <div className="container d-flex justify-content-between align-items-center">
        <div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="elegant-script mb-0 text-decoration-none"
            style={{
              fontSize: "15px",
              fontWeight: "600",
              color: "inherit",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "#25D366";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = "inherit";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <span className="flower-accent">✿</span>
            <i
              className="fa-brands fa-whatsapp"
              style={{ fontSize: "18px" }}
            ></i>
            Chat with us for enquiry
            <span className="flower-accent">✿</span>
          </a>
        </div>
        <div className="social-media">
          <a href="" aria-label="Instagram">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="" aria-label="Facebook">
            <i className="fa-brands fa-facebook"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default TopNav;

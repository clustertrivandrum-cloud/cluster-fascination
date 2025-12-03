import React from 'react';
import '../App.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
  const headerStyle = {
    fontSize: '1.8rem',
    color: '#e8f8f3', // Soft white/mint for headers
    marginBottom: '25px',
    letterSpacing: '1px',
    fontFamily: 'var(--font-elegant-script), "Great Vibes", cursive', // Ensure script font
  };

  const linkStyle = {
    color: '#d1e8e2', // Light mint/grey for text
    fontFamily: 'var(--font-sans)',
    fontSize: '15px',
    fontWeight: 400,
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '12px'
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.color = '#ffffff';
    e.currentTarget.style.transform = 'translateX(5px)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.color = '#d1e8e2';
    e.currentTarget.style.transform = 'translateX(0)';
  };

  return (
    <footer
      style={{
        background: 'linear-gradient(to right, #1a3c40, #14292b)', // Dark teal gradient
        color: '#fff',
        paddingTop: '60px',
        paddingBottom: '20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container>
        <Row className="justify-content-between">
          {/* Column 1: Navigation */}
          <Col xs={12} md={4} lg={4} className="mb-5 mb-md-0">
            <h5 style={headerStyle} className="elegant-script">
              Fashion Jewellery & Accessories Store
            </h5>
            <ul className="list-unstyled">
              {[
                { name: 'Home', path: '/' },
                { name: 'Our Story', path: '/about' },
                { name: 'Collection', path: '/allproducts' },
                { name: 'Privacy Policy', path: '/privacypolicy' },
                { name: 'Terms & Conditions', path: '/termsandcondition' },
                { name: 'Return & Refund Policy', path: '/refund-policy' },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    style={linkStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Column 2: Social Links (Find Us On) */}
          <Col xs={12} md={4} lg={3} className="mb-5 mb-md-0">
            <h5 style={headerStyle} className="elegant-script">
              Find Us On
            </h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="https://www.instagram.com/clusterfascination?igsh=MXJhamx5ejljdWkzZQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <i className="fab fa-instagram"></i> Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/share/1BciYLfetm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <i className="fab fa-facebook"></i> Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/message/ZWDKV2NYT662F1"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <i className="fab fa-whatsapp"></i> WhatsApp Direct
                </a>
              </li>
              <li>
                <a
                  href="https://chat.whatsapp.com/CNiGdxAEIAh3VxRXFo6Yyc?mode=ac_c"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <i className="fab fa-whatsapp"></i> WhatsApp Group
                </a>
              </li>
            </ul>
          </Col>

          {/* Column 3: Contact */}
          <Col xs={12} md={4} lg={4}>
            <h5 style={headerStyle} className="elegant-script">
              Contact
            </h5>
            <ul className="list-unstyled">
              <li>
                <a href="tel:+916282660237" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  <i className="fas fa-phone-alt"></i> +91 6282 660 237
                </a>
              </li>
              <li>
                <a href="mailto:clusterfascination@gmail.com" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  <i className="fas fa-envelope"></i> clusterfascination@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/uc96wrTnx9wfqmhJA"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...linkStyle, alignItems: 'flex-start' }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <i className="fas fa-map-marker-alt mt-1"></i>
                  <span>98/3499-3, Kallingal Rd, Kulathoor, Thiruvananthapuram, Kerala 695583</span>
                </a>
              </li>
            </ul>
          </Col>
        </Row>

        <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '40px 0 30px' }} />

        {/* Bottom Section */}
        <Row>
          <Col className="text-center">
            <h2
              className="elegant-script"
              style={{
                fontSize: '2.5rem',
                color: '#e8f8f3',
                marginBottom: '10px',
                opacity: 0.9
              }}
            >
              Cluster Fascination
            </h2>
            <p style={{ color: '#8fa3a0', fontSize: '13px', fontFamily: 'var(--font-sans)' }}>
              Copyright &copy; Cluster Fascination Fashion Jewellery & Accessories Store {new Date().getFullYear()}
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
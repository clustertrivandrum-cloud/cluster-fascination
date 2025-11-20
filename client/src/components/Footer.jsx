import React from 'react';
import '../App.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer
      style={{
        background: 'linear-gradient(135deg, var(--text-dark) 0%, #1a3a2e 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="text-light pt-2 pb-0"
    >
      {/* Decorative watercolor spots */}
      <div
        className="watercolor-spot spot-mint"
        style={{ width: '200px', height: '200px', top: '20%', right: '5%', opacity: '0.1', position: 'absolute', zIndex: 0 }}
      ></div>
      <div
        className="watercolor-spot spot-pink"
        style={{ width: '180px', height: '180px', bottom: '10%', left: '10%', opacity: '0.08', position: 'absolute', zIndex: 0 }}
      ></div>

      <Container style={{ position: 'relative', zIndex: 1 }}>
        {/* Branding (Centered Title for Mobile) */}
        <Row className="d-lg-none">
          <Col className="text-center my-4">
            <h5
              className="elegant-script"
              style={{
                fontSize: '1.7rem',
                color: 'var(--primary-mint)',
                letterSpacing: '1px',
                marginBottom: 0,
              }}
            >
              Fashion Jewellery & Accessories Store
            </h5>
          </Col>
        </Row>
        {/* Footer Content */}
        <Row className="text-start justify-content-center">
          {/* Navigation */}
          <Col xs={12} md={4} className="mb-4 mb-md-0 order-2 order-md-1">
            <h6
              className="elegant-script d-none d-lg-block"
              style={{
                fontSize: '1.5rem',
                color: 'var(--primary-mint)',
                marginBottom: '20px',
                letterSpacing: '1px'
              }}
            >
              Fashion Jewellery & Accessories Store
            </h6>
            <ul className="list-unstyled" style={{ lineHeight: '2.2', paddingLeft: 0 }}>
              <li>
                <Link
                  to="/"
                  style={{
                    color: '#E8F8F3',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '15px',
                    fontWeight: 500,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = 'var(--primary-mint)')}
                  onMouseOut={(e) => (e.currentTarget.style.color = '#E8F8F3')}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  style={{
                    color: '#E8F8F3',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '15px',
                    fontWeight: 500,
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = 'var(--primary-mint)')}
                  onMouseOut={(e) => (e.currentTarget.style.color = '#E8F8F3')}
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/allproducts"
                  style={{
                    color: '#E8F8F3',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '15px',
                    fontWeight: 500,
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = 'var(--primary-mint)')}
                  onMouseOut={(e) => (e.currentTarget.style.color = '#E8F8F3')}
                >
                  Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/privacypolicy"
                  style={{
                    color: '#E8F8F3',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '15px',
                    fontWeight: 500,
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = 'var(--primary-mint)')}
                  onMouseOut={(e) => (e.currentTarget.style.color = '#E8F8F3')}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/termsandcondition"
                  style={{
                    color: '#E8F8F3',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '15px',
                    fontWeight: 500,
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = 'var(--primary-mint)')}
                  onMouseOut={(e) => (e.currentTarget.style.color = '#E8F8F3')}
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/refund-policy"
                  style={{
                    color: '#E8F8F3',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '15px',
                    fontWeight: 500,
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = 'var(--primary-mint)')}
                  onMouseOut={(e) => (e.currentTarget.style.color = '#E8F8F3')}
                >
                  Return & Refund Policy
                </Link>
              </li>
            </ul>
          </Col>

          {/* Contact Details */}
          <Col xs={12} md={4} className="mb-4 mb-md-0 order-3 order-md-2">
            <h6
              className="elegant-script"
              style={{
                fontSize: '1.5rem',
                color: 'var(--accent-beige)',
                marginBottom: '20px',
                letterSpacing: '1px',
              }}
            >
              Contact
            </h6>
            <ul className="list-unstyled" style={{ lineHeight: '2.2', paddingLeft: 0 }}>
              <li>
                <a
                  href="tel:+916282660237"
                  style={{
                    color: '#E8F8F3',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '15px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: 500
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = 'var(--accent-beige)')}
                  onMouseOut={(e) => (e.currentTarget.style.color = '#E8F8F3')}
                >
                  <i className="fas fa-phone"></i> +91 6282 660 237
                </a>
              </li>
              <li>
                <a
                  href="mailto:clusterfascination@gmail.com"
                  style={{
                    color: '#E8F8F3',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '15px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: 500
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = 'var(--accent-beige)')}
                  onMouseOut={(e) => (e.currentTarget.style.color = '#E8F8F3')}
                >
                  <i className="fas fa-envelope"></i> clusterfascination@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/uc96wrTnx9wfqmhJA"
                  style={{
                    color: '#E8F8F3',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '15px',
                    display: 'block',
                    fontWeight: 500
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = 'var(--accent-beige)')}
                  onMouseOut={(e) => (e.currentTarget.style.color = '#E8F8F3')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-map-marker-alt"></i>{' '}
                  98/3499-3, Kallingal Rd, Kulathoor, Thiruvananthapuram, Kerala 695583
                </a>
              </li>
            </ul>
          </Col>

          {/* Social Links */}
          <Col xs={12} md={4} className="mb-4 mb-md-0 order-1 order-md-3">
            <h6
              className="elegant-script"
              style={{
                fontSize: '1.5rem',
                color: 'var(--accent-pink)',
                marginBottom: '20px',
                letterSpacing: '1px',
              }}
            >
            Find Us On
            </h6>
            <ul className="list-unstyled" style={{ lineHeight: '2.2', paddingLeft: 0 }}>
              <li>
                <a
                  href="https://www.instagram.com/clusterfascination?igsh=MXJhamx5ejljdWkzZQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#E8F8F3',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '15px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: 500
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = 'var(--accent-pink)')}
                  onMouseOut={(e) => (e.currentTarget.style.color = '#E8F8F3')}
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram"></i> Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/share/1BciYLfetm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#E8F8F3',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '15px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: 500
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = 'var(--accent-pink)')}
                  onMouseOut={(e) => (e.currentTarget.style.color = '#E8F8F3')}
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook"></i> Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/message/ZWDKV2NYT662F1"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#E8F8F3',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '15px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: 500
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = 'var(--accent-pink)')}
                  onMouseOut={(e) => (e.currentTarget.style.color = '#E8F8F3')}
                  aria-label="WhatsApp Direct"
                >
                  <i className="fab fa-whatsapp"></i> WhatsApp Direct
                </a>
              </li>
              <li>
                <a
                  href="https://chat.whatsapp.com/CNiGdxAEIAh3VxRXFo6Yyc?mode=ac_c"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#E8F8F3',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '15px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: 500
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = 'var(--accent-pink)')}
                  onMouseOut={(e) => (e.currentTarget.style.color = '#E8F8F3')}
                  aria-label="WhatsApp Group"
                >
                  <i className="fab fa-whatsapp"></i> WhatsApp Group
                </a>
              </li>
            </ul>
          </Col>

        </Row>
        <hr
          style={{
            borderTop: '1px solid var(--primary-mint)',
            opacity: '0.3',
            margin: '30px 0 16px',
          }}
        />
        <Row className="align-items-center">
          <Col className="text-center">
            <p className="mb-2 signature-text" style={{ fontSize: '2rem', color: 'var(--primary-mint)' }}>
              Cluster Fascination
            </p>
            <p
              className="mb-0"
              style={{
                color: '#E8F8F3',
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
              }}
            >
              Copyright &copy; Cluster Fascination Fashion Jewellery & Accessories Store{' '}
              {new Date().getFullYear()}
            </p>
          </Col>
        </Row>
        <div style={{height: "8px"}}></div>
      </Container>
    </footer>
  );
}

export default Footer;
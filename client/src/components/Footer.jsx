import React from 'react';
import '../App.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, var(--text-dark) 0%, #1a3a2e 100%)',
      position: 'relative',
      overflow: 'hidden'
    }} className="text-light py-5">
      {/* Decorative watercolor spots */}
      <div className="watercolor-spot spot-mint" style={{width: '200px', height: '200px', top: '20%', right: '5%', opacity: '0.1'}}></div>
      <div className="watercolor-spot spot-pink" style={{width: '180px', height: '180px', bottom: '10%', left: '10%', opacity: '0.08'}}></div>
      
      <Container style={{position: 'relative', zIndex: 1}}>
        <Row>
          <Col md={4} className="mb-4">
            <h5 className="elegant-script" style={{fontSize: '24px', color: 'var(--primary-mint)', marginBottom: '20px'}}>
              Fashion Jewellery & Accessories Store
            </h5>
            <ul className="list-unstyled" style={{lineHeight: '2.2'}}>
              <li><Link to={'/'} style={{color: '#E8F8F3', fontFamily: 'var(--font-sans)', fontSize: '14px', transition: 'all 0.3s ease'}} onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary-mint)'} onMouseOut={(e) => e.currentTarget.style.color = '#E8F8F3'}>Home</Link></li>
              <li><Link to={'/about'} style={{color: '#E8F8F3', fontFamily: 'var(--font-sans)', fontSize: '14px'}} onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary-mint)'} onMouseOut={(e) => e.currentTarget.style.color = '#E8F8F3'}>Our Story</Link></li>
              <li><Link to={'/allproducts'} style={{color: '#E8F8F3', fontFamily: 'var(--font-sans)', fontSize: '14px'}} onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary-mint)'} onMouseOut={(e) => e.currentTarget.style.color = '#E8F8F3'}>Collection</Link></li>
              <li><Link to={'/privacypolicy'} style={{color: '#E8F8F3', fontFamily: 'var(--font-sans)', fontSize: '14px'}} onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary-mint)'} onMouseOut={(e) => e.currentTarget.style.color = '#E8F8F3'}>Privacy Policy</Link></li>
              <li><Link to={'/shippingpolicy'} style={{color: '#E8F8F3', fontFamily: 'var(--font-sans)', fontSize: '14px'}} onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary-mint)'} onMouseOut={(e) => e.currentTarget.style.color = '#E8F8F3'}>Delivery Policy</Link></li>
              <li><Link to={'/termsandcondition'} style={{color: '#E8F8F3', fontFamily: 'var(--font-sans)', fontSize: '14px'}} onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary-mint)'} onMouseOut={(e) => e.currentTarget.style.color = '#E8F8F3'}>Terms & Conditions</Link></li>
              <li><Link to={'/refund-policy'} style={{color: '#E8F8F3', fontFamily: 'var(--font-sans)', fontSize: '14px'}} onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary-mint)'} onMouseOut={(e) => e.currentTarget.style.color = '#E8F8F3'}>Return & Refund policy</Link></li>
            </ul>
          </Col>
          <Col md={4} className="mb-4">
            <h5 className="elegant-script" style={{fontSize: '24px', color: 'var(--accent-pink)', marginBottom: '20px'}}>
              Fashion Jewellery & Accessories Store
            </h5>
            <ul className="list-unstyled" style={{lineHeight: '2.2'}}>
              <li><a href="#" style={{color: '#E8F8F3', fontFamily: 'var(--font-sans)', fontSize: '14px'}} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-pink)'} onMouseOut={(e) => e.currentTarget.style.color = '#E8F8F3'}>Instagram</a></li>
              <li><a href="#" style={{color: '#E8F8F3', fontFamily: 'var(--font-sans)', fontSize: '14px'}} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-pink)'} onMouseOut={(e) => e.currentTarget.style.color = '#E8F8F3'}>Facebook</a></li>
              <li><a href="#" style={{color: '#E8F8F3', fontFamily: 'var(--font-sans)', fontSize: '14px'}} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-pink)'} onMouseOut={(e) => e.currentTarget.style.color = '#E8F8F3'}>Contact</a></li>
              <li><a href="#" style={{color: '#E8F8F3', fontFamily: 'var(--font-sans)', fontSize: '14px'}} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-pink)'} onMouseOut={(e) => e.currentTarget.style.color = '#E8F8F3'}>Style Guide</a></li>
            </ul>
          </Col>
          <Col md={4} className="mb-4">
            <h5 className="elegant-script" style={{fontSize: '24px', color: 'var(--accent-beige)', marginBottom: '20px'}}>
              Contact
            </h5>
            <ul className="list-unstyled" style={{lineHeight: '2.2'}}>
              <li><a href="tel:7736225610" style={{color: '#E8F8F3', fontFamily: 'var(--font-sans)', fontSize: '14px'}} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-beige)'} onMouseOut={(e) => e.currentTarget.style.color = '#E8F8F3'}>Call: +91 7736225610</a></li>
              <li><a href="mailto:info@clusterfascination.com" style={{color: '#E8F8F3', fontFamily: 'var(--font-sans)', fontSize: '14px'}} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-beige)'} onMouseOut={(e) => e.currentTarget.style.color = '#E8F8F3'}>Email: info@clusterfascination.com</a></li>
              <li><a href="https://maps.app.goo.gl/uc96wrTnx9wfqmhJA" style={{color: '#E8F8F3', fontFamily: 'var(--font-sans)', fontSize: '14px', display: 'block'}} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-beige)'} onMouseOut={(e) => e.currentTarget.style.color = '#E8F8F3'}>Address: Avilunni Vilakath Veed, Narivanmood, Parambukkonam, Thirivananthapuram, 695528</a></li>
            </ul>
          </Col>
        </Row>
        <hr style={{borderTop: '1px solid var(--primary-mint)', opacity: '0.3', margin: '30px 0'}} />
        <Row className="align-items-center">
          <Col className="text-center">
            <p className="mb-2 signature-text" style={{fontSize: '2rem', color: 'var(--primary-mint)'}}>Cluster Fascination</p>
            <p className="mb-0" style={{color: '#E8F8F3', fontFamily: 'var(--font-sans)', fontSize: '13px'}}>
              Copyright &copy; Cluster Fascination Fashion Jewellery & Accessories Store   {new Date().getFullYear()}
            </p>  
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
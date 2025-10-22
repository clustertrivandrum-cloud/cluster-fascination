// Cluster Fascination Theme - Component Examples
// Copy these examples and adapt them to your pages

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { 
  WreathDecoration, 
  FlowerAccent, 
  SectionDivider,
  BranchDecoration,
  CornerDecoration 
} from './src/components/DecorativeElements';

// ========================================
// EXAMPLE 1: Hero Section with Watercolor
// ========================================
export const HeroExample = () => (
  <section className="watercolor-bg py-5" style={{ position: 'relative', minHeight: '500px' }}>
    {/* Watercolor spots */}
    <div className="watercolor-spot spot-mint" 
         style={{width: '400px', height: '400px', top: '-50px', right: '5%'}}></div>
    <div className="watercolor-spot spot-pink" 
         style={{width: '300px', height: '300px', bottom: '-50px', left: '10%'}}></div>
    
    <Container className="text-center">
      {/* Main heading with script font */}
      <h1 className="brand-name mb-3" style={{fontSize: '4rem'}}>
        Cluster Fascination
      </h1>
      
      {/* Subheading with elegant script */}
      <p className="elegant-script mb-4" style={{fontSize: '24px', color: 'var(--text-muted)'}}>
        <span className="flower-accent">✿</span>
        Fashion Jewellery & Accessories Store
        <span className="flower-accent">✿</span>
      </p>
      
      {/* Decorative divider */}
      <div className="d-flex justify-content-center mb-4">
        <SectionDivider width={250} />
      </div>
      
      {/* CTA Buttons */}
      <div className="d-flex gap-3 justify-content-center flex-wrap">
        <button className="btn btn-cluster px-4 py-3">Explore Collection</button>
        <button className="btn btn-outline-cluster px-4 py-3">Learn More</button>
      </div>
      
      {/* Decorative wreath */}
      <div className="mt-5">
        <WreathDecoration size={120} style={{opacity: 0.4}} />
      </div>
    </Container>
  </section>
);

// ========================================
// EXAMPLE 2: Featured Section with Cards
// ========================================
export const FeaturedSectionExample = () => (
  <section className="py-5" style={{background: 'var(--cream-white)'}}>
    <Container>
      {/* Section Header */}
      <div className="text-center mb-5">
        <h2 className="elegant-script" style={{fontSize: '3rem', color: 'var(--text-dark)'}}>
          Featured Products
        </h2>
        <p style={{fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--text-muted)', fontStyle: 'italic'}}>
          Handpicked for your wellness journey
        </p>
        <div className="d-flex justify-content-center mt-3">
          <BranchDecoration width={150} />
        </div>
      </div>
      
      {/* Product Cards */}
      <Row className="g-4">
        {[1, 2, 3].map((item) => (
          <Col key={item} md={4}>
            <div className="card-cluster p-0">
              <img 
                src={`https://via.placeholder.com/400x300`} 
                alt="Product" 
                style={{width: '100%', height: '250px', objectFit: 'cover'}}
              />
              <div className="p-4">
                <h5 style={{fontFamily: 'var(--font-serif)', fontWeight: '600'}}>
                  Product Name
                </h5>
                <p style={{fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', fontSize: '0.9rem'}}>
                  Beautiful description of the wellness product
                </p>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span style={{fontWeight: '600', color: 'var(--success-green)', fontSize: '1.3rem'}}>
                    ₹299
                  </span>
                  <button className="btn btn-cluster">Add to Cart</button>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  </section>
);

// ========================================
// EXAMPLE 3: Testimonial Section
// ========================================
export const TestimonialExample = () => (
  <section className="py-5" style={{
    background: 'linear-gradient(135deg, var(--light-mint) 0%, var(--soft-pink) 100%)',
    position: 'relative'
  }}>
    {/* Corner decorations */}
    <div style={{position: 'absolute', top: '20px', left: '20px'}}>
      <CornerDecoration size={60} style={{opacity: 0.5}} />
    </div>
    <div style={{position: 'absolute', bottom: '20px', right: '20px', transform: 'rotate(180deg)'}}>
      <CornerDecoration size={60} style={{opacity: 0.5}} />
    </div>
    
    <Container>
      <div className="text-center mb-5">
        <h2 className="signature-text" style={{fontSize: '3.5rem', color: 'var(--dark-mint)'}}>
          What Our Customers Say
        </h2>
      </div>
      
      <Row className="justify-content-center">
        <Col md={8}>
          <div style={{
            background: 'white',
            borderRadius: '25px',
            padding: '40px',
            boxShadow: '0 5px 20px rgba(185, 234, 216, 0.2)',
            borderLeft: '5px solid var(--primary-mint)'
          }}>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.2rem',
              fontStyle: 'italic',
              color: 'var(--text-dark)',
              lineHeight: '1.8',
              marginBottom: '20px'
            }}>
              "Cluster Fascination has transformed my wellness routine. 
              The quality and care in every product is exceptional!"
            </p>
            <div className="d-flex align-items-center gap-3">
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'var(--primary-mint)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-elegant-script)',
                fontSize: '1.5rem',
                color: 'var(--text-dark)'
              }}>
                SK
              </div>
              <div>
                <h6 className="mb-0" style={{fontFamily: 'var(--font-serif)', fontWeight: '600'}}>
                  Sarah Kumar
                </h6>
                <small style={{color: 'var(--text-muted)'}}>Verified Customer</small>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
);

// ========================================
// EXAMPLE 4: Call to Action Section
// ========================================
export const CTAExample = () => (
  <section className="py-5 watercolor-bg" style={{position: 'relative', overflow: 'hidden'}}>
    <div className="watercolor-spot spot-beige" 
         style={{width: '500px', height: '500px', top: '-100px', left: '-100px'}}></div>
    <div className="watercolor-spot spot-mint" 
         style={{width: '450px', height: '450px', bottom: '-100px', right: '-100px'}}></div>
    
    <Container>
      <Row className="align-items-center">
        <Col md={6}>
          <WreathDecoration size={200} style={{opacity: 0.6}} />
        </Col>
        <Col md={6}>
          <h2 className="elegant-script mb-3" style={{fontSize: '2.5rem', color: 'var(--text-dark)'}}>
            Join Our Wellness Community
          </h2>
          <p style={{fontFamily: 'var(--font-sans)', fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.8'}}>
            Subscribe to receive exclusive offers, wellness tips, and updates 
            on our latest collections.     
          </p>
          <div className="d-flex gap-3 mt-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="form-control-cluster flex-grow-1"
              style={{maxWidth: '300px'}}
            />
            <button className="btn btn-cluster">Subscribe</button>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
);

// ========================================
// EXAMPLE 5: Badge and Tag Examples
// ========================================
export const BadgeExamples = () => (
  <div className="d-flex gap-3 flex-wrap p-4">
    <span className="badge-cluster">New Arrival</span>
    <span className="badge-cluster" style={{background: 'var(--accent-pink)'}}>Sale</span>
    <span className="badge-cluster" style={{background: 'var(--accent-beige)'}}>Limited</span>
    <span className="badge-cluster" style={{background: 'var(--success-green)'}}>Best Seller</span>
  </div>
);

// ========================================
// EXAMPLE 6: Icon Button Examples
// ========================================
export const IconButtonExamples = () => (
  <div className="d-flex gap-3 p-4">
    {/* Cart Button */}
    <button className="btn position-relative" style={{
      background: 'white',
      border: '2px solid var(--primary-mint)',
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 3px 10px rgba(185, 234, 216, 0.3)'
    }}>
      <i className="fa-solid fa-cart-shopping" style={{color: 'var(--text-dark)'}}></i>
      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" 
            style={{background: 'var(--accent-pink)', color: 'var(--text-dark)'}}>
        3
      </span>
    </button>
    
    {/* Wishlist Button */}
    <button className="btn" style={{
      background: 'white',
      border: '2px solid var(--accent-pink)',
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 3px 10px rgba(245, 213, 216, 0.3)'
    }}>
      <i className="fa-solid fa-heart" style={{color: 'var(--text-dark)'}}></i>
    </button>
    
    {/* User Button */}
    <button className="btn" style={{
      background: 'white',
      border: '2px solid var(--success-green)',
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 3px 10px rgba(123, 200, 164, 0.3)'
    }}>
      <i className="fa-solid fa-user" style={{color: 'var(--text-dark)'}}></i>
    </button>
  </div>
);

// ========================================
// EXAMPLE 7: Loading State
// ========================================
export const LoadingExample = () => (
  <div className="d-flex justify-content-center align-items-center" style={{minHeight: '200px'}}>
    <div className="text-center">
      <div className="spinner-border" style={{color: 'var(--primary-mint)', width: '3rem', height: '3rem'}} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3 elegant-script" style={{fontSize: '1.2rem', color: 'var(--text-muted)'}}>
        Loading your wellness journey...
      </p>
    </div>
  </div>
);

export default {
  HeroExample,
  FeaturedSectionExample,
  TestimonialExample,
  CTAExample,
  BadgeExamples,
  IconButtonExamples,
  LoadingExample
};


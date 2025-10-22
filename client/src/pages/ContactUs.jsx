import React, { useState } from 'react';
import TopNav from '../components/TopNav';
import MiddleNav from '../components/MiddleNav';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can implement your logic here, such as sending the form data to a backend server
    console.log(formData);
    // Clear form fields after submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (

   <>
     <TopNav/>
     <MiddleNav/>
     <MainNav/> 
      <div className="container py-5" style={{position: 'relative'}}>
        {/* Decorative watercolor spots */}
        <div className="watercolor-spot spot-pink" style={{width: '220px', height: '220px', top: '100px', right: '5%', opacity: '0.12'}}></div>
        <div className="watercolor-spot spot-mint" style={{width: '200px', height: '200px', bottom: '50px', left: '3%', opacity: '0.1'}}></div>
        
        <div className="text-center mb-5">
          <h2 className="elegant-script" style={{fontSize: '3rem', color: 'var(--text-dark)'}}>
            Contact Us
          </h2>
          <p style={{fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--text-muted)', fontStyle: 'italic'}}>
            <span className='flower-accent'>✿</span> We'd Love to Hear From You <span className='flower-accent'>✿</span>
          </p>
          <div className="section-divider"></div>
        </div>
        
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card-cluster p-4" style={{height: '100%'}}>
              <h3 className="mb-4" style={{
                fontFamily: 'var(--font-elegant-script)',
                fontSize: '2rem',
                color: 'var(--dark-mint)'
              }}>Get in Touch</h3>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                lineHeight: '1.8',
                color: 'var(--text-dark)',
                marginBottom: '30px'
              }}>
                We would love to hear from you!
              </p>
              <div className="contact-info" style={{fontFamily: 'var(--font-serif)'}}>
                <h4 className="mb-3" style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.3rem',
                  color: 'var(--text-dark)',
                  fontWeight: '600'
                }}>Contact Details</h4>
                <div className="mb-3">
                  <i className="fas fa-phone me-2" style={{color: 'var(--primary-mint)'}}></i>
                  <a href="tel:7736225610" style={{
                    color: 'var(--text-dark)',
                    textDecoration: 'none',
                    fontSize: '1rem'
                  }}>
                    +91 7736225610
                  </a>
                </div>
                <div className="mb-3">
                  <i className="fas fa-envelope me-2" style={{color: 'var(--primary-mint)'}}></i>
                  <a href="mailto:info@clusterfascination.com" style={{
                    color: 'var(--text-dark)',
                    textDecoration: 'none',
                    fontSize: '1rem'
                  }}>
                    info@clusterfascination.com
                  </a>
                </div>
                <div className="mb-3">
                  <i className="fas fa-map-marker-alt me-2" style={{color: 'var(--primary-mint)'}}></i>
                  <a href="https://maps.app.goo.gl/uc96wrTnx9wfqmhJA" target="_blank" rel="noopener noreferrer" style={{
                    color: 'var(--text-dark)',
                    textDecoration: 'none',
                    fontSize: '1rem'
                  }}>
                    Avilunni Vilakath Veed, Narivanmood, Parambukkonam, Thirivananthapuram, 695528
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="embed-responsive embed-responsive-16by9" style={{
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(185, 234, 216, 0.2)'
            }}>
              <iframe
                title="map"
                className="embed-responsive-item"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2492.1144708437996!2d0.03009668749301377!3d51.34580564973545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47df5532a07233b5%3A0x742f86cdcbaa7f1b!2sBoutique%20Wellness%20Center%2C%20Keston%20BR2%206DF%2C%20UK!5e0!3m2!1sen!2sin!4v1715162508024!5m2!1sen!2sin"
                allowFullScreen 
                style={{
                  width:'100%', 
                  height:'400px',
                  border: 'none',
                  borderRadius: '20px'
                }}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
   </>
  );
};

export default ContactUs;

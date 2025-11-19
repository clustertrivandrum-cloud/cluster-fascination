import React, { useState } from 'react';
import TopNav from '../components/TopNav';
import MiddleNav from '../components/MiddleNav';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';

const WA_DIRECT_LINK = 'https://wa.me/message/ZWDKV2NYT662F1';
const WA_GROUP_LINK = 'https://chat.whatsapp.com/CNiGdxAEIAh3VxRXFo6Yyc?mode=ac_c';
const FB_SHARE_LINK = 'https://www.facebook.com/share/1BciYLfetm/';
const GOOGLE_DRIVE_LINK = 'https://share.google/D0Yrzxde0h6fPSrro';

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
      <TopNav />
      <MiddleNav />
      <MainNav />
      <div className="container py-5" style={{ position: 'relative' }}>
        {/* Decorative watercolor spots */}
        <div
          className="watercolor-spot spot-pink"
          style={{
            width: '220px',
            height: '220px',
            top: '100px',
            right: '5%',
            opacity: '0.12'
          }}
        ></div>
        <div
          className="watercolor-spot spot-mint"
          style={{
            width: '200px',
            height: '200px',
            bottom: '50px',
            left: '3%',
            opacity: '0.1'
          }}
        ></div>

        <div className="text-center mb-5">
          <h2
            className="elegant-script"
            style={{ fontSize: '3rem', color: 'var(--text-dark)' }}
          >
            Contact Us
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.1rem',
              color: 'var(--text-muted)',
              fontStyle: 'italic'
            }}
          >
            <span className="flower-accent">✿</span> We'd Love to Hear From You{' '}
            <span className="flower-accent">✿</span>
          </p>
          <div className="section-divider"></div>
        </div>

        <div className="row">
          {/* Contact Details and Social/Share Links */}
          <div className="col-md-6 mb-4">
            <div className="card-cluster p-4" style={{ height: '100%' }}>
              <h3
                className="mb-4"
                style={{
                  fontFamily: 'var(--font-elegant-script)',
                  fontSize: '2rem',
                  color: 'var(--dark-mint)'
                }}
              >
                Get in Touch
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  lineHeight: '1.8',
                  color: 'var(--text-dark)',
                  marginBottom: '30px'
                }}
              >
                We would love to hear from you!
              </p>
              <div className="contact-info" style={{ fontFamily: 'var(--font-serif)' }}>
                <h4
                  className="mb-3"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.3rem',
                    color: 'var(--text-dark)',
                    fontWeight: '600'
                  }}
                >
                  Contact Details
                </h4>
                <div className="mb-3">
                  <i
                    className="fas fa-phone me-2"
                    style={{ color: 'var(--primary-mint)' }}
                  ></i>
                  <a
                    href="tel:6282660237"
                    style={{
                      color: 'var(--text-dark)',
                      textDecoration: 'none',
                      fontSize: '1rem'
                    }}
                  >
                    +91 6282 660 237
                  </a>
                </div>
                <div className="mb-3">
                  <i
                    className="fas fa-envelope me-2"
                    style={{ color: 'var(--primary-mint)' }}
                  ></i>
                  <a
                    href="mailto:info@clusterfascination.com"
                    style={{
                      color: 'var(--text-dark)',
                      textDecoration: 'none',
                      fontSize: '1rem'
                    }}
                  >
                    info@clusterfascination.com
                  </a>
                </div>
                <div className="mb-3">
                  <i
                    className="fas fa-map-marker-alt me-2"
                    style={{ color: 'var(--primary-mint)' }}
                  ></i>
                  <a
                    href="https://maps.app.goo.gl/uc96wrTnx9wfqmhJA"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--text-dark)',
                      textDecoration: 'none',
                      fontSize: '1rem'
                    }}
                  >
                    Avilunni Vilakath Veed, Narivanmood, Parambukkonam, Thirivananthapuram, 695528
                  </a>
                </div>
                {/* WhatsApp Direct */}
                <div className="mb-3">
                  <i className="fab fa-whatsapp me-2" style={{ color: '#25D366' }}></i>
                  <a
                    href={WA_DIRECT_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--text-dark)',
                      textDecoration: 'none',
                      fontSize: '1rem',
                      fontWeight: '500'
                    }}
                  >
                    WhatsApp Direct Chat
                  </a>
                </div>
                {/* WhatsApp Group */}
                <div className="mb-3">
                  <i className="fab fa-whatsapp me-2" style={{ color: '#075e54' }}></i>
                  <a
                    href={WA_GROUP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--text-dark)',
                      textDecoration: 'none',
                      fontSize: '1rem',
                      fontWeight: '500'
                    }}
                  >
                    Join WhatsApp Community
                  </a>
                </div>
                {/* Facebook Share */}
                <div className="mb-3">
                  <i className="fab fa-facebook me-2" style={{ color: '#4267B2' }}></i>
                  <a
                    href={FB_SHARE_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--text-dark)',
                      textDecoration: 'none',
                      fontSize: '1rem',
                      fontWeight: '500'
                    }}
                  >
                    Share on Facebook
                  </a>
                </div>
                {/* Google Drive / Docs Share */}
                <div className="mb-3">
                  <i className="fab fa-google-drive me-2" style={{ color: '#34a853' }}></i>
                  <a
                    href={GOOGLE_DRIVE_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--text-dark)',
                      textDecoration: 'none',
                      fontSize: '1rem',
                      fontWeight: '500'
                    }}
                  >
                    View Google Doc/Drive
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Google Map */}
          <div className="col-md-6">
            <div
              className="embed-responsive embed-responsive-16by9"
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(185, 234, 216, 0.2)'
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4767.443273999611!2d76.87528437579378!3d8.550692891492753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bfb05e063277%3A0x2e5b4614dd664723!2sCluster%20Fascination!5e1!3m2!1sen!2sin!4v1763575004502!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: '20px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Cluster Fascination Location"
                className="embed-responsive-item"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;

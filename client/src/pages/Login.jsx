import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';
import TokenManager from '../utils/tokenManager';

import { Col, Row, Alert } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { FlowerAccent, LeafDecoration } from '../components/DecorativeElements';

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Input validation function
  const validateInput = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;
      case 'password':
        if (!value.trim()) {
          newErrors.password = 'Password is required';
        } else if (value.length < 8) {
          newErrors.password = 'Password must be at least 8 characters long';
        } else {
          delete newErrors.password;
        }
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    
    // Clear messages when user starts typing
    if (successMessage) setSuccessMessage('');
    if (errorMessage) setErrorMessage('');
    
    // Validate input in real-time
    validateInput(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous messages
    setErrorMessage('');
    setSuccessMessage('');
    
    // Validate all fields before submission
    const emailValid = validateInput('email', userDetails.email);
    const passwordValid = validateInput('password', userDetails.password);
    
    if (!emailValid || !passwordValid) {
      setErrorMessage('Please fix the errors above before submitting.');
      return;
    }
    
    // Check for empty fields
    if (!userDetails.email.trim() || !userDetails.password.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await axiosInstance.post('/api/v1/auth/login', userDetails);
      
      // Check if login was successful
      if (response.data.proceed && response.data.data && response.data.data.token) {
        // Store tokens securely using TokenManager
        const success = TokenManager.setTokens(
          response.data.data.token.accessToken,
          response.data.data.token.refreshToken
        );
        
        if (success) {
          setSuccessMessage('Login successful! Redirecting...');
          
          // Redirect after a short delay to show success message
          setTimeout(() => {
            navigate('/');
          }, 1500);
        } else {
          setErrorMessage('Login failed. Unable to store authentication data.');
        }
        
      } else {
        setErrorMessage('Login failed. Invalid server response.');
      }

    } catch (error) {
      console.error('Error during login:', error);
      
      // Handle different types of errors
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;
        
        if (status === 401) {
          setErrorMessage('Invalid email or password. Please check your credentials.');
        } else if (status === 429) {
          setErrorMessage('Too many login attempts. Please try again later.');
        } else if (status === 500) {
          setErrorMessage('Server error. Please try again later.');
        } else if (data?.message) {
          setErrorMessage(data.message);
        } else {
          setErrorMessage('Login failed. Please try again.');
        }
      } else if (error.request) {
        setErrorMessage('Network error. Please check your connection and try again.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
   <>
     {/* Header with Cluster Fascination Theme */}
     <div className='watercolor-bg' style={{
       background: 'linear-gradient(135deg, var(--cream-white) 0%, var(--light-mint) 50%, var(--soft-pink) 100%)',
       position: 'relative',
       overflow: 'hidden'
     }}>
       {/* Watercolor spots */}
       <div className="watercolor-spot spot-mint" 
            style={{width: '300px', height: '300px', top: '-100px', right: '10%'}}></div>
       <div className="watercolor-spot spot-beige" 
            style={{width: '250px', height: '250px', bottom: '-50px', left: '5%'}}></div>
       
      <div className='container p-3 py-4'>
        <div className='d-flex justify-content-between align-items-center'>
         <Link to={'/'}>
            <div className='floating-element'>
              <img src={logo} className='img-fluid' width={150} alt="Cluster Fascination Logo" 
                   style={{filter: 'drop-shadow(0 2px 8px rgba(185, 234, 216, 0.3))'}} />
            </div>
         </Link>
          <div>
            <p className='d-none d-md-block elegant-script mb-0' 
               style={{fontSize: '20px', fontWeight: '600', color: 'var(--text-dark)'}}>
              Fashion Jewellery & Accessories Store collection    
            </p>
          </div>
          <div style={{width: '150px'}}>
            {/* Spacer for alignment */}
          </div>
        </div>
      </div>
    </div>

      {/* Login Form Section */}
      <div className="container p-5 mt-5" style={{position: 'relative'}}>
        {/* Decorative leaf */}
        <div style={{position: 'absolute', top: '-30px', right: '50px', opacity: '0.3'}}>
          <LeafDecoration size={60} />
        </div>
        
        <div className="">
          <Row className="align-items-center">
            <Col md={6} className='d-none d-md-block'>
              <div style={{position: 'relative'}}>
                <img
                  src="https://images.unsplash.com/photo-1504541891213-1b1dfdadb739?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTV8MjEwMDExNXx8ZW58MHx8fHx8"
                  alt="Wellness" 
                  style={{
                    width:'100%', 
                    borderRadius: '25px',
                    boxShadow: '0 10px 30px rgba(185, 234, 216, 0.2)'
                  }}
                />
                {/* Decorative flower overlay */}
                <div style={{position: 'absolute', top: '20px', right: '20px'}}>
                  <FlowerAccent size={40} color="var(--accent-pink)" style={{opacity: 0.8}} />
                </div>
              </div>
            </Col>
            <Col md={6} className='card-cluster p-5' style={{
              background: 'white',
              borderRadius: '25px',
              boxShadow: '0 10px 35px rgba(185, 234, 216, 0.25)'
            }}>
              <div className='text-center mb-4'>
                <h2 className='elegant-script' style={{fontSize: '2.5rem', color: 'var(--text-dark)'}}>
                  Welcome Back
                </h2>
                <p style={{
                  fontFamily: 'var(--font-serif)', 
                  fontSize: '1.1rem', 
                  color: 'var(--text-muted)',
                  fontStyle: 'italic'
                }}>
                  <span className='flower-accent'>✿</span>
                  Unlocking Doors to Wellness
                  <span className='flower-accent'>✿</span>
                </p>
                <div className="section-divider mt-3"></div>
              </div>
              
              {/* Success Message */}
              {successMessage && (
                <Alert variant="success" className="mb-3" style={{
                  borderRadius: '15px',
                  border: '2px solid var(--success-green)',
                  backgroundColor: 'rgba(185, 234, 216, 0.1)'
                }}>
                  <div className="d-flex align-items-center">
                    <span className="me-2">✓</span>
                    {successMessage}
                  </div>
                </Alert>
              )}
              
              {/* Error Message */}
              {errorMessage && (
                <Alert variant="danger" className="mb-3" style={{
                  borderRadius: '15px',
                  border: '2px solid var(--accent-pink)',
                  backgroundColor: 'rgba(255, 182, 193, 0.1)'
                }}>
                  <div className="d-flex align-items-center">
                    <span className="me-2">⚠</span>
                    {errorMessage}
                  </div>
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit}>
                <div>
                  {/* Email Input with Theme Styling */}
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-2"
                  >
                    <Form.Control 
                      type="email"
                      name="email"
                      placeholder="name@example.com"
                      value={userDetails.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      style={{
                        border: errors.email ? '2px solid var(--accent-pink)' : '2px solid var(--soft-mint)',
                        borderRadius: '15px',
                        padding: '12px 20px',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.95rem'
                      }}
                      onFocus={(e) => e.target.style.borderColor = errors.email ? 'var(--accent-pink)' : 'var(--primary-mint)'}
                      onBlur={(e) => e.target.style.borderColor = errors.email ? 'var(--accent-pink)' : 'var(--soft-mint)'}
                    />
                  </FloatingLabel>
                  {errors.email && (
                    <div className="text-danger small mb-3" style={{fontSize: '0.85rem'}}>
                      {errors.email}
                    </div>
                  )}

                  {/* Password Input with Theme Styling */}
                  <FloatingLabel
                    controlId="floatingPassword"
                    label="Password"
                    className="position-relative mb-2"
                  >
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      value={userDetails.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                      style={{
                        border: errors.password ? '2px solid var(--accent-pink)' : '2px solid var(--soft-mint)',
                        borderRadius: '15px',
                        padding: '12px 20px',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.95rem'
                      }}
                      onFocus={(e) => e.target.style.borderColor = errors.password ? 'var(--accent-pink)' : 'var(--primary-mint)'}
                      onBlur={(e) => e.target.style.borderColor = errors.password ? 'var(--accent-pink)' : 'var(--soft-mint)'}
                    />
                    <span
                      className="position-absolute top-50 end-0 translate-middle-y me-3"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ 
                        cursor: "pointer",
                        fontSize: '1.2rem',
                        zIndex: 10
                      }}
                    >
                      {showPassword ? '👁' : '👁‍🗨'}
                    </span>
                  </FloatingLabel>
                  {errors.password && (
                    <div className="text-danger small mb-3" style={{fontSize: '0.85rem'}}>
                      {errors.password}
                    </div>
                  )}

                  {/* Login Button and Links */}
                  <div className='mt-4'>
                    <button 
                      className='btn btn-cluster w-100 mb-3' 
                      type="submit"
                      disabled={isLoading || Object.keys(errors).length > 0}
                      style={{
                        padding: '12px 30px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        opacity: (isLoading || Object.keys(errors).length > 0) ? 0.6 : 1,
                        cursor: (isLoading || Object.keys(errors).length > 0) ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {isLoading ? (
                        <span>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Logging in...
                        </span>
                      ) : (
                        'Login to Your Account'
                      )}
                    </button>
                    
                    <div className='text-center'>
                      <p style={{
                        fontFamily: 'var(--font-sans)',
                        color: 'var(--text-muted)',
                        fontSize: '0.95rem'
                      }}>
                        New to Cluster Fascination?{' '}
                        <Link 
                          to={'/register'} 
                          style={{
                            color: 'var(--success-green)',
                            fontWeight: '600',
                            textDecoration: 'none'
                          }}
                          onMouseOver={(e) => e.target.style.color = 'var(--dark-mint)'}
                          onMouseOut={(e) => e.target.style.color = 'var(--success-green)'}
                        >
                          Create Account
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
   </>
  );
};

export default Login;
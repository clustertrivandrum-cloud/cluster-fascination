import React, { useState, useEffect } from "react";
import axiosInstance from "../axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import "../App.css";
import Banner from "../components/Banner";
import Brands from "../components/Brands";
import Products from "../components/Products";
import Testimonial from "../components/Testimonial";
import TopNav from "../components/TopNav";
import MiddleNav from "../components/MiddleNav";
import MainNav from "../components/MainNav";
import Footer from "../components/Footer";
import FreeDeliveryBanner from "../components/FreeDeliveryBanner";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails, clearUserDetails } from "../redux/actions/userActions";
import WhatsAppButton from "../components/WhatsAppButton";

function Home() {
  const dispatch = useDispatch();
  const [notif, setNotif] = useState(true);
  const navigate = useNavigate();

  return (
    <div>
      <TopNav />
      <MiddleNav notification={notif} />
      <MainNav />
      
      {/* Free Delivery Banner */}
      <FreeDeliveryBanner />

      {/* Hero Banner */}
      <Banner />

      {/* Featured Products Section */}
      <Products setNotification={setNotif} />

      {/* Why Choose Us Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #f8fdfa 0%, #ffffff 100%)",
          padding: "80px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container>
          <div
            style={{
              textAlign: "center",
              marginBottom: "60px",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "42px",
                fontWeight: "700",
                color: "var(--text-dark)",
                marginBottom: "15px",
              }}
            >
              Why Choose Cluster Fascination?
            </h2>
            <p className="elegant-script"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "16px",
                color: "var(--text-muted)",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
Discover affordable, trendy, and premium jewellery that elevates every occasion, handpicked with love.          </p>
          </div>

          <Row className="g-4 justify-content-center text-center align-items-stretch">
            <Col md={6} lg={3} className="d-flex align-items-stretch">
              <div
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "40px 30px",
                  textAlign: "center",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                  transition: "all 0.3s ease",
                  width: "100%",
                  border: "2px solid transparent",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.borderColor = "var(--soft-mint)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "transparent";
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    background: "var(--light-mint)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 25px",
                  }}
                >
                  <i
                    className="fas fa-award"
                    style={{
                      fontSize: "35px",
                      color: "var(--primary-mint)",
                    }}
                  ></i>
                </div>
                <h4
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "var(--text-dark)",
                    marginBottom: "15px",
                  }}
                >
                  Premium Quality
                </h4>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "14px",
                    color: "var(--text-muted)",
                    lineHeight: "1.7",
                    margin: 0,
                  }}
                >
                  Handcrafted with care, ensuring the highest quality in every product
                </p>
              </div>
            </Col>

            <Col md={6} lg={3} className="d-flex align-items-stretch">
              <div
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "40px 30px",
                  textAlign: "center",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                  transition: "all 0.3s ease",
                  width: "100%",
                  border: "2px solid transparent",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.borderColor = "var(--soft-mint)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "transparent";
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    background: "var(--light-mint)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 25px",
                  }}
                >
                  <i
                    className="fas fa-shipping-fast"
                    style={{
                      fontSize: "35px",
                      color: "var(--primary-mint)",
                    }}
                  ></i>
                </div>
                <h4
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "var(--text-dark)",
                    marginBottom: "15px",
                  }}
                >
                  Fast Delivery
                </h4>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "14px",
                    color: "var(--text-muted)",
                    lineHeight: "1.7",
                    margin: 0,
                  }}
                >
                  Quick and secure shipping.
                </p>
              </div>
            </Col>

            <Col md={6} lg={3} className="d-flex align-items-stretch">
              <div
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "40px 30px",
                  textAlign: "center",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                  transition: "all 0.3s ease",
                  width: "100%",
                  border: "2px solid transparent",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.borderColor = "var(--soft-mint)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "transparent";
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    background: "var(--light-mint)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 25px",
                  }}
                >
                  <i
                    className="fas fa-headset"
                    style={{
                      fontSize: "35px",
                      color: "var(--primary-mint)",
                    }}
                  ></i>
                </div>
                <h4
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "var(--text-dark)",
                    marginBottom: "15px",
                  }}
                >
               Need Assistance

                </h4>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "14px",
                    color: "var(--text-muted)",
                    lineHeight: "1.7",
                    margin: 0,
                  }}
                >
 Please contact us, we'll get back to you as soon as possible.                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Brands Section */}

      {/* Special Offer Banner */}
    

      {/* Testimonials */}
      {/* <Testimonial /> */}

      {/* Stats Section */}
      <section
        style={{
          background: "white",
          padding: "80px 0",
          borderTop: "1px solid #f0f0f0",
        }}
      >
        <Container>
          <Row className="text-center">
            <Col md={3} sm={6}>
              <div style={{ marginBottom: "30px" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "48px",
                    fontWeight: "700",
                    color: "var(--primary-mint)",
                    marginBottom: "10px",
                  }}
                >
                  5K +  
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "16px",
                    color: "var(--text-muted)",
                    margin: 0,
                  }}
                >
                Offline Customers
                </p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div style={{ marginBottom: "30px" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "48px",
                    fontWeight: "700",
                    color: "var(--primary-mint)",
                    marginBottom: "10px",
                  }}
                >
                  500+
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "16px",
                    color: "var(--text-muted)",
                    margin: 0,
                  }}
                >
                   Products
                </p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div style={{ marginBottom: "30px" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "48px",
                    fontWeight: "700",
                    color: "var(--primary-mint)",
                    marginBottom: "10px",
                  }}
                >
                  100%
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "16px",
                    color: "var(--text-muted)",
                    margin: 0,
                  }}
                >
Quality Assured                </p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div style={{ marginBottom: "30px" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "48px",
                    fontWeight: "700",
                    color: "var(--primary-mint)",
                    marginBottom: "10px",
                  }}
                >
                  24/7
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "16px",
                    color: "var(--text-muted)",
                    margin: 0,
                  }}
                >
World wide Delivery                 </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section
        style={{
          background: "var(--text-dark)",
          padding: "80px 0",
          textAlign: "center",
          color: "white",
        }}
      >
        <Container>
          <div
            style={{
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "42px",
                fontWeight: "700",
                marginBottom: "20px",
              }}
            >
              Discover Unique, Trendy Jewellery
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "16px",
                marginBottom: "35px",
                opacity: "0.9",
                lineHeight: "1.7",
              }}
            >
              Explore our exclusive product collections handcrafted for every occasion. Elevate your style with quality, affordable jewellery curated just for you.
            </p>
            <Button
              onClick={() => navigate("/allproducts")}
              style={{
                background: "white",
                border: "2px solid var(--text-dark)",
                borderRadius: "40px",
                padding: "14px 40px",
                fontFamily: "var(--font-sans)",
                fontWeight: "600",
                fontSize: "16px",
                color: "var(--text-dark)",
                transition: "background 0.3s, color 0.3s, box-shadow 0.3s, transform 0.2s",
                boxShadow: "0 4px 14px rgba(51, 92, 88, 0.12)",
              }}
              onMouseEnter={e => {
                e.target.style.background = "var(--primary-mint)";
                e.target.style.color = "var(--text-dark)";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow =
                  "0 6px 18px rgba(51, 92, 88, 0.18)";
              }}
              onMouseLeave={e => {
                e.target.style.background = "white";
                e.target.style.color = "var(--text-dark)";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow =
                  "0 4px 14px rgba(51, 92, 88, 0.12)";
              }}
            >
              Browse Products <i className="fas fa-arrow-right ms-2"></i>
            </Button>
          </div>
        </Container>
      </section>

      <Footer />

      {/* WhatsApp Button */}
      <WhatsAppButton
        phoneNumber="+916282660237" // Replace with your WhatsApp business number
        message="Hello, I have a general inquiry about your products."
      />
    </div>
  );
}

export default Home;

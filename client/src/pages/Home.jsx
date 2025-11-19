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
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "16px",
                color: "var(--text-muted)",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Experience the perfect blend of nature and luxury with our
              handcrafted products
            </p>
          </div>

          <Row className="g-4">
            <Col md={6} lg={3}>
              <div
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "40px 30px",
                  textAlign: "center",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                  transition: "all 0.3s ease",
                  height: "100%",
                  border: "2px solid transparent",
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
                    className="fas fa-leaf"
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
                  100% Natural
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
                  Pure, organic ingredients sourced directly from nature for
                  your wellness
                </p>
              </div>
            </Col>

            <Col md={6} lg={3}>
              <div
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "40px 30px",
                  textAlign: "center",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                  transition: "all 0.3s ease",
                  height: "100%",
                  border: "2px solid transparent",
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
                  Handcrafted with care, ensuring the highest quality in every
                  product
                </p>
              </div>
            </Col>

            <Col md={6} lg={3}>
              <div
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "40px 30px",
                  textAlign: "center",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                  transition: "all 0.3s ease",
                  height: "100%",
                  border: "2px solid transparent",
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
                  Quick and secure shipping to bring nature's goodness to your
                  doorstep
                </p>
              </div>
            </Col>

            <Col md={6} lg={3}>
              <div
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "40px 30px",
                  textAlign: "center",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                  transition: "all 0.3s ease",
                  height: "100%",
                  border: "2px solid transparent",
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
                  24/7 Support
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
                  Dedicated customer support team ready to assist you anytime
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Brands Section */}
      <Brands />

      {/* Special Offer Banner */}
      <section
        style={{
          background:
            "linear-gradient(135deg, var(--primary-mint) 0%, var(--soft-mint) 100%)",
          padding: "60px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col lg={8}>
              <div style={{ color: "white" }}>
                <h2
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "38px",
                    fontWeight: "700",
                    marginBottom: "15px",
                  }}
                >
                  Subscribe to Our Newsletter
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "16px",
                    marginBottom: "0",
                    opacity: "0.95",
                  }}
                >
                  Get exclusive offers, wellness tips, and new product updates
                  delivered to your inbox
                </p>
              </div>
            </Col>
            <Col lg={4}>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: window.innerWidth < 992 ? "20px" : "0",
                }}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={{
                    flex: 1,
                    padding: "14px 20px",
                    border: "none",
                    borderRadius: "50px",
                    fontFamily: "var(--font-sans)",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
                <Button
                  style={{
                    background: "var(--text-dark)",
                    border: "none",
                    borderRadius: "50px",
                    padding: "14px 30px",
                    fontFamily: "var(--font-sans)",
                    fontWeight: "600",
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "white";
                    e.target.style.color = "var(--primary-mint)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "var(--text-dark)";
                    e.target.style.color = "white";
                  }}
                >
                  Subscribe
                </Button>
              </div>
            </Col>
          </Row>
        </Container>

        {/* Decorative Elements */}
        <div
          style={{
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "200px",
            height: "200px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "250px",
            height: "250px",
            background: "rgba(255, 255, 255, 0.08)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
      </section>

      {/* Testimonials */}
      <Testimonial />

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
                  10K+
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "16px",
                    color: "var(--text-muted)",
                    margin: 0,
                  }}
                >
                  Happy Customers
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
                  Natural Products
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
                  Organic Certified
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
                  Customer Support
                </p>
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
              Ready to Experience Natural Wellness?
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
              Discover our curated collection of organic, handcrafted products
              designed to enhance your natural beauty and wellbeing
            </p>
            <Button
              onClick={() => navigate("/allproducts")}
              style={{
                background: "var(--primary-mint)",
                border: "none",
                borderRadius: "50px",
                padding: "16px 50px",
                fontFamily: "var(--font-sans)",
                fontWeight: "600",
                fontSize: "16px",
                color: "white",
                transition: "all 0.3s ease",
                boxShadow: "0 10px 30px rgba(185, 234, 216, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow =
                  "0 15px 40px rgba(185, 234, 216, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow =
                  "0 10px 30px rgba(185, 234, 216, 0.3)";
              }}
            >
              Shop Now <i className="fas fa-arrow-right ms-2"></i>
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

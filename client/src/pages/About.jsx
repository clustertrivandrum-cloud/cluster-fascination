import React from "react";
import TopNav from "../components/TopNav";
import MiddleNav from "../components/MiddleNav";
import MainNav from "../components/MainNav";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <TopNav />
      <MiddleNav />
      <MainNav />
      <div className="container py-5" style={{ position: "relative" }}>
        {/* Decorative watercolor spots */}
        <div
          className="watercolor-spot spot-mint"
          style={{
            width: "250px",
            height: "250px",
            top: "100px",
            right: "5%",
            opacity: "0.15",
          }}
        ></div>
        <div
          className="watercolor-spot spot-beige"
          style={{
            width: "200px",
            height: "200px",
            bottom: "50px",
            left: "3%",
            opacity: "0.12",
          }}
        ></div>

        <div className="text-center mb-5">
          <h1
            className="elegant-script"
            style={{ fontSize: "3rem", color: "var(--text-dark)" }}
          >
            About Us
          </h1>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.1rem",
              color: "var(--text-muted)",
              fontStyle: "italic",
            }}
          >
            <span className="flower-accent">✿</span> Our Story{" "}
            <span className="flower-accent">✿</span>
          </p>
          <div className="section-divider"></div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-12">
            <div className="card-cluster p-4">
              <h2
                className="mb-4"
                style={{
                  fontFamily: "var(--font-elegant-script)",
                  fontSize: "2rem",
                  color: "var(--dark-mint)",
                }}
              >
                Welcome to Cluster Fascination
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.05rem",
                  lineHeight: "1.8",
                  color: "var(--text-dark)",
                }}
              >
                Cluster Fascination, founded in 2024 as an online store and expanded offline in 2025, is a passionate student start-up by Arya Suresh S, a young entrepreneur driven by her love for business and creativity. Located in Kazhakkoottam, Thiruvananthapuram, the brand aims to grow as a trusted destination for those who value both trend and affordability.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.05rem",
                  lineHeight: "1.8",
                  color: "var(--text-dark)",
                  marginTop: "1.2em"
                }}
              >
                At Cluster Fascination, we believe jewellery is more than just an accessory. It reflects your style and your cherished moments. Our handpicked collections blend tradition with modern trends, offering timeless classics and statement pieces for both men and women. From everyday wear to festive occasions, each piece is crafted to bring you elegance, confidence, and shine.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;

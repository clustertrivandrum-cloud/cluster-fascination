import React from "react";
import TopNav from "../components/TopNav";
import MiddleNav from "../components/MiddleNav";
import MainNav from "../components/MainNav";
import Footer from "../components/Footer";

const About = () => {
  React.useEffect(() => {
    // 1. Dynamic Title
    document.title = "About Us | Cluster Fascination - Fashion Jewellery & Accessories in Thiruvananthapuram";

    // 2. Dynamic Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Discover Cluster Fascination, a student-led fashion jewellery startup in Thiruvananthapuram founded by Arya Suresh S. We offer premium, affordable accessories blending tradition with modern trends.";

    // 3. Structured Data (JSON-LD)
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Cluster Fascination",
      "founder": "Arya Suresh S",
      "foundingDate": "2024",
      "description": "Premium fashion jewellery and accessories store in Thiruvananthapuram.",
      "url": window.location.origin,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kazhakkoottam",
        "addressRegion": "Thiruvananthapuram",
        "addressCountry": "IN"
      },
      "priceRange": "₹₹"
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      // Optional: Reset title/meta when leaving (if needed)
    };
  }, []);

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
            About Cluster Fascination
          </h1>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.1rem",
              color: "var(--text-muted)",
              fontStyle: "italic",
            }}
          >
            <span className="flower-accent">✿</span> Curating Elegance in Thiruvananthapuram <span className="flower-accent">✿</span>
          </p>
          <div className="section-divider"></div>
        </div>

        <div className="row align-items-center justify-content-center">
          <div className="col-lg-10">
            <div className="card-cluster p-5 border-0">
              <h2
                className="mb-4 text-center"
                style={{
                  fontFamily: "var(--font-elegant-script)",
                  fontSize: "2.2rem",
                  color: "var(--dark-mint)",
                }}
              >
                Our Journey
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.1rem",
                  lineHeight: "1.8",
                  color: "var(--text-dark)",
                  textAlign: "justify"
                }}
              >
                <strong>Cluster Fascination</strong> started as a dream in 2024. What began as a passionate online store for <em>fashion jewellery</em> expanded into a physical presence in 2025, driven by the vision of <strong>Arya Suresh S</strong>. As a student entrepreneur based in <strong>Kazhakkoottam, Thiruvananthapuram</strong>, Arya aimed to create a brand that bridges the gap between high-end trends and affordability. Today, we are proud to be a trusted destination for accessory lovers across Kerala and beyond.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.1rem",
                  lineHeight: "1.8",
                  color: "var(--text-dark)",
                  marginTop: "1.5rem",
                  textAlign: "justify"
                }}
              >
                We believe that <strong>jewellery is personal</strong>; it disrupts the ordinary and adds a touch of magic to your everyday life. Our collections are carefully curated to blend <em>timeless tradition with modern aesthetics</em>. Whether you are looking for statement necklaces, elegant earrings for work, or festive accessories, every piece at Cluster Fascination is chosen to make you feel confident and radiant.
              </p>

              <div className="text-center mt-5">
                <a href="/#/allproducts" className="btn btn-cluster px-5 py-3 rounded-pill text-decoration-none">
                  Explore Our Collection <i className="fas fa-arrow-right ms-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;

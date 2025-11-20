import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import image from '../assets/images/banner.jpg';
import { ServerURL } from '../services/baseUrl';

/**
 * Modern, responsive banner section using CSS flex, aspect ratios, overlay text,
 * gradients, and touch-friendly controls.
 */
function Banner() {
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);
  const autoSlideInterval = 6000; // ms

  useEffect(() => {
    let urlQuery = `/api/v1/banners`;
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(urlQuery);
        setBanners(response.data.data);
      } catch (error) {
        setBanners([]); // fallback if fail
      }
    };
    fetchData();
  }, []);

  // Touch/swipe support for mobile
  let touchStart = null;
  let touchMove = null;
  const handleTouchStart = (e) => {
    touchStart = e.touches[0].clientX;
  }
  const handleTouchMove = (e) => {
    touchMove = e.touches[0].clientX;
  }
  const handleTouchEnd = () => {
    if (touchStart !== null && touchMove !== null) {
      if (touchStart - touchMove > 50) nextSlide();
      if (touchMove - touchStart > 50) prevSlide();
    }
    touchStart = null;
    touchMove = null;
  }

  // Autoplay
  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, autoSlideInterval);
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [current, banners.length]);

  const slideCount = banners.length > 0 ? banners.length : 1;

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slideCount);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slideCount) % slideCount);

  const slides = banners.length > 0 ? banners : [
    {
      image,
      heading: "Welcome to Cluster Fascination",
      subtext: "Jewellery as unique as you are."
    }
  ];

  return (
    <section className="modern-banner-section" style={{position: 'relative'}}>
      <div
        className="modern-banner-carousel"
        style={{
          aspectRatio: '21/9',
          maxHeight: '530px',
          width: '100%',
          overflow: 'hidden',
          // borderRadius removed
          boxShadow: "0 10px 24px rgba(110,180,152,.11)",
          position: 'relative',
          background: "#eaf9f3",
          display: 'flex',
          alignItems: 'stretch',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((item, idx) => (
          <div
            className="modern-banner-slide"
            key={idx}
            aria-hidden={current !== idx}
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%',
              height: '100%',
              opacity: current === idx ? 1 : 0,
              visibility: current === idx ? 'visible' : 'hidden',
              zIndex: current === idx ? 2 : 1,
              transition: 'opacity 0.7s cubic-bezier(.6,.05,.24,1)'
            }}
          >
            <img
              src={item.image.startsWith('http') ? item.image : `${ServerURL}/uploads/${item.image}`}
              alt={item.heading || `Banner Slide ${idx+1}`}
              className="modern-banner-img"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                minHeight: '240px',
                filter: 'brightness(0.86)'
              }}
              draggable={false}
            />
            <div
              className="modern-banner-overlay"
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg,rgba(18,48,36,0.24) 0%,rgba(60,115,90,0.18) 70%,rgba(232,232,232,0.03) 100%)",
                zIndex: 2,
                pointerEvents: "none"
              }}
            ></div>
            {/* Optional overlay text */}
            {(item.heading || item.subtext) && (
              <div
                className="modern-banner-caption"
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  color: '#fff',
                  zIndex: 3,
                  padding: '7vw 5vw',
                  textShadow: '0 6px 28px rgba(20,44,59,.20)'
                }}
              >
                <h2 style={{
                  fontFamily: 'var(--font-elegant-script, serif)',
                  fontWeight: 700,
                  fontSize: 'clamp(1.7rem, 5vw, 3rem)',
                  marginBottom: '0.7rem',
                  lineHeight: 1.11,
                  background: 'linear-gradient(90deg,var(--primary-mint,#59b488),#e3fff2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: 1
                }}>
                  {item.heading || "Discover Unique Jewellery"}
                </h2>
                <p style={{
                  fontFamily: "var(--font-serif, serif)",
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
                  fontWeight: 500,
                  color: '#f5f5f5',
                  maxWidth: 540,
                  margin: 0,
                  textShadow: '0 1px 14px rgba(64,98,90,.12)'
                }}>
                  {item.subtext || "Shop modern, trendy, and premium jewellery that celebrates your uniqueness." }
                </p>
              </div>
            )}
          </div>
        ))}

        {/* Controls (hidden on xs) */}
        {slideCount > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous Banner"
              className="modern-banner-control prev"
              onClick={prevSlide}
              style={{
                position: 'absolute',
                top: '50%',
                left: 20,
                zIndex: 6,
                transform: 'translateY(-50%)',
                background: 'rgba(30,54,41,0.23)',
                border: 'none',
                borderRadius: '50%',
                width: 46, height: 46,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '1.7rem',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              tabIndex={0}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              type="button"
              aria-label="Next Banner"
              className="modern-banner-control next"
              onClick={nextSlide}
              style={{
                position: 'absolute',
                top: '50%',
                right: 20,
                zIndex: 6,
                transform: 'translateY(-50%)',
                background: 'rgba(30,54,41,0.23)',
                border: 'none',
                borderRadius: '50%',
                width: 46, height: 46,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '1.7rem',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              tabIndex={0}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </>
        )}

        {/* Dots */}
        {slideCount > 1 && (
          <div
            style={{
              position: 'absolute',
              bottom: "3.5%",
              left: "50%",
              transform: "translateX(-50%)",
              display: 'flex',
              gap: '0.5rem',
              zIndex: 10
            }}>
            {slides.map((_, i) => (
              <button
                key={i}
                className={`modern-banner-dot${i === current ? ' active' : ''}`}
                aria-label={`Go to Banner ${i + 1}`}
                aria-current={i === current}
                onClick={() => setCurrent(i)}
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  border: 0,
                  background: i === current ? 'var(--primary-mint,#59b488)' : 'rgba(210,255,229,0.55)',
                  transition: 'background 0.18s',
                  outline: 'none',
                  cursor: i === current ? 'default' : 'pointer',
                  boxShadow: i === current ? "0 1px 6px rgba(90,213,150,0.10)" : "none"
                }}
                tabIndex={0}
              />
            ))}
          </div>
        )}
      </div>
      <style>{`
        .modern-banner-section {
          margin-bottom: 25px;
        }
        @media (max-width: 900px) {
          .modern-banner-section { margin-bottom: 16px; }
        }
        @media (max-width: 600px) {
          .modern-banner-carousel {
            aspect-ratio: 17/12 !important;
            max-height: 275px !important;
            border-radius: 0 !important;
          }
          /* Remove border radius on all modern-banner-carousel children also (including slide/img) */
          .modern-banner-carousel,
          .modern-banner-slide,
          .modern-banner-img {
            border-radius: 0 !important;
          }
          .modern-banner-caption {
            padding: 24px 8vw !important;
            align-items: flex-start !important;
          }
          .modern-banner-caption h2 { font-size: 1.32rem !important; }
        }
        /* Dots larger for touch */
        .modern-banner-dot { outline: none; }
        .modern-banner-dot.active, .modern-banner-dot:focus { box-shadow: 0 0 0 2.5px var(--primary-mint,#59b488); }
        /* Hide buttons on XS */
        @media (max-width: 540px) {
          .modern-banner-control { display: none !important; }
        }
      `}</style>
    </section>
  );
}

export default Banner;
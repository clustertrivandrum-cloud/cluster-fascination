import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../axios";
import { useSelector } from "react-redux";
import {
  Accordion,
  Button,
  Carousel,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Review from "../components/Review";
import TopNav from "../components/TopNav";
import MiddleNav from "../components/MiddleNav";
import MainNav from "../components/MainNav";
import Footer from "../components/Footer";
import FreeDeliveryBanner from "../components/FreeDeliveryBanner";
import { ServerURL } from "../services/baseUrl";
import { ProductContext } from "../components/WhatsAppButton";
import WhatsAppButton from "../components/WhatsAppButton";
import "../components/Products.css";
import "../components/ProductGallery.css";

function Product() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [productData, setProductData] = useState({});
  const navigate = useNavigate();
  const { proId, catId } = useParams();

  const [cartItemsData, setCartItemsData] = useState([]);
  const userDetails = useSelector((state) => state.userDetails);
  const [notif, setNotif] = useState(true);

  //for similar products
  const [products, setProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  let urlQuery = "";

  useEffect(() => {
    urlQuery = `/api/v1/products/productshome?page=1&limit=8&random=true`;

    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(urlQuery);
        setProducts(response.data.data);
        const wishlistResponse = await axiosInstance.get(
          "/api/v1/user/getwishlist"
        );
        setWishlistItems(wishlistResponse.data.data);
        const cartResponse = await axiosInstance.get("/api/v1/user/getcarts");
        setCartItems(cartResponse.data.data.item);
        //console.log(cartResponse.data.data.item)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const fetchCart = async () => {
    console.log("reached fetch cart 2");
    try {
      const cartResponse = await axiosInstance.get("/api/v1/user/getcarts");
      setCartItems(cartResponse.data.data.item);
      //  console.log('reached fetch cart 3',cartResponse.data.data.item)
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWishlist = async () => {
    try {
      const wishlistResponse = await axiosInstance.get(
        "/api/v1/user/getwishlist"
      );
      setWishlistItems(wishlistResponse.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addWishlist = async (proId) => {
    if (!userDetails) {
      navigate("/login");
    } else {
      try {
        urlQuery = `/api/v1/user/addToWishlist/${proId}`;
        const response = await axiosInstance.patch(urlQuery);
        await fetchWishlist();
        //console.log(response)
        setNotif((prev) => !prev);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeWishlist = async (proId) => {
    if (!userDetails) {
      navigate("/login");
    } else {
      try {
        urlQuery = `/api/v1/user/removeFromWishlist/${proId}`;
        const response = await axiosInstance.patch(urlQuery);
        await fetchWishlist();
        setNotif((prev) => !prev);
        //console.log(response)
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addCart = async (proId) => {
    if (!userDetails) {
      navigate("/login");
    } else {
      try {
        urlQuery = `/api/v1/user/addToCart/${proId}`;
        const response = await axiosInstance.patch(urlQuery);
        await fetchCart();
        setNotif((prev) => !prev);
        //console.log(response)
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeCart = async (proId) => {
    if (!userDetails) {
      navigate("/login");
    } else {
      console.log("reached rem cart", proId);

      try {
        const ItemId = cartItems.filter((item) => item.productId._id == proId);
        console.log(" item id", ItemId);

        urlQuery = `/api/v1/user/removeFromCart/${ItemId[0]._id}`;
        const response = await axiosInstance.patch(urlQuery);
        await fetchCart();
        setNotif((prev) => !prev);
        //console.log(response)
      } catch (error) {
        console.log(error);
      }
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item._id === productId);
  };

  const isInCart = (productId) => {
    return cartItems.some((item) => item.productId._id === productId);
  };

  //  for specific product
  const fetchProductData = async () => {
    try {
      const urlQuery = `/api/v1/products/${proId}`;
      const response = await axiosInstance.get(urlQuery);
      setProductData(response.data.data);
      //console.log(response.data.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductData();
    fetchCartData();
  }, [proId]);

  const fetchCartData = async () => {
    console.log("reached fetch cart 2");
    try {
      const cartResponse = await axiosInstance.get("/api/v1/user/getcarts");
      setCartItemsData(cartResponse.data.data.item);
      //  console.log('reached fetch cart 3',cartResponse.data.data.item)
    } catch (error) {
      console.log(error);
    }
  };

  const addCartData = async (proId1) => {
    if (!userDetails) {
      navigate("/login");
    } else {
      try {
        const urlQuery = `/api/v1/user/addToCart/${proId1}`;
        const response = await axiosInstance.patch(urlQuery);
        await fetchCartData();
        setNotif((prev) => !prev);
        //console.log(response)
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeCartData = async (proId1) => {
    if (!userDetails) {
      navigate("/login");
    } else {
      console.log("reached rem cart", proId1);

      try {
        const ItemId = cartItemsData.filter(
          (item) => item.productId._id == proId1
        );
        console.log(" item id", ItemId);

        const urlQuery = `/api/v1/user/removeFromCart/${ItemId[0]._id}`;
        const response = await axiosInstance.patch(urlQuery);
        await fetchCartData();
        setNotif((prev) => !prev);
        //console.log(response)
      } catch (error) {
        console.log(error);
      }
    }
  };

  const isInCartData = (productId) => {
    return cartItemsData.some((item) => item.productId._id === productId);
  };


  const sliderSettings = {
    dots: products.length > 1,
    infinite: products.length > 1,
    speed: 500,
    slidesToShow: products.length < 4 ? products.length : 4,
    slidesToScroll: products.length < 4 ? products.length : 1,
    autoplay: products.length > 1,
    autoplaySpeed: 3000,
    arrows: products.length > 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: products.length < 2 ? products.length : 2,
          slidesToScroll: products.length < 2 ? products.length : 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };

  const buyNow = async (proId1) => {
    console.log(proId1);
    if (!userDetails) {
      navigate("/login");
    } else {
      try {
        const urlQuery = `/api/v1/user/addToCart/${proId1}`;
        const response = await axiosInstance.patch(urlQuery);
        await fetchCartData();
        setNotif((prev) => !prev);
        navigate("/checkout");
        //console.log(response)
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ProductContext.Provider value={productData}>
      <TopNav />
      <MiddleNav notification={notif} />
      <MainNav />

      {/* Free Delivery Banner */}
      <FreeDeliveryBanner />

      <div>
        <Container className="product-details-container my-5">
          <Row>
            {/* Render Carousel on mobile screens */}
            {/* Unified Product Gallery Section */}
            <Col xs={12} lg={6} className="mb-4">
              {/* Mobile Carousel View */}
              <div className="d-md-none mobile-gallery-carousel mb-3">
                <Carousel interval={null} indicators={true} className="shadow-sm rounded-4 overflow-hidden">
                  {productData.image && productData.image.map((image1, index) => (
                    <Carousel.Item key={index}>
                      <Image
                        src={`${ServerURL}/uploads/${image1}`}
                        alt={`Product view ${index + 1}`}
                        fluid
                        className="main-image"
                        style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>

              {/* Desktop Gallery View */}
              <div className="d-none d-md-block product-gallery-container">
                <div className="main-image-wrapper">
                  {productData.image && (
                    <Image
                      src={`${ServerURL}/uploads/${productData.image[selectedImage]}`}
                      alt={productData.name}
                      className="main-image-display"
                      fluid
                    />
                  )}
                  {/* Optional: Add zoom hint or badge here if needed */}
                </div>

                <div className="thumbnail-list mt-3">
                  {productData.image && productData.image.map((image1, index) => (
                    <div
                      key={index}
                      className={`thumbnail-item ${selectedImage === index ? 'active' : ''}`}
                      onClick={() => handleThumbnailClick(index)}
                    >
                      <Image
                        src={`${ServerURL}/uploads/${image1}`}
                        alt={`Thumbnail ${index + 1}`}
                        className="thumbnail-img"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="product-info mb-4 ps-lg-5">
                <h1 className="product-name fw-bold mb-3" style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-dark)' }}>{productData.name}</h1>
                <div className="d-flex align-items-center mb-3">
                  <span className="text-muted text-decoration-line-through me-2" style={{ fontFamily: 'var(--font-sans)' }}>
                    ₹{productData.price}
                  </span>
                  <h3 className="font-weight-bold m-0" style={{ color: 'var(--success-green)', fontFamily: 'var(--font-sans)' }}>
                    ₹{productData.sale_rate}
                  </h3>
                  {productData.price && productData.sale_rate && (
                    <span className="ms-3 badge rounded-pill" style={{ background: 'var(--light-mint)', color: 'var(--success-green)', border: '1px solid var(--soft-mint)' }}>
                      Save {(
                        ((productData.price - productData.sale_rate) /
                          productData.price) *
                        100
                      ).toFixed(0)}%
                    </span>
                  )}
                </div>

                <p className="text-muted small mb-4">(inclusive of all taxes)</p>

                <div className="product-actions d-flex gap-3">
                  <Button
                    className="btn-add-cart flex-grow-1"
                    style={{ background: 'var(--primary-mint)', color: 'var(--text-dark)', border: 'none' }}
                    onClick={() => buyNow(productData._id)}
                  >
                    Buy Now
                  </Button>

                  {!isInCartData(proId) ? (
                    <Button
                      variant="outline-success"
                      className="flex-grow-1"
                      style={{ borderRadius: '25px', borderColor: 'var(--success-green)', color: 'var(--success-green)' }}
                      onClick={() => addCartData(proId)}
                    >
                      Add to Cart
                    </Button>
                  ) : (
                    <Button
                      variant="outline-danger"
                      className="flex-grow-1"
                      style={{ borderRadius: '25px' }}
                      onClick={() => removeCartData(proId)}
                    >
                      Remove from Cart
                    </Button>
                  )}
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <Accordion defaultActiveKey="0" className="mb-4">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>About this item</Accordion.Header>
                  <Accordion.Body>{productData.description}</Accordion.Body>
                </Accordion.Item>

              </Accordion>
            </Col>
          </Row>

          <Row className="mb-4 container-fluid ">
            <Col md={products.length === 1 ? 3 : undefined}>
              <h3 className="mb-4" style={{ fontFamily: 'var(--font-serif)' }}>Similar Products</h3>
              <Slider {...sliderSettings} className="products-slider-container">
                {products.map(item => (
                  <div key={item._id} className="slider-item">
                    <div className="product-card">
                      <div className="product-image-container">
                        <Link to={`/product/${item._id}/${item.category?._id || item.category}`}>
                          <Image src={`${ServerURL}/uploads/${item.image[0]}`} alt={item.name} className="product-image" />
                        </Link>
                        {item.discount > 0 && (
                          <div className="product-badge badge-cluster">
                            {item.discount}% OFF
                          </div>
                        )}
                      </div>

                      <div className="product-info">
                        <Link to={`/product/${item._id}/${item.category?._id || item.category}`} className="product-link">
                          <h6 className="product-title">{item.name}</h6>
                        </Link>

                        <div className="product-pricing">
                          <div className="price-details">
                            <span className="product-price">₹{item.sale_rate}</span>
                            <span className="original-price">₹{item.price}</span>
                          </div>
                        </div>

                        <div className="product-actions">
                          <button className="btn-wishlist">
                            <i className="fa-solid fa-heart"></i>
                          </button>
                          <button className="btn-add-cart">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </Col>
          </Row>

          <Row>
            <Review productId={productData._id} />
          </Row>
        </Container>
      </div>


      <Footer />
      <WhatsAppButton
        phoneNumber="+916282660237" // Replace with your WhatsApp business number
      />
    </ProductContext.Provider>
  );
}

export default Product;
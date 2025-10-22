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
import { ServerURL } from "../services/baseUrl";

function Product() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [productData, setProductData] = useState([]);
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
    urlQuery = `/api/v1/products/productshome?page=1&limit=8&sortField=createdAt&sortOrder=desc&category=${catId}`;

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

  const product = {
    name: "Broccoli Microgreen Seeds",
    mrp: 1200,
    price: 700,
    images: [
      "https://img.freepik.com/free-photo/top-view-vase-with-decorative-flowers_23-2147601269.jpg?size=626&ext=jpg&ga=GA1.1.1794837574.1691059421&semt=ais",
      "https://img.freepik.com/premium-photo/white-frame-with-plant-it_81048-17009.jpg?size=626&ext=jpg&ga=GA1.1.1794837574.1691059421&semt=ais",
      "https://img.freepik.com/free-photo/white-vase-with-bamboo-flowerpot_23-2147621577.jpg?size=626&ext=jpg&ga=GA1.1.1794837574.1691059421&semt=ais",
      "https://images.unsplash.com/photo-1493510296082-689a0d42701b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjZ8MjEwMDExNXx8ZW58MHx8fHx8",
    ],
    details: ["Detoxifies Body", "Improved Digestion", "Prevents Cancer"],
    about: [
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique molestias consequuntur commodi cupiditate inventore ipsum sit deleniti. Quod nulla rerum dolor quidem accusamus ea repellat, ratione enim tenetur sint perferendis?",
    ],
  };

  const similarProducts = [
    {
      id: 1,
      name: "Radish White Microgreen seeds",
      image:
        "https://t4.ftcdn.net/jpg/03/88/04/41/240_F_388044101_IidJjwi2bonGwWDGZZqgPz7oxaowhsjp.jpg",
      price: 1999,
    },
    {
      id: 2,
      name: "Radish White Microgreen seeds",
      image:
        "https://t4.ftcdn.net/jpg/03/88/04/41/240_F_388044101_IidJjwi2bonGwWDGZZqgPz7oxaowhsjp.jpg",
      price: 2499,
    },
    {
      id: 3,
      name: "Radish White Microgreen seeds",
      image:
        "https://t4.ftcdn.net/jpg/03/88/04/41/240_F_388044101_IidJjwi2bonGwWDGZZqgPz7oxaowhsjp.jpg",
      price: 2999,
    },
    {
      id: 4,
      name: "Radish White Microgreen seeds",
      image:
        "https://t4.ftcdn.net/jpg/03/88/04/41/240_F_388044101_IidJjwi2bonGwWDGZZqgPz7oxaowhsjp.jpg",
      price: 3999,
    },
  ];

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
    <>
      <TopNav />
      <MiddleNav notification={notif} />
      <MainNav />
      <div>
        <Container className="product-details-container my-5">
          <Row>
            {/* Render Carousel on mobile screens */}
            <Col xs={12} className="mb-4 d-md-none">
              <Carousel
                interval={null}
                indicators={false}
                className="main-image-carousel"
              >
                {productData.image &&
                  productData?.image?.map((image1, index) => (
                    <Carousel.Item key={index}>
                      <Image
                        src={`${ServerURL}/uploads/${image1}`}
                        alt={`Image ${index}`}
                        fluid
                        className="main-image"
                        style={{width:'100%', height:'350px', objectFit:'cover'}}
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </Col>
            {/* Render main image and thumbnails on larger screens */}
            <Col lg={6} className="mb-4 d-none d-md-block">
              <Row className="thumbnail-images">
                <Col xs={3} md={3} lg={3} className="">
                  {productData.image &&
                    productData?.image?.map((image1, index) => (
                      <div key={index} className="border mb-1" style={{width:'100%', height:'100px'}}>
                        <Image
                          src={`${ServerURL}/uploads/${image1}`}
                          alt={`Thumbnail ${index}`}
                          fluid
                          style={{ width: "100%",  height:'100%', objectFit:'cover'}}
                          className={`thumbnail-image ${
                            index === selectedImage ? "selected" : ""
                          }`}
                          onClick={() => handleThumbnailClick(index)}
                        />
                      </div>
                    ))}
                </Col>
                <Col xs={9} md={9} lg={9} className="border">
                  <div className="main-image mt-3 " style={{height:'400px'}}>
                    {productData.image && (
                      <Image
                        src={`${ServerURL}/uploads/${productData.image[selectedImage]}`}
                        fluid
                        style={{ width: "100%",  height:'100%', objectFit:'cover'}}
                      />
                    )}{" "}
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={6}>
              <div className="product-info mb-4">
                <h1 className="product-name fw-bold ">{productData.name}</h1>
                <p className="text-muted fw-lighter m-0">
                  MRP:{" "}
                  <span className="text-decoration-line-through">
                    ₹{productData.price}
                  </span>{" "}
                </p>
                <h3 className="font-weight-bold">
                  Price: ₹{productData.sale_rate}
                </h3>

                {productData.price && productData.sale_rate && (
                  <p className="m-0 text-success">
                    You save:{" "}
                    {(
                      ((productData.price - productData.sale_rate) /
                        productData.price) *
                      100
                    ).toFixed(2)}
                    %
                  </p>
                )}
                <p className="text-muted">(inclusive of all taxes)</p>

                <div className="product-details mb-3">
                  <h4 className="bg-success-subtle p-1 d-inline-block ">
                    Benefits
                  </h4>
                  <ListGroup variant="flush">
                    {product.details.map((detail, index) => (
                      <ListGroup.Item key={index}>
                        <i className="fa-regular fa-circle-check text-success "></i>{" "}
                        {detail}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
                <div className="product-actions">
                  <Button
                    variant="success"
                    className="me-2"
                    onClick={() => buyNow(productData._id)}
                  >
                    Buy Now
                  </Button>

                  {!isInCartData(proId) ? (
                    <Button
                      variant="outline-success"
                      onClick={() => addCartData(proId)}
                    >
                      Add to Cart
                    </Button>
                  ) : (
                    <Button
                      variant="outline-danger"
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
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Benefits</Accordion.Header>
                  <Accordion.Body>
                    {" "}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quibusdam sit ut sequi cumque ab ipsum molestias. Doloribus
                    esse perspiciatis necessitatibus quam, doloremque porro unde
                    excepturi corrupti voluptas accusamus quibusdam officiis.
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Possimus obcaecati accusamus iste temporibus mollitia
                    laboriosam consequatur assumenda quasi eveniet eligendi illo
                    sapiente deleniti nemo, sequi at voluptatibus ab eius
                    repudiandae.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Other info</Accordion.Header>
                  <Accordion.Body>
                    {" "}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quibusdam sit ut sequi cumque ab ipsum molestias. Doloribus
                    esse perspiciatis necessitatibus quam, doloremque porro unde
                    excepturi corrupti voluptas accusamus quibusdam officiis.
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Possimus obcaecati accusamus iste temporibus mollitia
                    laboriosam consequatur assumenda quasi eveniet eligendi illo
                    sapiente deleniti nemo, sequi at voluptatibus ab eius
                    repudiandae.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>

          <Row className="mb-4 container-fluid ">
  <Col md={products.length === 1 ? 3 : undefined}>
    <h3 className="mb-4">Similar Products</h3>
    <Slider {...sliderSettings}>
      {products.map(item => (
        <div key={item._id} className="d-flex justify-content-center p-3">
          <div className="shadow p-3 bg-white rounded" style={{  width: "80%" }}>
            <Link to={`/product/${item._id}/${item.category}`}>
              <Image src={`${ServerURL}/uploads/${item.image[0]}`} alt={item.name} fluid className="mx-auto mb-2" style={{ mixBlendMode: 'multiply' }} />
            </Link>
            <Link to={'/product'} className='text-muted fw-bold '><h6>{item.name}</h6></Link>
            <p className="fw-bold m-1">₹{item.sale_rate}</p>
            <span className='m-1 text-muted text-decoration-line-through'>₹{item.price}</span>
            <span className='text-success fw-bold bg-success-subtle p-1'>{item.discount}% off</span>
            <div className="d-flex justify-content-between mt-3 ">
              <button className="btn btn-success rounded-3">
                <i className="fa-solid fa-heart"></i>
              </button>
              <button className="btn btn-outline-success rounded-3"><i className="fas fa-shopping-cart"></i></button>
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
    </>
  );
}

export default Product;


  {/* <Row className="mb-4 container-fluid ">
            <Col>
              <h3 className="mb-4">Similar Products</h3>
              <Slider {...settings}>
                {products.map(item => (
                  <div key={item._id} className="d-flex justify-content-center p-3">
                    <div className="shadow p-3 bg-white rounded" style={{ width: "80%" }}>
                      <Link  to={`/product/${item._id}/${item.category}`}   >
                      <Image src={`http://localhost:5000/uploads/${item.image[0]}`} alt={item.name} fluid className="mx-auto mb-2"
                       style={{ mixBlendMode: 'multiply' }}
                       onClick={()=>{navigate()}} />
                      </Link>
                      <Link to={`/product/${item._id}/${item.category}`} className='text-muted fw-bold '><h6>{item.name}</h6></Link>
                      <p className="fw-bold m-1">₹{item.sale_rate}</p>
                      <span className='m-1 text-muted text-decoration-line-through'>₹{item.price}</span>
                      <span className='text-success fw-bold bg-success-subtle p-1'>{item.discount}% off</span>
                      <div className="d-flex justify-content-between mt-3 ">
                       
                      {
! isInWishlist(item._id) ? (   

  <button className='btn btn-success rounded-3' onClick={   ()=> addWishlist(item._id)} >
    <i className="fa-solid fa-heart"></i>
 </button>

):
(    
  <button className='btn btn-danger rounded-3' onClick={()=> removeWishlist(item._id)}>
    <i className="fa-solid fa-heart"></i>
 </button>
 )

}
{
  ! isInCart(item._id) ? (                      <button className='btn btn-success rounded-3' 
    onClick={()=> addCart(item._id)}><i className="fas fa-shopping-cart"></i></button>
  ) :
  (
      <button className='btn btn-danger rounded-3' onClick={()=> removeCart(item._id)}
      ><i className="fas fa-shopping-cart"></i></button> 

  )
}
                     
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </Col>
          </Row> */}

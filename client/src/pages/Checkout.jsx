import React, { useState, useEffect } from "react";
import axiosInstance from "../axios";
import { Form, Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaRegTrashAlt } from "react-icons/fa";
import logo from "../assets/images/logo.png";
import { ServerURL } from "../services/baseUrl";

const Checkout = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentOption, setPaymentOption] = useState("phonepe");
  const [cartData, setCartData] = useState([]);
  const [salePriceTotal, setSalePriceTotal] = useState(0);
  const [proPriceTotal, setProPriceTotal] = useState(0);
  const [discountTotal, setDiscountTotal] = useState(0);

  const [addressDatas, setAddressDatas] = useState([]);
  const [orderAddress, setOrderAddress] = useState({});
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddressFormData, setNewAddressFormData] = useState({
    firstname: "",
    lastname: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    zip: "",
    mobile: "",
    country: "",
  });


  const data = {
    name: orderAddress?.firstname,
    amount: salePriceTotal,
    number: orderAddress?.mobile,
    MUID: "MUID" + Date.now(),
    transactionId: 'T' + Date.now(),
  }

  const fetchAddress = async (urlQ) => {
    try {
      const response = await axiosInstance.get(urlQ);
      setAddressDatas(response.data.data);
      console.log(response.data.data);
      const defAddress = response.data.data.filter(
        (addr) => addr.primary == true
      );
      console.log("prim addr ", defAddress[0]);
      setOrderAddress(response?.data?.data?.[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAddress("/api/v1/address");
  }, []);

  const handleAddressModalClose = () => setShowAddressModal(false);
  const handleAddressModalShow = () => setShowAddressModal(true);

  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddressFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNewAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        "/api/v1/address",
        newAddressFormData
      );
      console.log("Address submitted: ", response.data);
      setNewAddressFormData({
        firstname: "",
        lastname: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        zip: "",
        mobile: "",
        country: "",
      });
      handleAddressModalClose();
      await fetchAddress("/api/v1/address");
    } catch (error) {
      console.error("Error submitting address: ", error);
    }
  };

  //

  const calculateTotalSalePrice = (items) => {
    let totalSalePrice = 0;

    items.forEach((item) => {
      // Add the sale_rate to the totalSalePrice
      totalSalePrice += item.productId.sale_rate * item.qty;
    });

    return totalSalePrice;
  };
  const calculateTotalProPrice = (items) => {
    let totalSalePrice = 0;

    items.forEach((item) => {
      // Add the sale_rate to the totalSalePrice
      totalSalePrice += item.productId.price * item.qty;
    });

    return totalSalePrice;
  };
  const calculateTotalDiscountPrice = (items) => {
    let totalSalePrice = 0;

    items.forEach((item) => {
      // Add the sale_rate to the totalSalePrice
      totalSalePrice += item.productId.discount;
    });

    return totalSalePrice;
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/user/getcarts`);
      setCartData(response.data.data);
      console.log("cart", response.data.data);
      const items = response.data.data.item;

      // Calculate the total sale price
      const totalSalePrice = calculateTotalSalePrice(items);
      //console.log(totalSalePrice)
      setSalePriceTotal(totalSalePrice);

      // Calculate the total  price
      const totalProPrice = calculateTotalProPrice(items);
      //console.log(totalProPrice)
      setProPriceTotal(totalProPrice);

      // Calculate the total discount
      const totalDiscount = calculateTotalDiscountPrice(items);
      //console.log(totalDiscount)
      setDiscountTotal(totalDiscount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRemoveItem = async (itemId) => {
    console.log("cart id ", itemId);
    let urlQuery = `/api/v1/user/removeFromCart/${itemId}`;

    try {
      const response = await axiosInstance.patch(urlQuery);
      const updatedCartItems = cartData.item.filter(
        (item) => item._id !== itemId
      );
      const updatedTotalPrice = updatedCartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );

      setProPriceTotal(null);
      setSalePriceTotal(null);
      setCartData({
        ...cartData,
        item: updatedCartItems,
        totalPrice: updatedTotalPrice,
      });

      // Calculate the total sale price
      const totalSalePrice = calculateTotalSalePrice(updatedCartItems);
      console.log(totalSalePrice);
      setSalePriceTotal(totalSalePrice);

      // Calculate the total  price
      const totalProPrice = calculateTotalProPrice(updatedCartItems);
      console.log(totalProPrice);
      setProPriceTotal(totalProPrice);

      console.log("logic", cartData);
      console.log("logic l", cartData.item.length);
      if (cartData.item.length - 1 == 0) {
        navigate("/");
      }

      // console.log('Updated cart ', updatedCartItems);
      // console.log("Item removed from cart:");
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  //

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Radish Pink Microgreen Seeds",
      image:
        "https://t3.ftcdn.net/jpg/06/25/41/12/240_F_625411283_dlpdiRmZxoptmfMX1NNh6jmIv4t3pwK3.jpg",
      price: 1999,
      quantity: 1,
    },
  ]);
  const handleQuantityChange = async (item, operation) => {
    let QtyApi = item.qty;
    if (operation === "increment") {
      QtyApi += 1;
    } else if (operation === "decrement") {
      QtyApi -= 1;
    }
    try {
      if (item.qty <= item.productId.stock && operation === "increment") {
        const response = await axiosInstance.patch(`/api/v1/user/updateQty`, {
          qty: QtyApi,
          productId: item.productId._id,
        });
        console.log("incrr");
      } else if (item.qty > 1 && operation === "decrement") {
        const response = await axiosInstance.patch(`/api/v1/user/updateQty`, {
          qty: QtyApi,
          productId: item.productId._id,
        });

        console.log("decrrr");
      }
    } catch (error) {
      console.log(error);
    }

    fetchData();
  };

  const calculateSubtotal = () => {
    return products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const calculateTotalPrice = () => {
    const subtotal = calculateSubtotal();
    const deliveryFee = 100; // Exaggerated delivery fee
    const tax = 0.1 * subtotal; // Exaggerated tax
    return subtotal + deliveryFee + tax;
  };

  const removeProduct = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };
  //

  const handlePaymentSuccess = async () => {
    const orderFormat = {};

    console.log("success");

    const mappedCartItems = await cartData?.item.map((item) => ({
      product_id: item.productId._id,
      qty: item.qty,
      price: item.productId.sale_rate,
    }));

    // Calculate the total price based on the cart items
    const totalPrice = mappedCartItems.reduce(
      (total, item) => total + item.qty * item.price,
      0
    );

    // Create the final 'products' object using the mapped cart items and total price
    const productsOrderData = {
      item: mappedCartItems,
      totalPrice,
    };

    // Now 'products' object is ready to be used following the defined schema
    console.log("Final Products Object:", productsOrderData);

    const response = await axiosInstance.post(`/api/v1/orders`, {
      payment_mode: paymentOption,
      amount: productsOrderData.totalPrice,
      address: orderAddress._id,
      products: productsOrderData,
    });

    Swal.fire({
      title: "Success",
      text: "Your order has been placed!",
      icon: "success",
      showConfirmButton: false,
      timer: 3000,
    });
    navigate("/");
  };

  const placeOrder = async () => {
    console.log("payment ", paymentOption);
    if (paymentOption === "cod") {
      handlePaymentSuccess();
    } else if (paymentOption === "phonepe") {
      const mappedCartItems = await cartData?.item.map((item) => ({
        product_id: item.productId._id,
        qty: item.qty,
        price: item.productId.sale_rate,
      }));

      const totalPrice = mappedCartItems.reduce(
        (total, item) => total + item.qty * item.price,
        0
      );

      const productsOrderData = {
        item: mappedCartItems,
        totalPrice,
      };

      const orderData = {
        payment_mode: paymentOption,
        amount: productsOrderData.totalPrice,
        address: orderAddress._id,
        products: productsOrderData,
      }
      console.log(orderAddress);
      await axiosInstance.post('/api/v1/orders/initiate-payment', { data, orderData }).then(res => {

        console.log('1', res.data)
        if (res.data && res.data.data.instrumentResponse.redirectInfo.url) {
          window.location.href = res.data.data.instrumentResponse.redirectInfo.url;
        }
      })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const progressPercentage = (currentStep / 3) * 100;

  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleRadioChange = (addr) => {
    setSelectedAddress(addr);
  };

  const handleChangeAddress = () => {
    if (selectedAddress) {
      setOrderAddress(selectedAddress);
    }
  };

  return (
    <>
      <div className="bg-success-subtle">
        <div className="container p-3">
          <div className="d-flex justify-content-between align-items-center">
            <Link to={"/"}>
              <div>
                <img src={logo} className="img-fluid" width={150} alt="" />
              </div>
            </Link>
            <div>
              <p className="d-none d-md-block fw-bold">
                Curating fashion jewellery & accessories experiences     {/* changed from boutique wellness experiences to fashion jewellery & accessories experiences */}  
              </p>
            </div>
            <div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-header bg-success text-white">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span className="font-weight-bold">Subtotal:</span>
                  <span>₹{salePriceTotal}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="font-weight-bold">Delivery Fee:</span>
                  <span>0</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="font-weight-bold">Tax:</span>0
                  {/* <span>₹{(0.1 * calculateSubtotal()).toFixed(2)}</span> */}
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <span className="font-weight-bold">Total:</span>
                  <span className="font-weight-bold">₹{salePriceTotal}</span>
                </div>
              </div>
            </div>
            {/* <div className="progress mb-4">
              <div className="progress-bar bg-success" role="progressbar" style={{ width: `${progressPercentage}%` }} aria-valuenow={progressPercentage} aria-valuemin="0" aria-valuemax="100"></div>
            </div> */}
            {currentStep === 1 && (
              <div className="card mb-4">
                <div className="card-header bg-success text-white">
                  <h5 className="mb-0">Step 1: Shipping Address</h5>
                </div>
                <div className="card-body">
                  {orderAddress?.address_line_1 ? (
                    <div className="row">
                      <div className="address-box border p-3  col-md-6 ">
                        <p className="card-text">
                          {" "}
                          {`${orderAddress?.address_line_1}.`} <br />{" "}
                          {`${orderAddress?.address_line_2}.`}
                          <br /> {`${orderAddress?.city},`}
                          <br /> {`${orderAddress?.state},`}
                          <br /> {`${orderAddress?.country},`}
                          <br /> {`${orderAddress?.zip}.`}
                        </p>

                      </div>
                      <div className="address-box border p-3 d-flex flex-column col-md-6">
                        <Form>
                          {addressDatas.map((addr) => (
                            <div key={addr._id}>
                              <Form.Check
                                type="radio"
                                label={addr.address_line_1}
                                name="group1"
                                id={addr._id}
                                onChange={() => handleRadioChange(addr)}
                              />
                            </div>
                          ))}
                        </Form>
                        <Button
                          className="btn btn-success mt-3"
                          onClick={handleChangeAddress}
                        >
                          Change Address
                        </Button>
                      </div>
                      <button
                        className="btn btn-outline-success change-address-btn mt-2"
                        onClick={() => setCurrentStep(2)}
                      >
                        Next
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p>You haven't added any addresses yet.</p>
                      <Button
                        variant="success"
                        onClick={handleAddressModalShow}
                      >
                        Add New Address
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* New Address Modal */}
            <Modal show={showAddressModal} onHide={handleAddressModalClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add New Address</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleNewAddressSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstname"
                      value={newAddressFormData.firstname}
                      onChange={handleNewAddressChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastname"
                      value={newAddressFormData.lastname}
                      onChange={handleNewAddressChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Address Line 1</Form.Label>
                    <Form.Control
                      type="text"
                      name="address_line_1"
                      value={newAddressFormData.address_line_1}
                      onChange={handleNewAddressChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Address Line 2</Form.Label>
                    <Form.Control
                      type="text"
                      name="address_line_2"
                      value={newAddressFormData.address_line_2}
                      onChange={handleNewAddressChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={newAddressFormData.city}
                      onChange={handleNewAddressChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      name="state"
                      value={newAddressFormData.state}
                      onChange={handleNewAddressChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>ZIP Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="zip"
                      value={newAddressFormData.zip}
                      onChange={handleNewAddressChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control
                      type="tel"
                      name="mobile"
                      value={newAddressFormData.mobile}
                      onChange={handleNewAddressChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      name="country"
                      value={newAddressFormData.country}
                      onChange={handleNewAddressChange}
                      required
                    />
                  </Form.Group>
                  <Button variant="success" type="submit">
                    Add Address
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>

            {currentStep === 2 && (
              <div className="card mb-4">
                <div className="card-header bg-success text-white">
                  <h5 className="mb-0">Step 2: Review Items and Shipping</h5>
                </div>
                <div className="card-body">
                  {cartData.item.map((product) => (
                    <div
                      key={product.id}
                      className="row mb-3 align-items-center border-bottom pb-3"
                    >
                      <div className="col-md-3">
                        <img
                          src={`${ServerURL}/uploads/${product.productId.image[0]}`}
                          alt={product.name}
                          className="img-fluid"
                        />
                      </div>
                      <div className="col-md-6">
                        <h5 className="fw-bold text-muted ">
                          {product.productId.name}
                        </h5>
                        <p className="text-muted">Microgreen</p>
                        <p className="fw-bold">
                          ₹{product.productId.sale_rate}
                        </p>
                        <span className="m-1 text-muted text-decoration-line-through ">
                          ₹{product.productId.price}
                        </span>
                        <span className="text-success fw-bold bg-success-subtle p-1">
                          {product.productId.discount}% off
                        </span>
                      </div>
                      <div className="col-md-3">
                        <div className="input-group">
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() =>
                              handleQuantityChange(product, "decrement")
                            }
                            disabled={product.quantity === 1}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            className="form-control text-center"
                            value={product.qty}
                            readOnly
                          />
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() =>
                              handleQuantityChange(product, "increment")
                            }
                          >
                            +
                          </button>
                          <button
                            className="btn btn-link text-danger"
                            onClick={() => handleRemoveItem(product._id)}
                          >
                            <FaRegTrashAlt />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-success me-2"
                      onClick={() => setCurrentStep(1)}
                    >
                      Back
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => setCurrentStep(3)}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="card mb-4">
                <div className="card-header bg-success text-white">
                  <h5 className="mb-0">Step 3: Payment Options</h5>
                </div>
                <div className="card-body">
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentOption"
                      id="phonepeOption"
                      value="phonepe"
                      checked={paymentOption === "phonepe"}
                      onChange={() => setPaymentOption("phonepe")}
                    />
                    <label
                      className="form-check-label fw-bold "
                      htmlFor="phonepeOption"
                    >
                      Online Payment
                    </label>
                    <p className="text-muted">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentOption"
                      id="codOption"
                      value="cod"
                      checked={paymentOption === "cod"}
                      onChange={() => setPaymentOption("cod")}
                    />
                    <label
                      className="form-check-label fw-bold "
                      htmlFor="codOption"
                    >
                      Cash on Delivery / Pay on Delivery
                    </label>
                    <p className="text-muted">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-success me-2"
                      onClick={() => setCurrentStep(2)}
                    >
                      Back
                    </button>
                    <button className="btn btn-danger" onClick={placeOrder}>
                      Place Your Order
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;

import React, { useState, useEffect } from "react";
import axiosInstance from "../axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  CheckoutHeader,
  OrderSummary,
  AddressSection,
  AddressModal,
  CartItemsList,
  PaymentOptions,
  CheckoutProgress,
} from "../components/checkout";
import "../components/checkout/Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentOption, setPaymentOption] = useState("razorpay"); // Only online payment allowed
  const [cartData, setCartData] = useState([]);
  const [salePriceTotal, setSalePriceTotal] = useState(0);
  const [proPriceTotal, setProPriceTotal] = useState(0);
  const [discountTotal, setDiscountTotal] = useState(0);

  const [addressDatas, setAddressDatas] = useState([]);
  const [orderAddress, setOrderAddress] = useState({});
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [newAddressFormData, setNewAddressFormData] = useState({
    firstname: "",
    lastname: "",
    address_line_1: "",
    city: "",
    state: "",
    zip: "",
    mobile: "",
    country: "",
  });
  const [deliveryCharges, setDeliveryCharges] = useState(null);
  const [isAddressConfirmed, setIsAddressConfirmed] = useState(false);

  // Remove unused PhonePe data object
  // data object is no longer needed for Razorpay

  // Calculate delivery charges based on state
  const calculateDeliveryCharges = (state, totalAmount) => {
    if (totalAmount >= 799) return 0;

    const normalizedState = state?.toLowerCase().trim() || "";

    if (normalizedState.includes("kerala")) return 49;
    if (
      normalizedState.includes("tamil nadu") ||
      normalizedState.includes("karnataka") ||
      normalizedState.includes("andhra pradesh")
    )
      return 49;
    return 79;
  };

  const fetchAddress = async (urlQ) => {
    try {
      const response = await axiosInstance.get(urlQ);
      setAddressDatas(response.data.data);
      console.log(response.data.data);
      const defAddress = response.data.data.filter(
        (addr) => addr.primary == true,
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

  // Don't auto-calculate delivery charges
  // Calculate only when user explicitly confirms an address

  const handleAddressModalClose = () => {
    setShowAddressModal(false);
    setIsEditMode(false);
    setEditingAddressId(null);
    setNewAddressFormData({
      firstname: "",
      lastname: "",
      address_line_1: "",
      city: "",
      state: "",
      zip: "",
      mobile: "",
      country: "",
    });
  };
  
  const handleAddressModalShow = () => {
    setIsEditMode(false);
    setEditingAddressId(null);
    setNewAddressFormData({
      firstname: "",
      lastname: "",
      address_line_1: "",
      city: "",
      state: "",
      zip: "",
      mobile: "",
      country: "",
    });
    setShowAddressModal(true);
  };

  const handleEditAddress = (addr) => {
    setIsEditMode(true);
    setEditingAddressId(addr._id);
    setNewAddressFormData({
      firstname: addr.firstname || "",
      lastname: addr.lastname || "",
      address_line_1: addr.address_line_1 || "",
      city: addr.city || "",
      state: addr.state || "",
      zip: addr.zip || "",
      mobile: addr.mobile || "",
      country: addr.country || "",
    });
    setShowAddressModal(true);
  };

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
      let response;
      let updatedAddress;

      if (isEditMode && editingAddressId) {
        // Edit existing address - find the original to preserve all fields
        const originalAddress = addressDatas.find(addr => addr._id === editingAddressId);
        const updatedAddressData = {
          ...newAddressFormData,
          _id: editingAddressId,
        };
        response = await axiosInstance.patch(
          "/api/v1/address",
          updatedAddressData,
        );
        console.log("Address updated: ", response.data);
        // Merge with original to preserve fields like primary, userId, etc.
        updatedAddress = {
          ...originalAddress,
          ...newAddressFormData,
          _id: editingAddressId,
        };
      } else {
        // Add new address
        response = await axiosInstance.post(
          "/api/v1/address",
          newAddressFormData,
        );
        console.log("Address submitted: ", response.data);
        updatedAddress = response.data.data || newAddressFormData;
      }

      // Update state immediately without refetching
      if (isEditMode && editingAddressId) {
        // Update existing address in the list
        setAddressDatas((prevAddresses) =>
          prevAddresses.map((addr) =>
            addr._id === editingAddressId ? updatedAddress : addr
          )
        );
        
        // If this was the selected address, update it
        if (orderAddress?._id === editingAddressId) {
          setOrderAddress(updatedAddress);
          setSelectedAddress(updatedAddress);
        }
      } else {
        // Add new address to the list
        setAddressDatas((prevAddresses) => [...prevAddresses, updatedAddress]);
        
        // Set the newly added address as the order address
        setOrderAddress(updatedAddress);
        setSelectedAddress(updatedAddress);
      }

      setIsAddressConfirmed(true);

      // Recalculate delivery charges with the new/updated address after confirmation
      if (updatedAddress.state && salePriceTotal > 0) {
        const charges = calculateDeliveryCharges(
          updatedAddress.state,
          salePriceTotal,
        );
        setDeliveryCharges(charges);
      }

      handleAddressModalClose();

      Swal.fire({
        title: isEditMode ? "Address Updated" : "Address Added",
        text: isEditMode 
          ? "Your address has been updated successfully." 
          : "Your address has been added successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error submitting address: ", error);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Failed to save address. Please try again.",
        icon: "error",
      });
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
    let totalPrice = 0;

    items.forEach((item) => {
      // Calculate total original price: price * quantity
      const originalPrice = item.productId.price || 0;
      const quantity = item.qty || 0;
      totalPrice += originalPrice * quantity;
    });

    return totalPrice;
  };
  const calculateTotalDiscountPrice = (items) => {
    let totalDiscount = 0;

    items.forEach((item) => {
      // Calculate discount amount: (original price - sale price) * quantity
      // Or: (price * discount percentage / 100) * quantity
      const originalPrice = item.productId.price || 0;
      const salePrice = item.productId.sale_rate || 0;
      const quantity = item.qty || 0;
      
      // Discount amount per item = (original price - sale price) * quantity
      const discountAmount = (originalPrice - salePrice) * quantity;
      totalDiscount += discountAmount;
    });

    return totalDiscount;
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
        (item) => item._id !== itemId,
      );
      const updatedTotalPrice = updatedCartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0,
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

  // Removed unused products state
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

  // Removed unused calculation functions
  //

  // Load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

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
      0,
    );

    // Create the final 'products' object using the mapped cart items and total price
    const productsOrderData = {
      item: mappedCartItems,
      totalPrice,
    };

    // Now 'products' object is ready to be used following the defined schema
    console.log("Final Products Object:", productsOrderData);

    // Calculate discount amount from cart
    const calculatedDiscount = discountTotal || 0;
    
    const response = await axiosInstance.post(`/api/v1/orders`, {
      payment_mode: paymentOption,
      subtotal: proPriceTotal || productsOrderData.totalPrice,
      delivery_fee: deliveryCharges || 0,
      tax_amount: 0,
      discount_amount: calculatedDiscount,
      amount: productsOrderData.totalPrice + (deliveryCharges || 0),
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

  // Handle Razorpay payment
  const handleRazorpayPayment = async (productsOrderData) => {
    try {
      // Load Razorpay script
      const res = await loadRazorpayScript();

      if (!res) {
        Swal.fire({
          title: "Error",
          text: "Razorpay SDK failed to load. Please check your internet connection.",
          icon: "error",
        });
        return;
      }

      // Calculate discount amount from cart
      const calculatedDiscount = discountTotal || 0;
      
      const orderData = {
        payment_mode: paymentOption,
        subtotal: proPriceTotal || productsOrderData.totalPrice,
        delivery_fee: deliveryCharges || 0,
        tax_amount: 0,
        discount_amount: calculatedDiscount,
        amount: productsOrderData.totalPrice + (deliveryCharges || 0),
        address: orderAddress._id,
        products: productsOrderData,
      };

      // Create Razorpay order
      const response = await axiosInstance.post(
        "/api/v1/orders/create-razorpay-order",
        {
          orderData,
        },
      );

      if (!response.data.success) {
        Swal.fire({
          title: "Error",
          text: "Failed to create order. Please try again.",
          icon: "error",
        });
        return;
      }

      const { orderId, amount, currency, keyId } = response.data;

      // Razorpay checkout options
      const options = {
        key: keyId,
        amount: amount,
        currency: currency,
        name: "Cluster Fascination",
        description: "Fashion Jewellery & Accessories",
        order_id: orderId,
        handler: async function (response) {
          try {
            // Verify payment
            const verifyResponse = await axiosInstance.post(
              "/api/v1/orders/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderData,
              },
            );

            if (verifyResponse.data.success) {
              Swal.fire({
                title: "Success",
                text: "Your payment was successful and order has been placed!",
                icon: "success",
                showConfirmButton: false,
                timer: 3000,
              });
              navigate("/");
            } else {
              Swal.fire({
                title: "Error",
                text: "Payment verification failed. Please contact support.",
                icon: "error",
              });
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            Swal.fire({
              title: "Error",
              text: "Payment verification failed. Please contact support.",
              icon: "error",
            });
          }
        },
        prefill: {
          name: `${orderAddress?.firstname} ${orderAddress?.lastname}`,
          email: "", // Add email if available
          contact: orderAddress?.mobile,
        },
        notes: {
          address: `${orderAddress?.address_line_1}, ${orderAddress?.city}`,
        },
        theme: {
          color: "#28a745",
        },
        modal: {
          ondismiss: function () {
            Swal.fire({
              title: "Payment Cancelled",
              text: "You cancelled the payment process.",
              icon: "warning",
            });
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Razorpay payment error:", error);

      // Check if it's a 503 error (Razorpay not configured)
      if (error.response && error.response.status === 503) {
        Swal.fire({
          title: "Payment Gateway Unavailable",
          html: `
            <p>Online payment is currently unavailable.</p>
            <p><strong>Please contact support to complete your order.</strong></p>
            <p style="font-size: 0.9em; color: #666; margin-top: 15px;">
              (Administrator: Razorpay credentials need to be configured)
            </p>
          `,
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#28a745",
        });
      } else {
        // Other errors
        Swal.fire({
          title: "Error",
          text:
            error.response?.data?.message ||
            "Failed to initiate payment. Please try again.",
          icon: "error",
        });
      }
    }
  };

  const placeOrder = async () => {
    console.log("payment ", paymentOption);
    // Only Razorpay payment is allowed - COD is disabled
    if (paymentOption === "razorpay") {
      const mappedCartItems = await cartData?.item.map((item) => ({
        product_id: item.productId._id,
        qty: item.qty,
        price: item.productId.sale_rate,
      }));

      const totalPrice = mappedCartItems.reduce(
        (total, item) => total + item.qty * item.price,
        0,
      );

      const productsOrderData = {
        item: mappedCartItems,
        totalPrice,
      };

      handleRazorpayPayment(productsOrderData);
    } else {
      Swal.fire({
        title: "Payment Required",
        text: "Only online payment is accepted. Please complete the payment to place your order.",
        icon: "warning",
      });
    }
  };

  const progressPercentage = (currentStep / 3) * 100;

  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleRadioChange = (addr) => {
    // Automatically change address when radio is clicked
    if (addr) {
      setSelectedAddress(addr);
      setOrderAddress(addr);
      setIsAddressConfirmed(true);
      // Recalculate delivery charges after address confirmation
      if (addr.state && salePriceTotal > 0) {
        const charges = calculateDeliveryCharges(
          addr.state,
          salePriceTotal,
        );
        setDeliveryCharges(charges);
      }
    }
  };

  const handleChangeAddress = (addr) => {
    const addressToUse = addr || selectedAddress;
    if (addressToUse) {
      setOrderAddress(addressToUse);
      setSelectedAddress(addressToUse);
      setIsAddressConfirmed(true);
      // Recalculate delivery charges after address confirmation
      if (addressToUse.state && salePriceTotal > 0) {
        const charges = calculateDeliveryCharges(
          addressToUse.state,
          salePriceTotal,
        );
        setDeliveryCharges(charges);
      }
    }
  };

  const handleNext = () => {
    // Confirm current address and calculate delivery charges before moving to next step
    if (orderAddress?.state && salePriceTotal > 0) {
      setIsAddressConfirmed(true);
      const charges = calculateDeliveryCharges(
        orderAddress.state,
        salePriceTotal,
      );
      setDeliveryCharges(charges);
    }
    setCurrentStep(2);
  };

  return (
    <>
      <CheckoutHeader />
      <div className="container mt-5" style={{ marginBottom: "60px" }}>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <CheckoutProgress currentStep={currentStep} />
            <OrderSummary
              salePriceTotal={salePriceTotal}
              deliveryCharges={deliveryCharges}
              discountTotal={discountTotal}
              proPriceTotal={proPriceTotal}
            />

            {currentStep === 1 && (
              <AddressSection
                orderAddress={orderAddress}
                addressDatas={addressDatas}
                selectedAddress={selectedAddress}
                onRadioChange={handleRadioChange}
                onChangeAddress={handleChangeAddress}
                onNext={handleNext}
                onAddNewAddress={handleAddressModalShow}
                onEditAddress={handleEditAddress}
              />
            )}

            <AddressModal
              show={showAddressModal}
              onHide={handleAddressModalClose}
              formData={newAddressFormData}
              onChange={handleNewAddressChange}
              onSubmit={handleNewAddressSubmit}
              isEditMode={isEditMode}
            />

            {currentStep === 2 && (
              <CartItemsList
                cartItems={cartData.item}
                onQuantityChange={handleQuantityChange}
                onRemoveItem={handleRemoveItem}
                onBack={() => setCurrentStep(1)}
                onContinue={() => setCurrentStep(3)}
              />
            )}

            {currentStep === 3 && (
              <PaymentOptions
                paymentOption={paymentOption}
                onPaymentChange={setPaymentOption}
                onBack={() => setCurrentStep(2)}
                onPlaceOrder={placeOrder}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;

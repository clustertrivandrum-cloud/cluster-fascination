import React, { useState,useEffect } from 'react';
import axiosInstance from '../axios'

import { Link } from 'react-router-dom';
import TopNav from '../components/TopNav';
import MiddleNav from '../components/MiddleNav';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';
import { ServerURL } from '../services/baseUrl';

function Cart() {
const [cartData,setCartData] = useState([])
const [salePriceTotal,setSalePriceTotal] = useState(0)
const [proPriceTotal,setProPriceTotal] = useState(0)
const [discountTotal,setDiscountTotal] = useState(0)
const [notif,setNotif] = useState(true)


const calculateTotalSalePrice = (items) => {
  let totalSalePrice = 0;

  items.forEach((item) => {
   
  
    
    // Add the sale_rate to the totalSalePrice
    totalSalePrice +=item.productId.sale_rate * item.qty ;
  });

  return totalSalePrice;
};
const calculateTotalProPrice = (items) => {
  let totalSalePrice = 0;

  items.forEach((item) => {
   
  
    
    // Add the sale_rate to the totalSalePrice
    totalSalePrice +=item.productId.price;
  });

  return totalSalePrice;
};
const calculateTotalDiscountPrice = (items) => {
  let totalSalePrice = 0;

  items.forEach((item) => {
   
  
    
    // Add the sale_rate to the totalSalePrice
    totalSalePrice +=item.productId.discount;
  });

  return totalSalePrice;
};

const fetchData = async()=>{

  try {

    const response = await axiosInstance.get(`/api/v1/user/getcarts`);
    setCartData(response.data.data)
    console.log('cart details array',response.data.data)
    //console.log('fetch qty ',response.data.data.item[0].qty)
    const items = response.data.data.item;

// Calculate the total sale price
const totalSalePrice = calculateTotalSalePrice(items);
   setSalePriceTotal(totalSalePrice)

  // Calculate the total  price
const totalProPrice = calculateTotalProPrice(items);
   setProPriceTotal(totalProPrice)

  // Calculate the total discount
const totalDiscount = calculateTotalDiscountPrice(items);
   setDiscountTotal(totalDiscount)

  } catch (error) {
    console.log(error)
  }

}

useEffect(()=>{

  fetchData()

},[])



 

  const handleQuantityChange =async (item, operation,index) => {
let QtyApi = item.qty
if(operation==='increment'){
  QtyApi +=1
}else if (operation==='decrement'){
  QtyApi -=1
}
try {
   

if(item.qty <=  item.productId.stock && operation==='increment'){
  const response = await axiosInstance.patch(`/api/v1/user/updateQty`,{ qty:QtyApi, productId:item.productId._id })
 
  setProPriceTotal(null)
  setSalePriceTotal(null)


}else if(item.qty>1 && operation==='decrement'){
  const response = await axiosInstance.patch(`/api/v1/user/updateQty`,{ qty:QtyApi, productId:item.productId._id })

  setProPriceTotal(null)
    setSalePriceTotal(null)

}

  } catch (error) {
   console.log(error)
  }

  fetchData()
 }




  

  const handleRemoveItem =async (itemId) => {
   console.log('cart id ',itemId)
   let urlQuery=`/api/v1/user/removeFromCart/${itemId}`


   try {
    const response = await axiosInstance.patch(urlQuery);
    const updatedCartItems = cartData.item.filter((item) => item._id !== itemId);
    const updatedTotalPrice = updatedCartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    setProPriceTotal(null)
    setSalePriceTotal(null)
    setCartData({
        ...cartData,
        item: updatedCartItems,
        totalPrice: updatedTotalPrice
    });
   // Calculate the total sale price
   const totalSalePrice = calculateTotalSalePrice(updatedCartItems);
   console.log(totalSalePrice)
       setSalePriceTotal(totalSalePrice)
   
       // Calculate the total  price
   const totalProPrice = calculateTotalProPrice(updatedCartItems);
   console.log(totalProPrice)
       setProPriceTotal(totalProPrice)

       setNotif(prev => !prev);

} catch (error) {
    console.error("Error removing item from wishlist:", error);
 
}
 
  };

   

  const discount = 300; // Example discount
  const deliveryCharges = 0; // Example delivery charges

  

  return (
    <>
      <TopNav />
      <MiddleNav notification={notif} />
      <MainNav />
      <div className="container my-5" style={{position: 'relative'}}>
        {/* Decorative watercolor spots */}
        <div className="watercolor-spot spot-mint" style={{width: '200px', height: '200px', top: '50px', right: '5%', opacity: '0.12'}}></div>
        <div className="watercolor-spot spot-pink" style={{width: '180px', height: '180px', bottom: '100px', left: '3%', opacity: '0.1'}}></div>
        
        <h1 className="text-center mb-2 elegant-script" style={{fontSize: '2.8rem', color: 'var(--text-dark)'}}>
          <i className="fas fa-shopping-cart me-3" style={{color: 'var(--primary-mint)'}}></i> Shopping Cart
        </h1>
        <p className="text-center mb-4" style={{fontFamily: 'var(--font-serif)', color: 'var(--text-muted)', fontStyle: 'italic'}}>
          <span className='flower-accent'>✿</span> Your Selected Items <span className='flower-accent'>✿</span>
        </p>
        <div className="section-divider mb-5"></div>
        
        {cartData?.item?.length === 0 ? (
          <div className="text-center p-5">
            <p style={{fontFamily: 'var(--font-sans)', fontSize: '1.1rem', color: 'var(--text-muted)'}}>
              No items in the cart
            </p>
            <Link to={'/allproducts'}>
              <button className="btn btn-cluster mt-3">
                <i className="fas fa-plus me-2"></i>Explore Products
              </button>
            </Link>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-8">
              {cartData?.item?.map((item,index) => (
                <div key={item._id} className="card-cluster mb-3 p-3">
                  <div className="row g-0">
                    <div className="col-md-4 col-5 d-flex align-items-center ">
                      <img
                         src={`${ServerURL}/uploads/${item.productId.image[0]}`}

                        className="img-fluid"
                        alt={item.name}
                        style={{borderRadius: '15px'}}
                      />
                    </div>
                    <div className="col-md-8 col-7">
                      <div className="card-body">
                        <h5 className="card-title" style={{
                          fontFamily: 'var(--font-serif)',
                          color: 'var(--text-dark)',
                          fontWeight: '600'
                        }}>{item.productId.name}</h5>
                        <p className='text-muted' style={{fontFamily: 'var(--font-sans)', fontSize: '0.9rem'}}>{item.productId.brand}</p>
                        <p className="card-text fw-bold mb-1" style={{color: 'var(--success-green)', fontSize: '1.2rem'}}>₹{item.productId.sale_rate}</p>
                        <span className='me-2 text-muted text-decoration-line-through' style={{fontSize: '0.9rem'}}>₹{item.productId.price}</span>
                        <span className='badge-cluster' style={{background: 'var(--accent-pink)'}}>{item.productId.discount}% off</span>
                        <div className="d-flex align-items-center justify-content-between mt-3">
                          <div className="d-flex justify-content-center align-items-center gap-2">
                            <button
                              className="btn btn-outline-cluster"
                              onClick={() => handleQuantityChange(item, 'decrement',index)}
                              disabled={item.quantity === 1}
                              style={{
                                width: '35px',
                                height: '35px',
                                padding: '0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%'
                              }}
                            >
                              <i className="fas fa-minus" style={{fontSize: '0.8rem'}}></i>
                            </button>
                            <span className="mx-2 fw-bold" style={{fontFamily: 'var(--font-sans)', minWidth: '30px', textAlign: 'center'}}>{item.qty}</span>
                            <button
                              className="btn btn-cluster"
                              onClick={() => handleQuantityChange(item, 'increment',index )}
                              style={{
                                width: '35px',
                                height: '35px',
                                padding: '0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%'
                              }}
                            >
                              <i className="fas fa-plus" style={{fontSize: '0.8rem'}}></i>
                            </button>
                          </div>
                        <div>
                          <button
                            className="btn btn-outline-cluster ms-2"
                            onClick={() => handleRemoveItem(item._id)}
                            style={{
                              borderColor: 'var(--accent-pink)',
                              color: 'var(--text-dark)'
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.background = 'var(--accent-pink)';
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.background = 'transparent';
                            }}
                          ><i className="fas fa-trash"></i></button>
                        </div>
                        </div>
                         
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4">
              <div className="card-cluster" style={{
                background: 'linear-gradient(135deg, var(--light-mint) 0%, var(--cream-white) 100%)',
                padding: '25px'
              }}>
                <h5 className="mb-4" style={{
                  fontFamily: 'var(--font-elegant-script)',
                  fontSize: '1.8rem',
                  color: 'var(--text-dark)'
                }}>
                  <i className="fas fa-receipt me-2" style={{color: 'var(--primary-mint)'}}></i>Order Summary
                </h5>
                <div style={{fontFamily: 'var(--font-sans)'}}>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Price:</span>
                    <span className="fw-bold">₹{proPriceTotal}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2" style={{color: 'var(--success-green)'}}>
                    <span>Discount:</span>
                    <span className="fw-bold">-₹{proPriceTotal-salePriceTotal}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Delivery Charges:</span>
                    <span className="fw-bold">₹{deliveryCharges}</span>
                  </div>
                  <hr style={{borderColor: 'var(--primary-mint)'}} />
                  <div className="d-flex justify-content-between mb-3">
                    <span className="fw-bold" style={{fontSize: '1.1rem'}}>Total Amount:</span>
                    <span className="fw-bold" style={{fontSize: '1.2rem', color: 'var(--success-green)'}}>₹{salePriceTotal}</span>
                  </div>
                </div>
                <Link to={'/checkout'}>
                  <button className="btn btn-cluster w-100 mt-2">
                    <i className="fas fa-shopping-cart me-2"></i>Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;

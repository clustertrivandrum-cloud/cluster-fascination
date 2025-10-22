import React, { useState,useEffect } from 'react'
import axiosInstance from '../axios'

import { Link } from 'react-router-dom';
import TopNav from '../components/TopNav';
import MiddleNav from '../components/MiddleNav';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';
import { ServerURL } from '../services/baseUrl';

function Wishlist() {

    const [wishListData,setWishListData] = useState([])

    let urlQuery = '';

    useEffect(()=>{
  
      urlQuery=`/api/v1/user/getwishlist`
  
      const fetchData = async()=>{
  
        try {
  
          const response = await axiosInstance.get(urlQuery);
          setWishListData(response.data.data)
          console.log(response.data.data)
          
        } catch (error) {
          console.log(error)
        }
  
      }
  
  
      fetchData()
  
  
    },[])

    // const [wishlistItems, setWishlistItems] = useState([
    //     {
    //       id: 1,
    //       name: 'Radish White Microgreen seeds',
    //       imageUrl: 'https://t3.ftcdn.net/jpg/00/70/62/06/240_F_70620687_WyyZOfm8R6qXU9bWio8VbEXGSX4eX1eu.jpg',
    //       price: '120',
    //       quantity: '500'
    //     },
    //     {
    //       id: 2,
    //       name: 'Radish White Microgreen seeds',
    //       imageUrl: 'https://t3.ftcdn.net/jpg/03/40/37/62/240_F_340376293_8KKAtyMn6badZqrCMRajj576ckJoz7Tx.jpg',
    //       price: '150',
    //       quantity: '500'
    //     },
    //     {
    //       id: 3,
    //       name: 'Radish White Microgreen seeds',
    //       imageUrl: 'https://t4.ftcdn.net/jpg/03/88/04/41/240_F_388044101_IidJjwi2bonGwWDGZZqgPz7oxaowhsjp.jpg',
    //       price: '180',
    //       quantity: '500'
    //     },
    //   ]);

      const handleRemoveFromWishlist = async (itemId) => {
        // Update local state to remove the item from the wishlist
      
    
        // API call to remove the item from the wishlist
        const url = `/api/v1/user/removeFromWishlist/${itemId}`; // Assuming the endpoint is correct
        try {
            const response = await axiosInstance.patch(url);
        //    setWishlistItems([])
            const updatedWishlistItems = wishListData.filter((item) => item._id !== itemId);
            setWishListData(updatedWishlistItems);
         //   console.log("Item removed from wishlist:", response.data);
        } catch (error) {
            console.error("Error removing item from wishlist:", error);
            // You could also update the state here if the API call fails
        }
    };
    
      const handleAddToCart =async (item) => {
        urlQuery=`/api/v1/user/addToCart/${item._id}`

        // Implement your logic to add the item to the cart here 
        const response = await axiosInstance.patch(urlQuery);

     //   console.log('Adding to cart:', item);
      };
      const handleRemoveFromCart =async (item) => {
        urlQuery=`/api/v1/user/removeFromCart/${item._id}`

        // Implement your logic to add the item to the cart here 
        const response = await axiosInstance.patch(urlQuery);

     //   console.log('Adding to cart:', item);
      };
  return (
  <>
      <TopNav/>
     <MiddleNav/>
     <MainNav/> 
      <div className="container py-5" style={{position: 'relative'}}>
        {/* Decorative watercolor spots */}
        <div className="watercolor-spot spot-pink" style={{width: '200px', height: '200px', top: '50px', right: '5%', opacity: '0.15'}}></div>
        <div className="watercolor-spot spot-mint" style={{width: '180px', height: '180px', bottom: '100px', left: '3%', opacity: '0.15'}}></div>
        
      <h2 className="text-center mb-2 elegant-script" style={{fontSize: '2.5rem', color: 'var(--text-dark)'}}>
        My Wishlist
      </h2>
      <p className="text-center mb-4" style={{fontFamily: 'var(--font-serif)', color: 'var(--text-muted)', fontStyle: 'italic'}}>
        <span className='flower-accent'>✿</span> Your Curated Collection <span className='flower-accent'>✿</span>
      </p>
      <div className="section-divider mb-5"></div>
      
      {wishListData.length === 0 ? (
          <div className='text-center p-5'>
            <p className="text-center mb-4" style={{fontFamily: 'var(--font-sans)', fontSize: '1.1rem', color: 'var(--text-muted)'}}>
              Your wishlist is empty.
            </p>
            <Link to={'/allproducts'}>
            <button className="btn btn-cluster">
              <i className="fas fa-plus me-2"></i>Explore Products
            </button>
         </Link>
          </div>
      ) : (
        <div className="row">
          {wishListData.map((item) => (
            <div key={item._id} className="col-md-4 mb-4">
              <div className="card-cluster h-100" style={{padding: '20px'}}>
                <div className="text-center mb-3">
                  <img
                   src={`${ServerURL}/uploads/${item.image[0]}`}
                    alt={item.name}
                    className="img-fluid"
                    style={{ 
                      maxHeight: '200px', 
                      objectFit: 'contain',
                      borderRadius: '15px'
                    }}
                  />
                </div>
                <div>
                  <h5 className="mb-2" style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: '600',
                    color: 'var(--text-dark)'
                  }}>{item.name}</h5>
                  <div className='d-flex justify-content-between align-items-center mb-3'>
                        <div>
                            <span className='me-2 text-muted text-decoration-line-through' style={{fontSize: '0.9rem'}}>
                              ₹{item.price}
                            </span>
                          <span className='badge-cluster' style={{background: 'var(--accent-pink)'}}>
                            {item.discount}% off
                          </span>
                        </div>
                        <p className="mb-0 fw-bold" style={{color: 'var(--success-green)', fontSize: '1.1rem'}}>
                          ₹{item.sale_rate}
                        </p>
                      </div>
                  <div className="d-flex justify-content-between align-items-center gap-2">
                    <button
                      className="btn btn-outline-cluster flex-grow-1"
                      onClick={() => handleRemoveFromWishlist(item._id)}
                      style={{fontSize: '0.9rem'}}
                    >
                      <i className="fas fa-trash-alt me-1"></i> Remove
                    </button>

                   {
                    true ? (
                      <Link to={'/cart'} className="flex-grow-1">
                      <button
                      className="btn btn-cluster w-100"
                      onClick={() => handleAddToCart(item)}
                      style={{fontSize: '0.9rem'}}
                    >
                      <i className="fas fa-shopping-cart me-1"></i> Add to Cart
                    </button>
                    </ Link>
                    ):(
                      <button
                      className="btn btn-outline-cluster flex-grow-1"
                      onClick={() => handleRemoveFromCart(item)}
                      style={{
                        borderColor: 'var(--accent-pink)',
                        color: 'var(--text-dark)',
                        fontSize: '0.9rem'
                      }}
                    >
                      Remove From Cart
                    </button>
                    )
                   }
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
      <Footer/>
  </>
  )
}

export default Wishlist
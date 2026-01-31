import React, { useState, useEffect } from 'react'
import axiosInstance from '../axios'
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails, clearUserDetails } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';

import useCart from '../hooks/useCart';


function MiddleNav({ notification }) {
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);
  const navigate = useNavigate();

  const { cartCount, refreshCart } = useCart();
  const [wishListData, setWishListData] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/auth/user');
        dispatch(setUserDetails(response.data?.data));
      } catch (error) {
        console.log('Auth check skipped or failed');
        dispatch(clearUserDetails());
      }
    };
    fetchData();
  }, []);

  // Cart count is now handled by useCart hook, but we need to refresh it when notification changes
  useEffect(() => {
    refreshCart();
  }, [notification]);

  useEffect(() => {



    const fetchData = async () => {
      if (userDetails) {
        try {
          const response = await axiosInstance.get(`/api/v1/user/getwishlist`);
          setWishListData(response.data?.data ? response.data.data.length : 0);
        } catch (error) {
          console.log('Wishlist fetch error');
          setWishListData(0);
        }
      } else {
        setWishListData(0);
      }
    };

    fetchData();


  }, [notification])



  const logoutUser = () => {
    // Dispatch the clearUserDetails action to log out the user
    dispatch(clearUserDetails());

    localStorage.removeItem('Tokens');
    window.location.reload();
    navigate('/')
  };

  return (
    <div className='watercolor-bg' style={{ background: 'linear-gradient(135deg, var(--cream-white) 0%, var(--light-mint) 50%, var(--soft-pink) 100%)', position: 'relative', overflow: 'hidden' }}>
      {/* Watercolor spot decorations */}
      <div className="watercolor-spot spot-mint" style={{ width: '300px', height: '300px', top: '-100px', right: '10%' }}></div>
      <div className="watercolor-spot spot-beige" style={{ width: '250px', height: '250px', bottom: '-50px', left: '5%' }}></div>

      <div className='container p-3 py-1'>
        <div className='d-flex justify-content-between align-items-center'>
          <Link to={'/'}>
            <div className='floating-element'>
              <img src={logo} className='img-fluid' width={90} alt="Cluster Fascination Logo" style={{ filter: 'drop-shadow(0 2px 8px rgba(185, 234, 216, 0.3))' }} />
            </div>
          </Link>
          <div>
            <p className='d-none d-md-block elegant-script mb-0' style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-dark)' }}>
              Curating fashion jewellery & accessories experiences     {/* changed from boutique wellness experiences to fashion jewellery & accessories experiences */}
            </p>
          </div>
          <div>
            <div className='d-flex align-items-center gap-2'>
              <Link to={'/cart'}>
                <button className='btn position-relative' style={{
                  background: 'white',
                  border: '2px solid var(--primary-mint)',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 3px 10px rgba(185, 234, 216, 0.3)',
                  transition: 'all 0.3s ease'
                }} onMouseOver={(e) => e.currentTarget.style.background = 'var(--primary-mint)'} onMouseOut={(e) => e.currentTarget.style.background = 'white'}>
                  <i className="fa-solid fa-cart-shopping" style={{ color: 'var(--text-dark)', fontSize: '16px' }}></i>
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" style={{ background: 'var(--accent-pink)', color: 'var(--text-dark)' }}>
                      {cartCount}
                      <span className="visually-hidden">items in cart</span>
                    </span>
                  )}
                </button>
              </Link>

              <Link to={userDetails ? '/wishlist' : '/login'}>
                <button className='btn position-relative' style={{
                  background: 'white',
                  border: '2px solid var(--accent-pink)',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 3px 10px rgba(245, 213, 216, 0.3)',
                  transition: 'all 0.3s ease'
                }} onMouseOver={(e) => e.currentTarget.style.background = 'var(--accent-pink)'} onMouseOut={(e) => e.currentTarget.style.background = 'white'}>
                  <i className="fa-solid fa-heart" style={{ color: 'var(--text-dark)', fontSize: '16px' }}></i>
                  {wishListData > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" style={{ background: 'var(--primary-mint)', color: 'var(--text-dark)' }}>
                      {wishListData}
                      <span className="visually-hidden">items in wishlist</span>
                    </span>
                  )}
                </button>
              </Link>
              {userDetails ? (<button className='btn btn-cluster' onClick={logoutUser} >Logout</button>
              ) : (<Link to={'/login'}> <button className='btn btn-cluster'>Login</button></Link>
              )


              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiddleNav;
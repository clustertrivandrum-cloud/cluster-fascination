import React, { useState,useEffect } from 'react'
import axiosInstance from '../axios'
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails, clearUserDetails } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';


function MiddleNav({notification}) {
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);
  const navigate = useNavigate();

  const [wishListData,setWishListData] = useState()
  const [cartData,setCartData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/auth/user');
       // console.log(response.data.data)
        dispatch(setUserDetails(response.data.data));
      } catch (error) {
        console.log('errr', error);
        dispatch(clearUserDetails());
      }
    };
    fetchData();
  }, []);

let urlQuery = '';

useEffect(()=>{

  urlQuery=`/api/v1/user/getcarts`

  const fetchData = async()=>{

    try {

      const response = await axiosInstance.get(urlQuery);
      setCartData(response.data.data.item ? response.data.data.item.length : 0)
     // console.log(response.data.data.item.length)

    }catch(error){
      
    }
  }

  fetchData()
    },[notification])

  useEffect(()=>{
 
    
 
     const fetchData = async()=>{
 
       try {
 
         const response = await axiosInstance.get(`/api/v1/user/getwishlist`);
         setWishListData(response.data.data ? response.data.data.length : 0)
      //   console.log(response.data.data.length)
         
       } catch (error) {
         console.log(error)
       }
 
     }
 
 
     fetchData()
 
 
   },[notification])

  

  const logoutUser = () => {
    // Dispatch the clearUserDetails action to log out the user
    dispatch(clearUserDetails());

    localStorage.removeItem('Tokens');
    window.location.reload();
    navigate('/')
  };

  return (
    <div className='watercolor-bg' style={{background: 'linear-gradient(135deg, var(--cream-white) 0%, var(--light-mint) 50%, var(--soft-pink) 100%)', position: 'relative', overflow: 'hidden'}}>
      {/* Watercolor spot decorations */}
      <div className="watercolor-spot spot-mint" style={{width: '300px', height: '300px', top: '-100px', right: '10%'}}></div>
      <div className="watercolor-spot spot-beige" style={{width: '250px', height: '250px', bottom: '-50px', left: '5%'}}></div>
      
      <div className='container p-3 py-4'>
        <div className='d-flex justify-content-between align-items-center'>
         <Link to={'/'}>
            <div className='floating-element'>
              <img src={logo} className='img-fluid' width={150} alt="Cluster Fascination Logo" style={{filter: 'drop-shadow(0 2px 8px rgba(185, 234, 216, 0.3))'}} />
            </div>
         </Link>
          <div>
            <p className='d-none d-md-block elegant-script mb-0' style={{fontSize: '20px', fontWeight: '600', color: 'var(--text-dark)'}}>
              Curating fashion jewellery & accessories experiences     {/* changed from boutique wellness experiences to fashion jewellery & accessories experiences */}  
            </p>
          </div>
          <div>
            <div className='d-flex align-items-center gap-2'>
              <Link to={userDetails ?  '/cart' : '/login'}>
                <button className='btn position-relative' style={{
                  background: 'white',
                  border: '2px solid var(--primary-mint)',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 3px 10px rgba(185, 234, 216, 0.3)',
                  transition: 'all 0.3s ease'
                }} onMouseOver={(e) => e.currentTarget.style.background = 'var(--primary-mint)'} onMouseOut={(e) => e.currentTarget.style.background = 'white'}>
                  <i className="fa-solid fa-cart-shopping" style={{color: 'var(--text-dark)', fontSize: '18px'}}></i>
                  {cartData > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" style={{background: 'var(--accent-pink)', color: 'var(--text-dark)'}}>
                      {cartData}
                      <span className="visually-hidden">items in cart</span>
                    </span>
                  )}
                </button>
              </Link>

             <Link to={userDetails ?  '/wishlist' : '/login'}>
                <button className='btn position-relative' style={{
                  background: 'white',
                  border: '2px solid var(--accent-pink)',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 3px 10px rgba(245, 213, 216, 0.3)',
                  transition: 'all 0.3s ease'
                }} onMouseOver={(e) => e.currentTarget.style.background = 'var(--accent-pink)'} onMouseOut={(e) => e.currentTarget.style.background = 'white'}>
                  <i className="fa-solid fa-heart" style={{color: 'var(--text-dark)', fontSize: '18px'}}></i>
                  {wishListData > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" style={{background: 'var(--primary-mint)', color: 'var(--text-dark)'}}>
                      {wishListData}
                      <span className="visually-hidden">items in wishlist</span>
                    </span>
                  )}
                </button>
             </Link>
{  userDetails ?  (              <button className='btn btn-cluster' onClick={logoutUser} >Logout</button> 
):(             <Link to={'/login'}> <button className='btn btn-cluster'>Login</button></Link>
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
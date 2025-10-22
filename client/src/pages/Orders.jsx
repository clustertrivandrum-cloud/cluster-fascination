import React, { useState, useEffect } from 'react'
import axiosInstance from '../axios'
import TopNav from '../components/TopNav'
import MiddleNav from '../components/MiddleNav'
import MainNav from '../components/MainNav'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'

function Orders() {
  const [ordersData, setOrdersData] = useState([])
  const navigate = useNavigate();

  const fetchOrderData = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/orders/getuserorders`)
      setOrdersData(response.data.data)
    } catch (error) {
      console.error('Error fetching order data:', error)
    }
  }

  useEffect(() => {
    fetchOrderData()
  }, [])

  const renderOrderItems = () => {
    if (ordersData.length === 0) {
      return (
        <div className="container text-center my-5 p-5">
          <div className="card-cluster p-5">
            <i className="fas fa-shopping-bag mb-3" style={{fontSize: '4rem', color: 'var(--primary-mint)', opacity: '0.5'}}></i>
            <h3 className="mb-3" style={{
              fontFamily: 'var(--font-elegant-script)',
              fontSize: '2rem',
              color: 'var(--text-dark)'
            }}>No orders yet!</h3>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.1rem',
              color: 'var(--text-muted)',
              marginBottom: '25px'
            }}>
              Looks like you haven't placed any orders. Start shopping now!
            </p>
            <button 
              className="btn btn-cluster"
              onClick={() => navigate('/allproducts')}
            >
              <i className="fas fa-leaf me-2"></i>Browse Products
            </button>
          </div>
        </div>
      )
    }

    return (
      <>
        <div className="mt-5">
          {ordersData.map((item) => (
            <Link key={item._id} to={`/ordertrack/${item._id}`} style={{textDecoration: 'none'}}>
              <div className='container p-2 d-none d-md-block'>
                <div className='card-cluster p-4 mb-3' style={{
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(185, 234, 216, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 5px 20px rgba(185, 234, 216, 0.15)';
                }}
                >
                  <div className='d-flex justify-content-around align-items-center'>
                    <div className='d-flex align-items-center '>
                      <img 
                        src="https://t4.ftcdn.net/jpg/06/44/13/05/240_F_644130539_sjQPCYRXepzDmDvdFZ8juoeBTWiUxRfj.jpg" 
                        width={200} 
                        alt="" 
                        style={{borderRadius: '15px'}}
                      />
                      <div className="ms-4">
                        {item.products.item.map((prod, index) => (
                          <h6 key={prod.product_id._id} className='mb-2' style={{
                            fontFamily: 'var(--font-serif)',
                            fontWeight: '600',
                            color: 'var(--text-dark)'
                          }}>
                            {index + 1}. {prod.product_id.name}
                          </h6>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h6 className='mb-1' style={{
                        fontFamily: 'var(--font-sans)',
                        color: 'var(--text-muted)',
                        fontSize: '0.9rem'
                      }}>Total Amount</h6>
                      <h5 style={{
                        fontFamily: 'var(--font-sans)',
                        fontWeight: '700',
                        color: 'var(--success-green)'
                      }}>₹{item.amount}</h5>
                    </div>
                    <div className="text-center">
                      <h6 className='mb-2' style={{
                        fontFamily: 'var(--font-elegant-script)',
                        fontSize: '1.3rem',
                        color: 'var(--dark-mint)'
                      }}>Order Status</h6>
                      <span className="badge-cluster" style={{
                        background: item.status === 'Delivered' ? 'var(--success-green)' : 'var(--primary-mint)',
                        fontSize: '0.9rem'
                      }}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {ordersData.map((item) => (
          <Link key={item._id} to={`/ordertrack/${item._id}`} style={{textDecoration: 'none'}}>
            <div className='container d-md-none mt-2'>
              <div className='card-cluster p-3 mb-3'>
                <div className='d-flex align-items-center'>
                  <img 
                    src="https://t4.ftcdn.net/jpg/06/44/13/05/240_F_644130539_sjQPCYRXepzDmDvdFZ8juoeBTWiUxRfj.jpg" 
                    width={100} 
                    alt="" 
                    style={{borderRadius: '12px'}}
                  />
                  <div className="ms-3 flex-grow-1">
                    {item.products.item.map((prod, index) => (
                      <h6 key={prod.product_id._id} className='mb-1' style={{
                        fontFamily: 'var(--font-serif)',
                        fontWeight: '600',
                        color: 'var(--text-dark)',
                        fontSize: '0.95rem'
                      }}>
                        {index + 1}. {prod.product_id.name}
                      </h6>
                    ))}
                    <div className="mt-2">
                      <span className="badge-cluster me-2" style={{
                        background: item.status === 'Delivered' ? 'var(--success-green)' : 'var(--primary-mint)',
                        fontSize: '0.75rem'
                      }}>
                        {item.status}
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontWeight: '700',
                        color: 'var(--success-green)',
                        fontSize: '1rem'
                      }}>₹{item.amount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </>
    )
  }

  return (
    <div>
      <TopNav />
      <MiddleNav />
      <MainNav />
      <div className="container" style={{position: 'relative', minHeight: '60vh'}}>
        {/* Decorative watercolor spots */}
        <div className="watercolor-spot spot-mint" style={{width: '220px', height: '220px', top: '50px', right: '5%', opacity: '0.1'}}></div>
        <div className="watercolor-spot spot-beige" style={{width: '200px', height: '200px', bottom: '100px', left: '3%', opacity: '0.08'}}></div>
        
        {ordersData.length > 0 && (
          <>
            <div className="text-center pt-5 mb-4">
              <h1 className="elegant-script" style={{fontSize: '3rem', color: 'var(--text-dark)'}}>
                My Orders
              </h1>
              <p style={{fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--text-muted)', fontStyle: 'italic'}}>
                <span className='flower-accent'>✿</span> Track Your Wellness Journey <span className='flower-accent'>✿</span>
              </p>
              <div className="section-divider"></div>
            </div>
          </>
        )}
        {renderOrderItems()}
      </div>
      <Footer />
    </div>
  )
}

export default Orders

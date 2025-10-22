import React, { useState,useEffect } from 'react'
import axiosInstance from '../axios'
import { Col, Row } from 'react-bootstrap'
import Footer from '../components/Footer'
import MainNav from '../components/MainNav'
import MiddleNav from '../components/MiddleNav'
import TopNav from '../components/TopNav'
import ManageAddress from './ManageAddress'
import './Page.css'
import ProfileInfo from './ProfileInfo'
import { useNavigate } from 'react-router-dom'

function Profile() {

    const navigate = useNavigate()
    const[profile , setProfile]= useState(true)
    const[address , setAddress] = useState(false)
 

    const profileinfo=()=>{
       setProfile(true)
       setAddress(false)
    }
    const addressSet=()=>{
        setAddress(true)
        setProfile(false)
    }
    const orderSet=()=>{
        navigate('/order')
    }
  return (
    <div>
      <TopNav/>
      <MiddleNav/>
      <MainNav/> 
        <div className='container p-3 py-5' style={{position: 'relative'}}>
          {/* Decorative watercolor spots */}
          <div className="watercolor-spot spot-mint" style={{width: '200px', height: '200px', top: '50px', right: '5%', opacity: '0.1'}}></div>
          <div className="watercolor-spot spot-beige" style={{width: '180px', height: '180px', bottom: '100px', left: '3%', opacity: '0.08'}}></div>
          
          <div className="text-center mb-5">
            <h1 className="elegant-script" style={{fontSize: '3rem', color: 'var(--text-dark)'}}>
              My Profile
            </h1>
            <p style={{fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--text-muted)', fontStyle: 'italic'}}>
              <span className='flower-accent'>✿</span> Manage Your Account <span className='flower-accent'>✿</span>
            </p>
            <div className="section-divider"></div>
          </div>
          
            <Row>
                <Col md={4} className="mb-4 mb-md-0">
                 <div className='card-cluster p-4'>
                    <div className='d-flex flex-column align-items-center text-center mb-4'>
                        <img 
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUy9s7L2aRDadM1KxmVNkNQ9Edar2APzIeHw&s" 
                          width={100} 
                          className='rounded-circle mb-3' 
                          alt="" 
                          style={{
                            border: '3px solid var(--primary-mint)',
                            boxShadow: '0 4px 15px rgba(185, 234, 216, 0.3)'
                          }}
                        />
                        <h2 className='elegant-script' style={{
                          fontSize: '1.8rem',
                          color: 'var(--dark-mint)'
                        }}>Hello, Wellness Seeker</h2>
                    </div>
                    <div className='d-flex flex-column gap-2'>
                        <button 
                          className={`btn ${profile ? 'btn-cluster' : 'btn-outline-cluster'} text-start`}
                          onClick={profileinfo}
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontWeight: '500',
                            padding: '12px 20px'
                          }}
                        >
                          <i className="fas fa-user me-2"></i>Profile Information
                        </button>
                        <button 
                          className={`btn ${address ? 'btn-cluster' : 'btn-outline-cluster'} text-start`}
                          onClick={addressSet}
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontWeight: '500',
                            padding: '12px 20px'
                          }}
                        >
                          <i className="fas fa-map-marker-alt me-2"></i>Manage Address
                        </button>
                        <button 
                          className='btn btn-outline-cluster text-start'
                          onClick={orderSet}
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontWeight: '500',
                            padding: '12px 20px'
                          }}
                        >
                          <i className="fas fa-shopping-bag me-2"></i>My Orders
                        </button>
                    </div>
                 </div>
                </Col>
                <Col md={8}>
                   {profile&&
                    <ProfileInfo/>
                     }
                   {address&&
                    <ManageAddress/>
                    }
                </Col>
            </Row>
        </div>
        <Footer/>
    </div>
  )
}

export default Profile

import React from 'react'
import pgnot from '../assets/images/404.gif'
import TopNav from '../components/TopNav'
import MiddleNav from '../components/MiddleNav'
import MainNav from '../components/MainNav'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
   <>
      <TopNav/>
      <MiddleNav/>
      <MainNav/> 
      <div className='container py-5' style={{position: 'relative'}}>
        {/* Decorative watercolor spots */}
        <div className="watercolor-spot spot-mint" style={{width: '200px', height: '200px', top: '50px', right: '5%', opacity: '0.1'}}></div>
        <div className="watercolor-spot spot-pink" style={{width: '180px', height: '180px', bottom: '100px', left: '3%', opacity: '0.08'}}></div>
        
        <div className='d-flex flex-column align-items-center justify-content-center text-center'>
          <img src={pgnot} alt="404 Not Found" className="mb-4" style={{maxWidth: '500px', width: '100%'}} />
          <h1 className="elegant-script mb-3" style={{fontSize: '3rem', color: 'var(--dark-mint)'}}>
            Oops! Page Not Found
          </h1>
          <p className="mb-4" style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.1rem',
            color: 'var(--text-muted)',
            maxWidth: '600px'
          }}>
            The page you're looking for seems to have wandered off. Let's get you back to our wellness collection.
          </p>
          <Link to="/">
            <button className="btn btn-cluster">
              <i className="fas fa-home me-2"></i>Return Home
            </button>
          </Link>
        </div>
      </div>
      <Footer/>
   </>
  )
}

export default PageNotFound

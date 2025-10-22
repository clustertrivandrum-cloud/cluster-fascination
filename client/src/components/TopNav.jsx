import React from 'react'
import '../App.css'

function TopNav() {
  return (
    <div className='top-nav-cluster'>
        <div className="container d-flex justify-content-between align-items-center">
            <div>
             <p className='elegant-script mb-0' style={{fontSize: '15px', fontWeight: '600'}}>
               <span className='flower-accent'>✿</span>
               Delivering Across India
               <span className='flower-accent'>✿</span>
             </p>
            </div>
            <div className='social-media'>
               <a href="" aria-label="Instagram">
                 <i className="fa-brands fa-instagram"></i>
               </a>
               <a href="" aria-label="Facebook">
                 <i className="fa-brands fa-facebook"></i>
               </a>
            </div>
        </div>
    </div>
  )
}

export default TopNav
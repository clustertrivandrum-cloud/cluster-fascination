import React from 'react';
import TopNav from '../components/TopNav';
import MiddleNav from '../components/MiddleNav';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';

const About = () => {
  return (
   <>
      <TopNav/>
      <MiddleNav/>
      <MainNav/> 
      <div className="container py-5" style={{position: 'relative'}}>
        {/* Decorative watercolor spots */}
        <div className="watercolor-spot spot-mint" style={{width: '250px', height: '250px', top: '100px', right: '5%', opacity: '0.15'}}></div>
        <div className="watercolor-spot spot-beige" style={{width: '200px', height: '200px', bottom: '50px', left: '3%', opacity: '0.12'}}></div>
        
        <div className="text-center mb-5">
          <h1 className="elegant-script" style={{fontSize: '3rem', color: 'var(--text-dark)'}}>
            About Us
          </h1>
          <p style={{fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--text-muted)', fontStyle: 'italic'}}>
            <span className='flower-accent'>✿</span> Our Story <span className='flower-accent'>✿</span>
          </p>
          <div className="section-divider"></div>
        </div>
        
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <img 
              src="https://images.unsplash.com/photo-1483996887144-ede479a83102?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mjh8MjEwMDExNXx8ZW58MHx8fHx8" 
              className="img-fluid" 
              alt="About" 
              style={{
                borderRadius: '25px',
                boxShadow: '0 10px 30px rgba(185, 234, 216, 0.2)'
              }}
            />
          </div>
          <div className="col-md-6">
            <div className="card-cluster p-4">
              <h2 className="mb-4" style={{
                fontFamily: 'var(--font-elegant-script)',
                fontSize: '2rem',
                color: 'var(--dark-mint)'
              }}>
                Welcome to Cluster Fascination
              </h2>
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.05rem',
                lineHeight: '1.8',
                color: 'var(--text-dark)'
              }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus, diam eu laoreet consectetur, quam nisl convallis libero, sit amet pharetra mauris ex a ex. Vestibulum nec metus mi.
              </p>
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.05rem',
                lineHeight: '1.8',
                color: 'var(--text-dark)'
              }}>
                Proin non tincidunt justo, vel venenatis ex. Nullam non lectus a nisi sollicitudin dictum.
              </p>
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.05rem',
                lineHeight: '1.8',
                color: 'var(--text-dark)'
              }}>
                Nunc et ante vel tortor malesuada fermentum id et lectus. Aenean commodo magna nec blandit sagittis.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
   </>
  );
};

export default About;

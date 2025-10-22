import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './Component.css'

function MainNav() {
  const userDetails = useSelector(state => state.userDetails);

  return (
    <div>
      <Navbar expand="lg" className="nav-bar" style={{ padding: '15px 0' }}>
        <Container>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{
              border: '2px solid var(--text-dark)',
              borderRadius: '10px'
            }}
          />
          <Navbar.Collapse id="basic-navbar-nav" className='justify-content-center'>
            <Nav style={{ gap: '25px', alignItems: 'center' }}>
              <Link
                to={"/"}
                style={{
                  color: 'var(--text-dark)',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: '600',
                  fontSize: '15px',
                  position: 'relative',
                  padding: '5px 0'
                }}
                className='nav-link-cluster'>
                Home
              </Link>
              <Link
                to={"/allproducts"}
                style={{
                  color: 'var(--text-dark)',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: '600',
                  fontSize: '15px'
                }}
                className='nav-link-cluster'>
                Products
              </Link>
              <Link
                to={userDetails ? '/profile' : '/login'}
                style={{
                  color: 'var(--text-dark)',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: '600',
                  fontSize: '15px'
                }}
                className='nav-link-cluster'>
                Profile
              </Link>
              <Link
                to={"/contactus"}
                style={{
                  color: 'var(--text-dark)',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: '600',
                  fontSize: '15px'
                }}
                className='nav-link-cluster'>
                Contact
              </Link>
              <Link
                to={"/blogs"}
                style={{
                  color: 'var(--text-dark)',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: '600',
                  fontSize: '15px'
                }}
                className='nav-link-cluster'>
                Style Guide
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default MainNav
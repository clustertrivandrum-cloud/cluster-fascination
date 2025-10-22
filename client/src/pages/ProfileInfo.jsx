import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function ProfileInfo() {
  const [name, setName] = useState('User');
  const [email, setEmail] = useState('User.email@example.com');
  const [phone, setPhone] = useState('123-456-7890');
  const [nameEditable, setNameEditable] = useState(false);
  const [emailEditable, setEmailEditable] = useState(false);
  const [phoneEditable, setPhoneEditable] = useState(false);
  const userDetails = useSelector(state => state.userDetails);

  //console.log('usrr',userDetails)

  const handleEditName = () => {
    setNameEditable(true);
  };

  const handleEditEmail = () => {
    setEmailEditable(true);
  };

  const handleEditPhone = () => {
    setPhoneEditable(true);
  };

  return (
    <div className='card-cluster p-4'>
      <h3 className="mb-4" style={{
        fontFamily: 'var(--font-elegant-script)',
        fontSize: '2rem',
        color: 'var(--dark-mint)'
      }}>
        Personal Information
      </h3>
      
      <div className="mb-4">
        <div className='d-flex justify-content-between align-items-center mb-2'>
          <label className='fw-bold' style={{
            fontFamily: 'var(--font-sans)',
            color: 'var(--text-dark)',
            fontSize: '0.95rem'
          }}>Name</label>  
          {/* <button onClick={handleEditName} className='btn btn-sm btn-outline-cluster'>
            {nameEditable ? 'Save' : 'Edit'}
          </button> */}
        </div>
        <input 
          type="text" 
          value={userDetails==null ? '' : userDetails.username} 
          disabled={!nameEditable}
          onChange={(e) => setName(e.target.value)} 
          className='form-control'
          style={{
            border: '2px solid var(--soft-mint)',
            borderRadius: '15px',
            padding: '12px 20px',
            fontFamily: 'var(--font-sans)',
            backgroundColor: nameEditable ? 'white' : 'var(--light-mint)'
          }}
        />
      </div>
      
      <div className="mb-4">
        <div className='d-flex justify-content-between align-items-center mb-2'>
          <label className='fw-bold' style={{
            fontFamily: 'var(--font-sans)',
            color: 'var(--text-dark)',
            fontSize: '0.95rem'
          }}>Email</label>
          {/* <button onClick={handleEditEmail} className='btn btn-sm btn-outline-cluster'>
            {emailEditable ? 'Save' : 'Edit'}
          </button> */}
        </div>
        <input 
          type="text" 
          value={ userDetails==null ? '' : userDetails.email} 
          disabled={!emailEditable}
          onChange={(e) => setEmail(e.target.value)} 
          className='form-control'
          style={{
            border: '2px solid var(--soft-mint)',
            borderRadius: '15px',
            padding: '12px 20px',
            fontFamily: 'var(--font-sans)',
            backgroundColor: emailEditable ? 'white' : 'var(--light-mint)'
          }}
        />
      </div>
      
      <div className="mb-4">
        <div className='d-flex justify-content-between align-items-center mb-2'>
          <label className='fw-bold' style={{
            fontFamily: 'var(--font-sans)',
            color: 'var(--text-dark)',
            fontSize: '0.95rem'
          }}>Phone</label>
          {/* <button onClick={handleEditPhone} className='btn btn-sm btn-outline-cluster'>
            {phoneEditable ? 'Save' : 'Edit'}
          </button> */}
        </div>
        <input 
          type="text" 
          value={userDetails==null ? '' : userDetails.phone} 
          disabled={!phoneEditable}
          onChange={(e) => setPhone(e.target.value)} 
          className='form-control'
          style={{
            border: '2px solid var(--soft-mint)',
            borderRadius: '15px',
            padding: '12px 20px',
            fontFamily: 'var(--font-sans)',
            backgroundColor: phoneEditable ? 'white' : 'var(--light-mint)'
          }}
        />
      </div>
    </div>
  );
}

export default ProfileInfo;

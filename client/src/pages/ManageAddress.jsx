import React, { useState,useEffect } from 'react'
import axiosInstance from '../axios'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function ManageAddress() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    zip: '',
    mobile: '',
    country: '',
    // primary: true,
  });
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [addressDatas,setAddressDatas] = useState([])
  const [editData, setEditData] = useState({});

  const fetchAddress = async(urlQ) =>{

try {
  
const response = await axiosInstance.get(urlQ)
setAddressDatas(response.data.data)
//console.log(response.data.data)
} catch (error) {
  console.log(error)
}

  }


  useEffect(()=>{

      fetchAddress('/api/v1/address')

  },[])

  const handleClose = async() => {
    setShow(false);
  }
  const handleShow = async() => {
    setShow(true);
  }
  //for edit
  const handleCloseEdit = async() => {
    setShowEdit(false);
  }
  const handleShowEdit = async(addr) => {
    setShowEdit(true);
    setEditData(addr)
//console.log(addr)
  }

  const handleSubmitEdit = async (e) => {

    e.preventDefault()
    try {
      // Prepare the updated address data object from the form fields
      const updatedAddressData = {
        firstname: editData.firstname,
        lastname: editData.lastname,
        address_line_1: editData.address_line_1,
        address_line_2: editData.address_line_2,
        mobile: editData.mobile,
        country: editData.country,
        city: editData.city,
        state: editData.state,
        zip: editData.zip,
        _id:editData._id
      };
  
      // Make a POST request to send the updated address data to the backend
      const response = await axiosInstance.patch('/api/v1/address', updatedAddressData);
      
      console.log('Address updated successfully:', updatedAddressData);
  
      // Close the modal after successful submission
      setAddressDatas([])

      await fetchAddress('/api/v1/address')
      handleCloseEdit();
  
      // Optionally, you can perform additional actions after a successful submission
    } catch (error) {
      // Handle errors if the POST request fails
      console.error('Error updating address:', error);
    }
  };
  

 //for edit
 const handleChangeEdit = (e) => {
  const { name, value } = e.target;



  setEditData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      const response = await axiosInstance.post('/api/v1/address', formData);
      console.log('Address submitted: ', response.data);
      setFormData('')
      handleClose();
      setAddressDatas([])

await fetchAddress('/api/v1/address')


    } catch (error) {
      console.error('Error submitting address: ', error);
    }
  };

  const setPrimary = async(addId)=>{
console.log(addId)
try {
  const response = await axiosInstance.patch('/api/v1/address/setprimary', {addressId:addId});
// Update the local state to reflect the changes
setAddressDatas((prevAddresses) =>
  prevAddresses.map((addr) =>
    addr._id === addId ? { ...addr, primary: true } : { ...addr, primary: false }
  )
);

} catch (error) {
  console.log(error)
}

  }

  return (
    <div className='card-cluster p-4'>
        <div>
            <h3 className="mb-4" style={{
              fontFamily: 'var(--font-elegant-script)',
              fontSize: '2rem',
              color: 'var(--dark-mint)'
            }}>Manage Addresses</h3>
            <button className='btn btn-cluster w-100 mb-4' onClick={handleShow}>
              <i className="fas fa-plus me-2"></i>Add a new address
            </button>


          

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton style={{borderBottom: '2px solid var(--light-mint)'}}>
            <Modal.Title style={{fontFamily: 'var(--font-elegant-script)', fontSize: '1.8rem', color: 'var(--dark-mint)'}}>New Address</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridFirstName">
                  <Form.Label style={{fontFamily: 'var(--font-sans)', fontWeight: '600'}}>First Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="John" 
                    name="firstname" 
                    value={formData.firstname} 
                    onChange={handleChange}
                    style={{
                      border: '2px solid var(--soft-mint)',
                      borderRadius: '12px',
                      padding: '10px 15px'
                    }}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLastName">
                  <Form.Label style={{fontFamily: 'var(--font-sans)', fontWeight: '600'}}>Last Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Doe" 
                    name="lastname" 
                    value={formData.lastname} 
                    onChange={handleChange}
                    style={{
                      border: '2px solid var(--soft-mint)',
                      borderRadius: '12px',
                      padding: '10px 15px'
                    }}
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label style={{fontFamily: 'var(--font-sans)', fontWeight: '600'}}>Address Line 1</Form.Label>
                <Form.Control 
                  placeholder="1234 Main St" 
                  name="address_line_1" 
                  value={formData.address_line_1} 
                  onChange={handleChange}
                  style={{
                    border: '2px solid var(--soft-mint)',
                    borderRadius: '12px',
                    padding: '10px 15px'
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label style={{fontFamily: 'var(--font-sans)', fontWeight: '600'}}>Address Line 2</Form.Label>
                <Form.Control 
                  placeholder="Apartment, suite, etc." 
                  name="address_line_2" 
                  value={formData.address_line_2} 
                  onChange={handleChange}
                  style={{
                    border: '2px solid var(--soft-mint)',
                    borderRadius: '12px',
                    padding: '10px 15px'
                  }}
                />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPhone">
                  <Form.Label style={{fontFamily: 'var(--font-sans)', fontWeight: '600'}}>Phone</Form.Label>
                  <Form.Control 
                    type="number" 
                    name="mobile" 
                    value={formData.mobile} 
                    onChange={handleChange}
                    style={{
                      border: '2px solid var(--soft-mint)',
                      borderRadius: '12px',
                      padding: '10px 15px'
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridCountry">
                  <Form.Label style={{fontFamily: 'var(--font-sans)', fontWeight: '600'}}>Country</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="country" 
                    value={formData.country} 
                    onChange={handleChange}
                    style={{
                      border: '2px solid var(--soft-mint)',
                      borderRadius: '12px',
                      padding: '10px 15px'
                    }}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label style={{fontFamily: 'var(--font-sans)', fontWeight: '600'}}>City</Form.Label>
                  <Form.Control 
                    name="city" 
                    value={formData.city} 
                    onChange={handleChange}
                    style={{
                      border: '2px solid var(--soft-mint)',
                      borderRadius: '12px',
                      padding: '10px 15px'
                    }}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label style={{fontFamily: 'var(--font-sans)', fontWeight: '600'}}>State</Form.Label>
                  <Form.Control 
                    name="state" 
                    value={formData.state} 
                    onChange={handleChange}
                    style={{
                      border: '2px solid var(--soft-mint)',
                      borderRadius: '12px',
                      padding: '10px 15px'
                    }}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label style={{fontFamily: 'var(--font-sans)', fontWeight: '600'}}>Zip</Form.Label>
                  <Form.Control 
                    name="zip" 
                    value={formData.zip} 
                    onChange={handleChange}
                    style={{
                      border: '2px solid var(--soft-mint)',
                      borderRadius: '12px',
                      padding: '10px 15px'
                    }}
                  />
                </Form.Group>
              </Row>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <Button className="btn btn-outline-cluster" onClick={handleClose}>
                  Close
                </Button>
                <Button className="btn btn-cluster" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>



            <div>

            
        {  
        
        addressDatas.map((addr)=>(

<div className='card-cluster p-3 mb-3' key={addr._id}>
          <div className='d-flex justify-content-between align-items-center mb-3'>
            <span className='badge-cluster' style={{background: 'var(--accent-beige)', fontSize: '0.85rem'}}>
              <i className="fas fa-home me-1"></i>Home
            </span>
            


  <div className="d-flex gap-2">

  <Button className="btn btn-sm btn-cluster" type="submit" onClick={()=>handleShowEdit(addr)}>
        <i className="fas fa-edit me-1"></i>Edit
      </Button>


  {! addr.primary && (<Button className="btn btn-sm btn-outline-cluster" type="submit" onClick={(e)=> setPrimary(addr._id)}>
        <i className="fas fa-star me-1"></i>Set Default
      </Button>)}
  </div>


            


<Modal show={showEdit} onHide={handleCloseEdit} backdrop="static" keyboard={false}>
          <Modal.Header closeButton style={{borderBottom: '2px solid var(--light-mint)'}}>
            <Modal.Title style={{fontFamily: 'var(--font-elegant-script)', fontSize: '1.8rem', color: 'var(--dark-mint)'}}>Edit Address</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmitEdit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridFirstName">
                  <Form.Label style={{fontFamily: 'var(--font-sans)', fontWeight: '600'}}>First Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder={editData.firstname} 
                    name="firstname" 
                    value={editData.firstname} 
                    onChange={handleChangeEdit}
                    style={{
                      border: '2px solid var(--soft-mint)',
                      borderRadius: '12px',
                      padding: '10px 15px'
                    }}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLastName">
                  <Form.Label style={{fontFamily: 'var(--font-sans)', fontWeight: '600'}}>Last Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Doe" 
                    name="lastname" 
                    value={editData.lastname} 
                    onChange={handleChangeEdit}
                    style={{
                      border: '2px solid var(--soft-mint)',
                      borderRadius: '12px',
                      padding: '10px 15px'
                    }}
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label style={{fontFamily: 'var(--font-sans)', fontWeight: '600'}}>Address Line 1</Form.Label>
                <Form.Control 
                  placeholder="1234 Main St" 
                  name="address_line_1" 
                  value={editData.address_line_1} 
                  onChange={handleChangeEdit}
                  style={{
                    border: '2px solid var(--soft-mint)',
                    borderRadius: '12px',
                    padding: '10px 15px'
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label style={{fontFamily: 'var(--font-sans)', fontWeight: '600'}}>Address Line 2</Form.Label>
                <Form.Control 
                  placeholder="Apartment, suite, etc." 
                  name="address_line_2" 
                  value={editData.address_line_2} 
                  onChange={handleChangeEdit}
                  style={{
                    border: '2px solid var(--soft-mint)',
                    borderRadius: '12px',
                    padding: '10px 15px'
                  }}
                />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPhone">
                  <Form.Label style={{fontFamily: 'var(--font-sans)', fontWeight: '600'}}>Phone</Form.Label>
                  <Form.Control 
                    type="number" 
                    name="mobile" 
                    value={editData.mobile} 
                    onChange={handleChangeEdit}
                    style={{
                      border: '2px solid var(--soft-mint)',
                      borderRadius: '12px',
                      padding: '10px 15px'
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridCountry">
                  <Form.Label style={{fontFamily: 'var(--font-sans)', fontWeight: '600'}}>Country</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="country" 
                    value={editData.country} 
                    onChange={handleChangeEdit}
                    style={{
                      border: '2px solid var(--soft-mint)',
                      borderRadius: '12px',
                      padding: '10px 15px'
                    }}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label style={{fontFamily: 'var(--font-sans)', fontWeight: '600'}}>City</Form.Label>
                  <Form.Control 
                    name="city" 
                    value={editData.city} 
                    onChange={handleChangeEdit}
                    style={{
                      border: '2px solid var(--soft-mint)',
                      borderRadius: '12px',
                      padding: '10px 15px'
                    }}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label style={{fontFamily: 'var(--font-sans)', fontWeight: '600'}}>State</Form.Label>
                  <Form.Control 
                    name="state" 
                    value={editData.state} 
                    onChange={handleChangeEdit}
                    style={{
                      border: '2px solid var(--soft-mint)',
                      borderRadius: '12px',
                      padding: '10px 15px'
                    }}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label style={{fontFamily: 'var(--font-sans)', fontWeight: '600'}}>Zip</Form.Label>
                  <Form.Control 
                    name="zip" 
                    value={editData.zip} 
                    onChange={handleChangeEdit}
                    style={{
                      border: '2px solid var(--soft-mint)',
                      borderRadius: '12px',
                      padding: '10px 15px'
                    }}
                  />
                </Form.Group>
              </Row>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <Button className="btn btn-outline-cluster" onClick={handleCloseEdit}>
                  Close
                </Button>
                <Button className="btn btn-cluster" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
           
          
          </div>
          <div style={{fontFamily: 'var(--font-sans)'}}>
            <p className="mb-2">
              <span className='fw-bold' style={{color: 'var(--text-dark)'}}>{`${addr.firstname} ${addr.lastname}`}</span>
              <span className='ms-3' style={{color: 'var(--text-muted)'}}>
                <i className="fas fa-phone me-1" style={{color: 'var(--primary-mint)'}}></i>
                {addr.mobile}
              </span>
            </p>
            <p className='mb-1' style={{color: 'var(--text-dark)', lineHeight: '1.6'}}>
              {addr.address_line_1}<br/>
              {addr.address_line_2}<br/>
              {addr.city}, {addr.state} - {addr.zip}<br/>
              {addr.country}
            </p>
          </div>
            </div>


        )) }


            </div>
        </div>
    </div>
  )
}

export default ManageAddress

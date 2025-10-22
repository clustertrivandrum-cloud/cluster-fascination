import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios'

import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import TopNav from '../components/TopNav';
import MiddleNav from '../components/MiddleNav';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';

import './SingleOrder.css';
import { ServerURL } from '../services/baseUrl';

function SingleOrder() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('order_confirmed');
  const { orderId } = useParams();
  const [ordersData,setOrdersData] = useState({})
  const [address,setAddress] = useState({})
  const [productsData,setProductsData] = useState([])


 // console.log('ord id :',orderId)
  const fetchOrderData  = async()=>{

    try {
      const response = await axiosInstance.get(`/api/v1/orders/getorderbyid/${orderId}`)
      setOrdersData(response.data.data)
      setAddress(response.data.data.address)
      setProductsData(response.data.data.products.item)
      console.log('order by id :',response.data.data)
      //console.log('address :',response.data.data.address)
    } catch (error) {
      
    }
  }
  
  
  useEffect(()=>{
  fetchOrderData()
  },[])


  // Sample data from backend, you should replace this with your actual data fetching logic
  const dataFromBackend = {
    status: 'out_for_delivery', // Change this status to see the progress bar move
    orderDetails: {
      orderId: '12345678',
      orderDate: '2023-05-15',
      items: [
        {
          name: 'Radish White Microgreen seeds',
          quantity: 1,
          price: 999,
          imageUrl: 'https://t4.ftcdn.net/jpg/03/88/04/41/240_F_388044101_IidJjwi2bonGwWDGZZqgPz7oxaowhsjp.jpg',
          category: 'Seeds',
        },
      ],
      shippingAddress: {
        name: 'John Doe',
        address: '123 Main St, Anytown USA',
        city: 'New York',
        state: 'NY',
        zip: '10001',
      },
      total: 999,
    },
  };

  // Update progress and status based on data from backend

   //ordersData  ["Pending", "Placed", "Shipped", "Out_of_delivery", "Delivered", "Delayed", "Canceled"],
  useEffect(() => {
    const backendStatus = ordersData.status
    //.toLowerCase().replace(/ /g, '_');
    setStatus(backendStatus);

    switch (backendStatus) {
      case 'Placed':
        setProgress(0);
        break;
      case 'Shipped':
        setProgress(33);
        break;
      case 'Out_of_delivery':
        setProgress(66);
        break;
      case 'Delivered':
        setProgress(100);
        break;
      default:
        setProgress(0);
        break;
    }
  }, [dataFromBackend]);
  //["Pending", "Placed", "Shipped", "Out_of_delivery", "Delivered", "Delayed", "Canceled"]

  const renderProgressBar = () => {
    const steps = [
      { name: 'Order Confirmed', completed: progress >= 0 },
      { name: 'Shipped', completed: progress >= 33 },
      { name: 'Out for Delivery', completed: progress >= 66 },
      { name: 'Delivered', completed: progress >= 100 },
    ];

    
    return (
      <div className="progress-container mb-4">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`round-point ${step.completed ? 'completed' : ''}`}
            style={{ left: `${index * 33}%` }}
          >
            <p>{step.name}</p>
          </div>
        ))}
      </div>
    );
  };


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <TopNav />
      <MiddleNav />
      <MainNav />
      <Container className="mt-4 mb-4">
       
         
            {
             productsData.map((item,index)=>(
                <Card className="shadow mb-2" key={index} >
                <Card.Body>
              <Row className="align-items-center">
              <Col md={3} className="mb-3 mb-md-0">
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <img
                       src={`${ServerURL}/uploads/${item.product_id.image[0]}`}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div>
                    <h5>{item.product_id.name}</h5>
                    <p className="text-muted mb-0">{ordersData.payment_mode}</p>
                    <h5 className="mb-0">₹{item.price}</h5>
                  </div>
                </div>
              </Col>
              <Col md={6} className="mb-3 mb-md-0">
                <div className="text-center">
                  {renderProgressBar()}
                  <h6 className="text-muted mb-0">
                    <span className="fw-bold text-dark">{ordersData.status}</span>
                  </h6>
                </div>
              </Col>
              <Col md={3}>
                <div className="text-center">
                  <p className="fw-bold mb-2">Review this product</p>
                  <div>
                    <i className="fas fa-star text-success" />
                    <i className="fas fa-star text-success" />
                    <i className="fas fa-star text-success" />
                    <i className="fas fa-star text-success" />
                    <i className="fas fa-star text-muted" />
                  </div>
                </div>
              </Col>
            </Row>
            </Card.Body>
             </Card>
              ))
             
            }

          
       
        <Card className="shadow mt-4">
          <Card.Body>
            <h5>Order Details</h5>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <div className="d-flex justify-content-between">
                  <span>Order ID</span>
                  <span>{ordersData._id}</span>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-flex justify-content-between">
                  <span>Order Date</span>
                  <span>{formatDate(ordersData.createdAt)}</span>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-flex justify-content-between">
                  <span>Total</span>
                  <span>₹{ordersData.amount}</span>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
        <Card className="shadow mt-4">
          <Card.Body>
            <h5>Delivery Address</h5>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <div className="d-flex justify-content-between">
                  <span>Name</span>
                  <span>{address.firstname} {address.lastname}</span>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-flex justify-content-between">
                  <span>Address</span>
                  <span>{address.address_line_1} <br />{address.address_line_2} </span>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-flex justify-content-between">
                  <span>City, State, ZIP</span>
                  <span>
                    {address.city},{' '}
                    {address.state}{' '}
                    {address.zip}
                  </span>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </>
  );
}

export default SingleOrder;
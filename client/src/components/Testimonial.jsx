import React, { useEffect, useState } from 'react';
 import axiosInstance from '../axios'
 import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import { Col, Container, Row } from 'react-bootstrap';

function Testimonial() {
  const [testimonials,setTestimonials] = useState([])

const fetchData = async()=>{

try {
  const urlQuery = `/api/v1/testimonials`
  const response = await axiosInstance.get(urlQuery);
  setTestimonials(response.data.data)

} catch (error) {
  
}
}

useEffect(()=>{
  fetchData()
},[])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            }
          }
        ]
      };
    
      const items = [
        { id: 1, name: 'Product 1', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzCW8ayM9K_iNzX81NSjgpGcl30jDvsTSiIg&s' },
        { id: 2, name: 'Product 2', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzCW8ayM9K_iNzX81NSjgpGcl30jDvsTSiIg&s' ,  price:'150' , quantity:'500' },
        { id: 3, name: 'Product 3', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzCW8ayM9K_iNzX81NSjgpGcl30jDvsTSiIg&s' ,  price:'180' , quantity:'500' },
        // Add more product items as needed
      ];
  return (
    <div className='mt-5 bg-body-tertiary ' style={{overflowX:'hidden'}}>
      <div>
        <h2 className='text-center mb-5 p-3 fw-bold '>Customer Stories</h2>    {/* changed from Boutique Customer Stories to Customer Stories */}
        <Container>
          <Row>
            <Col>
              {/* <Slider {...settings}>
                {testimonials.map(item => (
                  <div key={item._id} className='text-center'>
                    <article className='p-3'>{item.comment}</article>
                    <img
            src={`http://localhost:5000/uploads/${item.image}`}
            alt={item.name}  className="img-fluid mx-auto rounded-circle " width={80} />
<p>{item.name}</p>

                  </div>
                ))}
              </Slider> */}
              <Slider {...settings}>
                {items.map(item => (
                  <div key={item.id} className='text-center'>
                    <article className='p-3'>"The boutique experience here is absolutely exceptional! Every product feels carefully curated and the quality is unmatched. It's like having a personal wellness concierge that understands my sophisticated taste."</article>
                    <img src={item.imageUrl} alt={item.name}  className="img-fluid mx-auto rounded-circle " width={80} />
                  </div>
                ))}
              </Slider>
              <div className='text-center mt-4 p-5 '>
                {/* <button className='btn btn-success rounded-5 px-4'>View All Testimonial</button> */}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default Testimonial
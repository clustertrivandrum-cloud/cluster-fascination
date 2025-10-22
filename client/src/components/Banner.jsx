import React,{useState,useEffect} from 'react';
import axiosInstance from '../axios'
import image from '../assets/images/banner.jpg';
import { Carousel } from 'react-bootstrap';
import { ServerURL } from '../services/baseUrl';

function Banner() {

const [banner,setBanner] = useState([])

let urlQuery = '';

  useEffect(()=>{

    urlQuery=`/api/v1/banners`

    const fetchData = async()=>{

      try {

        const response = await axiosInstance.get(urlQuery);
        setBanner(response.data.data)
       // console.log(response.data.data)
        
      } catch (error) {
        console.log(error)
      }

    }


    fetchData()


  },[])

    const dummyImages = [
        image,
        image,
        image,
        image,
        image
      ];
    
      const [index, setIndex] = useState(0);
    
      const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
      };

  return (
    <div style={{position: 'relative'}}>
         <Carousel activeIndex={index} onSelect={handleSelect} style={{
           borderRadius: '0 0 30px 30px',
           overflow: 'hidden',
           boxShadow: '0 10px 30px rgba(185, 234, 216, 0.2)'
         }}>
      {banner && banner.length > 0 ? banner.map((item, idx) => (
        <Carousel.Item key={idx}>
          <img className="d-block img-fluid" src={`${ServerURL}/uploads/${item.image}`} alt={`Slide ${idx}`} style={{width:'100%', maxHeight: '600px', objectFit: 'cover'}}/>
        </Carousel.Item>
      )) : (
        <Carousel.Item>
          <img className="d-block img-fluid" src={image} alt="Default slide" style={{width:'100%', maxHeight: '600px', objectFit: 'cover'}}/>
        </Carousel.Item>
      )}
    </Carousel>
    </div>
  )
}

export default Banner
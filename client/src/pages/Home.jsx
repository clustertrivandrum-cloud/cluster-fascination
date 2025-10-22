import React, { useState,useEffect } from 'react';
import axiosInstance from '../axios';

import '../App.css';
import Banner from '../components/Banner';
import Brands from '../components/Brands';
import Category from '../components/Category';
import Products from '../components/Products';
import Testimonial from '../components/Testimonial';
import TopNav from '../components/TopNav';
import MiddleNav from '../components/MiddleNav';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails, clearUserDetails } from '../redux/actions/userActions';

function Home() {
  const dispatch = useDispatch();
 const [notif,setNotif] = useState(true)



  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axiosInstance.get('/api/v1/auth/user');
  //      // console.log(response.data.data)
  //       dispatch(setUserDetails(response.data.data));
  //     } catch (error) {
  //       console.log('errr', error);
  //       dispatch(clearUserDetails());
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <div>
     <TopNav />
     <MiddleNav notification={notif} />
     <MainNav  /> 
     <Banner/>
     <Category/>
     <Products setNotification={setNotif} />
     <Brands/>
     <Testimonial/>
     <Footer/>
    </div>
  )
}

export default Home
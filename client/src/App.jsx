import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import About from './pages/About';
import Allproducts from './pages/Allproducts';
import Blogs from './pages/Blogs';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ContactUs from './pages/ContactUs';
import Home from './pages/Home';
import Login from './pages/Login';
import ManageAddress from './pages/ManageAddress';
import Orders from './pages/Orders';
import PageNotFound from './pages/PageNotFound';
import Product from './pages/Product';
import Profile from './pages/Profile';
import ProfileInfo from './pages/ProfileInfo';
import Register from './pages/Register';
import ScrollToTop from './components/ScrollToTop';
import SingleOrder from './pages/SingleOrder';
import Wishlist from './pages/Wishlist';
import store from './redux/store';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndCondition from './pages/TermsAndCondition';
import ShippingPolicy from './pages/ShippingPolicy';
import RefundPolicy from './pages/RefundPolicy';
import WhatsAppButton from './components/WhatsAppButton';
import Preloader from './components/Preloader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <Preloader fullPage={true} />}
      <Provider store={store}>
        <ScrollToTop setIsLoading={setIsLoading} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/allproducts' element={<Allproducts />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/product/:proId/:catId' element={<Product />} />
          <Route path='/contactus' element={<ContactUs />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/about' element={<About />} />
          <Route path='/Checkout' element={<Checkout />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profileinfo' element={<ProfileInfo />} />
          <Route path='/manageaddress' element={<ManageAddress />} />
          <Route path='/order' element={<Orders />} />
          <Route path='/ordertrack/:orderId' element={<SingleOrder />} />
          <Route path='/privacypolicy' element={<PrivacyPolicy />} />
          <Route path='/termsandcondition' element={<TermsAndCondition />} />
          <Route path='/shippingpolicy' element={<ShippingPolicy />} />
          <Route path='/refund-policy' element={<RefundPolicy />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Provider>
    </>
  )
}

export default App
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { useState, lazy, Suspense } from 'react';
import './App.css';
import ScrollToTop from './components/ScrollToTop';
import store from './redux/store';
import Preloader from './components/Preloader';

// Lazy Load Pages
const Home = lazy(() => import('./pages/Home'));
const Cart = lazy(() => import('./pages/Cart'));
const Allproducts = lazy(() => import('./pages/Allproducts'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Product = lazy(() => import('./pages/Product'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const Blogs = lazy(() => import('./pages/Blogs'));
const About = lazy(() => import('./pages/About'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Profile = lazy(() => import('./pages/Profile'));
const ProfileInfo = lazy(() => import('./pages/ProfileInfo'));
const ManageAddress = lazy(() => import('./pages/ManageAddress'));
const Orders = lazy(() => import('./pages/Orders'));
const SingleOrder = lazy(() => import('./pages/SingleOrder'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndCondition = lazy(() => import('./pages/TermsAndCondition'));
const ShippingPolicy = lazy(() => import('./pages/ShippingPolicy'));
const RefundPolicy = lazy(() => import('./pages/RefundPolicy'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading && <Preloader fullPage={true} />}
      <Provider store={store}>
        <ScrollToTop setIsLoading={setIsLoading} />
        <Suspense fallback={<Preloader fullPage={true} />}>
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
        </Suspense>
      </Provider>
    </>
  )
}

export default App
import React from 'react'
import TopNav from '../components/TopNav'
import MiddleNav from '../components/MiddleNav'
import MainNav from '../components/MainNav'
import Footer from '../components/Footer'

function RefundPolicy() {
  return (
    <div>
         <TopNav/>
      <MiddleNav/>
      <MainNav/> 
        <div className="container my-5">
      <div className="row">
        <div className="col">
          <h1 className="mb-4">Refund and Return Policy</h1>
          
          <div className="alert alert-warning" role="alert" style={{ 
            backgroundColor: '#fff3cd', 
            border: '2px solid #ffc107', 
            borderRadius: '10px',
            padding: '20px',
            marginBottom: '30px'
          }}>
            <h4 style={{ color: '#856404', marginBottom: '15px' }}>
              <i className="fas fa-exclamation-triangle me-2"></i>
              Important Policy Notice
            </h4>
            <p style={{ marginBottom: '10px', fontSize: '1.1rem', fontWeight: '600', color: '#856404' }}>
              <strong>NO COD | NO RETURNS | NO REFUNDS</strong>
            </p>
            <p style={{ marginBottom: 0, color: '#856404' }}>
              All sales are final. Please review your order carefully before completing your purchase.
            </p>
          </div>

          <b>Overview</b><br/><br/>

          At Cluster Fascination, we strive to provide the highest quality fashion jewellery & accessories products to our customers. We want to ensure you are completely satisfied with your purchase, which is why we encourage you to review product details, images, and descriptions carefully before placing your order.
          <br/><br/>

          <b>Payment Policy</b><br/><br/>

          <strong>Cash on Delivery (COD) is NOT available.</strong> All orders must be paid for online using our secure payment gateway (Razorpay) at the time of purchase. We accept Credit Cards, Debit Cards, UPI, Net Banking, and Digital Wallets.
          <br/><br/>

          <b>Return Policy</b><br/><br/>

          <strong>We do not accept returns or exchanges.</strong> All sales are final. Once an order is placed and confirmed, it cannot be returned or exchanged for any reason, including but not limited to:
          <ul style={{ marginTop: '10px', marginBottom: '10px' }}>
            <li>Change of mind</li>
            <li>Size or color preferences</li>
            <li>Product not meeting expectations</li>
            <li>Accidental orders</li>
          </ul>
          <br/>

          <b>Refund Policy</b><br/><br/>

          <strong>We do not offer refunds.</strong> All purchases are final and non-refundable. This policy applies to all products, regardless of the reason for the refund request.
          <br/><br/>

          <b>Defective or Damaged Products</b><br/><br/>

          In the rare event that you receive a product that is defective or damaged due to our error, please contact us immediately at <strong>info@clusterfascination.com</strong> within 24 hours of delivery with:
          <ul style={{ marginTop: '10px', marginBottom: '10px' }}>
            <li>Your order number</li>
            <li>Clear photographs of the defect or damage</li>
            <li>Description of the issue</li>
          </ul>
          We will review your case and, if approved, may offer a replacement for the same product (subject to availability). This is the only exception to our no-return, no-refund policy.
          <br/><br/>

          <b>Order Cancellation</b><br/><br/>

          Orders can only be cancelled before they are shipped. Once an order has been shipped, cancellation is not possible. To cancel an order, please contact us immediately at <strong>info@clusterfascination.com</strong> with your order number.
          <br/><br/>

          <b>Quality Assurance</b><br/><br/>

          We take great care in ensuring the quality of our products. All items are carefully inspected before shipping. We encourage customers to:
          <ul style={{ marginTop: '10px', marginBottom: '10px' }}>
            <li>Review product descriptions, images, and specifications carefully</li>
            <li>Check sizing information before ordering</li>
            <li>Contact us with any questions before placing an order</li>
          </ul>
          <br/>

          <b>Contact Us</b><br/><br/>

          If you have any questions about this policy or need assistance with your order, please contact us at <strong>info@clusterfascination.com</strong>. Our customer service team is here to help ensure you have the best shopping experience possible.
          <br/><br/>

          <p style={{ fontSize: '0.9rem', color: '#666', fontStyle: 'italic', marginTop: '20px' }}>
            <strong>Note:</strong> By placing an order on our website, you acknowledge that you have read, understood, and agree to this Refund and Return Policy.
          </p>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  )
}

export default RefundPolicy
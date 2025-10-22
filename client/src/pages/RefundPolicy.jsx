import React from 'react'
import TopNav from '../components/TopNav'
import MiddleNav from '../components/MiddleNav'
import MainNav from '../components/MainNav'
import Footer from '../components/Footer'

function TermsAndCondition() {
  return (
    <div>
         <TopNav/>
      <MiddleNav/>
      <MainNav/> 
        <div className="container my-5">
      <div className="row">
        <div className="col">
          <h1 className="mb-4">Refund and Return Policy
          </h1>
          <b>Overview
          </b><br/><br/>

          At Cluster Fascination, we strive to provide the highest quality fashion jewellery & accessories products to our customers. If you are not completely satisfied with your purchase, we are here to help.   {/* changed from boutique wellness products to fashion jewellery & accessories products */}
<br/><br/>
<b>Returns
</b><br/><br/>

Our policy lasts 2 days from the date of purchase. If 2 days have gone by since your purchase, unfortunately, we can’t offer you a refund or exchange.

<br/>
To be eligible for a return, your item must be unused, in the same condition that you received it, and in the original packaging.
<br/>
To initiate a return, please contact our customer service team at info@clusterfascination.com with your order number and details about the product you wish to return. We will respond promptly with instructions on how to proceed.
<br/><br/>
<b>Refunds
</b><br/><br/>

Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 7 days.<br/><br/>
<b>Late or Missing Refunds
</b><br/><br/>
Late or Missing Refunds
If you haven’t received a refund yet, first check your bank account again. Then contact your credit card company; it may take some time before your refund is officially posted. Next, contact your bank. There is often some processing time before a refund is posted. If you’ve done all of this and you still have not received your refund yet, please contact us at info@clusterfascination.com
<br/><br/>
<b>Exchanges
</b><br/><br/>

We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at info@clusterfascination.com
<br/><br/>
<b>Shipping
</b><br/><br/>
To return your product, you should mail your product .
<br />
You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
<br />Depending on where you live, the time it may take for your exchanged product to reach you may vary.
<br />If you are shipping an item over a certain value, you should consider using a trackable shipping service or purchasing shipping insurance. We don’t guarantee that we will receive your returned item.

<br/><br/>
<b>Contact Us
</b><br/><br/>
If you have any questions on how to return your item to us, contact us at info@clusterfascination.com </div>
      </div>
    </div>
    <Footer/>
    </div>
  )
}

export default TermsAndCondition
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import './WhatsAppButton.css';

// Create a context for product data
export const ProductContext = React.createContext(null);

const WhatsAppButton = ({ phoneNumber, message = '' }) => {
  const location = useLocation();
  const productData = useContext(ProductContext);
  
  // Check if we're on a product page
  const isProductPage = location.pathname.includes('/product/');
  
  // Format phone number (remove any non-digit characters)
  const formattedPhoneNumber = phoneNumber.replace(/\D/g, '');
  
  // Create the WhatsApp URL
  const createWhatsAppUrl = () => {
    let text = message;
    
    // Debugging: log the current state
    console.log('WhatsAppButton Debug:', {
      isProductPage,
      productData,
      hasProductData: productData && Object.keys(productData).length > 0,
      location: location.pathname
    });
    
    // If it's a product page and we have product data, pre-fill with product details
    if (isProductPage && productData && Object.keys(productData).length > 0) {
      text = `Hello, I'm interested in ${productData.name || 'this product'}`;
      
      // Add product details if available
      const details = [];
      // Replace product ID with product name
      if (productData.name) details.push(`Product: ${productData.name}`);
      if (productData.sale_rate) details.push(`Price: ₹${productData.sale_rate}`);
      if (productData.description) details.push(`Description: ${productData.description.substring(0, 100)}...`);
      
      if (details.length > 0) {
        text += "\n\nProduct Details:\n" + details.join("\n");
      }
      
      text += '\n\nCould you please provide more information about this product?';
    } else if (!text) {
      // Default message for general inquiries
      text = "Hello, I have a general inquiry about your products.";
    }
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(text);
    return `https://wa.me/${formattedPhoneNumber}?text=${encodedMessage}`;
  };

  const handleClick = () => {
    window.open(createWhatsAppUrl(), '_blank');
  };

  return (
    <button 
      className="whatsapp-button"
      onClick={handleClick}
      aria-label="Chat with us on WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24">
        <path fill="#fff" d="M14.69,32.44l-3.07,1.61l1.61-3.07L27.08,17.14c.6-.6.84-1.2.7-1.81c-.15-.61-.6-.91-1.35-.91h-3.07c-.75,0-1.5.25-2.25.75l-8.44,5.61c-.9.6-1.35,1.5-1.35,2.7v4.5c0,.75.25,1.5.75,2.25l3.07,4.5c.45.6.9,1.05,1.35,1.35l4.5,3.07c.6.45,1.35.67,2.25.67h4.5c1.2,0,2.1-.45,2.7-1.35l5.61-8.44c.5-.75.75-1.5.75-2.25v-3.07c0-.75-.3-1.2-.91-1.35c-.6-.14-1.2.1-1.81.7L14.69,32.44z"/>
        <path fill="#25D366" d="M24,4c11.04,0,20,8.96,20,20s-8.96,20-20,20S4,35.04,4,24S12.96,4,24,4z M24,2C11.88,2,2,11.88,2,24s9.88,22,22,22s22-9.88,22-22S36.12,2,24,2z"/>
      </svg>
    </button>
  );
};

export default WhatsAppButton;
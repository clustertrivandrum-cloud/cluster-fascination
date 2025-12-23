import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../axios';
import { getGuestCart, addToGuestCart, removeFromGuestCart, updateGuestCartQty } from '../utils/cartUtils';

const useCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [trigger, setTrigger] = useState(0); // Used to force refetch
    const userDetails = useSelector(state => state.userDetails);

    const fetchCart = useCallback(async () => {
        setIsLoading(true);
        if (userDetails) {
            try {
                const response = await axiosInstance.get('/api/v1/user/getcarts');
                setCartItems(response.data?.data?.item || []);
            } catch (error) {
                console.error('Error fetching server cart:', error);
                setCartItems([]);
            }
        } else {
            const guestCart = getGuestCart();
            setCartItems(guestCart.item || []);
        }
        setIsLoading(false);
    }, [userDetails]);

    // Initial fetch and fetch on dependencies change
    useEffect(() => {
        fetchCart();
    }, [fetchCart, trigger]);

    const addToCart = async (product) => {
        if (!userDetails) {
            addToGuestCart(product);
            setTrigger(prev => prev + 1);
            return true;
        } else {
            try {
                // Ensure we handle both product ID string or product object
                const productId = product._id || product;
                await axiosInstance.patch(`/api/v1/user/addToCart/${productId}`);
                setTrigger(prev => prev + 1);
                return true;
            } catch (error) {
                console.error('Error adding to cart:', error);
                return false;
            }
        }
    };

    const removeFromCart = async (productId) => {
        if (!userDetails) {
            removeFromGuestCart(productId);
            setTrigger(prev => prev + 1);
            return true;
        } else {
            try {
                // The server expects the Cart Item ID, not Product ID for removal based on previous code
                // We need to find the cart item first
                const cartItem = cartItems.find(item => item.productId._id === productId || item.productId === productId);

                if (cartItem) {
                    await axiosInstance.patch(`/api/v1/user/removeFromCart/${cartItem._id}`);
                    setTrigger(prev => prev + 1);
                    return true;
                }
                return false;
            } catch (error) {
                console.error('Error removing from cart:', error);
                return false;
            }
        }
    };

    const updateQuantity = async (productId, qty) => {
        if (!userDetails) {
            updateGuestCartQty(productId, qty);
            setTrigger(prev => prev + 1);
        } else {
            try {
                await axiosInstance.patch('/api/v1/user/updateQty', {
                    productId: productId,
                    qty: qty
                });
                setTrigger(prev => prev + 1);
            } catch (error) {
                console.error('Error updating quantity:', error);
            }
        }
    }

    const isInCart = (productId) => {
        return cartItems.some(item => {
            const itemProductId = item.productId._id || item.productId;
            return itemProductId === productId;
        });
    };

    const cartCount = cartItems.length;

    return {
        cartItems,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        isInCart,
        cartCount,
        refreshCart: () => setTrigger(prev => prev + 1)
    };
};

export default useCart;

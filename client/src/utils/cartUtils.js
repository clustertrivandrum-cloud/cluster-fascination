import axiosInstance from '../axios';

const GUEST_CART_KEY = 'guestCart';

export const getGuestCart = () => {
    const cart = localStorage.getItem(GUEST_CART_KEY);
    return cart ? JSON.parse(cart) : { item: [] };
};

export const setGuestCart = (cart) => {
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));
};

export const addToGuestCart = (product) => {
    const cart = getGuestCart();
    const existingIndex = cart.item.findIndex(item => item.productId._id === product._id);

    if (existingIndex >= 0) {
        cart.item[existingIndex].qty += 1;
    } else {
        cart.item.push({
            _id: Date.now().toString(), // Dummy ID for guest items
            productId: product,
            qty: 1,
            price: product.price
        });
    }
    setGuestCart(cart);
    return cart;
};

export const removeFromGuestCart = (productId) => {
    const cart = getGuestCart();
    cart.item = cart.item.filter(item => item.productId._id !== productId);
    setGuestCart(cart);
    return cart;
};

export const updateGuestCartQty = (productId, qty) => {
    const cart = getGuestCart();
    const index = cart.item.findIndex(item => item.productId._id === productId);
    if (index >= 0) {
        cart.item[index].qty = qty;
        setGuestCart(cart);
    }
    return cart;
};

export const clearGuestCart = () => {
    localStorage.removeItem(GUEST_CART_KEY);
};

export const mergeCartWithServer = async () => {
    const guestCart = getGuestCart();
    if (guestCart.item.length === 0) return;

    try {
        for (const item of guestCart.item) {
            // Add each item to the server cart
            // We might need to handle quantity if the server only adds 1 at a time
            for (let i = 0; i < item.qty; i++) {
                await axiosInstance.patch(`/api/v1/user/addToCart/${item.productId._id}`);
            }
        }
        clearGuestCart();
    } catch (error) {
        console.error('Error merging cart:', error);
    }
};

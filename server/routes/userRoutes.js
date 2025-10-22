const { Router } = require('express');
const router = Router();
const authorization = require("../middlewares/authorization");
const { getUser, addToCart, removeFromCart, addToWishlist, removeFromWishlist, updateQty, getUsers,getWishLists,getCartDetailsByUserId } = require('../controllers/userController');

//router.use(authorization)
router.get('/', getUser);
router.get('/getAllUsers', getUsers);
router.patch('/updateQty',authorization, updateQty);
router.patch('/addToCart/:id',authorization, addToCart);
router.patch('/removeFromCart/:id',authorization, removeFromCart);
router.patch('/addToWishlist/:id',authorization, addToWishlist);   
router.patch('/removeFromWishlist/:id',authorization, removeFromWishlist);
router.get('/getwishlist',authorization, getWishLists);
router.get('/getcarts', authorization,getCartDetailsByUserId); 

module.exports = router;
 
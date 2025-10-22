const { Router } = require('express');
const router = Router();
const authorization = require("../middlewares/authorization");
const { getOrders, getUserOrders, createOrder, updateOrder,getOrderById,getReviewOrders,getAdminOrders,updateOrderStatus,phonepeIntagretion,phonepeStatus } = require('../controllers/orderController');

router.get('/', authorization, getOrders);
router.get('/adminfetch', getAdminOrders);
router.get('/getuserorders', authorization, getUserOrders);
router.post('/', authorization, createOrder);
router.patch('/',authorization, updateOrder);
router.get('/getorderbyid/:orderId', authorization, getOrderById);
router.get('/user/:userId/product/:productId', getReviewOrders);
router.put('/update-status', updateOrderStatus);
router.post('/initiate-payment', authorization, phonepeIntagretion);
router.post('/status', phonepeStatus);


module.exports = router;

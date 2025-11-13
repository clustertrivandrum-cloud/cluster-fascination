const { Router } = require('express');
const router = Router();
const { getDashboardStats } = require('../controllers/dashboardController');

router.get('/stats', getDashboardStats);

module.exports = router;


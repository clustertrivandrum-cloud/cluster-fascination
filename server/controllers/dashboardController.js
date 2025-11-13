const Order = require('../models/order');
const User = require('../models/user');
const Product = require('../models/product');
const Category = require('../models/category');
const Subcategory = require('../models/subcategory');

const getDashboardStats = async (req, res) => {
  try {
    // Get date ranges
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
    const thisYear = new Date(now.getFullYear(), 0, 1);
    
    // Last 7 days for chart
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      last7Days.push(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
    }

    // Last 12 months for chart
    const last12Months = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now);
      date.setMonth(date.getMonth() - i);
      last12Months.push({
        month: monthNames[date.getMonth()],
        year: date.getFullYear(),
        start: new Date(date.getFullYear(), date.getMonth(), 1),
        end: new Date(date.getFullYear(), date.getMonth() + 1, 0)
      });
    }

    // Total counts
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalSubcategories = await Subcategory.countDocuments();

    // Today's stats
    const todayOrders = await Order.countDocuments({ createdAt: { $gte: today } });
    const todayRevenue = await Order.aggregate([
      { $match: { createdAt: { $gte: today }, status: { $ne: 'Canceled' } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const todayRevenueAmount = todayRevenue[0]?.total || 0;

    // This month's stats
    const thisMonthOrders = await Order.countDocuments({ createdAt: { $gte: thisMonth } });
    const thisMonthRevenue = await Order.aggregate([
      { $match: { createdAt: { $gte: thisMonth }, status: { $ne: 'Canceled' } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const thisMonthRevenueAmount = thisMonthRevenue[0]?.total || 0;

    // Last month's stats
    const lastMonthOrders = await Order.countDocuments({ 
      createdAt: { $gte: lastMonth, $lte: lastMonthEnd } 
    });
    const lastMonthRevenue = await Order.aggregate([
      { 
        $match: { 
          createdAt: { $gte: lastMonth, $lte: lastMonthEnd }, 
          status: { $ne: 'Canceled' } 
        } 
      },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const lastMonthRevenueAmount = lastMonthRevenue[0]?.total || 0;

    // Total revenue
    const totalRevenue = await Order.aggregate([
      { $match: { status: { $ne: 'Canceled' } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalRevenueAmount = totalRevenue[0]?.total || 0;

    // Order status breakdown
    const orderStatusBreakdown = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    const statusMap = {};
    orderStatusBreakdown.forEach(item => {
      statusMap[item._id] = item.count;
    });

    // Revenue by last 7 days
    const revenueByDay = await Promise.all(
      last7Days.map(async (dayStart) => {
        const dayEnd = new Date(dayStart);
        dayEnd.setDate(dayEnd.getDate() + 1);
        const revenue = await Order.aggregate([
          { 
            $match: { 
              createdAt: { $gte: dayStart, $lt: dayEnd },
              status: { $ne: 'Canceled' }
            } 
          },
          { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        return {
          date: dayStart.toISOString().split('T')[0],
          revenue: revenue[0]?.total || 0
        };
      })
    );

    // Orders by last 7 days
    const ordersByDay = await Promise.all(
      last7Days.map(async (dayStart) => {
        const dayEnd = new Date(dayStart);
        dayEnd.setDate(dayEnd.getDate() + 1);
        const count = await Order.countDocuments({
          createdAt: { $gte: dayStart, $lt: dayEnd }
        });
        return {
          date: dayStart.toISOString().split('T')[0],
          orders: count
        };
      })
    );

    // Revenue by last 12 months
    const revenueByMonth = await Promise.all(
      last12Months.map(async (month) => {
        const revenue = await Order.aggregate([
          { 
            $match: { 
              createdAt: { $gte: month.start, $lte: month.end },
              status: { $ne: 'Canceled' }
            } 
          },
          { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        return {
          month: `${month.month} ${month.year}`,
          revenue: revenue[0]?.total || 0
        };
      })
    );

    // Top selling products
    const topProducts = await Order.aggregate([
      { $unwind: '$products.item' },
      { $group: { 
          _id: '$products.item.product_id',
          totalQuantity: { $sum: '$products.item.qty' },
          totalRevenue: { $sum: { $multiply: ['$products.item.qty', '$products.item.price'] } }
        }
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 10 },
      { $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      { $project: {
          productId: '$_id',
          productName: '$product.name',
          totalQuantity: 1,
          totalRevenue: 1,
          image: { $arrayElemAt: ['$product.image', 0] }
        }
      }
    ]);

    // Payment mode breakdown
    const paymentModeBreakdown = await Order.aggregate([
      { $group: { _id: '$payment_mode', count: { $sum: 1 }, revenue: { $sum: '$amount' } } }
    ]);

    // Recent orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('userId', 'username email')
      .populate('address', 'firstname lastname city state')
      .populate('products.item.product_id', 'name image')
      .select('_id amount status payment_mode createdAt');

    // Low stock products
    const lowStockProducts = await Product.find({ stock: { $lte: 10 } })
      .select('name stock image price')
      .limit(10)
      .sort({ stock: 1 });

    // Products by category
    const productsByCategory = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'category'
        }
      },
      { $unwind: '$category' },
      { $project: {
          categoryName: '$category.name',
          count: 1
        }
      }
    ]);

    // Calculate growth percentages
    const revenueGrowth = lastMonthRevenueAmount > 0 
      ? ((thisMonthRevenueAmount - lastMonthRevenueAmount) / lastMonthRevenueAmount * 100).toFixed(2)
      : 0;
    const ordersGrowth = lastMonthOrders > 0
      ? ((thisMonthOrders - lastMonthOrders) / lastMonthOrders * 100).toFixed(2)
      : 0;

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalRevenue: totalRevenueAmount,
          totalOrders,
          totalUsers,
          totalProducts,
          totalCategories,
          totalSubcategories,
          todayRevenue: todayRevenueAmount,
          todayOrders,
          thisMonthRevenue: thisMonthRevenueAmount,
          thisMonthOrders,
          lastMonthRevenue: lastMonthRevenueAmount,
          lastMonthOrders,
          revenueGrowth: parseFloat(revenueGrowth),
          ordersGrowth: parseFloat(ordersGrowth)
        },
        orderStatus: statusMap,
        revenueByDay,
        ordersByDay,
        revenueByMonth,
        topProducts,
        paymentModeBreakdown,
        recentOrders,
        lowStockProducts,
        productsByCategory
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ 
      success: false,
      message: error?.message ?? 'Something went wrong' 
    });
  }
};

module.exports = {
  getDashboardStats
};


import request from "utils/request";

const getDashboardStats = async () => request('/dashboard/stats', 'GET');

export {
  getDashboardStats
};


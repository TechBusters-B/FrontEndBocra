import client from './axiosClient';

export const dashboardApi = {
  /** GET /api/dashboard/stats/ */
  getStats: () => client.get('/dashboard/stats/'),

  /** GET /api/dashboard/activity/?limit=30 */
  getActivity: (limit = 30) =>
    client.get('/dashboard/activity/', { params: { limit } }),

  /** GET /api/dashboard/trend/?months=6 */
  getTrend: (months = 6) =>
    client.get('/dashboard/trend/', { params: { months } }),
};
import API from '../api/axios';

export const reportService = {
  createReport: (data) => API.post('/reports', data),
};

export const adminService = {
  getStats: () => API.get('/admin/stats'),
  getUsers: () => API.get('/admin/users'),
  deleteUser: (id) => API.delete(`/admin/users/${id}`),
  deleteListing: (id) => API.delete(`/admin/listings/${id}`),
  getReports: () => API.get('/admin/reports'),
  updateReportStatus: (id, status) => API.put(`/admin/reports/${id}?status=${status}`),
};

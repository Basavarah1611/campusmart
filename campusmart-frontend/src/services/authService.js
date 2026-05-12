import API from '../api/axios';

export const authService = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getProfile: () => API.get('/auth/me'),
  updateProfile: (data) => API.put('/auth/profile', data),
};

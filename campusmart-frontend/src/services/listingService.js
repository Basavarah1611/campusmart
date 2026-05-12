import API from '../api/axios';

export const listingService = {
  getListings: (params) => API.get('/listings', { params }),
  getListingById: (id) => API.get(`/listings/${id}`),
  createListing: (data) => API.post('/listings', data),
  updateListing: (id, data) => API.put(`/listings/${id}`, data),
  deleteListing: (id) => API.delete(`/listings/${id}`),
  uploadImages: (id, formData) =>
    API.post(`/listings/${id}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  getMyListings: () => API.get('/listings/my'),
};

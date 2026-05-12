import API from '../api/axios';

export const bookmarkService = {
  toggleBookmark: (listingId) => API.post(`/bookmarks/${listingId}`),
  getSavedListings: () => API.get('/bookmarks'),
};

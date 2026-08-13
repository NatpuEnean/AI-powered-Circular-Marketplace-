import api from './api';

export const marketplaceService = {
  async getNearbyProducts(lat, lng, radius = 10) {
    const res = await api.get('/api/products/nearby', {
      params: { latitude: lat, longitude: lng, radiusKm: radius },
    });
    return res.data;
  },

  async getNearbyShops(lat, lng, radius = 10) {
    const res = await api.get('/api/shops/nearby', {
      params: { latitude: lat, longitude: lng, radiusKm: radius },
    });
    return res.data;
  },

  async getMyProducts() {
    const res = await api.get('/api/products/my');
    return res.data;
  },

  async addProduct(productData) {
    const res = await api.post('/api/products', productData);
    return res.data;
  },

  async deleteProduct(id) {
    const res = await api.delete(`/api/products/${id}`);
    return res.data;
  },

  async aiSearch(imageFile, lat = 0, lng = 0, radius = 20) {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('latitude', lat);
    formData.append('longitude', lng);
    formData.append('radiusKm', radius);

    const res = await api.post('/api/products/ai-search', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },
};

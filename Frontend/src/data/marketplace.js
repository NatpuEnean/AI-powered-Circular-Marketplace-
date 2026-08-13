export const demoUserLocation = {
  latitude: 12.9716,
  longitude: 77.5946,
};

export const nearbyShops = [
  {
    id: 1,
    name: 'GreenNest Market',
    category: 'Groceries',
    address: 'Koramangala 5th Block, Bengaluru',
    latitude: 12.9352,
    longitude: 77.6245,
    distanceKm: 1.4,
  },
  {
    id: 2,
    name: 'Urban Threads',
    category: 'Fashion',
    address: 'HSR Layout, Bengaluru',
    latitude: 12.9128,
    longitude: 77.6511,
    distanceKm: 3.2,
  },
  {
    id: 3,
    name: 'Eco Essentials',
    category: 'Home & Care',
    address: 'Indiranagar, Bengaluru',
    latitude: 12.9784,
    longitude: 77.6408,
    distanceKm: 2.1,
  },
];

export const demoProducts = [
  {
    id: 'p1',
    name: 'Multigrain Bread Loaf',
    category: 'food',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80',
    seller: 'GreenNest Market',
    distance: '1.2 km',
    originalPrice: 60,
    price: 36,
    expiry: 'Today',
    condition: 'Fresh',
    latitude: 12.9352,
    longitude: 77.6245,
  },
  {
    id: 'p2',
    name: 'Herbal Shampoo 200ml',
    category: 'personal-care',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80',
    seller: 'Eco Essentials',
    distance: '0.8 km',
    originalPrice: 220,
    price: 154,
    expiry: '2 Months',
    condition: 'Sealed',
    latitude: 12.9784,
    longitude: 77.6408,
  },
  {
    id: 'p3',
    name: 'Cotton Casual Shirt',
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
    seller: 'Urban Threads',
    distance: '2.1 km',
    originalPrice: 899,
    price: 449,
    expiry: 'No Expiry',
    condition: 'New, Overstock',
    latitude: 12.9128,
    longitude: 77.6511,
  },
  {
    id: 'p4',
    name: 'Assorted Novels (Set of 3)',
    category: 'books',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&q=80',
    seller: 'Book Haven',
    distance: '1.5 km',
    originalPrice: 450,
    price: 180,
    expiry: 'No Expiry',
    condition: 'Like New',
    latitude: 12.942,
    longitude: 77.609,
  },
  {
    id: 'p5',
    name: 'Wireless Earbuds',
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80',
    seller: 'Tech Rescue',
    distance: '3.0 km',
    originalPrice: 2499,
    price: 1499,
    expiry: 'No Expiry',
    condition: 'Open Box',
    latitude: 12.904,
    longitude: 77.593,
  },
];

export function filterProductsByLocation(products, latitude, longitude, radiusKm = 10) {
  return products.filter((product) => {
    const distance = Math.hypot(
      product.latitude - latitude,
      product.longitude - longitude
    ) * 111.32;
    return distance <= radiusKm;
  });
}

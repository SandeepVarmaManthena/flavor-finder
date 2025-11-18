import restaurantsData from '@/data/restaurants.json';
import { Restaurant, Review } from '@/types/Restaurant';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  getRestaurants: async (): Promise<Restaurant[]> => {
    await delay(300);
    return restaurantsData as Restaurant[];
  },

  getRestaurantById: async (id: string): Promise<Restaurant | null> => {
    await delay(200);
    const restaurant = restaurantsData.find((r) => r.id === id);
    return restaurant ? (restaurant as Restaurant) : null;
  },

  addReview: async (restaurantId: string, review: Omit<Review, 'date'>): Promise<Review> => {
    await delay(500);
    const newReview: Review = {
      ...review,
      date: new Date().toISOString(),
    };
    // In a real app, this would persist to backend
    // For now, we'll just return the review
    return newReview;
  },
};

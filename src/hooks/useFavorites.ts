import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'restaurant_favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse favorites:', error);
      }
    }
  }, []);

  const toggleFavorite = (restaurantId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(restaurantId)
        ? prev.filter((id) => id !== restaurantId)
        : [...prev, restaurantId];
      
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (restaurantId: string) => favorites.includes(restaurantId);

  return { favorites, toggleFavorite, isFavorite };
};

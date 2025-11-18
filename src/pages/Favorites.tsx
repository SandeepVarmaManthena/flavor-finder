import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { useFavorites } from '@/hooks/useFavorites';
import { Navbar } from '@/components/Navbar';
import { RestaurantCard } from '@/components/RestaurantCard';
import { RestaurantCardSkeleton } from '@/components/RestaurantCardSkeleton';
import { Heart } from 'lucide-react';

const Favorites = () => {
  const { favorites } = useFavorites();
  const { data: restaurants, isLoading } = useQuery({
    queryKey: ['restaurants'],
    queryFn: api.getRestaurants,
  });

  const favoriteRestaurants = restaurants?.filter((r) => favorites.includes(r.id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Your Favorites</h1>
          <p className="text-muted-foreground">
            Restaurants you've saved for later
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <RestaurantCardSkeleton key={i} />
            ))}
          </div>
        ) : favoriteRestaurants && favoriteRestaurants.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favoriteRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
            <div className="mb-4 rounded-full bg-muted p-6">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="mb-2 text-2xl font-semibold text-foreground">
              No favorites yet
            </h2>
            <p className="text-muted-foreground">
              Start adding restaurants to your favorites by clicking the heart icon
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;

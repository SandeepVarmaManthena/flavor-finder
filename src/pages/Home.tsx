import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { Navbar } from '@/components/Navbar';
import { SearchBar } from '@/components/SearchBar';
import { Filters } from '@/components/Filters';
import { RestaurantCard } from '@/components/RestaurantCard';
import { RestaurantCardSkeleton } from '@/components/RestaurantCardSkeleton';
import { useDebounce } from '@/hooks/useDebounce';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('rating');
  const debouncedSearch = useDebounce(searchQuery, 300);

  const { data: restaurants, isLoading } = useQuery({
    queryKey: ['restaurants'],
    queryFn: api.getRestaurants,
  });

  // Get all unique cuisines
  const availableCuisines = useMemo(() => {
    if (!restaurants) return [];
    const cuisines = new Set<string>();
    restaurants.forEach((r) => r.cuisines.forEach((c) => cuisines.add(c)));
    return Array.from(cuisines).sort();
  }, [restaurants]);

  // Filter and sort restaurants
  const filteredRestaurants = useMemo(() => {
    if (!restaurants) return [];

    let filtered = restaurants;

    // Search
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.cuisines.some((c) => c.toLowerCase().includes(query))
      );
    }

    // Cuisine filter
    if (selectedCuisines.length > 0) {
      filtered = filtered.filter((r) =>
        r.cuisines.some((c) => selectedCuisines.includes(c))
      );
    }

    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter((r) => r.avgRating >= minRating);
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'rating') return b.avgRating - a.avgRating;
      if (sortBy === 'deliveryTime') return a.deliveryTimeMins - b.deliveryTimeMins;
      if (sortBy === 'costForTwo') return a.costForTwo - b.costForTwo;
      return 0;
    });

    return filtered;
  }, [restaurants, debouncedSearch, selectedCuisines, minRating, sortBy]);

  const handleCuisineToggle = (cuisine: string) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisine) ? prev.filter((c) => c !== cuisine) : [...prev, cuisine]
    );
  };

  const FiltersContent = () => (
    <Filters
      selectedCuisines={selectedCuisines}
      onCuisineToggle={handleCuisineToggle}
      minRating={minRating}
      onMinRatingChange={setMinRating}
      sortBy={sortBy}
      onSortChange={setSortBy}
      availableCuisines={availableCuisines}
    />
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-gradient-hero py-16 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80')] bg-cover bg-center opacity-20" />
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl animate-fade-in">
            Discover Delicious Food
          </h1>
          <p className="mb-8 text-lg md:text-xl text-white/90 animate-slide-up">
            Order from the best restaurants in your area
          </p>
          <div className="mx-auto max-w-2xl animate-scale-in">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search for restaurants or cuisines..."
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24 rounded-lg border border-border bg-card p-6 shadow-card">
              <h2 className="mb-4 text-lg font-semibold">Filters</h2>
              <FiltersContent />
            </div>
          </aside>

          {/* Restaurant Grid */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <div className="mb-6 flex items-center justify-between lg:hidden">
              <h2 className="text-xl font-semibold">
                {filteredRestaurants.length} Restaurants
              </h2>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FiltersContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Results */}
            {isLoading ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <RestaurantCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredRestaurants.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredRestaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            ) : (
              <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                <p className="text-xl font-semibold text-foreground">No restaurants found</p>
                <p className="mt-2 text-muted-foreground">
                  Try adjusting your filters or search query
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

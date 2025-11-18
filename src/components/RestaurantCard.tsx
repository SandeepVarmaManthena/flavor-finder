import { Restaurant } from '@/types/Restaurant';
import { Clock, IndianRupee, Star, Heart } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useFavorites } from '@/hooks/useFavorites';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(restaurant.id);

  return (
    <Link to={`/restaurant/${restaurant.id}`}>
      <Card className="group relative overflow-hidden transition-all hover:shadow-hover animate-fade-in">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img
            src={restaurant.images[0]}
            alt={restaurant.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {/* Favorite Button */}
          <Button
            size="icon"
            variant="secondary"
            className="absolute right-3 top-3 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(restaurant.id);
            }}
          >
            <Heart
              className={cn(
                'h-4 w-4 transition-colors',
                favorite && 'fill-destructive text-destructive'
              )}
            />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title & Rating */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg text-foreground line-clamp-1">
              {restaurant.name}
            </h3>
            <Badge variant="secondary" className="gap-1 shrink-0">
              <Star className="h-3 w-3 fill-current text-accent" />
              {restaurant.avgRating}
            </Badge>
          </div>

          {/* Cuisines */}
          <div className="flex flex-wrap gap-1.5">
            {restaurant.cuisines.map((cuisine) => (
              <Badge key={cuisine} variant="outline" className="text-xs">
                {cuisine}
              </Badge>
            ))}
          </div>

          {/* Details */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{restaurant.deliveryTimeMins} mins</span>
            </div>
            <div className="flex items-center gap-0.5">
              <IndianRupee className="h-4 w-4" />
              <span>{restaurant.costForTwo} for two</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

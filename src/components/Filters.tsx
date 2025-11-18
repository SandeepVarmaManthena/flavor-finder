import { Badge } from './ui/badge';
import { Star } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface FiltersProps {
  selectedCuisines: string[];
  onCuisineToggle: (cuisine: string) => void;
  minRating: number;
  onMinRatingChange: (rating: number) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  availableCuisines: string[];
}

export const Filters = ({
  selectedCuisines,
  onCuisineToggle,
  minRating,
  onMinRatingChange,
  sortBy,
  onSortChange,
  availableCuisines,
}: FiltersProps) => {
  const ratingOptions = [0, 3, 4];

  return (
    <div className="space-y-4">
      {/* Cuisine Filters */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Cuisines</h3>
        <div className="flex flex-wrap gap-2">
          {availableCuisines.map((cuisine) => (
            <Badge
              key={cuisine}
              variant={selectedCuisines.includes(cuisine) ? 'default' : 'outline'}
              className="cursor-pointer transition-all hover:scale-105"
              onClick={() => onCuisineToggle(cuisine)}
            >
              {cuisine}
            </Badge>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Minimum Rating</h3>
        <div className="flex gap-2">
          {ratingOptions.map((rating) => (
            <Badge
              key={rating}
              variant={minRating === rating ? 'default' : 'outline'}
              className="cursor-pointer gap-1 transition-all hover:scale-105"
              onClick={() => onMinRatingChange(rating)}
            >
              {rating === 0 ? 'All' : (
                <>
                  {rating}
                  <Star className="h-3 w-3 fill-current" />
                </>
              )}
            </Badge>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Sort By</h3>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Rating (High to Low)</SelectItem>
            <SelectItem value="deliveryTime">Delivery Time</SelectItem>
            <SelectItem value="costForTwo">Cost for Two</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

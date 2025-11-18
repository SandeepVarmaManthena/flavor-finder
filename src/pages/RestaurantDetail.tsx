import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import { Navbar } from '@/components/Navbar';
import { ReviewModal } from '@/components/ReviewModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Clock,
  IndianRupee,
  Star,
  Heart,
  ArrowLeft,
  MessageSquarePlus,
  Leaf,
} from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const RestaurantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const queryClient = useQueryClient();

  const { data: restaurant, isLoading } = useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => api.getRestaurantById(id!),
    enabled: !!id,
  });

  const addReviewMutation = useMutation({
    mutationFn: (review: { user: string; rating: number; comment: string }) =>
      api.addReview(id!, review),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurant', id] });
      setReviewModalOpen(false);
      toast.success('Review added successfully!');
    },
    onError: () => {
      toast.error('Failed to add review. Please try again.');
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="mb-6 h-10 w-32" />
          <Skeleton className="mb-6 h-96 w-full rounded-lg" />
          <Skeleton className="mb-4 h-12 w-3/4" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="mb-4 text-2xl font-bold">Restaurant not found</h1>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const favorite = isFavorite(restaurant.id);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Restaurants
          </Button>
        </Link>

        {/* Hero Image */}
        <div className="relative mb-8 aspect-[21/9] overflow-hidden rounded-xl">
          <img
            src={restaurant.images[0]}
            alt={restaurant.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Restaurant Info */}
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex-1">
            <h1 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
              {restaurant.name}
            </h1>
            <div className="mb-4 flex flex-wrap gap-2">
              {restaurant.cuisines.map((cuisine) => (
                <Badge key={cuisine} variant="secondary">
                  {cuisine}
                </Badge>
              ))}
            </div>
            <p className="text-muted-foreground">{restaurant.description}</p>
          </div>

          <div className="flex gap-3 md:flex-col">
            <Button
              size="lg"
              variant={favorite ? 'default' : 'outline'}
              className="gap-2"
              onClick={() => toggleFavorite(restaurant.id)}
            >
              <Heart
                className={cn('h-5 w-5', favorite && 'fill-current')}
              />
              {favorite ? 'Saved' : 'Save'}
            </Button>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <Card className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-accent/10 p-3">
              <Star className="h-5 w-5 fill-accent text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">{restaurant.avgRating}</p>
              <p className="text-sm text-muted-foreground">Rating</p>
            </div>
          </Card>
          <Card className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{restaurant.deliveryTimeMins}</p>
              <p className="text-sm text-muted-foreground">Minutes</p>
            </div>
          </Card>
          <Card className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-secondary/10 p-3">
              <IndianRupee className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{restaurant.costForTwo}</p>
              <p className="text-sm text-muted-foreground">For Two</p>
            </div>
          </Card>
        </div>

        {/* Menu */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold text-foreground">Menu</h2>
          <div className="space-y-6">
            {restaurant.menuCategories.map((category) => (
              <Card key={category.name} className="p-6">
                <h3 className="mb-4 text-xl font-semibold">{category.name}</h3>
                <div className="space-y-4">
                  {category.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between gap-4"
                    >
                      <div className="flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          {item.veg && (
                            <Leaf className="h-4 w-4 text-green-600" />
                          )}
                          <h4 className="font-medium">{item.name}</h4>
                        </div>
                        {item.description && (
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-0.5 font-semibold">
                        <IndianRupee className="h-4 w-4" />
                        {item.price}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Reviews</h2>
            <Button
              className="gap-2"
              onClick={() => setReviewModalOpen(true)}
            >
              <MessageSquarePlus className="h-4 w-4" />
              Add Review
            </Button>
          </div>

          <div className="space-y-4">
            {restaurant.reviews.length > 0 ? (
              restaurant.reviews.map((review, index) => (
                <Card key={index} className="p-6">
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{review.user}</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(review.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <Badge variant="secondary" className="gap-1">
                      <Star className="h-3 w-3 fill-current text-accent" />
                      {review.rating}
                    </Badge>
                  </div>
                  <Separator className="mb-3" />
                  <p className="text-muted-foreground">{review.comment}</p>
                </Card>
              ))
            ) : (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">
                  No reviews yet. Be the first to review!
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>

      <ReviewModal
        open={reviewModalOpen}
        onOpenChange={setReviewModalOpen}
        onSubmit={(review) => addReviewMutation.mutate(review)}
        isLoading={addReviewMutation.isPending}
      />
    </div>
  );
};

export default RestaurantDetail;

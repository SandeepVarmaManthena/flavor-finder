import { Link } from 'react-router-dom';
import { Heart, UtensilsCrossed } from 'lucide-react';
import { Button } from './ui/button';

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="rounded-lg bg-gradient-primary p-2 transition-transform group-hover:scale-105">
              <UtensilsCrossed className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">FoodieHub</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/favorites">
              <Button variant="ghost" size="sm" className="gap-2">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Favorites</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

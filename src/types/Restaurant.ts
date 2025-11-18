export interface MenuItem {
  id: string;
  name: string;
  price: number;
  veg: boolean;
  description?: string;
}

export interface MenuCategory {
  name: string;
  items: MenuItem[];
}

export interface Review {
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisines: string[];
  avgRating: number;
  deliveryTimeMins: number;
  costForTwo: number;
  images: string[];
  description: string;
  menuCategories: MenuCategory[];
  reviews: Review[];
}

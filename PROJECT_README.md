# FoodieHub - Restaurant Listing Application

A modern, responsive restaurant listing web application built with React, TypeScript, and Tailwind CSS.

## 🎯 Features

### Core Functionality
- **Restaurant Listing**: Browse restaurants with beautiful card-based UI
- **Advanced Search**: Debounced search across restaurant names and cuisines
- **Smart Filters**:
  - Multi-select cuisine filters
  - Rating filters (All, 3★+, 4★+)
  - Sort by rating, delivery time, or cost
- **Restaurant Details**: Comprehensive detail pages with menu and reviews
- **Favorites System**: Save favorites using localStorage (frontend-only)
- **Review System**: Add reviews with ratings and comments

### UI/UX Features
- Fully responsive design (mobile, tablet, desktop)
- Skeleton loaders for better perceived performance
- Smooth animations and transitions
- Hero section with gradient overlays
- Card hover effects
- Empty states
- Toast notifications

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for blazing fast builds
- **Tailwind CSS** for styling
- **shadcn/ui** for component library
- **React Router** for navigation
- **TanStack Query** for data fetching and caching
- **Lucide React** for icons

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── Navbar.tsx
│   ├── SearchBar.tsx
│   ├── Filters.tsx
│   ├── RestaurantCard.tsx
│   ├── RestaurantCardSkeleton.tsx
│   └── ReviewModal.tsx
├── pages/               # Page components
│   ├── Home.tsx         # Main listing page
│   ├── Favorites.tsx    # Favorites page
│   ├── RestaurantDetail.tsx
│   └── NotFound.tsx
├── hooks/               # Custom React hooks
│   ├── useFavorites.ts  # Favorites localStorage hook
│   └── useDebounce.ts   # Search debounce hook
├── services/            # API layer
│   └── api.ts           # Mock API with static data
├── types/               # TypeScript types
│   └── Restaurant.ts
├── data/                # Static data
│   └── restaurants.json
└── lib/                 # Utilities
    └── utils.ts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd foodiehub
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:8080`

## 🎨 Design System

The app uses a warm, food-themed color palette:

- **Primary**: Warm orange (#FF6B35) - Main brand color
- **Secondary**: Deep slate - Contrast and depth
- **Accent**: Amber - Highlights and ratings
- **Background**: Light cream/white
- **Gradients**: Used for hero sections and CTAs
- **Shadows**: Subtle elevation with primary color tint

All colors are defined using HSL in `src/index.css` and referenced through CSS variables for easy theming.

## 📱 Features Breakdown

### Home Page
- Hero section with search
- Sidebar filters (desktop) / Sheet filters (mobile)
- Grid of restaurant cards
- Real-time search with debouncing
- Multi-criteria filtering and sorting

### Restaurant Detail Page
- Large hero image
- Quick info cards (rating, delivery time, cost)
- Complete menu with categories
- Reviews section
- Add review functionality

### Favorites Page
- Displays saved restaurants
- Persists across sessions using localStorage
- Empty state when no favorites

## 🔄 Data Flow

1. **Static Data**: Restaurants are loaded from `src/data/restaurants.json`
2. **API Layer**: Mock API in `services/api.ts` simulates backend calls with delays
3. **State Management**: TanStack Query for server state, React hooks for UI state
4. **Local Storage**: Favorites stored in browser's localStorage

## 📝 Adding Backend (Future Enhancement)

To connect a real backend:

1. Replace mock API calls in `src/services/api.ts` with actual HTTP requests
2. Set up backend routes:
   - `GET /api/restaurants` - List all restaurants
   - `GET /api/restaurants/:id` - Get single restaurant
   - `POST /api/restaurants/:id/reviews` - Add review

Example backend structure:
```
backend/
├── index.js
├── data/
│   └── restaurants.json
└── package.json
```

## 🎥 Key User Flows

1. **Discover**: Search → Filter → Browse cards → Click for details
2. **Save**: Click heart icon → View in Favorites page
3. **Review**: Open restaurant → Click "Add Review" → Fill form → Submit

## 🎯 Performance Optimizations

- Debounced search (300ms delay)
- Image lazy loading
- React Query caching
- Memoized filter/sort operations
- Skeleton loaders for better UX

## 📄 License

MIT License - feel free to use this project for learning or as a template.

---

Built with ❤️ using React, TypeScript, and Tailwind CSS

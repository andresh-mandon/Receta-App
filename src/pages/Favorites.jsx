import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import RecipeList from '../components/RecipeList';
import '../styles/Favorites.css';

const StarIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    stroke="currentColor" 
    strokeWidth="2"
    width="24"
    height="24"
  >
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" />
  </svg>
);

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="favorites-container">
      <header className="favorites-header">
        <h1 className="favorites-title">
          My Favorite Recipes
        </h1>
        <p className="favorites-subtitle">Your personal collection of delicious recipes</p>
      </header>

      {favorites.length === 0 ? (
        <div className="no-favorites-message">
          <StarIcon />
          <p>You haven't saved any recipes as favorites yet.</p>
          <p>Start exploring and add your favorites!</p>
        </div>
      ) : (
        <RecipeList recipes={favorites} />
      )}
    </div>
  );
};

export default Favorites;
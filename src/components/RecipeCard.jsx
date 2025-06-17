// components/RecipeCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import '../styles/RecipeCard.css';

const RecipeCard = ({ recipe, showCategory = false }) => {
  const navigate = useNavigate();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  
  const isFavorite = favorites.some(fav => fav.idMeal === recipe.idMeal);

  const handleViewRecipe = (e) => {
    e.stopPropagation();
    navigate(`/recipe/${recipe.idMeal}`);
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFromFavorites(recipe.idMeal);
    } else {
      addToFavorites(recipe);
    }
  };

  const handleCardClick = () => {
    navigate(`/recipe/${recipe.idMeal}`);
  };

  return (
    <div className="recipe-card" onClick={handleCardClick}>
      <div className="recipe-image-container">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="recipe-image"
        />
        
        {/* Overlay con gradiente */}
        <div className="recipe-image-overlay"></div>
        
        {/* Botón de favorito flotante */}
        <button
          className={`favorite-button ${isFavorite ? 'active' : ''}`}
          onClick={handleToggleFavorite}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          <span className="heart-icon">
            {isFavorite ? '❤️' : '🤍'}
          </span>
        </button>

        {/* Indicador de categoría */}
        {showCategory && recipe.strCategory && (
          <div className="recipe-category">
            {recipe.strCategory}
          </div>
        )}
      </div>

      <div className="recipe-info">
        <h3 className="recipe-title">{recipe.strMeal}</h3>
        
        <div className="recipe-actions">
          <button
            className="action-button view-recipe-button"
            onClick={handleViewRecipe}
          >
            <span>👁️</span>
           View Recipe
          </button>
          
          <button
            className={`action-button favorite-action-button ${isFavorite ? 'active' : ''}`}
            onClick={handleToggleFavorite}
          >
            <span>{isFavorite ? '❤️' : '🤍'}</span>
            {isFavorite ? 'Favorite' : 'Favorite'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
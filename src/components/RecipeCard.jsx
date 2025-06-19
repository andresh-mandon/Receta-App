import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import '../styles/RecipeCard.css';

// Componente de ícono de estrella SVG
const StarIcon = ({ filled = false }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill={filled ? "currentColor" : "none"} 
    stroke="currentColor" 
    strokeWidth="2"
  >
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" />
  </svg>
);

// Componente de ícono de ojo para "Ver receta"
const EyeIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    width="16" 
    height="16"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

//Función de Tarjeta de Receta(Solo recibe Receta)
const RecipeCard = ({ recipe}) => {
  const navigate = useNavigate();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  
  const isFavorite = favorites.some(fav => fav.idMeal === recipe.idMeal);

  const handleViewRecipe = (e) => {
    e.stopPropagation();
    navigate(`/recipe/${recipe.idMeal}`);
  };

  //Función para Guardar y quitar de favoritos
  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFromFavorites(recipe.idMeal);
    } else {
      addToFavorites(recipe);
    }
  };
 
  //Función para llevar al detalle de la receta
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
        
        {/* Overlay con gradiente CSS*/}
        <div className="recipe-image-overlay"></div>
        
        {/* Estrella de favorito en la esquina superior derecha */}
        {isFavorite && (
          <div className="favorite-corner-star">
            <StarIcon filled={true} />
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
            <EyeIcon />
            <span>View Recipe</span>
          </button>
          
          <button 
            className={`action-button favorite-action-button ${isFavorite ? 'active' : ''}`}
            onClick={handleToggleFavorite}
          >
            <StarIcon filled={isFavorite} />
            <span className="button-text">
              {isFavorite ? 'Favorited' : 'Add to Favorites'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
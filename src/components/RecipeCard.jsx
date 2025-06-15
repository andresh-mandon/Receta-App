import React from 'react';
import '../styles/RecipeCard.css';

// Usa esta sintaxis infalible
function RecipeCard({ recipe, onClick }) {
  return (
    <div className="recipe-card" onClick={() => onClick(recipe.idMeal)}>
      <img 
        src={recipe.strMealThumb} 
        alt={recipe.strMeal}
        className="recipe-image" 
      />
      <div className="recipe-info">
        <h3>{recipe.strMeal}</h3>
      </div>
    </div>
  );
}
export default RecipeCard;


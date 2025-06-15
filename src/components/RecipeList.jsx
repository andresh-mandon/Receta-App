import React from 'react';
import RecipeCard from './RecipeCard';
import '../styles/RecipeList.css';

const RecipeList = ({ recipes, onRecipeClick }) => {
  return (
    <div className="recipe-list">
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <RecipeCard 
            key={recipe.idMeal} 
            recipe={recipe} 
            onClick={onRecipeClick}
          />
        ))
      ) : (
        <p className="no-recipes">No recipes found</p>
      )}
    </div>
  );
};

export default RecipeList; // Asegúrate de usar export default
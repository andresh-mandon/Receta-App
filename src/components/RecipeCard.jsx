// components/RecipeCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${recipe.idMeal}`);
  };

  return (
    <div className="recipe-card" onClick={handleClick}>
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
};

export default RecipeCard;
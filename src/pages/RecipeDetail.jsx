// pages/RecipeDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRecipeDetails } from '../services/api';
import '../styles/RecipeDetail.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        setLoading(true);
        const data = await fetchRecipeDetails(id);
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [id]);

  if (loading) return <div>Loading recipe...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!recipe) return <div>Recipe not found</div>;

  // Extraer ingredientes
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push({
        name: recipe[`strIngredient${i}`],
        measure: recipe[`strMeasure${i}`]
      });
    }
  }

  return (
    <div className="recipe-detail">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to recipes
      </button>
      
      <h1>{recipe.strMeal}</h1>
      <div className="meta">
        <span>{recipe.strCategory}</span>
        {recipe.strArea && <span> • {recipe.strArea}</span>}
      </div>

      <div className="content">
        <div className="media">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          {recipe.strYoutube && (
            <div className="video">
              <h3>Video Tutorial</h3>
              <iframe
                src={`https://www.youtube.com/embed/${recipe.strYoutube.split('v=')[1]}`}
                title="YouTube video player"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>

        <div className="details">
          <section>
            <h2>Ingredients</h2>
            <ul>
              {ingredients.map((item, index) => (
                <li key={index}>
                  {item.measure} {item.name}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Instructions</h2>
            <div className="instructions">
              {recipe.strInstructions.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
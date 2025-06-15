import React, { useState, useEffect } from 'react';
import RecipeList from '../components/RecipeList'; // Agrega la extensión explícita
import { fetchRecipesByCategory } from '../services/api';

const Home = ({ onRecipeClick }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        setLoading(true);
        const data = await fetchRecipesByCategory();
        setRecipes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  if (loading) {
    return <div className="loading">Loading recipes...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="home-container">
      <h1>Dessert Recipes</h1>
      <RecipeList recipes={recipes} onRecipeClick={onRecipeClick} />
    </div>
  );
};

export default Home;
// pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeList from '../components/RecipeList';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import { fetchRecipesByCategory, searchRecipesByName, fetchCategories } from '../services/api';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Dessert');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        setLoading(true);
        const data = searchTerm.trim() === '' 
          ? await fetchRecipesByCategory(selectedCategory)
          : await searchRecipesByName(searchTerm);
        setRecipes(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(loadRecipes, 300);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchTerm]);

  if (loading && !recipes.length) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home">
      <h1>Recipes</h1>
      <div className="filters">
        <CategoryFilter
          categories={categories}
          value={selectedCategory}
          onChange={setSelectedCategory}
        />
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default Home;
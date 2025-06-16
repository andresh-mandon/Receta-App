// pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeList from '../components/RecipeList';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import '../styles/Home.css';
import { fetchRecipesByCategory, searchRecipesByName, fetchCategories } from '../services/api';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Dessert');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Iconos dinámicos para cada categoría
  const getCategoryIcon = (category) => {
    const icons = {
      'Beef': '🥩',
      'Chicken': '🍗',
      'Dessert': '🧁',
      'Lamb': '🐑',
      'Miscellaneous': '🍽️',
      'Pasta': '🍝',
      'Pork': '🐷',
      'Seafood': '🦐',
      'Side': '🥗',
      'Starter': '🥙',
      'Vegan': '🌱',
      'Vegetarian': '🥕',
      'Breakfast': '🥞',
      'Goat': '🐐',
      'Unknown': '🍴'
    };
    return icons[category] || '🍴';
  };

  // Efecto de partículas flotantes
  const createFloatingElements = () => {
    const elements = [];
    for (let i = 0; i < 5; i++) {
      elements.push(
        <div
          key={i}
          className={`floating-element floating-element-${i + 1}`}
          style={{
            '--delay': `${i * 0.5}s`,
            '--duration': `${3 + i}s`
          }}
        />
      );
    }
    return elements;
  };

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

  if (loading && !recipes.length) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading recipes...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">😕</div>
        <p>Oops! Algo salió mal: {error}</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      {createFloatingElements()}
      
      <header className="app-header">
        <h1 className="app-title">RecetApps</h1>
        <p className="app-subtitle">The best recipes, to cook, to share</p>
      </header>

      <div className="main-content">
        <div className="category-header">
          <h2 className="category-title">
            <span className="category-icon">
              {getCategoryIcon(selectedCategory)}
            </span>
            {selectedCategory}
          </h2>
          <div className="search-container">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Buscar recetas..."
            />
          </div>
        </div>

        <CategoryFilter
          categories={categories}
          value={selectedCategory}
          onChange={setSelectedCategory}
        />

        <RecipeList recipes={recipes} />
      </div>
    </div>
  );
};

export default Home;
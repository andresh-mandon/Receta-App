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

  // Iconos profesionales para cada categoría usando SVG paths
  const getCategoryIcon = (category) => {
    const icons = {
      'Beef': (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      ),
      'Chicken': (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      'Dessert': (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
        </svg>
      ),
      'Lamb': (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      ),
      'Miscellaneous': (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      'Pasta': (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-.78-.78-2.05-.78-2.83 0s-.78 2.05 0 2.83l7.02 7.01zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.20-1.10-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
        </svg>
      ),
      'Pork': (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      ),
      'Seafood': (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      'Side': (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      ),
      'Starter': (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      'Vegan': (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.66c.03-.08.06-.17.09-.25.16-.42.35-.84.58-1.23C8.74 14.24 11.44 12 17 12V8z"/>
          <path d="M3.12 3.84c-.78-.78-2.05-.78-2.83 0-.78.78-.78 2.05 0 2.83l2.68 2.68L12 18.38l9.03-9.03 2.68-2.68c.78-.78.78-2.05 0-2.83-.78-.78-2.05-.78-2.83 0L12 12.72 3.12 3.84z"/>
        </svg>
      ),
      'Vegetarian': (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.66c.03-.08.06-.17.09-.25.16-.42.35-.84.58-1.23C8.74 14.24 11.44 12 17 12V8z"/>
        </svg>
      ),
      'Breakfast': (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM8.5 16L12 13.5 15.5 16 12 18.5 8.5 16z"/>
        </svg>
      ),
      'Goat': (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      ),
      'Unknown': (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    };
    return icons[category] || icons['Unknown'];
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
      
      {/* Banner Hero */}
      <div className="hero-banner">
        <img 
          src="Banner.png"
          alt="Banner de cocina"
          className="hero-banner-image"
        />
        <div className="banner-overlay">
          <p className="banner-subtitle">The best recipes, to cook, to share</p>
        </div>
      </div>

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
              placeholder="Search Recipes..."
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
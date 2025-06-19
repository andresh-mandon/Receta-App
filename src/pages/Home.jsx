import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeList from '../components/RecipeList';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import { categoryIcons } from '../icon';
import '../styles/Home.css';
//Importamos las funciones de la API
import { fetchRecipesByCategory, searchRecipesByName,fetchCategories, Searchbyletter } from '../services/api';


const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Dessert');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Iconos profesionales para cada categoría
  const getCategoryIcon = (category) => {
  return categoryIcons[category] || categoryIcons['Unknown'];
};
  

//Cargar Categorias y Mostrarlas
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

  //Cargar Recetas y se cambia por categoria y busqueda
 useEffect(() => {
  const loadRecipes = async () => {
    try {
      setLoading(true);
      let data = [];

      if (searchTerm.trim() === '') {
        data = await fetchRecipesByCategory(selectedCategory);
      } else if (searchTerm.length === 1) {
        data = await  Searchbyletter(searchTerm);
      } else {
        data = await searchRecipesByName(searchTerm);
      }

      setRecipes(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  //Debounce para evitar cargar mas de una vez
  const timer = setTimeout(loadRecipes, 300); 
  return () => clearTimeout(timer);
}, [selectedCategory, searchTerm]);

//Mensaje de carga de recetas
  if (loading && !recipes.length) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading recipes...</p>
      </div>
    );
  }
  //Manejo de error de carga 
  if (error) {
    return (
      <div className="error-container">
         <img src="error-404.png" alt="Error 404" />
        <p>Oops! Something went wrong: {error}</p>
      </div>
    );
  }


  
  return (
    <div className="home-container">
      
      
      {/* Portada*/}
      <div className="hero-banner">
        <img 
          src="Banner.png"
          alt="Imagén de cocina"
          className="hero-banner-image"
        />
        <div className="banner-overlay">
        </div>
      </div>

      {/* Contenedor De categorias  */}
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


        {/*Filtro por categoria*/}
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
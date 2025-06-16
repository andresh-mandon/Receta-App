// pages/RecipeDetail.jsx
import React, { useState, useEffect, useMemo } from 'react';
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
      // Reiniciar estado para evitar mostrar datos antiguos en navegación
      setRecipe(null);
      setError(null);
      setLoading(true);
      window.scrollTo(0, 0); // Opcional: Lleva al usuario al inicio de la página al cargar

      try {
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

  // Usamos useMemo para evitar recalcular los ingredientes en cada render.
  const ingredients = useMemo(() => {
    if (!recipe) return [];
    
    // Forma funcional y segura de crear la lista de ingredientes
    return Array.from({ length: 20 }, (_, i) => i + 1)
      .map(index => ({
        name: recipe[`strIngredient${index}`],
        measure: recipe[`strMeasure${index}`],
      }))
      .filter(item => item.name && item.name.trim() !== ""); // Filtra ingredientes nulos o vacíos
  }, [recipe]);
  
  // Limpiamos las instrucciones para evitar párrafos vacíos si hay saltos de línea dobles
  const instructions = useMemo(() => {
    return recipe?.strInstructions
      .split('\n')
      .filter(line => line.trim() !== '') || [];
  }, [recipe]);


  if (loading) return <div className="loading-state">Loading recipe...</div>;
  if (error) return <div className="error-state">Error: {error}</div>;
  if (!recipe) return <div className="not-found-state">Recipe not found</div>;

  return (
    // Contenedor principal de la página con el nuevo fondo dinámico
  <div className="recipe-detail-page background-noise">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>

      {/* --- 1. Hero Section Compacta --- */}
      <header className="recipe-hero">
        <div className="hero-avatar"> 
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        </div>
        <div className="hero-info">
          <h1>{recipe.strMeal}</h1>
          <div className="meta-tags">
            <span className="meta-tag">{recipe.strCategory}</span>
            {recipe.strArea && <span className="meta-tag">{recipe.strArea}</span>}
          </div>
        </div>
      </header>

      {/* --- 2. Contenido Principal (Ingredientes y Instrucciones lado a lado) --- */}
      <main className="recipe-main-content">
        <section className="recipe-ingredients">
          <h2>Ingredients</h2>
          <ul>
            {ingredients.map((item, index) => (
              <li key={index}>
                <span className="measure">{item.measure}</span>
                <span className="name">{item.name}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="recipe-instructions">
          <h2>Instructions</h2>
          <div className="instructions-steps">
            {instructions.map((step, index) => (
              <p key={index}>{step}</p>
            ))}
          </div>
        </section>
      </main>

      {/* --- 3. Sección de Video (si existe) --- */}
      {recipe.strYoutube && (
        <section className="recipe-video">
          <h2>Video Tutorial</h2>
          <div className="video-wrapper">
            <iframe
              src={`https://www.youtube.com/embed/${recipe.strYoutube.split('v=')[1]}`}
              title="YouTube video player"
              allowFullScreen
            ></iframe>
          </div>
        </section>
      )}
    </div>
  );
};

export default RecipeDetail;
// src/pages/Favorites.jsx
import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import RecipeList from '../components/RecipeList';
import '../styles/Favorites.css'; // Asegúrate de haber creado este archivo CSS

const Favorites = () => {
  // Obtenemos el array de favoritos desde nuestro contexto
  const { favorites } = useFavorites();

  return (
    <div className="favorites-container">
      <header className="favorites-header">
        <h1 className="favorites-title">
          <span role="img" aria-label="heart"></span> My Favorite Recipes
        </h1>
      </header>

      {/* Si no hay favoritos, mostramos un mensaje amigable */}
      {favorites.length === 0 ? (
        <div className="no-favorites-message">
          <p>You haven't saved any recipes as favorites yet.</p>
        </div>
      ) : (
        // Si hay favoritos, los mostramos usando el componente que ya teníamos
        <RecipeList recipes={favorites} />
      )}
    </div>
  );
};

// --- ESTA ES LA LÍNEA MÁS IMPORTANTE PARA SOLUCIONAR EL ERROR ---
export default Favorites; 
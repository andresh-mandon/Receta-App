import React, { createContext, useContext, useState, useEffect } from 'react';

//Contexto de Favoritos
const FavoritesContext = createContext();

//Funcion para obtener el contexto de Favoritos
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites debe ser usado dentro de FavoritesProvider');
  }
  return context;
};
//Provedor de Favoritos(Guarda, Comparte a todos los componentes)
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Cargar favoritos del localStorage al inicializar
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('recipeAppFavorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  // Guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('recipeAppFavorites', JSON.stringify(favorites));
  }, [favorites]);

  //Guarda Favoritos
  const addToFavorites = (recipe) => {
    setFavorites(prev => {
      //Verifica si ya esta guardada 
      if (prev.some(fav => fav.idMeal === recipe.idMeal)) {
        return prev;
      }
      return [...prev, recipe];
    });
  };

  //Quita Favoritos Por su id
  const removeFromFavorites = (recipeId) => {
    setFavorites(prev => prev.filter(fav => fav.idMeal !== recipeId));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const isFavorite = (recipeId) => {
    return favorites.some(fav => fav.idMeal === recipeId);
  };

  //Funcion que tiene el contexto de Favoritos
  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    clearFavorites,
    isFavorite,
    favoritesCount: favorites.length
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
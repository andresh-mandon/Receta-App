// api.js
const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Función existente para obtener recetas por categoría
export const fetchRecipesByCategory = async (category = 'Dessert') => {
  try {
    const response = await fetch(`${API_BASE_URL}/filter.php?c=${category}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};

// Función existente para obtener detalles de receta
export const fetchRecipeDetails = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.meals?.[0] || null;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    return null;
  }
};

// Función existente para buscar recetas por nombre
export const searchRecipesByName = async (name) => {
  try {
    const response = await fetch(`${API_BASE_URL}/search.php?s=${name}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error searching recipes:', error);
    return [];
  }
};

// Nueva función para obtener todas las categorías
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories.php`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};
// URL de la API de ThemealDB
const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Función para obtener recetas por categoría
export const fetchRecipesByCategory = async (category = 'Dessert') => {
    const response = await fetch(`${API_BASE_URL}/filter.php?c=${category}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.meals || [];
   
};

// Función para obtener detalles de receta
export const fetchRecipeDetails = async (id) => {
    const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.meals?.[0] || null;
};

// Función buscar recetas por nombre
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

//función para obtener todas las categorías
export const fetchCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories.php`);
  if (!response.ok) throw new Error('Category information could not be obtained');
  const data = await response.json();
  return data.categories || [];
};

//función para buscar recetas por letra
export const Searchbyletter= async (letter) => {
  try {
    const response = await fetch(`${API_BASE_URL}/search.php?f=${letter}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error searching by letter:', error);
    return [];
  }
};
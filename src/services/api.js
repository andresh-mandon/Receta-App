const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

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
// components/CategoryFilter.jsx
import React from 'react';
import '../styles/CategoryFilter.css'; // Asegúrate de tener este archivo

function CategoryFilter({ categories, value, onChange }) {
  return (
    <select
      className="category-filter"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {categories.map((category) => (
        <option key={category.strCategory} value={category.strCategory}>
          {category.strCategory}
        </option>
      ))}
    </select>
  );
}

export default CategoryFilter; // Exportación por defecto clara
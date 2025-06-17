// components/SearchBar.jsx
import React from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ value, onChange, placeholder = "Buscar recetas" }) => {
  const handleChange = (e) => {
    const input = e.target.value;
    onChange(input); // Permite cualquier input ahora
  };

  return (
    <input
      type="text"
      className="search-bar"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export default SearchBar;
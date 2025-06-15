// components/SearchBar.jsx
import React from 'react';


const SearchBar = ({ value, onChange, placeholder = "Search recipes..." }) => {
  const handleChange = (e) => {
    const input = e.target.value;
    // Solo permitir letras (opcional)
    if (input === '' || /^[a-zA-Z]+$/.test(input)) {
      onChange(input);
    }
  };

  return (
    <input
      type="text"
      className="search-bar"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      maxLength="1" // Opcional: limitar a 1 carácter si solo quieres búsqueda por letra inicial
    />
  );
};

export default SearchBar;
import React from 'react';
import '../styles/SearchBar.css';

//Función de Barra de Búsqueda(Recibe El texto Actual, y una Función Mientras se escribe y el placeholder)
const SearchBar = ({ value, onChange, placeholder = "Buscar recetas..." }) => {
  const handleChange = (e) => {
    const input = e.target.value;
    onChange(input); 
  };

  //Retorna el input
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
import React, { useRef } from 'react';
import '../styles/CategoryFilter.css';

//Función Filtrar Por Categoria
function FiltrarCategoria({ categories, value, onChange }) {

  //Componente de Scroll
  const scrollContainerRef = useRef(null);

  //Componente de Scroll para hacer scroll hacia la izquierda
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };
  //Componente de Scroll para hacer scroll hacia la Derecha
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  //Vista del Scroll
  return (
    <div className="category-filter-container">
      <h3 className="filter-title">Filter by Category</h3>
      <div className="category-slider">
        {/* Botón de Scroll Izquierdo*/}
        <button className="scroll-btn scroll-btn-left" onClick={scrollLeft}>
          ‹
        </button>
        {/* Contenedor de la lista de categorías */}
        <div className="category-scroll" ref={scrollContainerRef}>
          {categories.map((category) => (
            <div
              key={category.strCategory}
              className={`category-item ${value === category.strCategory ? 'active' : ''}`}
              onClick={() => onChange(category.strCategory)}
            >
              {/* Imagen de la categoría */}
              <div className="category-image-container">
                <img
                  src={category.strCategoryThumb}
                  alt={category.strCategory}
                  className="category-image"
                  loading="lazy"
                />
              </div>
              {/* Nombre de la categoría */}
              <div className="category-info">
                <h4 className="category-name">{category.strCategory}</h4>
              </div>
            </div>
          ))}
        </div>
        {/* Botón de Scroll Derecho*/}
        <button className="scroll-btn scroll-btn-right" onClick={scrollRight}>
          ›
        </button>
      </div>
    </div>
  );
}

export default FiltrarCategoria;
// components/CategoryFilter.jsx
import React, { useRef } from 'react';
import '../styles/CategoryFilter.css';

function CategoryFilter({ categories, value, onChange }) {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="category-filter-container">
      <h3 className="filter-title">Filter by Category</h3>
      <div className="category-slider">
        <button className="scroll-btn scroll-btn-left" onClick={scrollLeft}>
          ‹
        </button>
        <div className="category-scroll" ref={scrollContainerRef}>
          {categories.map((category) => (
            <div
              key={category.strCategory}
              className={`category-item ${value === category.strCategory ? 'active' : ''}`}
              onClick={() => onChange(category.strCategory)}
            >
              <div className="category-image-container">
                <img
                  src={category.strCategoryThumb}
                  alt={category.strCategory}
                  className="category-image"
                  loading="lazy"
                />
              </div>
              <div className="category-info">
                <h4 className="category-name">{category.strCategory}</h4>
              </div>
            </div>
          ))}
        </div>
        <button className="scroll-btn scroll-btn-right" onClick={scrollRight}>
          ›
        </button>
      </div>
    </div>
  );
}

export default CategoryFilter;
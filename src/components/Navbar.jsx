// src/components/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext'; // Lo usamos para el contador
import '../styles/Navbar.css'; // Asegúrate de haber creado este archivo de estilos

const Navbar = () => {
  const { favoritesCount } = useFavorites(); // Obtenemos la cantidad de favoritos

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          RecetApps
        </NavLink>
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Inicio
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/favorites" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Favoritos
              {/* Mostramos una "pastilla" con el número de favoritos solo si es mayor a 0 */}
              {favoritesCount > 0 && (
                <span className="favorites-badge">{favoritesCount}</span>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

// --- ESTA ES LA LÍNEA QUE ARREGLA EL ERROR ---
export default Navbar;
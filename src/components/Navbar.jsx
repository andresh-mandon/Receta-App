// src/components/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          RecetApps
        </NavLink>
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/favorites" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Favorites
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
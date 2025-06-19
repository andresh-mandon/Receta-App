import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importa los componentes y páginas necesarios
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail'; // Asumo que tienes esta página
import Favorites from './pages/Favorites'; // La nueva página de favoritos

// Importa los estilos globales si los tienes aquí
import './styles/App.css'; 

const App = () => {
  return (
    // Ya no necesitas el Router aquí, porque lo pusimos en main.jsx
    <div className="app">
      {/* El Navbar va aquí, fuera de <Routes>, para que aparezca en todas las páginas */}
      <Navbar />

      {/* Envolvemos el contenido principal en un tag <main> por buenas prácticas */}
      <main className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          
          {/* AÑADIMOS LA NUEVA RUTA PARA LOS FAVORITOS */}
          <Route path="/favorites" element={<Favorites />} />

        </Routes>
      </main>
    </div>
  );
};

export default App;
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 1. Importa BrowserRouter
import { BrowserRouter } from 'react-router-dom';

// 2. Importa tus componentes y proveedores
import App from './App.jsx';
import { FavoritesProvider } from './context/FavoritesContext.jsx';

// 3. Importa tus estilos
import './styles/App.css'; // o el nombre de tu archivo CSS principal

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Primero, el proveedor de datos (Favoritos) */}
    <FavoritesProvider>
      {/* Luego, el proveedor de rutas (Router) que envuelve a toda la App */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FavoritesProvider>
  </React.StrictMode>
);
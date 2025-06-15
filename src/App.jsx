import React, { useState } from 'react';
import Home from './pages/Home';

import './styles/App.css';

const App = () => {
  const [view, setView] = useState('home');
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const handleRecipeClick = (id) => {
    setSelectedRecipeId(id);
    setView('detail');
  };

  const handleBackClick = () => {
    setView('home');
  };

  return (
    <div className="app">
      {view === 'home' ? (
        <Home onRecipeClick={handleRecipeClick} />
      ) : (
        <RecipeDetail 
          recipeId={selectedRecipeId} 
          onBackClick={handleBackClick} 
        />
      )}
    </div>
  );
};

export default App;
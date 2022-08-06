import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { FavoritesPage } from './pages/FavoritesPage';
import { HomePage } from './pages';
import { Nav } from './components/Nav/Nav';
function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </>
  );
}

export default App;

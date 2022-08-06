import React from 'react';
import { Link } from 'react-router-dom';

export const Nav = () => {
  return (
    <nav className="flex justify-between items-center h-[50px] px-5 shadow-md text-white bg-amber-300">
      <Link to={`/`}>
        <h3 className="font-bold">GitHub Search</h3>
      </Link>
      <div>
        <Link to={`/`} className="mr-4">
          Home
        </Link>
        <Link to={`/favorites`}>Favorites</Link>
      </div>
    </nav>
  );
};

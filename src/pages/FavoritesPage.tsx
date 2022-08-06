import React from 'react';
import { useAppSelector } from '../store';

export const FavoritesPage = () => {
  const { favorites } = useAppSelector((store) => store.github);

  if (favorites.length === 0) return <p className="text-center text-bold">No items</p>;
  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      <ul className="list-none">
        {favorites.map((el) => (
          <li key={el}>
            <a href={el}>{el}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

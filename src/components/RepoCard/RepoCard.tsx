import React, { useState } from 'react';
import { useActions, useAppSelector } from '../../store';
import { IRepo } from '../../types/types';

export const RepoCard = ({ repo }: { repo: IRepo }) => {
  const { addFavorite, removeFavorite } = useActions();
  const { favorites } = useAppSelector((store) => store.github);
  const [isFav, setIsFav] = useState(favorites.includes(repo.html_url));

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addFavorite(repo.html_url);
    setIsFav(true);
  };
  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    removeFavorite(repo.html_url);
    setIsFav(false);
  };
  return (
    <a href={repo.html_url} target="_blank" rel="noreferrer">
      <div className="border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
        <h2 className="text-lg font-bold">{repo.full_name}</h2>
        <p className="text-sm">
          Forks: <span className="font-bold mr-2">{repo.forks}</span>
          Watchers: <span className="font-bold">{repo.watchers}</span>
        </p>
        <p className="text-sm font-thin">{repo?.description}</p>

        {!isFav && (
          <button className="py-2 px-4 mr-2 bg-yellow-200 rounded hover:shadow-md transition-all" onClick={handleAdd}>
            Add to favorites
          </button>
        )}
        {isFav && (
          <button className="py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all" onClick={handleRemove}>
            Remove from favorites
          </button>
        )}
      </div>
    </a>
  );
};

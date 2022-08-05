import React, { useEffect, useState } from 'react';
import { RepoCard } from '../components/RepoCard/RepoCard';
import { useDebounce } from '../hooks/debounce';
import { useLazyGetUserRepoQuery, useSearchUsersQuery } from '../store/github/github.api';

export const HomePage = () => {
  const [search, setSearch] = useState('');
  const [drop, setDrop] = useState(false);
  const debounced = useDebounce(search, 800);
  const {
    isLoading,
    isError,
    data: users,
  } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });

  const [fetchRepos, { isLoading: isReposLoading, data: repos }] = useLazyGetUserRepoQuery();
  useEffect(() => {
    setDrop(debounced.length > 3 && users?.length! > 0);
  }, [debounced, users]);

  const handleClick = (userName: string) => {
    fetchRepos(userName);
    setDrop(false);
  };

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      {isError && <p className="text-center text-bold text-red-600">Something went wrong...</p>}

      <div className="relative w-[560px]">
        <input
          type="text"
          className="border py-2 px-4 w-full h-[42px] mb-2"
          placeholder="Search by user name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {drop && (
          <ul className=" list-none overflow-y-scroll absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-slate-200">
            {isLoading && <p className="text-center">Loading...</p>}
            {users?.map((user) => (
              <li
                key={user.id}
                onClick={() => handleClick(user.login)}
                className="py-2 px-4  hover:bg-inherit transition-colors cursor-pointer">
                <p className="text-black hover:bg-gray-500 transition-colors  ">{user.login}</p>
              </li>
            ))}
          </ul>
        )}
        <div className="container">
          {isReposLoading && <p className="text-center">Repos are loading...</p>}
          {repos && repos.map((repo) => <RepoCard key={repo.id} repo={repo} />)}
        </div>
      </div>
    </div>
  );
};

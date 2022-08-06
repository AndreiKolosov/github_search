import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRepo, IServerResponse, IUser } from '../../types/types';
export const githubApi = createApi({
  reducerPath: 'github/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com',
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    searchUsers: build.query<IUser[], string>({
      query: (search: string) => ({
        url: 'search/users',
        params: {
          q: search,
          per_page: 10,
        },
      }),
      transformResponse: (response: IServerResponse<IUser>) => response.items,
    }),
    getUserRepo: build.query<IRepo[], string>({
      query: (userName: string) => ({
        url: `users/${userName}/repos`,
      }),
    }),
    createUser: build.mutation<any, void>({
      query: () => '',
      // Созданее пользователя
    }),
  }),
});

export const { useSearchUsersQuery, useLazyGetUserRepoQuery } = githubApi;

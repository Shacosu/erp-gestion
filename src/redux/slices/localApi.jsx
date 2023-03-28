import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const localAPI = createApi({
    reducerPath: 'localAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
    endpoints: (builder) => ({
      getCategories: builder.query({
        query: () => `collection`,
      }),
      addNewLink: builder.mutation({
        query: (payload) => ({
          url: '/scrap/add-link',
          method: 'POST',
          body: payload,
          headers: { 'Content-Type': 'application/json' },
          invalidatesTags: ['Post']
        })
      }),
      getGames: builder.query({
        query: () => 'games'
      }),
    }),
  })

  export const { useGetCategoriesQuery, useAddNewLinkMutation, useGetGamesQuery } = localAPI
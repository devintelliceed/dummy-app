// outsource dependencies
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authAPI = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: ''
    }),
    endpoints: (build) => ({
        feychUser: build.query({
            query: ({ email, password }) => ({
                url: "user",
                params: { email, password }
            }),
            transformResponse: (response) => response.userData,
            transformErrorResponse: (error) => console.log('API ERROR', error),
        })
    })
});

export const { useFeychUserQuery } = authAPI;

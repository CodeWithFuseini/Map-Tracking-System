import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:4000"}),
    tagTypes: ['Pin'],
    endpoints: (builder) => ({
        
    }),
      
});


import { usersApi } from "./user";

const user = usersApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (value) => ({
                url: "/api/user/login",
                method: "POST",
                body: value,  
            })
        }),
        register: builder.mutation({
            query: (value) => ({
                url: "/api/user/register",
                method: "POST",
                body: value,
                
            })
        }),
    })
});

export const { useLoginMutation, useRegisterMutation } = user
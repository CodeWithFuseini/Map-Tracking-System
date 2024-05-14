import { usersApi } from "./user";

const pin = usersApi.injectEndpoints({
    endpoints: (builder) => ({
        addPin: builder.mutation({
            query: value => ({
                url: "/api/pin",
                method: "POST",
                body: value
            }),
            invalidatesTags: (result = [], err , arg) => {
                return ['Pin' , {type: 'Pin', id: "GET_PINS"}]
            }

        }),
        getPins: builder.query({
            query: () => "/api/pin",
            providesTags: (result = [], err , arg) => {
                return ['Pin', ...result.map((id) => ({type: 'Pin', id: "GET_PINS"}))]
            }
        }),
    })
});

export const { useAddPinMutation, useGetPinsQuery } = pin
import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "../api/user";

import userReducer from "../slices/user"

const store = configureStore({
    reducer: {
     user: userReducer,
     [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(usersApi.middleware)
    }
})

export default store
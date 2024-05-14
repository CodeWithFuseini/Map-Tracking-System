import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: JSON.parse(localStorage.getItem("user")) || null,
        isLogin: localStorage.getItem("login") ?? false
    },
    reducers: {
        setUser: (state, action) => {
        localStorage.setItem("user", JSON.stringify(action.payload));   
        },
        
        setIsLogin: (state, action) => {
            localStorage.setItem("login", action.payload);
        },

        logOut: (state, action) => {
            
            localStorage.clear();
   
        }
    }
});

export const { setUser, setIsLogin, logOut } = userSlice.actions

export default userSlice.reducer

export const user = (state) => state.user?.user
export const isLogin = (state) => state.user?.isLogin
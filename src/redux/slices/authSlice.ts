import { createSlice } from "@reduxjs/toolkit";




interface AuthState {
    token: string | null;
    loading: boolean;
    user: { username: string; email: string; roles: string[] } | null;

}

const initialState: AuthState = {
    token: typeof window !== "undefined" ? localStorage.getItem("token") : null, // Cargar el token desde el localStorage,
    loading:false,
    user: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        
        
        setLoading(state, action) {
            state.loading = action.payload;
          },
        login(state, action) {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        logout(state) {
            state.token = null;
            state.user = null;
        },
        
    }
})


export const { login, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
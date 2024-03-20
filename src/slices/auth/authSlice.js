import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    token: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            state.token = action.payload.accessToken ? action.payload.accessToken : state.token;
            //console.log('token: ', state.token);
            //console.log('userInfo: ', state.userInfo);
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.userInfo = null;
            state.token = null;
            localStorage.removeItem('userInfo')
        }
    }
})

export const {setCredentials, logout} = authSlice.actions; 
export const selectCurrentToken = (state) => state.auth.token;
export default authSlice.reducer;

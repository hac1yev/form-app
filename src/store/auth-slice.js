import { createSlice } from "@reduxjs/toolkit";

const getUserInfo = () => {
    const userInfo = window.localStorage.getItem("userInfo");

    if(userInfo) {
        return JSON.parse(userInfo);
    }else{
        return {};
    }
};

const initialAuthState = {
    userInfo: getUserInfo(),
};

const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialAuthState,
    reducers: {
        getUser(state,action) {
            state.userInfo = { ...action.payload }
        },
    }
});

export default authSlice;
export const authSliceActions = authSlice.actions;
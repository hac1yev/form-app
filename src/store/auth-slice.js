import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    userIsExist: false, 
};

const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialAuthState,
    reducers: {
        loginDipnot(state) {
            state.userIsExist = true;
        }
    }
});

export default authSlice;
export const authSliceActions = authSlice.actions;
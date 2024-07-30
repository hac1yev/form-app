import { createSlice } from "@reduxjs/toolkit";

const initialLoadingState = {
    isLoading: false
};

const loadingSlice = createSlice({
    name: 'loadingSlice',
    initialState: initialLoadingState,
    reducers: {
        isItLoading(state,action) {
            state.isLoading = action.payload;
        }
    }
});

export default loadingSlice;
export const loadingSliceActions = loadingSlice.actions;
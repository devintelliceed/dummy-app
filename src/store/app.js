

// outsource dependencies
import { createSlice } from "@reduxjs/toolkit";

// loacal dependencies
import { useControllerCreator } from "../hooks";

const initialState = {
    user: null,
    auth: false,
    wakeup: true,
    disabled: false,
    routeName: null,
    accessToken: null,
    initialized: false,
    appState: 'active',
};

const appSlice = createSlice({
    initialState,
    name: 'app',
    reducers: {
        clear: () => initialState,
        updateData: (state, action) => ({ ...state, ...action.payload })
    }
});
export default appSlice.reducer;

export const selector = state => state.app;
export const { updateData, clear } = appSlice.actions;

export const useController = () => useControllerCreator(appSlice.actions, selector);

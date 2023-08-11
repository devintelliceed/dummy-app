

// outsource dependencies
import { createSlice } from "@reduxjs/toolkit";
import { takeEvery, put, call } from "redux-saga/effects";

// loacal dependencies
import { PUBLIC } from "../constants/routes";
import { useControllerCreator } from "../hooks";
import { rootNavigation } from "../root-navigation";
import { logout as signOut } from "../services/api.service";

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
        logout: () => {},
        clear: () => initialState,
        updateData: (state, action) => ({ ...state, ...action.payload })
    }
});
export default appSlice.reducer;

export const selector = state => state.app;
export const { updateData, clear, logout } = appSlice.actions;

export const useController = () => useControllerCreator(appSlice.actions, selector);


function* signOutSaga() {
    try {
        yield call(signOut);
    } finally {
        yield put(updateData({ auth: false, user: null }));
        yield call(rootNavigation, PUBLIC);
    }
}

/**
 *
 * @public
 */
export function* appSaga() {
    yield takeEvery(logout.type, signOutSaga);
}

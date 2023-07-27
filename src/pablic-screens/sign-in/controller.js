
// outsource dependencies
import { createSlice } from "@reduxjs/toolkit";
import { useControllerCreator } from "../../hooks";
import { put, takeEvery } from 'redux-saga/effects';

// Configure field
const initialState = {
    auth: false,
    disabled: false,
    initialized: false,
};

const signInSlice = createSlice({
    initialState,
    name: 'signIn',
    reducers: {
        submit: () => {},
        initialize: () => {},
        handleRouter: () => {},
        clear: () => initialState,
        updateData: (state, action) => ({ ...state, ...action.payload })
    }
});
export default signInSlice.reducer;

export const selector = (state) => state.signIn;
export const { initialize, updateData, clear, submit } = signInSlice.actions;

export const useController = () => useControllerCreator(signInSlice.actions, selector);

export function * signInSaga () {
    yield takeEvery(submit.type, submitSaga);
}

function * submitSaga () {
    yield put(updateData({ disabled: true, initialized: false }));
    try {
        yield put(updateData({ auth: true }));
    } catch ({ message }) {
        console.log('Error');
    }
    yield put(updateData({ disabled: false, initialized: true }));
}

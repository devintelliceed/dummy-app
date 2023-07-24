
// outsource dependencies
import { createSlice } from "@reduxjs/toolkit";
import { put, takeEvery } from 'redux-saga/effects';

// local dependencies
import { useControllerCreator } from "../../hooks";

// configure
const initialState = {
    currentValue: 0,
    initialized: false,
};

export const counterSlice = createSlice({
    initialState,
    name: 'counter',
    reducers: {
        initialize: () => {},
        clear: () => initialState,
        updateData: (state, action) => ({ ...state, ...action.payload })
    }
});
export const { initialize, updateData, clear } = counterSlice.actions;
export default counterSlice.reducer;

export const selector = (state) => state.counter;

export const useController = () => useControllerCreator(counterSlice.actions, selector);

export function * counterSaga () {
    yield takeEvery(initialize.type, initializeSaga);
}

function * initializeSaga () {
    yield put(clear());
    yield put(updateData({ initialized: true }));
}


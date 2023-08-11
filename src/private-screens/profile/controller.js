// outsource dependencies
import { createSlice } from "@reduxjs/toolkit";
import { call, put, select, takeEvery } from 'redux-saga/effects';

// local dependencies
import { useControllerCreator } from "../../hooks";
import { authAPI } from '../../services/api.service';

const initialState = {
    user: {},
    isEdit: false,
    disabled: false,
    initialized: false,
};

const profileSlice = createSlice({
    initialState,
    name: 'profile',
    reducers: {
        submit: () => {},
        initialize: () => {},
        clear: () => initialState,
        updateData: (state, action) => ({ ...state, ...action.payload })
    }
});
export default profileSlice.reducer;

export const selector = (state) => state.profile;
export const { initialize, updateData, clear, submit } = profileSlice.actions;

export const useController = () => useControllerCreator(profileSlice.actions, selector);

function * initializeSaga () {
    try {
        const user = yield select(state => state.app.user);
        yield put(updateData({ user }));
    } catch (error) {
       console.log(error, 'Profile Initialize');
    }
    yield put(updateData({ initialized: true }));
}

function * updateDataSaga ({ type, payload }) {
    yield put(updateData({ disabled: true }));
    try {
        const user = yield call(authAPI.updateSelf, payload);
        yield put(updateData({ user }));
    } catch (error) {
        console.log(error, 'Update profile');
    }
    yield put(updateData({ disabled: false }));
}

export function * profileSaga() {
    yield takeEvery(submit.type, updateDataSaga);
    yield takeEvery(initialize.type, initializeSaga);
}

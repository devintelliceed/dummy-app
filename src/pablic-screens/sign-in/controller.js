
// outsource dependencies
import { createSlice } from "@reduxjs/toolkit";
import { put, takeEvery, call } from 'redux-saga/effects';

// loacal dependencies
import { PRIVATE } from "../../constants/routes";
import { useControllerCreator } from "../../hooks";
import { login } from "../../services/api.service";
import { rootNavigation } from "../../root-navigation";
import { updateData as updateRootData } from '../../store/app';

// Configure field
export const AUTH_INPUTS = {
    USERNAME: 'username',
    PASSWORD: 'password'
};

const initialState = {
    error: null,
    disabled: false,
    initialized: false,
    initialValues: {
        [AUTH_INPUTS.USERNAME]: '',
        [AUTH_INPUTS.PASSWORD]: '',
    }
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

export function * submitSaga ({ payload }) {
    yield put(updateData({ disabled: true, initialized: false }));
    try {
        const { username, password } = payload;
        const user = yield call(login, username, password);
        yield put(updateRootData({ auth: true, user }));
        yield put(updateData({ initialValues: { ...payload, password: '' } }));
        yield rootNavigation(PRIVATE);
    } catch ({ message }) {
        console.log('SignIn Error');
        yield put(updateData({ initialValues: { ...payload, password: '' }, error: message }));
    }
    yield put(updateData({ disabled: false, initialized: true }));
}

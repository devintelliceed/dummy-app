
// outsource dependencies
import { createSlice } from "@reduxjs/toolkit";
import { put, takeEvery, call } from 'redux-saga/effects';

// loacal dependencies
import { useControllerCreator } from "../../hooks";
import { signUp } from "../../services/api.service";
import { submitSaga as submitSignInSaga } from '../sign-in/controller';

// Configure field
export const SIGNUP_INPUTS = {
    USERNAME: 'username',
    PASSWORD: 'password',
    COFIRM_PASSWORD: 'confirm_password'
};

const initialState = {
    error: null,
    disabled: false,
    initialized: false,
    initialValues: {
        [SIGNUP_INPUTS.USERNAME]: '',
        [SIGNUP_INPUTS.PASSWORD]: '',
    }
};

const signUpSlice = createSlice({
    initialState,
    name: 'signUp',
    reducers: {
        submit: () => {},
        initialize: () => {},
        clear: () => initialState,
        updateData: (state, action) => ({ ...state, ...action.payload })
    }
});
export default signUpSlice.reducer;

export const selector = (state) => state.signUp;
export const { initialize, updateData, clear, submit } = signUpSlice.actions;

export const useController = () => useControllerCreator(signUpSlice.actions, selector);

export function * signUpSaga () {
    yield takeEvery(submit.type, submitSaga);
}

function * submitSaga ({ payload }) {
    yield put(updateData({ disabled: true, initialized: false }));
    try {
        const { username, password } = payload;
        yield call(signUp, username, password);
        yield call(submitSignInSaga, { payload: { username, password } });
        yield put(updateData({ initialValues: { ...payload, password: '' } }));
    } catch ({ message }) {
        yield put(updateData({ initialValues: { ...payload, password: '' }, error: "Some error" }));
    }
    yield put(updateData({ disabled: false, initialized: true }));
}

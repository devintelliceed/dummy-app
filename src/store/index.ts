// outsource dependencies
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';

// local dependencies
import reducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer,
    devTools: true,
    middleware: [sagaMiddleware],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;

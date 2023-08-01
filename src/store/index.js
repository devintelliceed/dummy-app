// outsource dependencies
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';

// local dependencies
import rootSaga from '../sagas';
import reducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer,
    devTools: true,
    middleware: getDefaultMiddleWare =>
        getDefaultMiddleWare({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;


// outsource dependencies
import { fork } from 'redux-saga/effects';

// local dependencies
import { appSaga} from '../store/app';
import { signInSaga } from '../pablic-screens/sign-in/controller';
import { signUpSaga } from '../pablic-screens/sign-up/controller';
/**
 * common root watcher
 *
 * @public
 */
export default function * rootWatcher () {
    yield fork(appSaga);
    yield fork(signInSaga);
    yield fork(signUpSaga);
}

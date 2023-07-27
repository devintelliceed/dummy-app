
// outsource dependencies
import { fork } from 'redux-saga/effects';

// local dependencies
import { signInSaga } from '../pablic-screens/sign-in/controller';
/**
 * common root watcher
 *
 * @public
 */
export default function * rootWatcher () {
    yield fork(signInSaga);
}

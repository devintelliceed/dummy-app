
// outsource dependencies
import { fork } from 'redux-saga/effects';

// local dependencies
import { counterSaga } from '../components/counter/controller';
/**
 * common root watcher
 *
 * @public
 */
export default function * rootWatcher () {
    yield fork(counterSaga);
}

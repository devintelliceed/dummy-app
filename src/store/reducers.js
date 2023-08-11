
// local dependencies
import app from './app';
import signIn from '../pablic-screens/sign-in/controller';
import signUp from '../pablic-screens/sign-up/controller';
import profile from '../private-screens/profile/controller';
// union all reducers
export default {
    app,
    signIn,
    signUp,
    profile
};

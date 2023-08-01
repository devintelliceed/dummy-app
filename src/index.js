
// outsource dependencies
import 'react-native-gesture-handler';
import React from "react";
import { Provider } from 'react-redux';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// local dependencies
import store from './store';
import { navigationRef } from './root-navigation';
import { PRIVATE, PUBLIC } from "./constants/routes";
import { useController as singnInConroller } from './pablic-screens/sign-in/controller';
// screens
import SignIn from "./pablic-screens/sign-in";
import PrivateScreens from "./private-screens";
enableScreens();

const Stack = createNativeStackNavigator();

const Initializer = () => {
    const [{ auth }] = singnInConroller();
    return <Stack.Navigator initialRouteName={auth ? PRIVATE : PUBLIC}>
        <Stack.Screen name={PUBLIC} component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name={PRIVATE} component={PrivateScreens} options={{ headerShown: false }} />
    </Stack.Navigator>
}

const App = () =>
    <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
            <Initializer />
        </NavigationContainer>
    </Provider>;

export default App;

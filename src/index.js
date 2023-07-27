
// outsource dependencies
import { Provider } from 'react-redux';
import React, { useState } from "react";
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// local dependencies
import store from './store';
import { PRIVATE, PUBLIC } from "./constans/routes";
import { useController as singnInConroller } from './pablic-screens/sign-in/controller';
// screens
import Main from "./private-screens/main";
import SignIn from "./pablic-screens/sign-in";
enableScreens();

const Stack = createNativeStackNavigator();

const Initializer = () => {
    const { auth } = singnInConroller();
    return <Stack.Navigator initialRouteName={auth ? PRIVATE : PUBLIC}>
        <Stack.Screen name={PRIVATE} component={Main} />
        <Stack.Screen name={PUBLIC} component={SignIn} />
    </Stack.Navigator>
}

const App = () => {
    return <Provider store={store}>
        <NavigationContainer>
            <Initializer />
        </NavigationContainer>
    </Provider>
};

export default App;

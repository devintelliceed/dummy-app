
// outsource dependencies
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// local dependencies
import { SIGN_IN, SIGN_UP } from '../constants/routes';

// screens
import SignInScreen from './sign-in';
import SignUpScreen from './sign-up';

const Stack = createNativeStackNavigator();

const PublicScreens = () => <Stack.Navigator
    initialRouteName={SIGN_IN}
    screenOptions={{
        headerShown: false,
        gestureResponseDistance: 200,
        gestureDirection: 'horizontal'
    }}
>
    <Stack.Screen
        name={SIGN_IN}
        component={SignInScreen}
    />
    <Stack.Screen
        name={SIGN_UP}
        component={SignUpScreen}
    />
</Stack.Navigator>;

export default PublicScreens;

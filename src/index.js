
// outsource dependencies
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import React, { useEffect, useRef } from "react";
import { StatusBar, AppState } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// local dependencies
import store from './store';
import { COLOR } from './constants/root.theme';
import { navigationRef } from './root-navigation';
import { PRIVATE, PUBLIC } from "./constants/routes";
import { useController as useRootController } from './store/app';
// screens
import PublicScreens from './pablic-screens';
import PrivateScreens from "./private-screens";

enableScreens();
const Stack = createNativeStackNavigator();

const Initializer = () => {
    const [{ auth }, { updateData }] = useRootController();
    const appState = useRef(AppState.currentState);

    useEffect(() => {
      const subscription = AppState.addEventListener('change', nextAppState => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log('App has come to the foreground!');
        }
        appState.current = nextAppState;
        updateData({ appState: appState.current });
      });
  
      return () => subscription.remove();
    }, []);
    return <Stack.Navigator initialRouteName={auth ? PRIVATE : PUBLIC}>
        <Stack.Screen name={PUBLIC} component={PublicScreens} options={{ headerShown: false }} />
        <Stack.Screen name={PRIVATE} component={PrivateScreens} options={{ headerShown: false }} />
    </Stack.Navigator>
}

const App = () =>
    <Provider store={store}>
        <StatusBar hidden backgroundColor={COLOR.BLUE.hex()}/>
        <NavigationContainer ref={navigationRef}>
            <Initializer />
        </NavigationContainer>
    </Provider>;

export default App;

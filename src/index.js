
// outsource dependencies
import React from "react";
import { Provider } from 'react-redux';
import { View, Text } from "react-native";

// local dependencies
import store from './store';

const App = () =>
    <Provider store={store}>
        <View>
            <Text>Work!!!</Text>
        </View>
    </Provider>;

export default App;


// outsource dependencies
import React from "react";
import { View, Text } from "react-native";
import { Provider } from 'react-redux';

// local dependencies
import store from './store';

const App = () =>
    <Provider store={store}>
        <View>
            <Text>Work!!!</Text>
        </View>
    </Provider>;

export default App;

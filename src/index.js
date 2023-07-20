
// outsource dependencies
import React from "react";
import { View } from "react-native";
import { Provider } from 'react-redux';

// local dependencies
import store from './store';
import Counter from './components/counter';

const App = () => {
    return <Provider store={store}>
    <View>
        <Counter/>
    </View>
    </Provider>
};
export default App;

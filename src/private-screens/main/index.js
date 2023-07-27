// outsource dependencies
import { memo } from 'react';
import { View, Text, Button } from 'react-native';

const Main = ({ navigation }) => {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Hello on the main screen</Text>
        <Button title="Logout" onPress={() => navigation.navigate('public')}/>
    </View>
};

export default memo(Main);
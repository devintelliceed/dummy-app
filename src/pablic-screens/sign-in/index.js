// outsource dependencies
import { memo } from 'react';
import { View, Text, Button } from 'react-native';

const SignIn = ({ navigation }) => {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Wellcome to App</Text>
        <Button title='Login' onPress={() => navigation.navigate('private')} />
    </View>
};

export default memo(SignIn);

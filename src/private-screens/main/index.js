// outsource dependencies
import { memo } from "react";
import { Text } from '@rneui/themed';
import { View, StyleSheet } from "react-native";

// local dependencies
import Screen from '../../components/screen';

const MainScreen = () => {
    return <Screen>
        <View style={styles.container}>
            <Text h3 h3Style={{ color: '#777777' }}> This is MainScreen </Text>
        </View>
    </Screen>;
}

export default memo(MainScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

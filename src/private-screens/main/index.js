// outsource dependencies
import { memo } from "react";
import { View, Text } from "react-native";

const styles = {
    container: {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center'
    }
}

const MainScreen = () => {
    return <View style={styles.container}>
    <Text style={{ margin: 10 }}> This is main page </Text>
</View>
};

export default memo(MainScreen);

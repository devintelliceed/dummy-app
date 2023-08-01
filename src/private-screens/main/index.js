// outsource dependencies
import { memo } from "react";
import { View, Text, StyleSheet } from "react-native";

const MainScreen = () =>
    <View style={styles.container}>
        <Text style={{ margin: 10 }}> This is main page </Text>
    </View>;

export default memo(MainScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

// outsource dependencies
import { memo } from "react";
import { View, Text, StyleSheet } from "react-native";

const Profile = () =>
    <View style={styles.container}>
        <Text>Profile</Text>
    </View>;

export default memo(Profile);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

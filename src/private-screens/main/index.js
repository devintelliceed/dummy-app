// outsource dependencies
import { memo } from "react";
import { Text } from '@rneui/themed';
import { View, StyleSheet } from "react-native";

// local dependencies
import Screen from '../../components/screen';
import { COLOR } from "../../constants/root.theme";

const MainScreen = () => {
    return <Screen>
        <View style={styles.container}>
            <Text h3 h3Style={{ color: COLOR.GREY }}> This is MainScreen </Text>
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


// outsource dependencies
import { memo, useCallback } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar, View, StyleSheet } from 'react-native';

// local dependencies
import { COLOR } from '../constants/root.theme';

// configure
const isFunction = ent => ent instanceof Function;

const Screen = (
    { children, style, statusBarHidden, statusBarVariant, statusBarAnimated, statusBarBg, init, unmount }
) => {
    useFocusEffect(
        useCallback(() => {
            isFunction(init) && init();
            return () => isFunction(unmount) && unmount();
        }, [init, unmount])
    );

    return <View style={styles.container}>
        <StatusBar
            hidden={statusBarHidden}
            barStyle={statusBarVariant}
            animated={statusBarAnimated}
            backgroundColor={statusBarBg}
        />
        <View style={StyleSheet.flatten([styles.screen, style])}>
            { children }
        </View>
    </View>;
};

export default memo(Screen);

// configure
const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
    },
    screen: {
        flex: 1,
        display: 'flex',
        backgroundColor: COLOR.BLUE.lighten(0.5).hex(),
    },
});

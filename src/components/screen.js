
// outsource dependencies
import { memo, useCallback } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar, View, StyleSheet } from 'react-native';

// local dependencies
import { COLOR } from '../constants/root.theme';

// configure
const isFunction = ent => ent instanceof Function;

const Screen = (
    { children, style, statusBarHidden, statusBarVariant, statusBarAnimated, statusBarBg, init, unmount, initialized }
) => {
    useFocusEffect(
        useCallback(() => {
            !initialized && isFunction(init) && init();
            return () => initialized && isFunction(unmount) && unmount();
        }, [init, unmount, initialized])
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

Screen.defaultProps = {
    init: null,
    clear: null,
    style: null,
    children: null,
    initialized: false,
    statusBarHidden: false,
    statusBarAnimated: false,
    statusBarVariant: 'default',
    statusBarBg: COLOR.DARK_GREY.hex(),
};

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

// outsource dependencies
import { memo } from 'react';
import { Button, StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

// local dependencies
import MainScreen from './main';
import Profile from './profile';
import { useController } from '../store/app';
import { COLOR } from '../constants/root.theme';
import { MAIN, PROFILE } from '../constants/routes';

const Drawer = createDrawerNavigator();

const Item = memo(({ focused, title }) =>
    <View style={itemStyles.container}>
        <Text variant="h5" style={{ fontWeight: '600' }} color={focused ? COLOR.BLUE.hex() : COLOR.DARK_GREY.hex()}>
            {title}
        </Text>
    </View>);

const PrivateScreens = () => {
    const [{}, { logout }] = useController();
    return <Drawer.Navigator
        screenOptions={{
            headerTintColor: COLOR.GREEN.hex(),
            headerStyle: { backgroundColor: COLOR.TRANSPARENT },
        }}
        initialRouteName={MAIN}
        useLegacyImplementation={false}
        drawerContent={(props) =>
            <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                </DrawerContentScrollView>
                <Button pill onPress={() => logout()} style={styles.logout} variant="danger" title="LOGOUT" />
            </SafeAreaView>}
    >
        <Drawer.Screen name={MAIN} options={{ headerTitle: 'Home title', title: ({ focused }) => <Item focused={focused} title="Home" /> }} component={MainScreen} />
        <Drawer.Screen name={PROFILE} options={{ headerTitle: 'Profile', title: ({ focused }) => <Item focused={focused} title="Profile" /> }} component={Profile} />
    </Drawer.Navigator>;
}
export default memo(PrivateScreens);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

const itemStyles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    }
});

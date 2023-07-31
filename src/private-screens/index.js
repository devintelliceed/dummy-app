// outsource dependencies
import { memo } from 'react';
import { Button, StyleSheet, SafeAreaView } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

// local dependencies
import MainScreen from './main';
import Profile from './profile';
import { PUBLIC } from '../constans/routes';

const Drawer = createDrawerNavigator();

const PrivateScreens = ({ navigation }) => {
    return <Drawer.Navigator
        initialRouteName='Main Screen'
        useLegacyImplementation={false}
        drawerContent={(props) => <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <Button pill onPress={() => navigation.navigate(PUBLIC)} style={styles.logout} variant="danger" title="LOGOUT" />
        </SafeAreaView>}
    >
        <Drawer.Screen name="Main Screen" component={MainScreen} />
        <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
};

export default memo(PrivateScreens);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

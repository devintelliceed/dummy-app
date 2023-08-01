
// outsource dependencies
import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function rootNavigation (name, params) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}

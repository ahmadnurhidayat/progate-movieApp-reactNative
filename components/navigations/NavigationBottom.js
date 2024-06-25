import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Feather } from '@expo/vector-icons';
import HomeStackNavigation from './HomeStackNavigation';
import SearchStackNavigation from './SearchStackNavigation';
import FavoriteStackNavigation from './FavoriteStackNavigation';

const Tab = createBottomTabNavigator();

export default function NavigationBottom() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="Home"
                component={HomeStackNavigation}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name="home" size={28} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchStackNavigation}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name="search" size={28} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Favorite"
                component={FavoriteStackNavigation}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name="heart" size={28} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
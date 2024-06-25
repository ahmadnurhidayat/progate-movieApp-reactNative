import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavoriteScreen from '../screens/FavoriteScreen';
import MovieDetail from '../movies/MovieDetail';

const Stack = createNativeStackNavigator();

const FavoriteStackNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="FavoriteMain">
            <Stack.Screen name="FavoriteMain" component={FavoriteScreen} />
            <Stack.Screen name="MovieDetail" component={MovieDetail} />
        </Stack.Navigator>
    );
}

export default FavoriteStackNavigation;

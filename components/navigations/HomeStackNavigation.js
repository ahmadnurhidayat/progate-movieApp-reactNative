import React from "react";
import HomeScreen from "../screens/HomeScreen";
import MovieDetail from "../movies/MovieDetail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const HomeStackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen name="Dashboard" component={HomeScreen} />
      <Stack.Screen name="Movie Detail" component={MovieDetail} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigation;

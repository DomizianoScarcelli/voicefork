import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as ReduxProvider } from "react-redux";

import { Homepage, Test } from "./src/views";

function RootNavigation() {
    const Stack = createStackNavigator();

    const screenOptions = {
        headerShown: false,
      };

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Homepage' screenOptions={screenOptions}>
                <Stack.Screen name="Homepage" component={ Homepage } />
                <Stack.Screen name="Test" component={ Test } />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigation
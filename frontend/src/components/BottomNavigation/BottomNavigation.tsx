import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Homepage, Reservations, Settings } from '../../views';
import { } from './styles.js';

function BottomNavigation() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            initialRouteName = {"Homepage"}
            screenOptions = {({route}) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = "";
                    let rn = route.name;

                    if (rn === "Homepage") {
                    iconName = focused ? 'home' : 'home-outline';

                    } else if (rn === "Reservations") {
                    iconName = focused ? 'calendar' : 'calendar-outline';

                    } else if (rn === "Settings") {
                    iconName = focused ? 'settings' : 'settings-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'grey',
                tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
                tabBarStyle: { padding: 10, height: 70, minHeight: 100}
            })}>

            <Tab.Screen name="Homepage" component={ Homepage } />
            <Tab.Screen name="Reservations" component={ Reservations } />
            <Tab.Screen name="Settings" component={ Settings } />

        </Tab.Navigator>
    )
}

export default BottomNavigation;
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import {BottomNavigation} from './src/components'
import {Welcome, Registration, Homepage} from './src/views'
import Search from './src/views/Search/Search'

function RootNavigation() {
    const Stack = createStackNavigator()

    return (
        //TO DO: REDEFINE ALL NAVIGATION LOGIC!
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={'Welcome'}
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Registration" component={Registration} />
                <Stack.Screen name="Homepage" component={Homepage} />
                <Stack.Screen name="Search" component={Search}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>

        /**<NavigationContainer
        linking = {{
            prefixes: ['voicefork://'],
            config: {
                screens: {
                    Homepage: 'homepage',
                    Reservations: 'reservations',
                    Settings: 'settings',
                }
            }
        }}>
            <BottomNavigation />
        </NavigationContainer>*/
    )
}

export default RootNavigation

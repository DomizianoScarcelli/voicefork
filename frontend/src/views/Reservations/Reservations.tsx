import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { TextStyle } from './styles.js';

function Reservations({navigation}:any) {
    return (
        <SafeAreaView>
            <Text style={TextStyle.baseText}>Reservations</Text>
        </SafeAreaView>
    )
}

export default Reservations;
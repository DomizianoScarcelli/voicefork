import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { TextStyle } from './styles.js';

function Settings({navigation}:any) {
    return (
        <SafeAreaView>
            <Text style={TextStyle.baseText}>Settings</Text>
        </SafeAreaView>
    )
}

export default Settings;
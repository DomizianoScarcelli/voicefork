import React from 'react';
import { Text, Button, SafeAreaView, Linking } from 'react-native';
import { homepageText } from './styles.js';

function Homepage({navigation}:any) {
    return (
        <SafeAreaView>
            <Button onPress={() => Linking.openURL("voicefork://settings")} title='Go a test page' />
            <Text style={homepageText.baseText}>This is the homepage</Text>
        </SafeAreaView>
    )
}

export default Homepage;
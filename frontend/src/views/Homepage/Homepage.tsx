import React from 'react';
import { Text, Button, StyleSheet, SafeAreaView } from 'react-native';
import { homepageText } from './styles.js';

function Homepage({navigation}:any) {
    return (
        <SafeAreaView>
            <Button onPress={() => navigation.navigate('Test')} title='Go a test page' />
            <Text style={homepageText.baseText}>This is the homepage</Text>
        </SafeAreaView>
    )
}

export default Homepage;
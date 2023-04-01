import React from 'react';
import { Text, SafeAreaView, Button, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    text: {
        color: 'black',
        fontSize: 10
    }
})

const Test = ({navigation}:any) => {
    return (
        <SafeAreaView>
            <Button onPress={() => navigation.navigate('Homepage')} title='Go back to Homepage' />
            <Text style={styles.text}>This is a test page</Text>
        </SafeAreaView>
    )
};

export default Test;
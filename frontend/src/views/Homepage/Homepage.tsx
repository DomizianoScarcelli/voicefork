import React, { useEffect } from 'react';
import { Text, Button, SafeAreaView, Linking, Alert, TouchableOpacity } from 'react-native';
import { Colors, FontSize, Fonts, Layout, Spacing } from '../../constants';
import { homepageText } from './styles.js';
import EncryptedStorage from 'react-native-encrypted-storage';

function Homepage({navigation}:any) {
    async function retrieveUserSession() {
        try {   
            const session = await EncryptedStorage.getItem("user_session");
            if (session === undefined) {
                navigation.navigate("Welcome")
            }
        } catch (error) {
            navigation.navigate("Welcome")
        }
    }

    async function logout() {
        try {
            await EncryptedStorage.removeItem("user_session");
            navigation.navigate("Welcome")
        } catch (error) {
            Alert.alert(  
                'Something is wrong',  
                "We can't complete this task. Please, try again",  
                [  
                    {text: 'OK'},  
                ]  
            )
        }
    }
    
    useEffect(() => {
		retrieveUserSession()
	}, [])

    return (
        <SafeAreaView>
            <Button onPress={() => Linking.openURL("voicefork://settings")} title='Go a test page' />
            <Text style={homepageText.baseText}>This is the homepage</Text>

            <TouchableOpacity
                onPress={() => logout()}
                style={{
                    backgroundColor: Colors.green,
                    paddingVertical: Spacing,
                    paddingHorizontal: Spacing,
                    width: "48%",
                    borderRadius: Spacing,
                    shadowColor: Colors.black,
                    shadowOffset: {
                        width: 0,
                        height: Spacing,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: Spacing,
                }}>
                <Text
                    style={{
                        fontFamily: Fonts["poppins-bold"],
                        color: Colors.white,
                        fontSize: FontSize.large,
                        textAlign: "center",
                    }}>
                    Logout
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Homepage;
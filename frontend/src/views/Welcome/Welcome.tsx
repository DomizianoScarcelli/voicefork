import React, { useState, useEffect } from "react"
import { Alert, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import { Colors } from "../../constants"
import Ionicons from 'react-native-vector-icons/Ionicons'
import InputField from "../../components/InputField/InputField"
import axios from "axios"
import EncryptedStorage from "react-native-encrypted-storage"
import { ScrollView } from "react-native-gesture-handler"
import { welcome_style } from "./styles.js"
import Config from "react-native-config"

function Welcome({ navigation } : any) {
    const [formValues, setFormValues] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState( { email: '', password: '' })
    const [loading, setLoading] = useState(false)

    async function retrieveUserSession() {
        try {   
            const session = await EncryptedStorage.getItem("user_session");
            if (session !== undefined) {
                navigation.navigate("Homepage")
            }
        } catch (error) {
            // Stay in Welcome page
        }
    }

    async function storeUserSession(response: any) {
        try {
                await EncryptedStorage.setItem(
                "user_session",
                JSON.stringify({
                    name: response.data.name,
                    surname: response.data.surname,
                    email: response.data.email,
                    id: response.data.id
                }))
                return true
        } catch (error) {
            Alert.alert(  
                'Something is wrong',  
                "We can't complete this task. Please, try again",  
                [  
                    {text: 'OK'},  
                ]  
            )
            return false
        }
    }

    
    useEffect(() => {
		retrieveUserSession()
	}, [])

    const validateEmail = () => {
        let isValid = true

        if (!formValues.email) {
            handleError("You must specify an email address", "email")
            isValid = false
        } else if (!formValues.email.match(/\S+@\S+\.\S+/)) {
            handleError("You must specify a valid email address", "email")
            isValid = false
        }

        return isValid
    }

    const validatePassword = () => {
        let isValid = true

        if (!formValues.password) {
            handleError("You must specify a password", "password")
            isValid = false
        }

        return isValid
    }

    const validateData = () => {
        setLoading(true)
        const isValidEmail = validateEmail()
        const isValidPassword = validatePassword()
        
        if (isValidEmail && isValidPassword) {
            login()
        } else {
            Alert.alert(  
                'Something is wrong',  
                'Please, check your data and try again',  
                [  
                    {text: 'OK'},  
                ]  
            )
            setLoading(false)
        }
    }

    const login = () => {
        let formData = {
            "email": formValues["email"],
            "password": formValues["password"]
        }

        axios.post(`${Config.USERS_SERVER_BASE_URL}/login`, formData)
        .then(async function(response) {
            if (response.status === 200) {
                const isDataStored = storeUserSession(response)
                if (await isDataStored) {
                    navigation.navigate("Homepage")
                } else {
                    Alert.alert(  
                        'Something is wrong',  
                        "We can't complete this task. Please, try again",  
                        [  
                            {text: 'OK'},  
                        ]  
                    )
                }
            }
        })
        .catch(function(error) {
            Alert.alert(  
                'Something is wrong',  
                "We can't complete this task. Please, try again",  
                [  
                    {text: 'OK'},  
                ]  
            )
        })
        setLoading(false)
    }

    const handleOnChange = (text: string, input: any) => {
        setFormValues({...formValues, [input]: text})
    }

    const handleError = (error: string, input: any) => {
        setErrors(prevState => ({...prevState, [input]: error}))
    }

    return (
        <SafeAreaView style={welcome_style.safe_area_view}>
            <ScrollView>
                <View
                    style={welcome_style.external_view}>
                    <View
                    style={welcome_style.upper_section}>
                        <View
                            style={welcome_style.upper_section_text}>
                            <Text
                                style={welcome_style.upper_section_text_title}>
                                Discover and book the best restaurants
                            </Text>

                            <Text
                                style={welcome_style.upper_section_text_description}>
                                Discover and book the best restaurants and leave reviews by also using your voice 
                            </Text>
                        </View>
                        <View
                        style={welcome_style.middle_section}>
                        <Text>Email:</Text>
                        <InputField
                            label = {"Email"}
                            icon = {<Ionicons name={"mail-outline"} size={20} color={errors.email ? Colors.lightRed : Colors.green} />}
                            keyboardType="default"
                            value={formValues.email}
                            onChangeText={(text:string) => handleOnChange(text, "email")}
                            onFocus={() => handleError("", "email")}
                            error={errors.email}
                        />
                        <Text>Password:</Text>
                        <InputField
                            label = {"Password"}
                            icon = {<Ionicons name={"lock-closed-outline"} size={20} color={errors.password ? Colors.lightRed : Colors.green}/>}
                            keyboardType="default"
                            inputType="password"
                            value={formValues.password}
                            onChangeText={(text:string) => handleOnChange(text, "password")}
                            onFocus={() => handleError("", "password")}
                            error={errors.password}
                        />
                        </View>
                        <View
                            style={welcome_style.middle_section_button_spacing}>
                            <TouchableOpacity
                                onPress={() => validateData()}
                                disabled={loading}
                                style={welcome_style.middle_section_login_button}>
                                <Text
                                    style={welcome_style.middle_section_login_button_text}>
                                    {loading ? "Logging in.." : "Login"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View
                        style={welcome_style.lower_section}>
                        <Text>
                            Not a member yet? &nbsp;
                            <Text
                                style={welcome_style.lower_section_text}
                                onPress={() => navigation.navigate("Registration")}>
                                Register Now
                            </Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Welcome;
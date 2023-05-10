import React, { useState } from 'react'
import { Alert, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../../constants'
import Ionicons from 'react-native-vector-icons/Ionicons'
import InputField from '../../components/InputField/InputField'
import { ScrollView } from 'react-native-gesture-handler'
import axios from 'axios'
import { registration_style } from "./styles.js"

function Registration({navigation}:any) {
    const [formValues, setFormValues] = useState({ email: '', password: '', name: '', surname: '' })
    const [errors, setErrors] = useState( { email: '', password: '', name: '', surname: '' } )
    const [loading, setLoading] = useState(false)

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
        } else if (formValues.password.length < 5) {
            handleError('Min password length of 5', "password")
            isValid = false;
        }

        return isValid
    }

    const validateName = () => {
        let isValid = true

        if (!formValues.name) {
            handleError('You must specify your first name', 'name');
            isValid = false;
        } else if (!formValues.name.match(/^[A-Za-z]*$/)) {
            handleError("You must specify a valid first name", "name")
            isValid = false
        }

        return isValid
    }

    const validateSurname = () => {
        let isValid = true

        if (!formValues.surname) {
            handleError('You must specify your last name', 'surname');
            isValid = false;
        } else if (!formValues.surname.match(/^[A-Za-z]*$/)) {
            handleError("You must specify a valid last name", "surname")
            isValid = false
        }

        return isValid
    }

    const validateData = () => {
        setLoading(true)
        const isValidEmail = validateEmail()
        const isValidPassword = validatePassword()
        const isValidName = validateName()
        const isValidSurname = validateSurname()
        
        if (isValidEmail && isValidPassword && isValidName && isValidSurname) {
            registerUser()
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

    const registerUser = () => {
        let formData = {
            "email": formValues["email"],
            "password": formValues["password"],
            "name": formValues["name"],
            "surname": formValues["surname"],
            "role": "customer"
        }

        axios.post("http://localhost:3000/users/create-user", formData)
        .then(function(response) {
            if (response.status === 200) {
                Alert.alert(  
                    'User created successfully',  
                    'You can login now',  
                    [  
                        {text: 'OK',
                        onPress: () => navigation.navigate("Welcome")}
                    ]  
                )
            }
        })
        .catch(function(error) {
            Alert.alert(  
                'Something is wrong',  
                error.response.data,
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
        <SafeAreaView style={registration_style.safe_area}>
            <ScrollView>
                <View style={registration_style.external_view}>
                    <View
                    style={registration_style.upper_section}>
                        <View
                            style={registration_style.upper_section_spacing}>
                            <Text
                                style={registration_style.upper_section_text}>
                                Join us!
                            </Text>

                            <Text
                                style={registration_style.upper_section_description}>
                                Register a new account to start using the app
                            </Text>
                        </View>
                        <View
                        style={registration_style.middle_section}>
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
                            label = {'Password'}
                            icon = {<Ionicons name={"lock-closed-outline"} size={20} color={errors.password ? Colors.lightRed : Colors.green} />}
                            keyboardType="default"
                            inputType="password"
                            value={formValues.password}
                            onChangeText={(text: any) => handleOnChange(text, "password")}
                            onFocus={() => handleError("", "password")}
                            error={errors.password}
                        />
                        <Text>Name:</Text>
                        <InputField
                            label = {"Name"}
                            icon = {<Ionicons name={"person-outline"} size={20} color={errors.name ? Colors.lightRed : Colors.green} />}
                            keyboardType="default"
                            value={formValues.name}
                            onChangeText={(text:string) => handleOnChange(text, "name")}
                            onFocus={() => handleError("", "name")}
                            error={errors.name}
                        />
                        <Text>Surname:</Text>
                        <InputField
                            label = {'Surname'}
                            icon = {<Ionicons name={"person-outline"} size={20} color={errors.surname ? Colors.lightRed : Colors.green} />}
                            keyboardType="default"
                            value={formValues.surname}
                            onChangeText={(text:string) => handleOnChange(text, "surname")}
                            onFocus={() => handleError("", "surname")}
                            error={errors.surname}
                        />
                        </View>
                        <View
                            style={registration_style.middle_section_button_spacing}>
                            <TouchableOpacity
                                onPress={() => validateData()}
                                disabled={loading}
                                style={registration_style.middle_section_button}>
                                <Text
                                    style={registration_style.middle_section_button_text}>
                                    {loading ? "Signing in.." : "Sign in"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View
                        style={registration_style.lower_section}>
                        <Text>
                            Already have an account? &nbsp;
                            <Text
                                style={registration_style.lower_section_text}
                                onPress={() => navigation.navigate("Welcome")}>
                                Login
                            </Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Registration;
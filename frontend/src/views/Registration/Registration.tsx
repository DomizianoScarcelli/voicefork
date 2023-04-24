import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Colors, FontSize, Fonts, Layout, Spacing } from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputField from '../../components/InputField/InputField';
import { ScrollView } from 'react-native-gesture-handler';
import Login from '../../utils/api';
import axios from 'axios';

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
            );
        }
    }

    const registerUser = () => {
        let formData = {
            "email": formValues["email"],
            "username": "test2",
            "password": formValues["password"],
            "name": formValues["name"],
            "surname": formValues["surname"],
            "role": "customer"
        }

        axios.post('http://localhost:3000/users/create-user', formData)
        .then(function(response) {
            if (response.status === 200) {
                Alert.alert(  
                    'User created successfully',  
                    "You can login now",  
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
                "We can't complete this task. Please, try again",  
                [  
                    {text: 'OK'},  
                ]  
            )
        })
    }

    const handleOnChange = (text: string, input: any) => {
        setFormValues({...formValues, [input]: text})
    }

      const handleError = (error: string, input: any) => {
        setErrors(prevState => ({...prevState, [input]: error}))
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: Colors.gray,
                height: Layout.height
            }}>
            <ScrollView>
                <View style={{
                    justifyContent: "space-between",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <View
                    style={{
                        flex: 1,
                        justifyContent: "flex-start"
                    }}>
                        <View
                            style={{
                                paddingHorizontal: Spacing * 4,
                                paddingTop: Spacing * 4,
                            }}>
                            <Text
                                style={{
                                    fontSize: FontSize.xxLarge,
                                    color: Colors.black,
                                    fontFamily: Fonts["poppins-bold"],
                                    textAlign: "center",
                                }}>
                                Join us!
                            </Text>

                            <Text
                                style={{
                                    fontSize: FontSize.small,
                                    color: Colors.black,
                                    fontFamily: Fonts["poppins-regular"],
                                    textAlign: "center",
                                    marginTop: Spacing * 2,
                                }}>
                                Register a new account to start using the app
                            </Text>
                        </View>
                        <View
                        style={{
                            paddingHorizontal: Spacing * 3,
                            paddingVertical: Spacing * 2,
                        }}>
                        <Text>Email:</Text>
                        <InputField
                            label = {"Email"}
                            keyboardType="default"
                            value={formValues.email}
                            onChangeText={(text:string) => handleOnChange(text, "email")}
                            onFocus={() => handleError("", "email")}
                            error={errors.email}
                        />
                        <Text>Password:</Text>
                        <InputField
                            label = {'Password'}
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
                            keyboardType="default"
                            value={formValues.name}
                            onChangeText={(text:string) => handleOnChange(text, "name")}
                            onFocus={() => handleError("", "name")}
                            error={errors.name}
                        />
                        <Text>Surname:</Text>
                        <InputField
                            label = {'Surname'}
                            keyboardType="default"
                            value={formValues.surname}
                            onChangeText={(text:string) => handleOnChange(text, "surname")}
                            onFocus={() => handleError("", "surname")}
                            error={errors.surname}
                        />
                        </View>
                        <View
                            style={{
                                paddingHorizontal: Spacing * 2,
                                paddingTop: Spacing,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                            <TouchableOpacity
                                onPress={() => validateData()}
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
                                    Sign in
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <KeyboardAvoidingView
                        style={{
                            flex: 1,
                            justifyContent: "flex-end",
                            marginVertical: 20
                        }}>
                        <Text>
                            Already have an account? &nbsp;
                            <Text
                                style={{
                                    paddingLeft: 10,
                                    color: Colors.green
                                }}
                                onPress={() => navigation.navigate("Welcome")}>
                                Login
                            </Text>
                        </Text>
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Registration;
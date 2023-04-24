import React, { useState } from "react"
import { Alert, Image, KeyboardAvoidingView, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import { Colors, FontSize, Fonts, Spacing, Layout } from "../../constants"
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputField from "../../components/InputField/InputField";
import axios from "axios";

function Welcome({ navigation } : any) {
    const [formValues, setFormValues] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState( { email: '', password: '' } )

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
            );
        }
    }

    const login = () => {
        let formData = {
            "email": formValues["email"],
            "password": formValues["password"]
        }

        axios.post('http://localhost:3000/users/login', formData)
        .then(function(response) {
            if (response.status === 200) {
                Alert.alert(  
                    'Login ok',  
                    response.data.id,  
                    [  
                        {text: 'OK'},  
                    ]  
                )
            }
        })
        .catch(function(error) {
            console.log(error)
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
            <View
                style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "column",
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
                            Discover and book the best restaurants
                        </Text>

                        <Text
                            style={{
                                fontSize: FontSize.small,
                                color: Colors.black,
                                fontFamily: Fonts["poppins-regular"],
                                textAlign: "center",
                                marginTop: Spacing * 2,
                            }}>
                            Discover and book the best restaurants and leave reviews by also using your voice 
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
                        label = {"Password"}
                        icon = {<Ionicons name={"lock-closed-outline"} size={20} color={Colors.green} />}
                        keyboardType="default"
                        inputType="password"
                        value={formValues.password}
                        onChangeText={(text:string) => handleOnChange(text, "password")}
                        onFocus={() => handleError("", "password")}
                        error={errors.password}
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
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <KeyboardAvoidingView
                    style={{
                        flex: 1,
                        justifyContent: "flex-end",
                        marginBottom: 20
                    }}>
                    <Text>
                        Not a member yet? &nbsp;
                        <Text
                            style={{
                                paddingLeft: 10,
                                color: Colors.green
                            }}
                            onPress={() => navigation.navigate("Registration")}>
                            Register Now
                        </Text>
                    </Text>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    )
}

export default Welcome;
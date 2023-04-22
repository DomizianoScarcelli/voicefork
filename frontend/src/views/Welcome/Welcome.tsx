import React from "react"
import { Image, KeyboardAvoidingView, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import { Colors, FontSize, Fonts, Spacing, Layout } from "../../constants"
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputField from "../../components/InputField/InputField";
import logo from "../../assets/logo"

function Welcome({ navigation } : any) {
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
                    <InputField
                        label = {'Username'}
                        icon = {<Ionicons name={"person-outline"} size={20} color={Colors.green} />}
                        keyboardType="default"
                    />
                    <InputField
                        label = {'Password'}
                        icon = {<Ionicons name={"lock-closed-outline"} size={20} color={Colors.green} />}
                        keyboardType="default"
                        inputType="password"
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
                            onPress={() => true}
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
                            }}>
                            Register Now
                        </Text>
                    </Text>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    )
}

export default Welcome;
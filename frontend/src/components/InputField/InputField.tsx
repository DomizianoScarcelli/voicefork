import React, { useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants";

function InputField({label, icon, error, inputType, keyboardType, fieldButtonLabel, fieldButtonFunction, ...props} : any) {
    const isError = () => {
        if (error) {
            return Colors.lightRed
        } else {
            return Colors.darkGreen
        }
    }
    
    return (
        <View style={{
            marginBottom: 5
        }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: "center",
                    borderColor: isError(),
                    borderWidth: 2,
                    borderRadius: 8,
                    padding: 8
                }}>
                {icon}
                {inputType == "password" ? (
                    <TextInput
                        placeholder={label}
                        keyboardType={keyboardType}
                        style={{flex: 1, paddingVertical: 0}}
                        secureTextEntry={true}
                        {...props}
                    />
                ) : (
                    <TextInput
                        placeholder={label}
                        keyboardType={keyboardType}
                        style={{flex: 1, paddingVertical: 0}}
                        {...props}
                    />
                )}
                <TouchableOpacity onPress={fieldButtonFunction}>
                    <Text style={{color: '#AD40AF', fontWeight: '700'}}>{fieldButtonLabel}</Text>
                </TouchableOpacity>
            </View>
            {error && (
                <Text style={{marginTop: 7, color: Colors.lightRed}}>
                {error}
                </Text>
            )}
        </View>
            
    )
}

export default InputField;
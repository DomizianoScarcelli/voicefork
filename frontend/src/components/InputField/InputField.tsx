import React from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants";

function InputField({label, icon, inputType, keyboardType, fieldButtonLabel, fieldButtonFunction} : any) {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: "center",
                borderColor: Colors.green,
                borderWidth: 2,
                borderRadius: 20,
                padding: 8,
                marginVertical: 5
            }}>
            {icon}
            {inputType == 'password' ? (
                <TextInput
                    placeholder={label}
                    keyboardType={keyboardType}
                    style={{flex: 1, paddingVertical: 0}}
                    secureTextEntry={true}
                />
            ) : (
                <TextInput
                    placeholder={label}
                    keyboardType={keyboardType}
                    style={{flex: 1, paddingVertical: 0}}
                    secureTextEntry={true}
                />
            )}
            <TouchableOpacity onPress={fieldButtonFunction}>
                <Text style={{color: '#AD40AF', fontWeight: '700'}}>{fieldButtonLabel}</Text>
            </TouchableOpacity>
        </View>
            
    )
}

export default InputField;
import React from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { input_field_style } from "./styles";
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
        <View style={input_field_style.external_view}>
            <View
                style={[input_field_style.internal_view, {borderColor: isError()}]}>
                {icon}
                {inputType == "password" ? (
                    <TextInput
                        placeholder={label}
                        keyboardType={keyboardType}
                        style={input_field_style.text_input}
                        secureTextEntry={true}
                        {...props}
                    />
                ) : (
                    <TextInput
                        placeholder={label}
                        keyboardType={keyboardType}
                        style={input_field_style.text_input}
                        {...props}
                    />
                )}
                <TouchableOpacity onPress={fieldButtonFunction}>
                    <Text style={input_field_style.button}>{fieldButtonLabel}</Text>
                </TouchableOpacity>
            </View>
            {error && (
                <Text style={input_field_style.error_text}>
                    {error}
                </Text>
            )}
        </View>
            
    )
}

export default InputField;
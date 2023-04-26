import { StyleSheet } from 'react-native'
import { Colors, FontSize, Fonts, Spacing, Layout } from "../../constants"

export const welcome_style = StyleSheet.create({
    safe_area_view: {
        flex: 1,
        alignItems: "center",
        backgroundColor: Colors.gray,
        height: Layout.height
    },

    external_view: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
    },

    upper_section: {
        flex: 1,
        justifyContent: "flex-start"
    },

    upper_section_text: {
        paddingHorizontal: Spacing * 4,
        paddingTop: Spacing * 4,
    },

    upper_section_text_title: {
        fontSize: FontSize.xxLarge,
        color: Colors.black,
        fontFamily: Fonts["poppins-bold"],
        textAlign: "center",
    },

    upper_section_text_description: {
        fontSize: FontSize.small,
        color: Colors.black,
        fontFamily: Fonts["poppins-regular"],
        textAlign: "center",
        marginTop: Spacing * 2,
    },

    middle_section: {
        paddingHorizontal: Spacing * 3,
        paddingVertical: Spacing * 2,
    },

    middle_section_button_spacing: {
        paddingHorizontal: Spacing * 2,
        paddingTop: Spacing,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    middle_section_login_button: {
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
    },

    middle_section_login_button_text: {
        fontFamily: Fonts["poppins-bold"],
        color: Colors.white,
        fontSize: FontSize.large,
        textAlign: "center",
    },

    lower_section: {
        flex: 1,
        justifyContent: "flex-end",
        marginVertical: 20
    },

    lower_section_text: {
        paddingLeft: 10,
        color: Colors.green
    }

})
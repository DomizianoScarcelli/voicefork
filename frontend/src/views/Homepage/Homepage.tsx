import React, {ReactComponentElement, useEffect} from 'react'
import {
    Text,
    Button,
    SafeAreaView,
    Linking,
    Alert,
    TouchableOpacity,
    View,
    TextInput,
    ScrollView,
    FlatList,
    ListRenderItem,
} from 'react-native'
import InputField from '../../components/InputField/InputField'
import {Colors, FontSize, Fonts, Layout, Spacing} from '../../constants'
import {homepageText} from './styles.js'
import EncryptedStorage from 'react-native-encrypted-storage'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HorizontalScrollingSection from '../../components/HorizontalScrollingSection/HorizontalScrollingSection'
import Navbar from '../../components/Navbar/Navbar'
import {homepage_style} from './styles.js'

function Homepage({navigation}: any) {
    async function retrieveUserSession() {
        try {
            const session = await EncryptedStorage.getItem('user_session')
            if (session === null) {
                navigation.navigate('Welcome')
            }
        } catch (error) {
            navigation.navigate('Welcome')
        }
    }

    async function logout() {
        try {
            await EncryptedStorage.removeItem('user_session')
            navigation.navigate('Welcome')
        } catch (error) {
            Alert.alert(
                'Something is wrong',
                "We can't complete this task. Please, try again",
                [{text: 'OK'}],
            )
        }
    }

    useEffect(() => {
        retrieveUserSession()
    }, [])

    const nearbyData = [
        {id: '1', title: 'Restaurant 1'},
        {id: '2', title: 'Restaurant 2'},
        {id: '3', title: 'Restaurant 3'},
        {id: '4', title: 'Restaurant 4'},
        {id: '5', title: 'Restaurant 5'},
        {id: '6', title: 'Restaurant 6'},
    ]

    return (
        <SafeAreaView
            style={{
                backgroundColor: Colors.green,
            }}>
            <Navbar />
            <ScrollView style={homepage_style.main_view}>
                <HorizontalScrollingSection
                    title={'Cuisines'}
                    data={nearbyData}
                    renderItem={({item}) => (
                        <View
                            style={{
                                width: 100,
                                height: 100,
                                backgroundColor: Colors.gray,
                                margin: 10,
                            }}>
                            <Text>{item.title}</Text>
                        </View>
                    )}
                />
                <HorizontalScrollingSection
                    title={'Nearby'}
                    data={nearbyData}
                    renderItem={({item}) => (
                        <View
                            style={{
                                width: 100,
                                height: 100,
                                backgroundColor: Colors.gray,
                                margin: 10,
                            }}>
                            <Text>{item.title}</Text>
                        </View>
                    )}
                />
                <HorizontalScrollingSection
                    title={'Top picks for you'}
                    data={nearbyData}
                    renderItem={({item}) => (
                        <View
                            style={{
                                width: 100,
                                height: 100,
                                backgroundColor: Colors.gray,
                                margin: 10,
                            }}>
                            <Text>{item.title}</Text>
                        </View>
                    )}
                />

                <TouchableOpacity
                    onPress={() => logout()}
                    style={{
                        backgroundColor: Colors.green,
                        paddingVertical: Spacing,
                        paddingHorizontal: Spacing,
                        width: '48%',
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
                            fontFamily: Fonts['poppins-bold'],
                            color: Colors.white,
                            fontSize: FontSize.large,
                            textAlign: 'center',
                        }}>
                        Logout
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Homepage

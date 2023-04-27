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

    const NavBar = () => {
        return (
            <View
                style={{
                    backgroundColor: Colors.green,
                    width: '100%',
                    height: '25%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingLeft: 15,
                    paddingRight: 15,
                    gap: 10,
                    maxHeight: 60,
                }}>
                <Ionicons
                    name={'person-outline'}
                    size={30}
                    color={Colors.white}
                />
                <View
                    style={{
                        position: 'relative',
                        flexGrow: 1,
                        height: '70%',
                        backgroundColor: Colors.white,
                        borderRadius: 16,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingLeft: 40,
                    }}>
                    <TextInput
                        style={{
                            fontFamily: Fonts['poppins-regular'], //TODO insert bold, ios has problems
                            fontSize: FontSize.small,
                            alignSelf: 'flex-start',
                        }}
                        placeholder="Type of food, restaurant name..."
                        autoCapitalize="sentences"
                        autoCorrect={false}
                    />
                    <Ionicons
                        name={'search-outline'}
                        size={20}
                        color={Colors.black}
                        style={{position: 'absolute', left: 15}}
                    />
                </View>

                <Ionicons name={'location'} size={30} color={Colors.white} />
            </View>
        )
    }

    const nearbyData = [
        {id: '1', title: 'Restaurant 1'},
        {id: '2', title: 'Restaurant 2'},
        {id: '3', title: 'Restaurant 3'},
        {id: '4', title: 'Restaurant 4'},
        {id: '5', title: 'Restaurant 5'},
        {id: '6', title: 'Restaurant 6'},
    ]
    const HorizontalScrollingSection = ({
        title,
        renderItem,
        ...props
    }: {
        title: String
        renderItem: ListRenderItem<{
            id: string
            title: string
        }>
    }) => {
        return (
            <>
                <Text
                    style={{
                        fontSize: FontSize.xxLarge,
                        fontFamily: Fonts['poppins-bold'],
                    }}>
                    {title}
                </Text>
                <FlatList
                    horizontal={true}
                    data={nearbyData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}></FlatList>
            </>
        )
    }

    return (
        <SafeAreaView
            style={{
                backgroundColor: Colors.green,
            }}>
            <NavBar />
            <ScrollView
                style={{
                    backgroundColor: Colors.white,
                    width: '100%',
                    height: '100%',
                    padding: 15,
                }}>
                <HorizontalScrollingSection
                    title={'Cuisines'}
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

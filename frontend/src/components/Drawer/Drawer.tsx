import React, {useEffect, useState} from 'react'
import { View, Text, Image, Alert, TouchableOpacity } from 'react-native';
import { drawerStyle } from './styles';
import {Colors, Fonts, FontSize, Spacing} from '../../constants'
import Ionicons from 'react-native-vector-icons/Ionicons'
import EncryptedStorage from 'react-native-encrypted-storage'
import axios from 'axios'
import {
  User,
} from '../../shared/types'
import { useNavigation } from '@react-navigation/native';

const Drawer = ({route, navigation}: any) => {
    const {currentView} = route.params
    
    const [isLoading, setLoading] = useState<boolean>(true)
    const [userId, setUserId] = useState<number>()
    const [userData, setUserData] = useState<
        User
    >()

    useEffect(() => {
        retrieveUserSession()
    }, [])

    useEffect(() => {
        console.log('userData', userData)
    }, [userData])

    useEffect(() => {
        console.log('userId', userId)
        if (userId != undefined) getUserData(userId)
    }, [userId])

    const retrieveUserSession = async () => {
        try {
            const session = await EncryptedStorage.getItem('user_session')
            if (session === null) {
                navigation.navigate('Welcome')
            } else {
                const user_id = JSON.parse(session)['id']
                setUserId(user_id)
                console.log('user id get')
            }
        } catch (error) {
            navigation.navigate('Welcome')
        }
    }

    const getUserData = async (user_id: number) => {
        const URL = `http://localhost:3000/users/get-user/${user_id}`
        console.log('axios call made')
        const user: User = (await axios.get(URL)).data

        setLoading(false)
        setUserData(user)
    }

  const logout = async () => {
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

  return (
    <View style={drawerStyle.container}>
      <Ionicons style={drawerStyle.iconContainer} name={'close-outline'} size={30} color={Colors.black} onPress={() => navigation.navigate(currentView)}/>
      <View style={drawerStyle.profileContainer}>
        <Image source={{uri: 'https://picsum.photos/100'}} style={drawerStyle.profileImage} />
        <Text style={drawerStyle.name}> {userData?.name} {userData?.surname}</Text>
        <Text style={drawerStyle.name}> {userData?.email}</Text>

      </View>
      <TouchableOpacity
          onPress={() => navigation.navigate('Homepage')}
          style={{
              backgroundColor: Colors.green,
              paddingVertical: Spacing,
              paddingHorizontal: Spacing,
              marginBottom: 20,
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
              Homepage
          </Text>
      </TouchableOpacity>
      <TouchableOpacity
          onPress={() => navigation.navigate('Reservations')}
          style={{
              backgroundColor: Colors.green,
              paddingVertical: Spacing,
              paddingHorizontal: Spacing,
              marginBottom: 20,
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
              Reservations
          </Text>
      </TouchableOpacity>
      <TouchableOpacity
          onPress={() => logout()}
          style={{
              backgroundColor: Colors.lightRed,
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
    </View>
  );
};


export default Drawer;
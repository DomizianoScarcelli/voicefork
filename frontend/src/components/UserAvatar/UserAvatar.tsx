import React, {useEffect, useState} from 'react'
import FastImage from 'react-native-fast-image'
import {getUserAvatar} from '../../utils/apiCalls'
import {View} from 'react-native'
interface props {
    imageName: string
    style: any
}
export default function UserAvatar({imageName, style}: props) {
    const [userAvatar, setUserAvatar] = useState<string>()

    useEffect(() => {
        const handleUserAvatar = async () => {
            const image = await getUserAvatar(imageName)
            setUserAvatar(image)
        }
        handleUserAvatar()
    }, [])

    return userAvatar == undefined ? (
        <View style={style} />
    ) : (
        <FastImage source={{uri: userAvatar}} style={style} />
    )
}
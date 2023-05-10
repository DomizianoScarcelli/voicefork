import React, {useEffect, useState} from 'react'
import FastImage from 'react-native-fast-image'
import {getRestaurantImage} from '../../utils/apiCalls'
import {View} from 'react-native'
interface props {
    imageName: string
    style: any
}
export default function RestaurantImage({imageName, style}: props) {
    const [restaurantImage, setRestaurantImage] = useState<string>()

    useEffect(() => {
        const handleRestaurantImage = async () => {
            const image = await getRestaurantImage(imageName)
            setRestaurantImage(image)
        }
        handleRestaurantImage()
    }, [])

    return restaurantImage == undefined ? (
        <View style={style} />
    ) : (
        <FastImage source={{uri: restaurantImage}} style={style} />
    )
}

import React, {useEffect, useState} from 'react'
import FastImage from 'react-native-fast-image'
import {getRestaurantImage} from '../../utils/apiCalls'
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

    return (
        <FastImage
            source={
                restaurantImage == undefined
                    ? {uri: 'https://picsum.photos/100'}
                    : {uri: restaurantImage}
            }
            style={style}
        />
    )
}

import {Image} from 'react-native'
import {CuisineData} from '../../shared/types'

export const cuisineData: CuisineData[] = [
    {
        name: 'American',
        image: Image.resolveAssetSource(
            require('../../assets/images/cuisines/American.png'),
        ).uri,
    },
    {
        name: 'Asian',
        image: Image.resolveAssetSource(
            require('../../assets/images/cuisines/Asian.png'),
        ).uri,
    },
    {
        name: 'Chinese',
        image: Image.resolveAssetSource(
            require('../../assets/images/cuisines/Chinese.png'),
        ).uri,
    },
    {
        name: 'European',
        image: Image.resolveAssetSource(
            require('../../assets/images/cuisines/European.png'),
        ).uri,
    },
    {
        name: 'Fusion',
        image: Image.resolveAssetSource(
            require('../../assets/images/cuisines/Fusion.png'),
        ).uri,
    },
    {
        name: 'International',
        image: Image.resolveAssetSource(
            require('../../assets/images/cuisines/International.png'),
        ).uri,
    },
    {
        name: 'Italian',
        image: Image.resolveAssetSource(
            require('../../assets/images/cuisines/Italian.png'),
        ).uri,
    },
    {
        name: 'Japanese',
        image: Image.resolveAssetSource(
            require('../../assets/images/cuisines/Japanese.png'),
        ).uri,
    },
    {
        name: 'Mediterranean',
        image: Image.resolveAssetSource(
            require('../../assets/images/cuisines/Mediterranean.png'),
        ).uri,
    },
    {
        name: 'Pizza',
        image: Image.resolveAssetSource(
            require('../../assets/images/cuisines/Pizza.png'),
        ).uri,
    },
    {
        name: 'Seafood',
        image: Image.resolveAssetSource(
            require('../../assets/images/cuisines/Seafood.png'),
        ).uri,
    },
    {
        name: 'Traditional',
        image: Image.resolveAssetSource(
            require('../../assets/images/cuisines/Traditional.png'),
        ).uri,
    },
]

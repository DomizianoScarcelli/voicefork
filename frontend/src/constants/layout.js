import { Dimensions } from 'react-native'

const Dimensions = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    isSmallDevice: width < 375
}

export default Dimensions

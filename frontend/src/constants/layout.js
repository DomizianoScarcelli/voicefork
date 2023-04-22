import { Dimensions } from 'react-native'

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

const Layout = {
    width: width,
    height: height,
    isSmallDevice: width < 375
}

export default Layout

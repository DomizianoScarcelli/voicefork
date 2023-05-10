import {useState, useEffect} from 'react'
import EncryptedStorage from 'react-native-encrypted-storage'

interface props {
    navigation: any
}
export const useSession = ({navigation}: props) => {
    const [userId, setUserId] = useState<number>()

    useEffect(() => {
        retrieveUserSession()
    }, [])

    const retrieveUserSession = async () => {
        try {
            const session = await EncryptedStorage.getItem('user_session')
            if (session === null) {
                navigation.navigate('Welcome')
            } else {
                const user_id = JSON.parse(session)['id']
                setUserId(user_id)
            }
        } catch (error) {
            navigation.navigate('Welcome')
        }
    }

    return userId
}

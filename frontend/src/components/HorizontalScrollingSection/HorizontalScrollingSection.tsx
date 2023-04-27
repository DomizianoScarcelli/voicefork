import {ListRenderItem, Text, FlatList} from 'react-native'
import {FontSize, Fonts} from '../../constants'

type HorizontalScrollingSectionProps = {
    title: String
    data: Array<any>
    renderItem: ListRenderItem<{
        id: string
        title: string
    }>
}

const HorizontalScrollingSection = ({
    title,
    data,
    renderItem,
    ...props
}: HorizontalScrollingSectionProps) => {
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
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}></FlatList>
        </>
    )
}

export default HorizontalScrollingSection

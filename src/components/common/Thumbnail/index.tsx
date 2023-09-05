import {
    FC
} from "react"

import {
    View,
    Image,
    StyleSheet,
    StyleProp,
    ViewStyle,
    ImageSourcePropType
} from "react-native"

interface Prop<T> {
    source: ImageSourcePropType,
    style?: StyleProp<T>;
}

const Thumbnail:FC<Prop<ViewStyle>> = ({style, source}) => {
    return (
        <View style={[styles.thumbnailContainer, style]}>
            <Image source={source} style={styles.image} />
        </View>
    )
}

const styles = StyleSheet.create({
    thumbnailContainer: {
        width: 100,
        height: 50,
        backgroundColor: "#dcdcdc"
    },
    image: {
        width: "100%",
        height: "100%",
    }
})

export default Thumbnail;
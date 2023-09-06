import { 
    View,
    StyleSheet,
 } from "react-native"
import { FC } from "react"
import Thumbnail from "../Thumbnail";

import { IPhoto as IPhotoFromStore, IStore } from "../../../redux/store/store";

type Proptype = {
    images: IPhotoFromStore[]
}

const ThumbnailGrid:FC<Proptype> = ({images}) => {

    const thumbnails = images.map(item => (
    <Thumbnail 
        key={item.id}
        source={{uri: item.url}}
        style={[
            {
                width: "32.7%",
                aspectRatio: 1,
                margin: 1
            }]} />))
    return (
        <View style={[
            styles.gridItemContainer,
            ]}>
            {thumbnails}
        </View>
    )
}

const styles = StyleSheet.create({
    gridItemContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        // backgroundColor: "#cb27273d"
        
    },
})

export default ThumbnailGrid
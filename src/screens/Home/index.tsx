import {
    FC
} from "react"

import {
    View,
    StyleSheet,
    ScrollView,
    useWindowDimensions
} from "react-native"
import Thumbnail from "../../components/common/Thumbnail";

interface IDummy {
    key: string;
}

const Home:FC = () => {
    const { width } = useWindowDimensions();
    const gap = 1;
    const itemPerRow = 3;
    const totalGapSize = (itemPerRow) * gap;
    const totalGapSizeInPercet = totalGapSize / width * 100;
    const windowWidth = width;
    const childWidth = (windowWidth - totalGapSize) / itemPerRow;

    const images: Array<IDummy> = new Array<IDummy>();
    for(let i = 1; i <= 100; i++) {
        images.push({
            key: i + ""
        })
    }
    const thumbnails = images.map(item => (
    <Thumbnail 
        key={item.key}
        source={{uri: "https://i.pinimg.com/736x/57/f1/3e/57f13ec1b6e2d5712d03fec842e08356.jpg"}}
        style={[
            styles.gridItem, 
            {
                // width: `${(100.0 - totalGapSizeInPercet) / itemPerRow}%`,
                width: "32.7%",
                aspectRatio: 1,
                margin: 1
            }]} />))
    return (
        <View style={styles.home}>
            <ScrollView style={styles.scrollView}>
                <View style={[
                    styles.gridItemContainer,
                    {
                        // marginVertical: -(gap / 2),
                        // marginHorizontal: -(gap / 2),
                    }
                    ]}>
                    {thumbnails}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    home: {
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff"
    },
    scrollView: {
        display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "#6091890",
    },
    gridItemContainer: {
        // paddingHorizontal: "5%",
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: "#cb27273d"
        
    },
    gridItem: {
        // backgroundColor: "#fff"
    }
})

export default Home;
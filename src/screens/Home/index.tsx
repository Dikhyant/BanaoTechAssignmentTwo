import {
    FC, useEffect
} from "react"

import {
    View,
    StyleSheet,
    ScrollView,
    useWindowDimensions
} from "react-native"

import {
    useSelector,
    useDispatch
} from "react-redux"

import axios from "axios"

import Thumbnail from "../../components/common/Thumbnail";
import { IPhoto as IPhotoFromStore, IStore } from "../../redux/store/store";
import { RootState } from "../../redux/reducers/rootReducer";
import { addRecentPhotos } from "../../redux/actions/photo";
import { FLICKR_GET_RECENT_PHOTO_API_URL } from "../../api/constants";
import { IPhotosFlickr } from "../../interfaces/flickr/IPhotosFlickr";
import { IPhotos as IPhotoFromAsyncStorage, RECENT_PHOTO_KEY } from "../../interfaces/asyncStorage/asyncStorage"
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home:FC = () => {
    const { width } = useWindowDimensions();
    const gap = 1;
    const itemPerRow = 3;
    const totalGapSize = (itemPerRow) * gap;
    const totalGapSizeInPercet = totalGapSize / width * 100;
    const windowWidth = width;
    const childWidth = (windowWidth - totalGapSize) / itemPerRow;

    const dispatch = useDispatch();

    useEffect(() => {
        const photos: IPhotoFromStore[] = new Array<IPhotoFromStore>();

        const savePhotos = async (data: IPhotoFromAsyncStorage) => {
            try {
                const dataString: string = JSON.stringify(data)
                await AsyncStorage.setItem(RECENT_PHOTO_KEY, dataString)
            } catch(error) {
                console.error(error);
            }
        }

        const loadPhotosFromAsyncStorage = async (): Promise<IPhotoFromAsyncStorage> => {
            try {
                const dataString: string = await AsyncStorage.getItem(RECENT_PHOTO_KEY)
                return (dataString !== null ? JSON.parse(dataString) : null) as IPhotoFromAsyncStorage
            } catch(error) {
                console.error(error)
                return error
            }
        }

        axios.get(FLICKR_GET_RECENT_PHOTO_API_URL)
        .then(response => {
            // console.log(response.data)
            const result: IPhotosFlickr = response.data as IPhotosFlickr
            // console.log(result)
            for(let i = 0; i < result.photos.photo.length; i++) {
                photos.push({
                    id: result.photos.photo[i].id,
                    url: result.photos.photo[i].url_s,
                })
            }

            savePhotos({
                photos: photos
            })

            dispatch(addRecentPhotos({
                photos: photos
            }))
        })
        .catch(error => {
            // console.error(error)

            loadPhotosFromAsyncStorage()
            .then(response => {
                dispatch(addRecentPhotos({
                    photos: response.photos
                }))
            })
            .catch(e => {
                console.error("Failed to load images from local storage")
                console.error(e)
            })
        })

    }, [])

    const store: IStore = useSelector((state: RootState) => state.reducer)

    const images: Array<IPhotoFromStore> = new Array<IPhotoFromStore>();
    for(let i = 0; i < store.recentPhotos.length; i++) {
        images.push({
            id: store.recentPhotos[i].id,
            url: store.recentPhotos[i].url
        })
    }
    const thumbnails = images.map(item => (
    <Thumbnail 
        key={item.id}
        source={{uri: item.url}}
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
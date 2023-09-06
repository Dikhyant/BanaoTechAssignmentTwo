import {
    FC, 
    useEffect,
} from "react"

import {
    View,
    StyleSheet,
    ScrollView,
} from "react-native"

import {
    useDispatch,
    useSelector,
} from "react-redux"

import { IPhoto as IPhotoFromStore, IStore } from "../../redux/store/store";
import { RootState } from "../../redux/reducers/rootReducer";
import NetInfo from "@react-native-community/netinfo";

import ThumbnailGrid from "../../components/common/ThumbnailGrid/index";
import loadPhotosFromCacheIntoStore from "../../utils/loadPhotosFromCacheIntoStore";
import fetchRecentPhotosAndLoadIntoStore from "../../api/fetchRecentPhotosAndLoadIntoStore";
import ContentUnavailable from "../../components/common/ContentUnavailable";

const Home:FC = () => {
    const dispatch = useDispatch()
    const store: IStore = useSelector((state: RootState) => state.reducer)
    const fetchRecentImageAfter: number = 7000; // fetch images after given milliseconds

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            let timer: NodeJS.Timeout
            if(state.isConnected) {
                // if device is connected to a network
                fetchRecentPhotosAndLoadIntoStore({ dispatch, onFailure: error => {loadPhotosFromCacheIntoStore({dispatch: dispatch})}})
                timer = setInterval(() => {
                    fetchRecentPhotosAndLoadIntoStore({
                        dispatch,
                        onFailure: error => {
                            loadPhotosFromCacheIntoStore({dispatch: dispatch})
                        }
                    })
                }, fetchRecentImageAfter)

                return
            }

            loadPhotosFromCacheIntoStore({dispatch: dispatch})
            // kill the timer if device is offline
            if(timer) clearTimeout(timer)
        })

        return () => {unsubscribe()}
    }, [])
    
    const images: Array<IPhotoFromStore> = new Array<IPhotoFromStore>();
    for(let i = 0; i < store.recentPhotos.length; i++) {
        images.push({
            id: store.recentPhotos[i].id,
            url: store.recentPhotos[i].url
        })
    }

    const isContentAvailable = images.length !== 0

    return (
        <View style={styles.home}>
            {
                isContentAvailable
                    ?
                <ScrollView style={styles.scrollView}>
                    <ThumbnailGrid images={images} />
                </ScrollView>
                    :
                <ContentUnavailable />
            }
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
        backgroundColor: "#6091890",
    },
})

export default Home;
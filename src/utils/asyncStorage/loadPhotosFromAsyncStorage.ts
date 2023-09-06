import AsyncStorage from "@react-native-async-storage/async-storage"
import { IPhotos as IPhotoFromAsyncStorage, RECENT_PHOTO_KEY } from "../../interfaces/asyncStorage/asyncStorage"

const loadPhotosFromAsyncStorage = async (): Promise<IPhotoFromAsyncStorage> => {
    try {
        const dataString: string = await AsyncStorage.getItem(RECENT_PHOTO_KEY)
        return (dataString !== null ? JSON.parse(dataString) : null) as IPhotoFromAsyncStorage
    } catch(error) {
        console.error(error)
        return error
    }
}

export default loadPhotosFromAsyncStorage;
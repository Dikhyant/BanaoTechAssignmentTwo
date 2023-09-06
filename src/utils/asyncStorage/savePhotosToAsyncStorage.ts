import AsyncStorage from "@react-native-async-storage/async-storage";
import { IPhotos as IPhotoFromAsyncStorage, RECENT_PHOTO_KEY } from "../../interfaces/asyncStorage/asyncStorage"

const savePhotosToAsyncStorage = async (data: IPhotoFromAsyncStorage) => {
    try {
        const dataString: string = JSON.stringify(data)
        await AsyncStorage.setItem(RECENT_PHOTO_KEY, dataString)
    } catch(error) {
        console.error(error);
    }
}

export default savePhotosToAsyncStorage
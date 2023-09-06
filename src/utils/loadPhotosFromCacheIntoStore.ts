import { AnyAction, Dispatch } from "@reduxjs/toolkit"
import { addRecentPhotos } from "../redux/actions/photo"
import { IPhotos as IPhotoFromAsyncStorage} from "../interfaces/asyncStorage/asyncStorage"
import loadPhotosFromAsyncStorage from "./asyncStorage/loadPhotosFromAsyncStorage"

type Proptype = {
    dispatch: Dispatch<AnyAction>
    onSucess?: (response: IPhotoFromAsyncStorage) => void
    onFailure?: (error: any) => void
}

const loadPhotosFromCacheIntoStore = ({dispatch, onSucess, onFailure}: Proptype) => {
    if(dispatch === null) return

    loadPhotosFromAsyncStorage()
    .then(response => {
        dispatch(addRecentPhotos({
            photos: response.photos
        }))
        if(onSucess) onSucess(response)
    })
    .catch(e => {
        console.error("Failed to load images from local storage")
        console.error(e)
        if(onFailure) onFailure(e)
    })
}

export default loadPhotosFromCacheIntoStore;